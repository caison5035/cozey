/* ========== IMPORTS ========== */
import { TProduct } from "@/utils/interface";
import { products } from "@/data/products";
import ProductCard from "@/app/components/product/productCard";

/* =============================================================
 *  HOME PAGE
 * ========================================================== */
export default function Home() {
  /* ========== GETTING ALL PARENT PRODUCTS ========== */
  const parentProducts: TProduct[] = products.filter(
    (product) => product.type === "parent"
  );
  
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          COZEY PRODUCTS
        </h2>
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {parentProducts.map((product: TProduct, key: number) => (
            <ProductCard key={key} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
