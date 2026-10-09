import type { Metadata } from "next";
import Link from "next/link";
import { Phone } from "lucide-react";
import { QuoteForm } from "@/components/forms/quote-form";
import { PageHero } from "@/components/sections/page-hero";
import { Container } from "@/components/ui/container";
import { CopyValue } from "@/components/ui/copy-value";
import { flightPlan } from "@/content/standards";
import { stagger } from "@/lib/motion";
import { site, telHref } from "@/lib/site";

export const metadata: Metadata = {
  title: "Get a Rate",
  description:
    "Request a freight rate from Avionis (Asia Prime Inc.). Share pickup and delivery locations, freight type, weight and timing, and we will come back with a rate and pickup window.",
  alternates: { canonical: "/quote" },
  openGraph: { url: "/quote" },
};

export default function QuotePage() {
  return (
    <>
      <PageHero
        eyebrow="Get a rate"
        title={
          <>
            Tell us about the <em>load.</em>
          </>
        }
        lead="Pickup, delivery, freight and timing. We review it, confirm anything unclear, and reply with a rate and a pickup window we can keep."
      />

      <section className="bg-night-900 py-16 lg:py-24">
        <Container>
          <div className="grid gap-14 lg:grid-cols-12">
            <div className="reveal rounded-[2rem] border border-white/10 bg-night-800 p-6 shadow-card sm:p-8 lg:col-span-7 lg:p-10">
              <QuoteForm />
            </div>

            <aside className="reveal space-y-10 lg:col-span-4 lg:col-start-9" style={stagger(1)}>
              <div>
                <h2 className="eyebrow text-paper/50">[ What happens next ]</h2>
                <ol className="mt-5 space-y-5">
                  {flightPlan.slice(0, 3).map((step) => (
                    <li key={step.code} className="flex gap-4">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/20 bg-night-800 font-mono text-[12px] text-paper">
                        {step.code}
                      </span>
                      <div>
                        <p className="font-medium text-paper">{step.title}</p>
                        <p className="mt-1 text-[15px] leading-relaxed text-paper/65">{step.body}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="rounded-[1.5rem] border border-white/10 bg-night-800 p-6">
                <h2 className="display text-2xl text-paper">Time-critical?</h2>
                <p className="mt-2 text-[15px] leading-relaxed text-paper/65">
                  Call us and we will take the details over the phone.
                </p>
                <a href={telHref} className="mt-4 inline-flex items-center gap-2 font-mono text-lg text-paper transition-colors hover:text-accent-400">
                  <Phone className="h-5 w-5 text-accent-400" aria-hidden="true" />
                  {site.phone.display}
                </a>
              </div>

              <div>
                <h2 className="eyebrow text-paper/50">[ Carrier details ]</h2>
                <dl className="mt-4 space-y-2.5 text-sm text-paper/75">
                  <div className="flex items-center justify-between gap-4">
                    <dt className="text-paper/50">Legal name</dt>
                    <dd className="text-right text-paper">{site.legalName}</dd>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <dt className="text-paper/50">USDOT</dt>
                    <dd>
                      <CopyValue value={site.usdot} label="USDOT number" valueClassName="font-mono text-paper" />
                    </dd>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <dt className="text-paper/50">MC</dt>
                    <dd>
                      <CopyValue value={site.mc} label="MC number" valueClassName="font-mono text-paper" />
                    </dd>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <dt className="text-paper/50">Address</dt>
                    <dd className="text-right text-paper">{site.address.line}</dd>
                  </div>
                </dl>
                <Link href="/compliance" className="mt-4 inline-flex text-sm font-medium text-accent-400 hover:text-accent-300">
                  Compliance information →
                </Link>
              </div>
            </aside>
          </div>
        </Container>
      </section>
    </>
  );
}
