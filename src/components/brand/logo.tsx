import Image from "next/image";
import logoOnDark from "@/assets/brand/logo-on-dark.png";
import logoOnLight from "@/assets/brand/logo.png";
import { site } from "@/lib/site";

export type LogoTone = "light" | "dark";

/**
 * Company logo: the faceted blue-and-gold "A" above the AVIONIS wordmark.
 * `dark` = placed on a dark background (default; wordmark drawn in white);
 * `light` = on the white pill nav or other light surfaces (original colours).
 */
export function Logo({
  tone = "dark",
  height = 56,
  eager = false,
  className,
}: {
  tone?: LogoTone;
  /** Rendered height in CSS pixels; the width follows the artwork's aspect ratio. */
  height?: number;
  /** Load immediately, for a logo that is visible on first paint. */
  eager?: boolean;
  className?: string;
}) {
  const src = tone === "dark" ? logoOnDark : logoOnLight;

  return (
    <Image
      src={src}
      alt={site.brand}
      height={height}
      width={Math.round((height * src.width) / src.height)}
      quality={85}
      loading={eager ? "eager" : undefined}
      className={className}
    />
  );
}
