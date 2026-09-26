import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/site-control",
    },
    sitemap: "https://elenskibalkandzii-client.onrender.com/sitemap.xml",
    host: "https://elenskibalkandzii-client.onrender.com",
  };
}
