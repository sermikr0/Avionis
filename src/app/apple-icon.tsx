import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#15171b",
        }}
      >
        <svg width="150" height="150" viewBox="0 0 40 40">
          <path d="M12 27.5 20 11l8 16.5" fill="none" stroke="#f6f3ee" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M15.2 22.5h9.6" fill="none" stroke="#e3532a" strokeWidth="3.2" strokeLinecap="round" />
        </svg>
      </div>
    ),
    size,
  );
}
