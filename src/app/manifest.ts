import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Еленски Балканджии",
    short_name: "Еленски Балканджии",
    description: "Месо, мезета и традиционни български вкусове.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#211914",
    lang: "bg",
    icons: [
      {
        src: "/elenski-icon.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
