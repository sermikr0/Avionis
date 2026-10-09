import type { Metadata } from "next";
import { ExternalLink, Info } from "lucide-react";
import { PageHero } from "@/components/sections/page-hero";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { CopyValue } from "@/components/ui/copy-value";
import { photos } from "@/lib/images";
import { site, telHref } from "@/lib/site";

export const metadata: Metadata = {
  title: "Compliance",
  description: `Registration information for ${site.legalName}: USDOT ${site.usdot}, MC ${site.mc}, with links to the official FMCSA records.`,
  alternates: { canonical: "/compliance" },
  openGraph: { url: "/compliance" },
};

export default function CompliancePage() {
  return (
    <>
      <PageHero
        eyebrow="Compliance"
        title={
          <>
            Registered and <em>verifiable.</em>
          </>
        }
        lead="Asia Prime Inc. DBA Avionis is registered with the U.S. Department of Transportation. Our identifiers are below, with links to the official FMCSA records so you can check them directly."
        photo={photos.highway}
      />

      <section className="bg-night-900 py-16 lg:py-24">
        <Container>
          <div className="grid gap-14 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <h2 className="eyebrow text-paper/50">[ Business information ]</h2>
              <dl className="mt-6 divide-y divide-white/10 border-y border-white/10">
                <div className="grid gap-1 py-5 sm:grid-cols-3">
                  <dt className="text-sm text-paper/50">Legal entity</dt>
                  <dd className="text-lg font-medium text-paper sm:col-span-2">{site.entity}</dd>
                </div>
                <div className="grid gap-1 py-5 sm:grid-cols-3">
                  <dt className="text-sm text-paper/50">Trade name (DBA)</dt>
                  <dd className="text-lg font-medium text-paper sm:col-span-2">{site.brand}</dd>
                </div>
                <div className="grid gap-1 py-5 sm:grid-cols-3">
                  <dt className="text-sm text-paper/50">USDOT Number</dt>
                  <dd className="sm:col-span-2">
                    <CopyValue value={site.usdot} label="USDOT number" className="gap-3" valueClassName="font-display text-4xl text-paper" />
                  </dd>
                </div>
                <div className="grid gap-1 py-5 sm:grid-cols-3">
                  <dt className="text-sm text-paper/50">MC Number</dt>
                  <dd className="sm:col-span-2">
                    <CopyValue value={site.mc} label="MC number" className="gap-3" valueClassName="font-display text-4xl text-paper" />
                  </dd>
                </div>
                <div className="grid gap-1 py-5 sm:grid-cols-3">
                  <dt className="text-sm text-paper/50">Principal address</dt>
                  <dd className="text-lg text-paper/85 sm:col-span-2">
                    <address className="not-italic">{site.address.full}</address>
                  </dd>
                </div>
                <div className="grid gap-1 py-5 sm:grid-cols-3">
                  <dt className="text-sm text-paper/50">Phone</dt>
                  <dd className="text-lg sm:col-span-2">
                    <a href={telHref} className="font-mono text-paper transition-colors hover:text-accent-400">
                      {site.phone.display}
                    </a>
                  </dd>
                </div>
              </dl>
            </div>

            <aside className="lg:col-span-4 lg:col-start-9">
              <div className="on-dark rounded-[1.75rem] bg-night-800 p-8 text-paper">
                <h2 className="display text-3xl">Verify with FMCSA</h2>
                <p className="mt-3 text-[15px] leading-relaxed text-paper/70">
                  The Federal Motor Carrier Safety Administration keeps the authoritative record for every
                  registered carrier, including authority status, insurance filings and safety data.
                </p>
                <div className="mt-6 flex flex-col gap-3">
                  <ButtonLink href={site.fmcsa.snapshot} target="_blank" rel="noopener noreferrer" variant="inverse" className="w-full">
                    SAFER company snapshot
                    <ExternalLink className="h-4 w-4" aria-hidden="true" />
                    <span className="sr-only">(opens in a new tab)</span>
                  </ButtonLink>
                  <ButtonLink href={site.fmcsa.licensing} target="_blank" rel="noopener noreferrer" variant="inverse" className="w-full">
                    Licensing &amp; Insurance search
                    <ExternalLink className="h-4 w-4" aria-hidden="true" />
                    <span className="sr-only">(opens in a new tab)</span>
                  </ButtonLink>
                </div>
                <p className="mt-5 font-mono text-[11px] leading-relaxed text-paper/50">
                  Search by USDOT {site.usdot} or MC {site.mc}. FMCSA&apos;s lookup tools are available to visitors in the
                  United States; from other countries they may show &ldquo;403 Forbidden&rdquo;. If the direct link does
                  not open, use the{" "}
                  <a href={site.fmcsa.search} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-paper">
                    SAFER search page
                  </a>
                  .
                </p>
              </div>
            </aside>
          </div>

          <div className="mt-16 flex gap-4 rounded-[1.5rem] border border-white/10 bg-night-800 p-6 sm:p-8">
            <Info className="mt-0.5 h-5 w-5 shrink-0 text-accent-400" aria-hidden="true" />
            <div>
              <h2 className="font-medium text-paper">A note on authority and insurance status</h2>
              <p className="mt-2 text-[15px] leading-relaxed text-paper/65">
                Operating authority, insurance filings and safety ratings are maintained by FMCSA and can change. We do
                not restate them here, so the official record is always the current one. If you need documents for your
                vendor file, contact our office directly.
              </p>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
