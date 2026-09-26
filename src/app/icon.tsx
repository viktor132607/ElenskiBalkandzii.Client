import { ImageResponse } from "next/og";

export const dynamic = "force-static";

export const size = {
  width: 128,
  height: 128,
};

export const contentType = "image/png";

const logoUrl = "https://elenskibalkandzii-client.onrender.com/elenski-balkandzhii-logo.jpg";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "128px",
          height: "128px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "transparent",
        }}
      >
        <div
          style={{
            width: "118px",
            height: "118px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
            borderRadius: "9999px",
            backgroundColor: "#ffffff",
          }}
        >
          <img
            src={logoUrl}
            alt=""
            width="118"
            height="118"
            style={{
              width: "118px",
              height: "118px",
              objectFit: "cover",
              borderRadius: "9999px",
            }}
          />
        </div>
      </div>
    ),
    { ...size }
  );
}
