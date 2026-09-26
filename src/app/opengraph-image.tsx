import { ImageResponse } from "next/og";

export const dynamic = "force-static";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";
export const alt = "Еленски Балканджии — месо, мезета и сирена";

const siteUrl = "https://elenskibalkandzii-client.onrender.com";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          background: "#f6f3ef",
          color: "#211915",
          position: "relative",
          overflow: "hidden",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            background: "linear-gradient(135deg, #f8f5f2 0%, #eee7e0 100%)",
          }}
        />

        <div
          style={{
            width: "690px",
            height: "630px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "54px 46px 46px 58px",
            position: "relative",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
            <div
              style={{
                width: "112px",
                height: "112px",
                borderRadius: "9999px",
                overflow: "hidden",
                background: "#ffffff",
                display: "flex",
                boxShadow: "0 0 0 2px #d8cec6",
              }}
            >
              <img
                src={`${siteUrl}/elenski-balkandzhii-logo.jpg`}
                alt=""
                width="112"
                height="112"
                style={{
                  width: "112px",
                  height: "112px",
                  objectFit: "cover",
                  borderRadius: "9999px",
                }}
              />
            </div>

            <div style={{ display: "flex", flexDirection: "column" }}>
              <div
                style={{
                  color: "#08733a",
                  fontSize: "16px",
                  fontWeight: 800,
                  letterSpacing: "2px",
                  textTransform: "uppercase",
                  marginBottom: "10px",
                }}
              >
                Традиционни български вкусове
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  fontSize: "66px",
                  lineHeight: 0.9,
                  fontWeight: 900,
                  textTransform: "uppercase",
                  letterSpacing: "-2px",
                }}
              >
                <span>Еленски</span>
                <span>Балканджии</span>
              </div>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            <div
              style={{
                fontSize: "34px",
                lineHeight: 1.1,
                fontWeight: 800,
              }}
            >
              Месо • Мезета • Сирена
            </div>
            <div
              style={{
                display: "flex",
                fontSize: "22px",
                color: "#665c55",
                gap: "14px",
              }}
            >
              <span>Русе</span>
              <span>•</span>
              <span>ул. „Шипка“ 12</span>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                width: "100%",
                height: "8px",
                marginTop: "12px",
              }}
            >
              <div style={{ width: "33.333%", height: "8px", background: "#0b9c4a" }} />
              <div style={{ width: "33.333%", height: "8px", background: "#ffffff" }} />
              <div style={{ width: "33.333%", height: "8px", background: "#cf2428" }} />
            </div>
          </div>
        </div>

        <div
          style={{
            width: "510px",
            height: "630px",
            display: "flex",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <img
            src={`${siteUrl}/elenski-balkandzhii-store-ruse.jpg`}
            alt=""
            width="510"
            height="630"
            style={{
              width: "510px",
              height: "630px",
              objectFit: "cover",
              objectPosition: "center",
            }}
          />
          <div
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              width: "30px",
              height: "630px",
              background: "linear-gradient(90deg, rgba(246,243,239,.55), rgba(246,243,239,0))",
            }}
          />
        </div>
      </div>
    ),
    { ...size }
  );
}
