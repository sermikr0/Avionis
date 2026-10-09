"use client";

import { useEffect } from "react";
import { Button, ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { site, telHref } from "@/lib/site";

export default function ErrorPage({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="bg-night-900">
      <Container className="py-28 lg:py-40">
        <p className="eyebrow text-accent-400">[ Something went wrong ]</p>
        <h1 className="display mt-5 max-w-2xl text-5xl text-balance text-paper sm:text-6xl">
          We hit some <em>turbulence.</em>
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-paper/65">
          Please try again. If it keeps happening, call us at{" "}
          <a href={telHref} className="font-mono text-paper underline-offset-4 hover:underline">
            {site.phone.display}
          </a>
          {error.digest && (
            <>
              {" "}
              and mention reference{" "}
              <code className="rounded-md bg-night-700 px-1.5 py-0.5 font-mono text-sm text-paper/85">{error.digest}</code>
            </>
          )}
          .
        </p>
        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <Button size="lg" onClick={() => retry()}>
            Try again
          </Button>
          <ButtonLink href="/" variant="secondary" size="lg">
            Go to the homepage
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
