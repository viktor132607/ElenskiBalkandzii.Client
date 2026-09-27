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
        src: "/00916727-7699-47a8-a026-e30347e3d4ac.png",
        sizes: "1254x1254",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
