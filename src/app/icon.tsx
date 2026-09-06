import { ImageResponse } from "next/og";

export const size = {
  width: 128,
  height: 128,
};

export const contentType = "image/png";

const logoUrl =
  "https://raw.githubusercontent.com/viktor132607/ElenskiBalkandzii.Client/main/public/588283015_25323651390578829_4300945585916792863_n.jpg";

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
          overflow: "hidden",
          borderRadius: "9999px",
          background: "transparent",
        }}
      >
        <img
          src={logoUrl}
          alt=""
          width="128"
          height="128"
          style={{
            width: "128px",
            height: "128px",
            objectFit: "cover",
            borderRadius: "9999px",
            transform: "scale(1.08)",
          }}
        />
      </div>
    ),
    {
      ...size,
    }
  );
}
