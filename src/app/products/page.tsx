import ProductsPage from "@/components/catalog/ProductsPage";
import { pageMetadata } from "@/lib/pageMetadata";

export const metadata = pageMetadata("Асортимент | Еленски Балканджии", "Разгледайте месо, мезета и сирена от Еленски Балканджии в Русе.", "/products", "/en/products", "bg");

export default function Products() {
  return <ProductsPage />;
}
