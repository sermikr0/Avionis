import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function SectionHeading({
  eyebrow,
  title,
  lead,
  tone = "dark",
  as: Heading = "h2",
  size = "md",
  className,
}: {
  eyebrow?: string;
  /** May contain <em> for an orange accent word. */
  title: ReactNode;
  lead?: ReactNode;
  tone?: "light" | "dark";
  as?: "h1" | "h2" | "h3";
  size?: "md" | "lg";
  className?: string;
}) {
  const onOrange = tone === "light";
  return (
    <div className={cn("max-w-2xl", className)}>
      {eyebrow && (
        <p className={cn("eyebrow", onOrange ? "text-night-900/70" : "text-accent-400")}>[ {eyebrow} ]</p>
      )}
      <Heading
        className={cn(
          "display mt-5 text-balance",
          size === "lg" ? "text-5xl sm:text-6xl lg:text-7xl" : "text-4xl sm:text-5xl lg:text-6xl",
          onOrange ? "text-night-900" : "text-paper",
        )}
      >
        {title}
      </Heading>
      {lead && (
        <p className={cn("mt-5 text-lg leading-relaxed", onOrange ? "text-night-900/80" : "text-paper/65")}>{lead}</p>
      )}
    </div>
  );
}
