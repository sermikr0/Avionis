#!/usr/bin/env bash
#
# Deploys the Avionis site: uploads sources, installs dependencies, builds,
# restarts avionis.service and runs a health check.
#
#   deploy/deploy.sh                  # uses DEPLOY_HOST or admin@10.15.1.233
#   deploy/deploy.sh user@host
#
# Requires: the server bootstrapped once with deploy/server-bootstrap.sh and the
# deploy key (~/.ssh/jmsworld_deploy by default, override with DEPLOY_KEY)
# installed for the deploy user. Works from Git Bash on Windows.
set -euo pipefail
cd "$(dirname "$0")/.."

APP_NAME="${APP_NAME:-avionis}"
APP_PORT="${APP_PORT:-3001}"
HTTP_PORT="${HTTP_PORT:-8080}"
TARGET="${1:-${DEPLOY_HOST:-admin@10.15.1.233}}"
KEY="${DEPLOY_KEY:-$HOME/.ssh/jmsworld_deploy}"
SSH_OPTS=(-i "$KEY" -o IdentitiesOnly=yes -o BatchMode=yes -o StrictHostKeyChecking=accept-new)
export MSYS_NO_PATHCONV=1

echo "==> Packing sources"
ARCHIVE="$(mktemp -t "$APP_NAME-release-XXXXXX").tgz"
tar -czf "$ARCHIVE" \
  --exclude=./node_modules --exclude=./.next --exclude=./.git \
  --exclude='./.env.local' --exclude='./.env.production' --exclude='./.env.development' \
  --exclude='*.log' --exclude='*.tsbuildinfo' .

echo "==> Uploading to $TARGET"
scp "${SSH_OPTS[@]}" -q "$ARCHIVE" "$TARGET:/tmp/$APP_NAME-release.tgz"
rm -f "$ARCHIVE"

echo "==> Installing, building and restarting on the server"
ssh "${SSH_OPTS[@]}" "$TARGET" APP_NAME="$APP_NAME" APP_PORT="$APP_PORT" HTTP_PORT="$HTTP_PORT" bash -s <<'REMOTE'
set -euo pipefail
APP_DIR=/srv/$APP_NAME/app
ENV_FILE=/etc/$APP_NAME/$APP_NAME.env
[ -f "$ENV_FILE" ] || { echo "Missing $ENV_FILE — run server-bootstrap.sh first." >&2; exit 1; }

mkdir -p "$APP_DIR"
find "$APP_DIR" -mindepth 1 -maxdepth 1 ! -name node_modules ! -name .next -exec rm -rf {} +
tar -xzf "/tmp/$APP_NAME-release.tgz" -C "$APP_DIR"
rm -f "/tmp/$APP_NAME-release.tgz"
cd "$APP_DIR"

set -a; . "$ENV_FILE"; set +a

echo "    npm ci"
npm ci --include=dev --no-audit --no-fund --loglevel=error
echo "    next build"
npm run build --silent 2>&1 | tail -n 20

echo "    restarting $APP_NAME.service"
sudo -n systemctl restart "$APP_NAME.service"
for i in 1 2 3 4 5 6 7 8 9 10; do
  sleep 1
  if curl -fsS -o /dev/null "http://127.0.0.1:$APP_PORT/"; then break; fi
  [ "$i" -eq 10 ] && { echo "App did not answer on :$APP_PORT" >&2; sudo -n systemctl status "$APP_NAME.service" --no-pager | tail -n 20; exit 1; }
done
echo "    app answered on 127.0.0.1:$APP_PORT"
curl -fsS -o /dev/null -w "    nginx answered: HTTP %{http_code}\n" "http://127.0.0.1:$HTTP_PORT/"
REMOTE

echo "==> Deployed. Open http://${TARGET#*@}:$HTTP_PORT/"
