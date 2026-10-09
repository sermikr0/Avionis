import type { Metadata } from "next";
import { MessageSquare, ShieldCheck } from "lucide-react";
import { Cta } from "@/components/sections/cta";
import { PageHero } from "@/components/sections/page-hero";
import { Container } from "@/components/ui/container";
import { Photo } from "@/components/ui/photo";
import { SectionHeading } from "@/components/ui/section-heading";
import { photos } from "@/lib/images";
import { stagger } from "@/lib/motion";
import { site, telHref } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: `About ${site.legalName}: a motor carrier based in Morrisville, Pennsylvania. How we plan, communicate and run freight on the I-95 corridor and beyond.`,
  alternates: { canonical: "/about" },
  openGraph: { url: "/about" },
};

const principles = [
  {
    title: "Confirm, then commit",
    body: "We do not quote a window we cannot keep. Addresses, receiving hours, equipment and paperwork are checked before a truck is dispatched.",
  },
  {
    title: "Say it early",
    body: "If a schedule moves, you hear it from us first — before your receiver has to ask.",
  },
  {
    title: "Run it safely",
    body: "Hours-of-service, inspections and load securement are not negotiable on any load, for any customer.",
  },
  {
    title: "Own the outcome",
    body: "When something goes wrong, we say so, fix what we can, and change whatever caused it.",
  },
];

const safety = [
  {
    title: "Federal registration",
    body: "Asia Prime Inc. DBA Avionis maintains its USDOT and MC registrations and operates under FMCSA regulations.",
  },
  {
    title: "Fit to drive, fit to roll",
    body: "Rested drivers and roadworthy equipment are prerequisites for dispatch, not goals.",
  },
  {
    title: "Cargo care",
    body: "Securement, weight distribution and handling are checked at pickup, not discovered at delivery.",
  },
];

const communication = [
  {
    title: "Pre-departure confirmation",
    body: "Addresses, hours, contacts and appointment requirements are verified before the load moves.",
  },
  {
    title: "Updates en route",
    body: "Pickup confirmation, a heads-up if anything changes in transit, and an ETA you can share.",
  },
  {
    title: "A direct line",
    body: "Call us and you reach the people coordinating your freight.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Avionis"
        title={
          <>
            The people behind the <em>plan.</em>
          </>
        }
        lead="Asia Prime Inc. DBA Avionis is a motor carrier based in Morrisville, Pennsylvania, on the I-95 corridor between Philadelphia and New York."
        photo={photos.gate}
      />

      <section className="bg-night-900 py-20 lg:py-28">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="reveal lg:col-span-4">
              <SectionHeading eyebrow="Company" title="Who we are" />
            </div>
            <div className="reveal space-y-5 text-lg leading-relaxed text-paper/65 lg:col-span-7 lg:col-start-6" style={stagger(1)}>
              <p>
                Avionis is the operating name of Asia Prime Inc., headquartered at
                {" "}{site.address.street} in Morrisville, Pennsylvania — across the
                Delaware River from Trenton, about thirty miles from Philadelphia and
                seventy from New York City.
              </p>
              <p>
                The name is a nod to how we like freight to run: filed, checked and
                flown by the plan. You get a rate confirmed before pickup, a schedule
                built from real transit times, and a person who answers the phone
                while your load is on the road. Our USDOT and MC numbers are on every
                page and link straight to the official FMCSA record.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section className="on-dark bg-night-800 py-20 text-paper lg:py-28">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-3">
              <p className="eyebrow reveal text-accent-400">[ Our mission ]</p>
            </div>
            <div className="reveal lg:col-span-9">
              <p className="display text-4xl text-balance text-paper sm:text-5xl lg:text-6xl">
                Move every load as if our own name were on the delivery date —
                <em> because it is.</em>
              </p>
            </div>
          </div>

          <ol className="mt-16 grid gap-px overflow-clip rounded-2xl border border-paper/10 bg-night-900 sm:grid-cols-2 lg:grid-cols-4">
            {principles.map((principle, index) => (
              <li key={principle.title} className="reveal bg-night-800 p-8 transition-colors duration-300 hover:bg-night-700" style={stagger(index, 5)}>
                <span className="eyebrow text-accent-400">0{index + 1}</span>
                <h3 className="display mt-6 text-3xl text-paper">{principle.title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-paper/65">{principle.body}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className="bg-night-800 py-20 lg:py-28">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-20">
            <div className="relative aspect-[4/3] overflow-clip rounded-[1.75rem] bg-night-700 shadow-card">
              <div className="reveal-zoom absolute inset-0">
                <Photo photo={photos.horizon} sizes="(min-width: 1024px) 50vw, 100vw" />
              </div>
            </div>
            <div className="reveal">
              <SectionHeading
                eyebrow="Reliability"
                title={
                  <>
                    Reliability is a <em>discipline.</em>
                  </>
                }
              />
              <div className="mt-6 space-y-5 text-lg leading-relaxed text-paper/65">
                <p>
                  Reliable freight is not complicated, but it takes discipline:
                  confirming details instead of assuming them, dispatching with
                  margin for weather and traffic, and treating an appointment as a
                  commitment rather than a target.
                </p>
                <p>
                  We would rather give you a realistic date than an optimistic one,
                  and we would rather decline a load than take one we cannot run
                  properly.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-night-900 py-20 lg:py-28">
        <Container>
          <SectionHeading
            eyebrow="How we operate"
            title={
              <>
                Safety and <em>communication.</em>
              </>
            }
            lead="Two things every customer should be able to count on, every time."
            className="reveal"
          />
          <div className="mt-14 grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="reveal">
              <h3 className="flex items-center gap-3 font-display text-3xl text-paper">
                <ShieldCheck className="h-6 w-6 text-accent-400" aria-hidden="true" />
                Safety
              </h3>
              <ul className="mt-6 divide-y divide-white/10 border-y border-white/10">
                {safety.map((item) => (
                  <li key={item.title} className="py-5">
                    <p className="font-medium text-paper">{item.title}</p>
                    <p className="mt-1.5 leading-relaxed text-paper/65">{item.body}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div className="reveal" style={stagger(1)}>
              <h3 className="flex items-center gap-3 font-display text-3xl text-paper">
                <MessageSquare className="h-6 w-6 text-accent-400" aria-hidden="true" />
                Communication
              </h3>
              <ul className="mt-6 divide-y divide-white/10 border-y border-white/10">
                {communication.map((item) => (
                  <li key={item.title} className="py-5">
                    <p className="font-medium text-paper">{item.title}</p>
                    <p className="mt-1.5 leading-relaxed text-paper/65">
                      {item.body}
                      {item.title === "A direct line" && (
                        <>
                          {" "}
                          <a href={telHref} className="font-mono text-paper underline-offset-4 hover:underline">
                            {site.phone.display}
                          </a>
                        </>
                      )}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      <Cta />
    </>
  );
}
