import { Container } from "@/components/ui/container";
import { CopyValue } from "@/components/ui/copy-value";
import { SectionHeading } from "@/components/ui/section-heading";
import { standards } from "@/content/standards";
import { stagger } from "@/lib/motion";
import { site, telHref } from "@/lib/site";

/** Instrument panel: verifiable readouts over moving hazard stripes, plus four standards. */
export function Standards() {
  return (
    <section className="relative overflow-clip bg-night-950 py-20 text-paper lg:py-28">
      <div className="stripes absolute inset-0 text-paper opacity-[0.045]" aria-hidden="true" />
      <div className="absolute -right-40 top-1/3 h-[520px] w-[520px] rounded-full bg-accent-600/15 blur-[120px]" aria-hidden="true" />
      <Container className="relative">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="Instruments"
              title={
                <>
                  Numbers you can <em>check.</em>
                </>
              }
              lead="No invented statistics. These are the identifiers and facts that stay true on every load."
              className="reveal"
            />
            <dl className="reveal mt-10 grid grid-cols-2 gap-px overflow-clip rounded-3xl border border-white/10 bg-white/10" style={stagger(1)}>
              <div className="bg-night-900 p-5">
                <dt className="eyebrow text-paper/45">USDOT</dt>
                <dd className="mt-3">
                  <CopyValue value={site.usdot} label="USDOT number" tone="dark" valueClassName="display text-3xl text-paper" />
                </dd>
              </div>
              <div className="bg-night-900 p-5">
                <dt className="eyebrow text-paper/45">MC</dt>
                <dd className="mt-3">
                  <CopyValue value={site.mc} label="MC number" tone="dark" valueClassName="display text-3xl text-paper" />
                </dd>
              </div>
              <div className="bg-night-900 p-5">
                <dt className="eyebrow text-paper/45">Base</dt>
                <dd className="display mt-3 text-2xl text-paper">Morrisville, PA</dd>
              </div>
              <div className="bg-night-900 p-5">
                <dt className="eyebrow text-paper/45">Direct line</dt>
                <dd className="mt-3">
                  <a href={telHref} className="display text-2xl text-accent-400 transition-colors hover:text-accent-300">
                    {site.phone.display}
                  </a>
                </dd>
              </div>
            </dl>
          </div>

          <ul className="grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:col-span-7">
            {standards.map((item, index) => (
              <li key={item.title} className="relative pt-6" style={stagger(index, 5)}>
                <span className="reveal-line absolute inset-x-0 top-0 h-px bg-accent-500/70" aria-hidden="true" />
                <div className="reveal">
                  <span className="eyebrow text-accent-400">0{index + 1}</span>
                  <h3 className="display mt-4 text-2xl text-paper sm:text-3xl">{item.title}</h3>
                  <p className="mt-3 max-w-md text-[15px] leading-relaxed text-paper/65">{item.body}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
