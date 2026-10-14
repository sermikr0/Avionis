import type { Metadata } from "next";
import { Check } from "lucide-react";
import { Cta } from "@/components/sections/cta";
import { PageHero } from "@/components/sections/page-hero";
import { SectionNav } from "@/components/sections/section-nav";
import { Container } from "@/components/ui/container";
import { services } from "@/content/services";
import { photos } from "@/lib/images";
import { stagger } from "@/lib/motion";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Freight services from Avionis (Asia Prime Inc.) in Morrisville, Pennsylvania: dry van truckload, partials, cross-country, dedicated capacity and expedited.",
  alternates: { canonical: "/services" },
  openGraph: { url: "/services" },
};

const navItems = services.map((service) => ({ id: service.slug, label: service.title }));

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title={
          <>
            Matched to the <em>shipment.</em>
          </>
        }
        lead="From a single dry van to a dedicated weekly lane. If you are not sure which fits, describe the freight and we will recommend an approach."
        photo={photos.dock}
      />

      <section className="bg-night-900">
        <Container>
          <SectionNav items={navItems} label="Services on this page" />

          <div className="divide-y divide-white/10">
            {services.map((service, index) => (
              <article
                key={service.slug}
                id={service.slug}
                className="group grid scroll-mt-40 gap-8 py-14 lg:grid-cols-12 lg:gap-12 lg:py-20"
              >
                <div className="reveal lg:col-span-4">
                  <span className="font-display text-4xl text-paper/25">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="mt-4 flex items-start gap-3">
                    <span className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-night-800 text-paper/75 transition-colors duration-300 group-hover:border-accent-600 group-hover:bg-accent-600 group-hover:text-white">
                      <service.icon className="h-4 w-4" aria-hidden="true" />
                    </span>
                    <h2 className="display text-4xl text-paper sm:text-5xl">{service.title}</h2>
                  </div>
                </div>
                <div className="reveal space-y-4 text-lg leading-relaxed text-paper/65 lg:col-span-5" style={stagger(1)}>
                  {service.description.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
                <div className="reveal lg:col-span-3" style={stagger(2)}>
                  <h3 className="eyebrow text-paper/50">[ Well suited for ]</h3>
                  <ul className="mt-4 space-y-3 text-[15px] leading-snug text-paper/75">
                    {service.suitedFor.map((item) => (
                      <li key={item} className="flex items-start gap-2.5">
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent-600/20 text-accent-400">
                          <Check className="h-3 w-3" aria-hidden="true" />
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <Cta
        title={
          <>
            Doesn&apos;t fit a <em>category?</em>
          </>
        }
        lead="Most freight doesn't, exactly. Tell us what you are moving, where it is going and when it needs to be there."
      />
    </>
  );
}
