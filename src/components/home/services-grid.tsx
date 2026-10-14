import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Photo } from "@/components/ui/photo";
import { SectionHeading } from "@/components/ui/section-heading";
import { services } from "@/content/services";
import { photos, type SitePhoto } from "@/lib/images";
import { stagger } from "@/lib/motion";

const cardPhotos: SitePhoto[] = [photos.highway, photos.dock, photos.road, photos.horizon, photos.gate];

/** Photo-backed service cards; the image zooms slowly on hover. */
export function ServicesGrid() {
  return (
    <section className="bg-night-900 py-20 lg:py-28">
      <Container>
        <div className="reveal flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Services"
            title={
              <>
                Five ways to <em>move it.</em>
              </>
            }
            lead="From a single dry van to a dedicated weekly lane, the service is matched to the shipment — never the other way around."
          />
          <ButtonLink href="/services" variant="secondary" arrow className="shrink-0">
            All services
          </ButtonLink>
        </div>

        <ul className="mt-14 flex flex-wrap justify-center gap-5">
          {services.map((service, index) => (
            <li
              key={service.slug}
              className="reveal w-full sm:w-[calc((100%-1.25rem)/2)] lg:w-[calc((100%-2.5rem)/3)]"
              style={stagger(index, 4)}
            >
              <Link
                href={`/services#${service.slug}`}
                className="group relative flex aspect-[4/5] flex-col justify-end overflow-clip rounded-3xl bg-night-800 p-7 text-paper shadow-card"
              >
                <div className="absolute inset-0 transition-transform duration-[1400ms] ease-out group-hover:scale-110">
                  <Photo photo={cardPhotos[index % cardPhotos.length]} sizes="(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw" quality={60} />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-night-950 via-night-950/60 to-night-950/20 transition-colors duration-500 group-hover:via-night-950/40" aria-hidden="true" />
                <div className="absolute left-7 top-7 flex w-[calc(100%-3.5rem)] items-center justify-between">
                  <span className="font-mono text-[12px] tracking-[0.14em] text-paper/70">{String(index + 1).padStart(2, "0")}</span>
                  <span className="flex h-10 w-10 items-center justify-center rounded-full border border-paper/30 bg-night-950/40 backdrop-blur transition-colors duration-300 group-hover:border-accent-500 group-hover:bg-accent-600">
                    <service.icon className="h-4 w-4" aria-hidden="true" />
                  </span>
                </div>
                <div className="relative">
                  <span className="block h-0.5 w-10 bg-accent-500 transition-[width] duration-500 group-hover:w-20" aria-hidden="true" />
                  <h3 className="display mt-4 text-3xl">{service.title}</h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-paper/70">{service.short}</p>
                  <span className="mt-5 inline-flex items-center gap-1.5 font-mono text-[12px] uppercase tracking-[0.12em] text-accent-400">
                    Details
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
