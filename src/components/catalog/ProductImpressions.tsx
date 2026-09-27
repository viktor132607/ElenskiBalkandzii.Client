"use client";

import { useEffect } from "react";
import { useCookieConsent } from "@/components/CookieConsent";
import { trackAnalyticsEvent } from "@/components/GoogleAnalytics";

export default function ProductImpressions({ signature }: { signature: string }) {
  const { choice } = useCookieConsent();

  useEffect(() => {
    if (choice !== "accepted") return;
    const seen = new Set<string>();
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const element = entry.target as HTMLElement;
        const categoryId = element.dataset.categoryId;
        const productId = element.dataset.productId;
        const key = productId ? `product:${categoryId}:${productId}` : `category:${categoryId}`;
        if (seen.has(key)) continue;
        seen.add(key);
        observer.unobserve(element);
        if (productId) {
          trackAnalyticsEvent("view_item_list", {
            item_list_id: categoryId,
            item_list_name: element.dataset.categoryName,
            items: [{ item_id: `${categoryId}:${productId}`, item_name: element.dataset.productName, item_category: element.dataset.categoryName }],
          });
        } else {
          trackAnalyticsEvent("view_product_category", { category_id: categoryId, category_name: element.dataset.categoryName });
        }
      }
    }, { threshold: 0.5 });
    document.querySelectorAll("[data-category-id]").forEach(element => observer.observe(element));
    return () => observer.disconnect();
  }, [choice, signature]);

  return null;
}
