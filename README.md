# Avionis — website

Production website for **Asia Prime Inc. DBA Avionis**, a motor carrier based at
300 W Trenton Ave, Morrisville, PA 19067 (USDOT 4204776 · MC 1622752,
+1 917-246-1511).

**Stack:** Next.js 16 (App Router, Cache Components) · React 19 · TypeScript ·
Tailwind CSS 4 · react-hook-form + zod · Resend (email) · Lucide icons.

## Design

Dark, high-contrast "flight-deck" identity: night backgrounds (`#0b0d10`),
signal red-orange accent (`#ff4d1c`), bold uppercase Space Grotesk headlines,
Geist for text and Geist Mono for the instrument-style readouts
(`[ USDOT 4204776 ]`). Motion is CSS-first:

- full-screen looping hero video with a poster fallback (`src/components/home/hero-media.tsx`)
- floating white pill navigation over the media
- "Departures" lane board with staggered drop-in rows and a blinking cursor
- photo-backed service cards (slow zoom on hover)
- drifting full-bleed photo bands, moving hazard stripes, scroll-driven reveals
- slanted (clip-path) section ledges and an orange call-to-action block

Everything respects `prefers-reduced-motion`; the video is skipped on screens
under 768px and when data saver is on.

## Pages

| Route         | Purpose                                                         |
| ------------- | --------------------------------------------------------------- |
| `/`           | Hero, lane board, who we are, services, photo band, flight plan, instruments, CTA |
| `/about`      | Company, mission, principles, reliability, safety & communication |
| `/services`   | Six service categories with a sticky in-page nav                |
| `/quote`      | Rate request form (server-validated, emailed to the office)     |
| `/contact`    | Phone, address, business inquiry form, map                      |
| `/compliance` | USDOT / MC with links to the official FMCSA records             |
| `/privacy`    | Plain-language privacy notice                                   |
| `404`         | Custom not-found page; `error.tsx` handles runtime errors       |

Also generated: `/sitemap.xml`, `/robots.txt`, Open Graph image, SVG favicon,
Apple touch icon and LocalBusiness JSON-LD (verifiable facts only).

## Getting started

Requires Node.js 20.9 or newer.

```bash
npm install
cp .env.example .env.local   # then fill in the values
npm run dev                  # http://localhost:3000
```

Quality checks: `npm run lint`, `npx tsc --noEmit`, `npm run build`.

## Environment variables

See [`.env.example`](.env.example). Without the email variables the forms show
a genuine "not available, please call" error instead of a fake success.

| Variable                                | Required | Purpose                                                   |
| --------------------------------------- | -------- | --------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`                  | yes      | Public origin; drives canonical URLs, sitemap, robots, OG and HSTS |
| `RESEND_API_KEY`                        | yes      | API key from [resend.com](https://resend.com)              |
| `INQUIRY_TO_EMAIL`                      | yes      | Inbox(es) that receive inquiries, comma-separated         |
| `INQUIRY_FROM_EMAIL`                    | yes      | Sender on a domain verified in Resend                     |
| `NEXT_PUBLIC_GOOGLE_MAPS_EMBED_API_KEY` | no       | Embedded map on `/contact` (restrict the key to the domain) |

## Content and media

- Company facts live in `src/lib/site.ts`; the service catalog in
  `src/content/services.ts` (proposed categories — confirm with the company);
  lane board distances in `src/content/lanes.ts`; process and standards in
  `src/content/standards.ts`.
- Photos are hotlinked from Unsplash and the hero clip from Pexels (both free
  for commercial use). To self-host or use the company's own footage, place
  files in `public/` and update `src/lib/images.ts`; then remove
  `pexels.com` from the CSP in `next.config.ts`.

## Forms and security

- Client validation (react-hook-form + zod) and the **same schema again on the
  server** (`src/server/actions.ts`); nothing from the browser is trusted.
- Spam protection: honeypot field, 3-second minimum fill time and an in-memory
  per-IP rate limit (`src/server/rate-limit.ts`; swap for Redis if you ever run
  several instances).
- Security headers (CSP, nosniff, Referrer-Policy, Permissions-Policy,
  X-Frame-Options) in `next.config.ts`; HSTS and `upgrade-insecure-requests`
  switch on automatically once `NEXT_PUBLIC_SITE_URL` is `https://`.
- Secrets are read only in server code; nothing under `NEXT_PUBLIC_` is secret.

## Deployment

The site runs alongside other sites on one Linux host. Each app gets its own
systemd service, env file, Node port and Nginx port.

1. **Once per server** (as root):

   ```bash
   scp deploy/server-bootstrap.sh admin@SERVER:/tmp/avionis-bootstrap.sh
   ssh -t admin@SERVER "sudo bash /tmp/avionis-bootstrap.sh"
   ```

   Defaults: `APP_NAME=avionis`, `APP_PORT=3001` (Node, localhost only),
   `HTTP_PORT=8080` (Nginx). Override with environment variables, e.g.
   `sudo HTTP_PORT=80 bash /tmp/avionis-bootstrap.sh` once a domain is pointed
   at the server.

2. **Every release** (Git Bash on Windows works):

   ```bash
   bash deploy/deploy.sh admin@SERVER
   ```

   Uploads the sources, runs `npm ci` and `next build` on the server,
   restarts `avionis.service` and health-checks the app and Nginx.
   Authentication uses the SSH key `~/.ssh/jmsworld_deploy` (override with
   `DEPLOY_KEY`).

Secrets live in `/etc/avionis/avionis.env` on the server. Edit, then
`sudo systemctl restart avionis`; `NEXT_PUBLIC_*` values are baked in at build
time, so change those and redeploy. For HTTPS, point a domain at the server,
set `server_name` in `/etc/nginx/sites-available/avionis.conf`, and run
`sudo certbot --nginx -d www.yourdomain.com`.

## Project structure

```
src/
  app/               routes, metadata, sitemap/robots, OG image, icons, 404, error
  components/
    brand/           logo mark and wordmark
    layout/          floating pill header, footer, skip link
    forms/           rate form, contact form, shared dark field components
    sections/        page hero, CTA, photo band, section nav, map embed
    home/            hero (video), lane board, intro, services grid, flight plan, standards
    ui/              button, container, section heading, photo, copy-value
  content/           services, lanes, standards (edit copy here)
  lib/               site constants, images, validation, motion helpers
  server/            server actions, email delivery, rate limiter (server only)
deploy/              server-bootstrap.sh (once), deploy.sh (every release)
```
