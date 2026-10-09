import { Container } from "@/components/ui/container";
import { Photo } from "@/components/ui/photo";
import { photos } from "@/lib/images";

/** Full-bleed moving photo band with a single statement. */
export function PhotoBand() {
  return (
    <section className="relative isolate overflow-clip bg-night-950 text-paper">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 animate-drift">
          <Photo photo={photos.night} sizes="100vw" quality={60} />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-night-950/90 via-night-950/60 to-night-950/30" aria-hidden="true" />
      </div>
      <div className="stripes absolute inset-x-0 top-0 h-2 text-accent-600 opacity-80" aria-hidden="true" />
      <Container className="flex min-h-[60vh] flex-col justify-center py-24 lg:py-32">
        <p className="eyebrow reveal text-accent-400">[ Standing order ]</p>
        <p className="display reveal mt-5 max-w-4xl text-4xl text-balance sm:text-5xl lg:text-7xl">
          Confirmed before departure. Updated en route. <em>Delivered as filed.</em>
        </p>
      </Container>
    </section>
  );
}
