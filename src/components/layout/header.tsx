"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { Menu, Phone, X } from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/cn";
import { primaryNav, site, telHref } from "@/lib/site";

function subscribeToScroll(onChange: () => void) {
  window.addEventListener("scroll", onChange, { passive: true });
  return () => window.removeEventListener("scroll", onChange);
}

/** Floating white "pill" navigation over the page media, like a cockpit instrument. */
export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [openedAt, setOpenedAt] = useState(pathname);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const scrolled = useSyncExternalStore(subscribeToScroll, () => window.scrollY > 24, () => false);

  if (pathname !== openedAt) {
    setOpenedAt(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const outside = [document.getElementById("main"), document.querySelector("footer")];
    outside.forEach((el) => el?.setAttribute("inert", ""));
    panelRef.current?.querySelector<HTMLElement>("a, button")?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const onResize = () => {
      if (window.innerWidth >= 1024) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    const toggle = toggleRef.current;
    return () => {
      document.body.style.overflow = previousOverflow;
      outside.forEach((el) => el?.removeAttribute("inert"));
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
      toggle?.focus();
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <Container className={cn("transition-[padding] duration-300", scrolled ? "pt-3" : "pt-4 lg:pt-6")}>
        <div
          className={cn(
            "flex h-16 items-center justify-between gap-4 rounded-full border border-white/60 bg-white/95 pl-5 pr-2 text-night-900 shadow-card backdrop-blur-md transition-shadow duration-300",
            scrolled && "shadow-[0_20px_50px_-20px_rgb(0_0_0/0.8)]",
          )}
        >
          <Link href="/" className="shrink-0 rounded-full" aria-label={`${site.brand} — home`}>
            <Logo tone="light" height={50} eager />
          </Link>

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {primaryNav.map((item) => {
                const active = pathname === item.href;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "rounded-full px-4 py-2 font-mono text-[12px] uppercase tracking-[0.12em] transition-colors duration-200",
                        active ? "bg-night-900 text-paper" : "text-night-900/70 hover:bg-night-900/8 hover:text-night-900",
                      )}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="hidden items-center gap-4 lg:flex">
            <a href={telHref} className="inline-flex items-center gap-2 font-mono text-[12px] text-night-900/75 transition-colors hover:text-night-900">
              <Phone className="h-4 w-4 text-accent-600" aria-hidden="true" />
              {site.phone.display}
            </a>
            <ButtonLink href="/quote" className="shadow-none">
              Get a rate
            </ButtonLink>
          </div>

          <button
            ref={toggleRef}
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full text-night-900 transition-colors hover:bg-night-900/8 lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-6 w-6" aria-hidden="true" /> : <Menu className="h-6 w-6" aria-hidden="true" />}
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          </button>
        </div>
      </Container>

      <div
        id="mobile-nav"
        ref={panelRef}
        hidden={!open}
        className="fixed inset-x-0 top-0 bottom-0 z-40 overflow-y-auto bg-night-950 pt-24 text-paper lg:hidden"
      >
        <nav aria-label="Mobile">
          <ul className="divide-y divide-white/10 px-5 sm:px-8">
            {primaryNav.map((item, index) => {
              const active = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "display flex items-center justify-between py-5 text-4xl transition-colors",
                      active ? "text-accent-500" : "text-paper hover:text-accent-400",
                    )}
                  >
                    {item.label}
                    <span className="eyebrow text-paper/35">0{index + 1}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <div className="space-y-6 px-5 pb-12 pt-8 sm:px-8">
          <ButtonLink href="/quote" size="lg" className="w-full">
            Get a rate
          </ButtonLink>
          <a href={telHref} className="flex items-center gap-3 font-mono text-lg text-paper">
            <Phone className="h-5 w-5 text-accent-500" aria-hidden="true" />
            {site.phone.display}
          </a>
          <p className="eyebrow text-paper/45">
            {site.address.line} · USDOT {site.usdot} · MC {site.mc}
          </p>
        </div>
      </div>
    </header>
  );
}
