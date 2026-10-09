import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Photo } from "@/components/ui/photo";
import { SectionHeading } from "@/components/ui/section-heading";
import { photos } from "@/lib/images";
import { stagger } from "@/lib/motion";

export function Intro() {
  return (
    <section id="intro" className="scroll-mt-18 bg-night-900 py-20 lg:py-28">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="reveal lg:col-span-5">
            <SectionHeading
              eyebrow="Who we are"
              title={
                <>
                  A carrier that treats a delivery date as a <em>commitment.</em>
                </>
              }
            />
            <div className="mt-8 space-y-5 text-lg leading-relaxed text-paper/65">
              <p>
                Avionis is the operating name of Asia Prime Inc., a transportation
                company based at 300 W Trenton Avenue in Morrisville, Pennsylvania —
                across the Delaware River from Trenton and about thirty miles from
                Philadelphia.
              </p>
              <p>
                We run freight for shippers who want the basics done properly: a
                rate that is confirmed before pickup, a schedule built from real
                transit times, and someone who answers the phone while the load is
                on the road.
              </p>
            </div>
            <ButtonLink href="/about" variant="ghost" arrow className="mt-8">
              About Avionis
            </ButtonLink>
          </div>

          <div className="reveal lg:col-span-6 lg:col-start-7" style={stagger(1)}>
            <div className="relative aspect-[5/4] overflow-clip rounded-[1.75rem] bg-night-700 shadow-card">
              <div className="reveal-zoom absolute inset-0">
                <Photo photo={photos.highway} sizes="(min-width: 1024px) 50vw, 100vw" />
              </div>
            </div>
            <dl className="mt-6 grid grid-cols-3 gap-4 border-t border-white/10 pt-5 font-mono text-[12px] uppercase tracking-[0.12em]">
              <div>
                <dt className="text-paper/50">Entity</dt>
                <dd className="mt-1 text-paper">Asia Prime Inc.</dd>
              </div>
              <div>
                <dt className="text-paper/50">Trade name</dt>
                <dd className="mt-1 text-paper">Avionis</dd>
              </div>
              <div>
                <dt className="text-paper/50">Corridor</dt>
                <dd className="mt-1 text-paper">I-95 Northeast</dd>
              </div>
            </dl>
          </div>
        </div>
      </Container>
    </section>
  );
}
