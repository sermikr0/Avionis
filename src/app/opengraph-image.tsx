import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

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
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <svg width="72" height="72" viewBox="0 0 40 40">
            <circle cx="20" cy="20" r="18.5" fill="#15171b" />
            <path d="M12 27.5 20 11l8 16.5" fill="none" stroke="#f6f3ee" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M15.2 22.5h9.6" fill="none" stroke="#e3532a" strokeWidth="3.2" strokeLinecap="round" />
          </svg>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 44, lineHeight: 1 }}>Avionis</div>
            <div style={{ marginTop: 8, fontSize: 15, letterSpacing: 5, color: "#6f7781", fontFamily: "monospace" }}>
              ASIA PRIME INC.
            </div>
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
