import type { ReactNode } from "react";
import { Container } from "@/components/ui/container";
import { Photo } from "@/components/ui/photo";
import { photos, type SitePhoto } from "@/lib/images";

/** Full-bleed page header: drifting photo, dark scrim, slanted ledge into the next section. */
export function PageHero({
  eyebrow,
  title,
  lead,
  photo = photos.road,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  lead?: string;
  photo?: SitePhoto;
  children?: ReactNode;
}) {
  return (
    <section className="on-dark relative isolate overflow-clip bg-night-950 text-paper">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 animate-drift">
          <Photo photo={photo} priority sizes="100vw" />
        </div>
        <div className="absolute inset-0 scrim-hero" aria-hidden="true" />
      </div>
      <div className="cut-tl absolute bottom-0 right-0 h-12 w-[58%] bg-night-900 lg:h-16" aria-hidden="true" />
      <Container className="flex min-h-[70svh] flex-col justify-end pb-24 pt-40 lg:min-h-[640px] lg:pb-32">
        <p className="eyebrow animate-rise text-accent-400">[ {eyebrow} ]</p>
        <h1 className="display mt-6 max-w-4xl animate-rise text-[clamp(2.75rem,7vw,6.5rem)] text-balance [animation-delay:90ms]">
          {title}
        </h1>
        {lead && (
          <p className="mt-7 max-w-2xl animate-rise text-lg leading-relaxed text-paper/75 [animation-delay:200ms] sm:text-xl">
            {lead}
          </p>
        )}
        {children}
      </Container>
    </section>
  );
}
