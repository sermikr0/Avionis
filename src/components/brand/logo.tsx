import { cn } from "@/lib/cn";

export type LogoTone = "light" | "dark";

/** Compass bezel with a climbing "A" chevron; the orange bar is the horizon line. */
export function Mark({ className, tone = "dark" }: { className?: string; tone?: LogoTone }) {
  const bg = tone === "dark" ? "#ff4d1c" : "#0b0d10";
  const fg = tone === "dark" ? "#ffffff" : "#f4efe8";
  const bar = tone === "dark" ? "#0b0d10" : "#ff4d1c";
  return (
    <svg viewBox="0 0 40 40" aria-hidden="true" focusable="false" className={className}>
      <circle cx="20" cy="20" r="18.5" fill={bg} />
      <path d="M20 1.5v4M20 34.5v4M1.5 20h4M34.5 20h4" stroke={fg} strokeWidth="1.5" opacity="0.5" />
      <path d="M12 27.5 20 11l8 16.5" fill="none" stroke={fg} strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M15.2 22.5h9.6" fill="none" stroke={bar} strokeWidth="3.2" strokeLinecap="round" />
    </svg>
  );
}

/** `dark` = placed on a dark background (default); `light` = on the white pill nav. */
export function Logo({
  tone = "dark",
  className,
  compact = false,
}: {
  tone?: LogoTone;
  className?: string;
  compact?: boolean;
}) {
  const primary = tone === "dark" ? "text-paper" : "text-night-900";
  const sub = tone === "dark" ? "text-paper/50" : "text-night-900/55";
  return (
    <span className={cn("inline-flex items-center gap-3", className)}>
      <Mark tone={tone} className="h-9 w-9 shrink-0" />
      <span className="flex flex-col leading-none">
        <span className={cn("display text-[22px] leading-none tracking-[0.04em]", primary)}>Avionis</span>
        {!compact && (
          <span className={cn("eyebrow mt-1 text-[9px] tracking-[0.22em]", sub)}>Asia Prime Inc.</span>
        )}
      </span>
    </span>
  );
}
