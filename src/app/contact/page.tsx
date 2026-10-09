import type { Metadata } from "next";
import Link from "next/link";
import { ExternalLink, MapPin, Phone, ShieldCheck, type LucideIcon } from "lucide-react";
import { ContactForm } from "@/components/forms/contact-form";
import { MapEmbed } from "@/components/sections/map-embed";
import { PageHero } from "@/components/sections/page-hero";
import { Container } from "@/components/ui/container";
import { CopyValue } from "@/components/ui/copy-value";
import { SectionHeading } from "@/components/ui/section-heading";
import { photos } from "@/lib/images";
import { stagger } from "@/lib/motion";
import { site, telHref } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Contact Avionis (Asia Prime Inc.) at ${site.phone.display} or visit ${site.address.full}. Send a business inquiry or request a rate.`,
  alternates: { canonical: "/contact" },
  openGraph: { url: "/contact" },
};

function Detail({ icon: Icon, title, children }: { icon: LucideIcon; title: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-5">
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent-600 text-paper">
        <Icon className="h-5 w-5" aria-hidden="true" />
      </span>
      <div>
        <h2 className="eyebrow text-paper/50">[ {title} ]</h2>
        <div className="mt-2">{children}</div>
      </div>
    </div>
  );
}

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title={
          <>
            Talk to the people who <em>run it.</em>
          </>
        }
        lead="Call, send a business inquiry, or visit the Morrisville office. For pricing, the rate form gives us everything we need to answer quickly."
        photo={photos.road}
      />

      <section className="bg-night-900 py-16 lg:py-24">
        <Container>
          <div className="grid gap-14 lg:grid-cols-12">
            <div className="reveal space-y-10 lg:col-span-5">
              <Detail icon={Phone} title="Phone">
                <a href={telHref} className="font-display text-4xl text-paper transition-colors hover:text-accent-400 sm:text-5xl">
                  {site.phone.display}
                </a>
                <p className="mt-2 text-[15px] leading-relaxed text-paper/65">A direct line to the people coordinating your freight.</p>
              </Detail>

              <Detail icon={MapPin} title="Office">
                <address className="text-lg not-italic leading-relaxed text-paper/85">
                  <span className="font-medium text-paper">{site.legalName}</span>
                  <br />
                  {site.address.street}
                  <br />
                  {site.address.city}, {site.address.region} {site.address.postalCode}
                </address>
                <a
                  href={site.maps.directions}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-accent-400 hover:text-accent-300"
                >
                  Get directions
                  <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              </Detail>

              <Detail icon={ShieldCheck} title="Registration">
                <dl className="space-y-2 text-[15px] text-paper/85">
                  <div className="flex items-center gap-3">
                    <dt className="w-16 text-paper/50">USDOT</dt>
                    <dd>
                      <CopyValue value={site.usdot} label="USDOT number" valueClassName="font-mono text-paper" />
                    </dd>
                  </div>
                  <div className="flex items-center gap-3">
                    <dt className="w-16 text-paper/50">MC</dt>
                    <dd>
                      <CopyValue value={site.mc} label="MC number" valueClassName="font-mono text-paper" />
                    </dd>
                  </div>
                </dl>
                <Link href="/compliance" className="mt-3 inline-flex text-sm font-medium text-accent-400 hover:text-accent-300">
                  Compliance information →
                </Link>
              </Detail>
            </div>

            <div className="reveal lg:col-span-7" style={stagger(1)}>
              <div className="rounded-[2rem] border border-white/10 bg-night-800 p-6 shadow-card sm:p-8 lg:p-10">
                <h2 className="display text-4xl text-paper">Send a business inquiry</h2>
                <p className="mt-2 text-[15px] leading-relaxed text-paper/65">
                  For pricing, please use the{" "}
                  <Link href="/quote" className="font-medium text-accent-400 underline-offset-4 hover:underline">
                    rate request form
                  </Link>{" "}
                  so we have the freight details. For everything else, this form reaches our office directly.
                </p>
                <div className="mt-8">
                  <ContactForm />
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-night-800 py-16 lg:py-24">
        <Container>
          <SectionHeading
            eyebrow="Location"
            title={
              <>
                Morrisville, <em>Pennsylvania.</em>
              </>
            }
            lead={`${site.address.full}. On the I-95 corridor, across the river from Trenton, minutes from the New Jersey and Pennsylvania Turnpikes.`}
          />
          <div className="mt-10 overflow-clip rounded-[1.75rem] border border-white/10">
            <MapEmbed />
          </div>
        </Container>
      </section>
    </>
  );
}
