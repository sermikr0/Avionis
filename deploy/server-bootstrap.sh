#!/usr/bin/env bash
#
# Avionis website — one-time server bootstrap. Run ONCE as root on the server:
#
#     sudo bash /tmp/avionis-bootstrap.sh
#
# Idempotent. Designed to coexist with other sites on the same host (each app
# gets its own user-independent service, env file, Node port and Nginx port).
#   1. Installs Node.js 24 LTS from the official tarball (SHA-256 verified) if missing
#   2. Installs Nginx and adds a server block on HTTP_PORT proxying to 127.0.0.1:APP_PORT
#   3. Creates /srv/APP_NAME/app (owned by the deploy user) and /etc/APP_NAME/APP_NAME.env
#   4. Installs the systemd unit APP_NAME.service (runs `next start` as the deploy user)
#   5. Lets the deploy user restart/stop/start/status *this service only* without a password
#   6. Opens HTTP_PORT in ufw/firewalld if one of them is active
#
# Overrides: APP_NAME, APP_PORT, HTTP_PORT, DEPLOY_USER, NODE_VERSION, SITE_URL
set -euo pipefail

APP_NAME="${APP_NAME:-avionis}"
APP_PORT="${APP_PORT:-3001}"
HTTP_PORT="${HTTP_PORT:-8080}"
DEPLOY_USER="${DEPLOY_USER:-${SUDO_USER:-admin}}"
NODE_VERSION="${NODE_VERSION:-24.21.0}"
APP_ROOT=/srv/$APP_NAME
APP_DIR=$APP_ROOT/app
ENV_DIR=/etc/$APP_NAME
ENV_FILE=$ENV_DIR/$APP_NAME.env
SERVICE=$APP_NAME.service

log() { printf '\n==> %s\n' "$*"; }

[ "$(id -u)" -eq 0 ] || { echo "Please run with sudo." >&2; exit 1; }
id "$DEPLOY_USER" >/dev/null 2>&1 || { echo "Deploy user '$DEPLOY_USER' does not exist." >&2; exit 1; }

PRIMARY_IP=$(hostname -I 2>/dev/null | awk '{print $1}' || true)
SITE_URL="${SITE_URL:-http://${PRIMARY_IP:-localhost}${HTTP_PORT:+:$HTTP_PORT}}"
[ "$HTTP_PORT" = "80" ] && SITE_URL="${SITE_URL%:80}"

# ---------------------------------------------------------------- packages
log "Installing packages (curl, xz, nginx)"
if command -v apt-get >/dev/null 2>&1; then
  export DEBIAN_FRONTEND=noninteractive
  apt-get update -qq
  apt-get install -y -qq curl ca-certificates xz-utils nginx >/dev/null
  NGINX_SITE=/etc/nginx/sites-available/$APP_NAME.conf
elif command -v dnf >/dev/null 2>&1; then
  dnf install -y -q curl ca-certificates xz nginx
  NGINX_SITE=/etc/nginx/conf.d/$APP_NAME.conf
else
  echo "Unsupported distribution: need apt-get or dnf." >&2
  exit 1
fi

# ---------------------------------------------------------------- Node.js
case "$(uname -m)" in
  x86_64) NODE_ARCH=x64 ;;
  aarch64 | arm64) NODE_ARCH=arm64 ;;
  *) echo "Unsupported CPU architecture: $(uname -m)" >&2; exit 1 ;;
esac
if ! command -v node >/dev/null 2>&1 || [ "$(node -v 2>/dev/null)" != "v$NODE_VERSION" ]; then
  log "Installing Node.js v$NODE_VERSION ($NODE_ARCH)"
  TMP=$(mktemp -d)
  trap 'rm -rf "$TMP"' EXIT
  TARBALL="node-v$NODE_VERSION-linux-$NODE_ARCH.tar.xz"
  curl -fsSL -o "$TMP/$TARBALL" "https://nodejs.org/dist/v$NODE_VERSION/$TARBALL"
  curl -fsSL -o "$TMP/SHASUMS256.txt" "https://nodejs.org/dist/v$NODE_VERSION/SHASUMS256.txt"
  (cd "$TMP" && grep " $TARBALL\$" SHASUMS256.txt | sha256sum -c - >/dev/null) || { echo "Checksum mismatch" >&2; exit 1; }
  mkdir -p /usr/local/lib/nodejs
  rm -rf "/usr/local/lib/nodejs/node-v$NODE_VERSION"
  tar -xJf "$TMP/$TARBALL" -C /usr/local/lib/nodejs
  mv "/usr/local/lib/nodejs/node-v$NODE_VERSION-linux-$NODE_ARCH" "/usr/local/lib/nodejs/node-v$NODE_VERSION"
  for bin in node npm npx; do ln -sfn "/usr/local/lib/nodejs/node-v$NODE_VERSION/bin/$bin" "/usr/local/bin/$bin"; done
fi
log "Node $(node -v), npm $(npm -v)"

# ---------------------------------------------------------------- directories & environment
log "Preparing $APP_DIR and $ENV_FILE"
mkdir -p "$APP_DIR"
chown -R "$DEPLOY_USER:$DEPLOY_USER" "$APP_ROOT"
mkdir -p "$ENV_DIR"
if [ ! -f "$ENV_FILE" ]; then
  cat > "$ENV_FILE" <<EOF
# $APP_NAME website environment. Loaded by systemd ($SERVICE) and by the build.
# After editing: sudo systemctl restart $SERVICE   (NEXT_PUBLIC_* values need a redeploy/rebuild)
NODE_ENV=production
PORT=$APP_PORT
HOSTNAME=127.0.0.1

# Public origin, no trailing slash. Change to https://www.yourdomain.com once DNS/TLS are set up.
NEXT_PUBLIC_SITE_URL=$SITE_URL

# Inquiry email delivery (Resend). Forms show a "please call" error until these are set.
RESEND_API_KEY=
INQUIRY_TO_EMAIL=
INQUIRY_FROM_EMAIL=

# Optional Google Maps embed on /contact
NEXT_PUBLIC_GOOGLE_MAPS_EMBED_API_KEY=
EOF
fi
chown "root:$DEPLOY_USER" "$ENV_FILE"
chmod 640 "$ENV_FILE"

# ---------------------------------------------------------------- systemd unit
log "Installing $SERVICE"
cat > "/etc/systemd/system/$SERVICE" <<EOF
[Unit]
Description=$APP_NAME website (Next.js)
After=network.target

[Service]
Type=simple
User=$DEPLOY_USER
Group=$DEPLOY_USER
WorkingDirectory=$APP_DIR
EnvironmentFile=$ENV_FILE
ExecStart=$APP_DIR/node_modules/.bin/next start -H 127.0.0.1 -p $APP_PORT
Restart=always
RestartSec=5
SuccessExitStatus=143
NoNewPrivileges=true
PrivateTmp=true
ProtectSystem=full
ProtectHome=read-only

[Install]
WantedBy=multi-user.target
EOF
systemctl daemon-reload
systemctl enable "$SERVICE" >/dev/null 2>&1 || true

# ---------------------------------------------------------------- nginx
log "Configuring Nginx ($NGINX_SITE, port $HTTP_PORT -> 127.0.0.1:$APP_PORT)"
cat > "$NGINX_SITE" <<EOF
# $APP_NAME website — reverse proxy to the Next.js app.
# With a domain: change "listen" to 80, add "server_name www.yourdomain.com;" and run certbot --nginx.
server {
    listen $HTTP_PORT;
    listen [::]:$HTTP_PORT;
    server_name _;

    client_max_body_size 1m;

    gzip on;
    gzip_types text/plain text/css application/json application/javascript application/xml image/svg+xml;

    location / {
        proxy_pass         http://127.0.0.1:$APP_PORT;
        proxy_http_version 1.1;
        proxy_set_header   Host              \$host;
        proxy_set_header   X-Real-IP         \$remote_addr;
        proxy_set_header   X-Forwarded-For   \$proxy_add_x_forwarded_for;
        proxy_set_header   X-Forwarded-Proto \$scheme;
        proxy_set_header   Upgrade           \$http_upgrade;
        proxy_set_header   Connection        "upgrade";
        proxy_read_timeout 60s;
    }
}
EOF
if [ -d /etc/nginx/sites-enabled ]; then
  ln -sfn "$NGINX_SITE" "/etc/nginx/sites-enabled/$APP_NAME.conf"
fi
if command -v getenforce >/dev/null 2>&1 && [ "$(getenforce)" != "Disabled" ]; then
  setsebool -P httpd_can_network_connect 1 || true
fi
nginx -t
systemctl enable --now nginx >/dev/null 2>&1 || true
systemctl reload nginx

# ---------------------------------------------------------------- deploy permissions
log "Granting $DEPLOY_USER password-less control of $SERVICE only"
SYSTEMCTL=$(command -v systemctl)
cat > "/etc/sudoers.d/$APP_NAME-deploy" <<EOF
$DEPLOY_USER ALL=(root) NOPASSWD: $SYSTEMCTL restart $SERVICE, $SYSTEMCTL start $SERVICE, $SYSTEMCTL stop $SERVICE, $SYSTEMCTL status $SERVICE
EOF
chmod 440 "/etc/sudoers.d/$APP_NAME-deploy"
visudo -cf "/etc/sudoers.d/$APP_NAME-deploy" >/dev/null
getent group systemd-journal >/dev/null && usermod -aG systemd-journal "$DEPLOY_USER" || true

# ---------------------------------------------------------------- firewall
if command -v ufw >/dev/null 2>&1 && ufw status 2>/dev/null | grep -q "Status: active"; then
  log "Opening port $HTTP_PORT in ufw"; ufw allow "$HTTP_PORT/tcp" >/dev/null
fi
if command -v firewall-cmd >/dev/null 2>&1 && firewall-cmd --state >/dev/null 2>&1; then
  log "Opening port $HTTP_PORT in firewalld"; firewall-cmd --permanent --add-port="$HTTP_PORT/tcp" >/dev/null; firewall-cmd --reload >/dev/null
fi

log "Bootstrap complete."
echo "    App         : $APP_NAME  (Node 127.0.0.1:$APP_PORT, Nginx :$HTTP_PORT)"
echo "    Deploy user : $DEPLOY_USER"
echo "    App dir     : $APP_DIR"
echo "    Environment : $ENV_FILE"
echo "    Site URL    : $SITE_URL"
echo "    Next step   : run deploy/deploy.sh from the project to upload, build and start the site."
