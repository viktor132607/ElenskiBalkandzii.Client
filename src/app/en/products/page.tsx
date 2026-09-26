import ProductsPage from "@/components/catalog/ProductsPage";
import { pageMetadata } from "@/lib/pageMetadata";

export const metadata = pageMetadata("Selection | Elenski Balkandzhii", "Explore meat, delicacies and cheese at Elenski Balkandzhii in Ruse.", "/products", "/en/products", "en");

export default function EnglishProducts() {
  return <ProductsPage />;
}
