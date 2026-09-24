"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function LegacyProjectPage() {
  useEffect(() => {
    window.location.replace(`/products${window.location.hash}`);
  }, []);

  return (
    <section className="min-h-[60vh] bg-white px-5 py-24 text-center">
      <p className="text-lg text-[#514943]">
        Страницата е преместена към{" "}
        <Link href="/products" className="font-bold text-[#08733a] underline">
          /products
        </Link>
        .
      </p>
    </section>
  );
}
