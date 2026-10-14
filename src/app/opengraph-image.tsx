import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

// Read once at module scope; the asset does not depend on the request.
const logoData = await readFile(join(process.cwd(), "src/assets/brand/logo.png"), "base64");
const logoSrc = `data:image/png;base64,${logoData}`;

export const alt = `${site.brand} — ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 80px",
          background: "#f6f3ee",
          color: "#15171b",
          fontFamily: "serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "flex-end", gap: 28 }}>
          <img src={logoSrc} alt="" width={179} height={120} />
          <div style={{ marginBottom: 6, fontSize: 15, letterSpacing: 5, color: "#6f7781", fontFamily: "monospace" }}>
            ASIA PRIME INC.
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", fontSize: 92, lineHeight: 1, letterSpacing: -2 }}>
          <div>Freight that keeps</div>
          <div style={{ display: "flex" }}>
            its <span style={{ color: "#e3532a", fontStyle: "italic", marginLeft: 22 }}>schedule.</span>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            borderTop: "1px solid #ddd9d0",
            paddingTop: 26,
            fontSize: 20,
            letterSpacing: 2,
            color: "#555c66",
            fontFamily: "monospace",
          }}
        >
          <span>MORRISVILLE, PA</span>
          <span>
            USDOT {site.usdot} · MC {site.mc}
          </span>
          <span>{site.phone.display}</span>
        </div>
      </div>
    ),
    size,
  );
}
