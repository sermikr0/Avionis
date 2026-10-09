import { Phone } from "lucide-react";
import { HeroMedia } from "@/components/home/hero-media";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { CopyValue } from "@/components/ui/copy-value";
import { heroVideo } from "@/lib/images";
import { site, telHref } from "@/lib/site";

export function Hero() {
  return (
    <section className="on-dark relative isolate overflow-clip bg-night-950 text-paper">
      <div className="absolute inset-0 -z-10">
        <HeroMedia poster={heroVideo.poster} video={heroVideo} />
        <div className="absolute inset-0 scrim-hero" aria-hidden="true" />
      </div>

      {/* Slanted ledge that hands over to the next section, like the reference layouts. */}
      <div className="cut-tl absolute bottom-0 right-0 h-16 w-[58%] bg-night-800 lg:h-24" aria-hidden="true" />

      <Container className="flex min-h-[100svh] flex-col justify-end pb-28 pt-40 lg:pb-36">
        <div className="max-w-4xl">
          <p className="eyebrow animate-rise text-accent-400">[ {site.legalName} · Morrisville, PA ]</p>
          <h1 className="display mt-7 animate-rise text-[clamp(3rem,8.5vw,8rem)] text-balance [animation-delay:90ms]">
            Freight that keeps its <em>schedule.</em>
          </h1>
          <p className="mt-7 max-w-xl animate-rise text-lg leading-relaxed text-paper/80 [animation-delay:200ms] sm:text-xl">
            A Morrisville, Pennsylvania motor carrier on the I-95 corridor. Every load is planned
            like a flight: confirmed before departure, updated en route, delivered as filed.
          </p>
          <div className="mt-9 flex animate-rise flex-col gap-3 [animation-delay:320ms] sm:flex-row sm:items-center">
            <ButtonLink href="/quote" size="lg" arrow>
              Get a rate
            </ButtonLink>
            <ButtonLink href="/#flight-plan" variant="secondary" size="lg">
              How it works
            </ButtonLink>
          </div>
        </div>

        <dl className="mt-14 flex animate-rise flex-wrap gap-x-10 gap-y-3 border-t border-paper/15 pt-5 font-mono text-[12px] uppercase tracking-[0.12em] text-paper/60 [animation-delay:460ms] sm:mt-20">
          <div className="flex items-center gap-2">
            <dt className="text-paper/40">Base</dt>
            <dd className="text-paper">Morrisville, PA 19067</dd>
          </div>
          <div className="flex items-center gap-2">
            <dt className="text-paper/40">USDOT</dt>
            <dd>
              <CopyValue value={site.usdot} label="USDOT number" tone="dark" valueClassName="text-paper" />
            </dd>
          </div>
          <div className="flex items-center gap-2">
            <dt className="text-paper/40">MC</dt>
            <dd>
              <CopyValue value={site.mc} label="MC number" tone="dark" valueClassName="text-paper" />
            </dd>
          </div>
        </dl>
      </Container>

      {/* Orange "one call away" card, bottom-right on large screens. */}
      <aside className="absolute bottom-32 right-6 hidden w-[320px] animate-rise rounded-3xl bg-accent-600 p-6 text-white shadow-glow [animation-delay:600ms] lg:block xl:right-12">
        <div className="flex items-center gap-3">
          <span className="relative flex h-3 w-3">
            <span className="absolute inset-0 animate-pulse-ring rounded-full bg-white" aria-hidden="true" />
            <span className="relative h-3 w-3 rounded-full bg-white" aria-hidden="true" />
          </span>
          <p className="eyebrow text-white/80">Dispatch line</p>
        </div>
        <p className="mt-4 text-lg font-semibold leading-snug">Need a rate today? We&apos;re one call away.</p>
        <a href={telHref} className="mt-4 inline-flex items-center gap-2 font-mono text-2xl text-white">
          <Phone className="h-5 w-5" aria-hidden="true" />
          {site.phone.display}
        </a>
      </aside>
    </section>
  );
}
