import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { site, telHref } from "@/lib/site";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <section className="bg-night-900">
      <Container className="py-28 lg:py-40">
        <p className="eyebrow text-accent-400">[ 404 ]</p>
        <h1 className="display mt-5 max-w-2xl text-5xl text-balance text-paper sm:text-6xl lg:text-7xl">
          This route isn&apos;t on the <em>chart.</em>
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-paper/65">
          The address may have changed or the page may have been removed. Try one of these, or call us at{" "}
          <a href={telHref} className="font-mono text-paper underline-offset-4 hover:underline">
            {site.phone.display}
          </a>
          .
        </p>
        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/" size="lg">
            Go to the homepage
          </ButtonLink>
          <ButtonLink href="/quote" variant="secondary" size="lg">
            Get a rate
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
