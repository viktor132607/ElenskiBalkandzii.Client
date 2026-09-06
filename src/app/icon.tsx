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
          backgroundColor: "rgba(0,0,0,0)",
        }}
      >
        <div
          style={{
            width: "112px",
            height: "112px",
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
            width="112"
            height="112"
            style={{
              width: "112px",
              height: "112px",
              objectFit: "cover",
              transform: "scale(1.18)",
            }}
          />
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
