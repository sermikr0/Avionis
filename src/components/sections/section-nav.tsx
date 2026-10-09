"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

export type SectionNavItem = { id: string; label: string };

/** Sticky in-page navigation that highlights the section currently in view. */
export function SectionNav({ items, label }: { items: SectionNavItem[]; label: string }) {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const sections = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null);
    if (sections.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const inView = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (inView) setActiveId(inView.target.id);
      },
      { rootMargin: "-35% 0px -50% 0px", threshold: [0, 0.2, 0.5, 1] },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [items]);

  return (
    <nav
      aria-label={label}
      className="sticky top-24 z-30 -mx-5 border-b border-white/10 bg-night-900/85 px-5 backdrop-blur-md sm:-mx-8 sm:px-8 lg:-mx-12 lg:px-12"
    >
      <ul className="-mx-1 flex gap-2 overflow-x-auto px-1 py-4 [scrollbar-width:none]">
        {items.map((item) => {
          const active = item.id === activeId;
          return (
            <li key={item.id} className="shrink-0">
              <a
                href={`#${item.id}`}
                aria-current={active ? "location" : undefined}
                className={cn(
                  "inline-flex items-center rounded-full border px-4 py-2 font-mono text-[12px] uppercase tracking-[0.1em] transition-colors duration-300",
                  active
                    ? "border-accent-600 bg-accent-600 text-white"
                    : "border-white/10 bg-night-800 text-paper/65 hover:border-accent-500 hover:text-paper",
                )}
              >
                {item.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
