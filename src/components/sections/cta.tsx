import { Check, Phone } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { stagger } from "@/lib/motion";
import { site, telHref } from "@/lib/site";

const checklist = [
  "Pickup and delivery locations",
  "Freight type, packaging and weight",
  "Requested pickup date",
  "Any delivery appointment requirements",
];

/** Orange call-to-action block with a slanted top edge. */
export function Cta({
  title = (
    <>
      Ready when your <em>freight</em> is.
    </>
  ),
  lead = "Send the details and we will come back with a rate and a pickup window we can keep.",
}: {
  title?: React.ReactNode;
  lead?: string;
}) {
  return (
    <section className="relative bg-night-900 pt-16 lg:pt-24">
      <div className="cut-tl relative bg-accent-600 text-night-900 [&_em]:text-white">
        <div className="stripes absolute inset-0 text-night-900 opacity-[0.07]" aria-hidden="true" />
        <Container className="relative grid gap-10 py-20 lg:grid-cols-12 lg:items-center lg:gap-16 lg:py-28">
          <div className="reveal lg:col-span-7">
            <p className="eyebrow text-night-900/70">[ Get a rate ]</p>
            <h2 className="display mt-5 text-5xl text-balance sm:text-6xl lg:text-7xl">{title}</h2>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-night-900/80">{lead}</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <ButtonLink href="/quote" variant="dark" size="lg" arrow className="shadow-none">
                Get a rate
              </ButtonLink>
              <a href={telHref} className="inline-flex h-13 items-center gap-2 px-2 font-mono text-[15px] text-night-900 transition-colors hover:text-white">
                <Phone className="h-4 w-4" aria-hidden="true" />
                {site.phone.display}
              </a>
            </div>
          </div>
          <div className="reveal lg:col-span-5" style={stagger(1)}>
            <p className="eyebrow text-night-900/70">[ Helpful to have ready ]</p>
            <ul className="mt-5 space-y-3.5 text-[15px] text-night-900">
              {checklist.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-night-900 text-white">
                    <Check className="h-3 w-3" aria-hidden="true" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </div>
    </section>
  );
}
