import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { flightPlan } from "@/content/standards";
import { stagger } from "@/lib/motion";

/** Four-step process with a connecting line that draws itself on scroll. */
export function FlightPlan() {
  return (
    <section id="flight-plan" className="scroll-mt-24 bg-night-900 py-20 lg:py-28">
      <Container>
        <SectionHeading
          eyebrow="How a load moves"
          title={
            <>
              The <em>flight plan</em> for every shipment.
            </>
          }
          lead="Same four steps, every time. Most freight problems start with a detail nobody confirmed; we confirm them first."
          className="reveal"
        />

        <ol className="relative mt-16 grid gap-10 lg:grid-cols-4 lg:gap-8">
          <span
            className="reveal-line absolute left-0 top-5 hidden h-px w-full bg-accent-500/60 lg:block"
            aria-hidden="true"
          />
          {flightPlan.map((step, index) => (
            <li key={step.code} className="reveal relative pl-14 lg:pl-0 lg:pt-14" style={stagger(index, 6)}>
              <span
                className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-night-900 font-mono text-[12px] text-paper lg:left-0 lg:top-0"
                aria-hidden="true"
              >
                {step.code}
              </span>
              <span
                className="absolute left-5 top-10 h-[calc(100%-2.5rem)] w-px bg-night-700 lg:hidden"
                aria-hidden="true"
              />
              <h3 className="display text-3xl text-paper">{step.title}</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-paper/65">{step.body}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
