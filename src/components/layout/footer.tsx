import Link from "next/link";
import { ExternalLink, Phone } from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { Year } from "@/components/layout/year";
import { Container } from "@/components/ui/container";
import { CopyValue } from "@/components/ui/copy-value";
import { footerNav, site, telHref } from "@/lib/site";

function FooterColumn({ title, links }: { title: string; links: readonly { href: string; label: string }[] }) {
  return (
    <div>
      <h2 className="eyebrow text-accent-400">[ {title} ]</h2>
      <ul className="mt-5 space-y-3">
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className="text-[15px] text-paper/70 transition-colors hover:text-paper">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="relative border-t border-white/10 bg-night-950 text-paper/70">
      <div className="stripes absolute inset-x-0 top-0 h-2 text-accent-600 opacity-70" aria-hidden="true" />
      <Container className="py-16 lg:py-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1.4fr]">
          <div>
            <Link href="/" className="inline-block rounded-full" aria-label={`${site.brand} — home`}>
              <Logo />
            </Link>
            <p className="mt-6 max-w-xs text-[15px] leading-relaxed text-paper/60">
              {site.legalName}. A motor carrier based in Morrisville, Pennsylvania, on the I-95 corridor.
            </p>
            <address className="mt-6 font-mono text-[13px] not-italic leading-relaxed text-paper/60">
              {site.address.street}
              <br />
              {site.address.city}, {site.address.region} {site.address.postalCode}
            </address>
            <a href={telHref} className="mt-4 inline-flex items-center gap-2 font-mono text-[13px] text-paper transition-colors hover:text-accent-400">
              <Phone className="h-4 w-4 text-accent-500" aria-hidden="true" />
              {site.phone.display}
            </a>
          </div>

          <FooterColumn title="Company" links={footerNav.company} />
          <FooterColumn title="Get started" links={footerNav.getStarted} />

          <div>
            <h2 className="eyebrow text-accent-400">[ Registration ]</h2>
            <dl className="mt-5 space-y-3 text-[15px]">
              <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-3">
                <dt className="text-paper/50">Legal name</dt>
                <dd className="text-right text-paper">{site.legalName}</dd>
              </div>
              <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-3">
                <dt className="text-paper/50">USDOT</dt>
                <dd>
                  <CopyValue value={site.usdot} label="USDOT number" tone="dark" valueClassName="font-mono text-paper" />
                </dd>
              </div>
              <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-3">
                <dt className="text-paper/50">MC</dt>
                <dd>
                  <CopyValue value={site.mc} label="MC number" tone="dark" valueClassName="font-mono text-paper" />
                </dd>
              </div>
            </dl>
            <a
              href={site.fmcsa.snapshot}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-accent-400 transition-colors hover:text-accent-300"
            >
              Verify on FMCSA SAFER
              <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          </div>
        </div>
      </Container>

      <div className="border-t border-white/10">
        <Container className="flex flex-col gap-3 py-6 font-mono text-[11px] uppercase tracking-[0.14em] text-paper/45 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © <Year /> {site.legalName}
          </p>
          <p>
            USDOT {site.usdot} · MC {site.mc} · Morrisville, PA
          </p>
        </Container>
      </div>
    </footer>
  );
}
