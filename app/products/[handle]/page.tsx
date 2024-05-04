"use client";
/* ========== IMPORTS ========== */
import { notFound } from "next/navigation";
import { products } from "@/data/products";
import { moneyFormat } from "@/utils/moneyFormat";
import { TProduct } from "@/utils/interface";
import { clsx } from "clsx";
import ProductForm from "@/app/components/product/productForm";
import { useEffect, useState } from "react";

/* ========== TYPE PROPS (ARGUMENTS) ========== */
type IProps = {
  params: {
    handle: string;
  };
};

/* =============================================================
 *  PRODUCT PAGE
 * ========================================================== */
export default function Product({ params }: IProps) {
  const { handle } = params;
  const [outOfStock, setOutOfStock] = useState<boolean>(false);
  /* ========== FIND PRODUCT BY HANDLE PARAMS ========== */
  const currentProduct: TProduct | undefined = products.find(
    (product) => product.handle === handle
  );
  /* ========== SHOW NOT FOUND PAGE IF PRODUCT HANDLE IS NOT ========== */
  if (!currentProduct || currentProduct.type === "child") return notFound();
  const childProducts: TProduct[] = products.filter(
    (product) =>
      product.type === "child" && product.tags.includes(`parent-${handle}`)
  );
  /* ========== CHECKING OUT OF STOCK PROUCT ========== */
  useEffect(() => {
    const notAvailable: TProduct | undefined = childProducts?.find(
      (product) => product.available === false
    );
    if (childProducts.length === 0 || notAvailable) setOutOfStock(true);
  }, [childProducts]);

  return (
    <div className="bg-white">
      <div className="pt-6">
        <div className="flex">
          <div className="mt-6 sm:px-6">
            <div className="">
              <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
                {currentProduct?.image && (
                  <img
                    src={currentProduct.image.src}
                    alt={currentProduct.image.alt}
                    className="h-full w-full object-cover object-center"
                  />
                )}
              </div>
            </div>
          </div>
          <div className="px-4 pb-16 pt-10 sm:px-6">
            <div className="lg:border-b lg:border-gray-200 lg:pb-4">
              <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                {currentProduct.title}
              </h1>
            </div>
            <div className="mt-4 lg:mt-4">
              <h2 className="sr-only">Product information</h2>
              {currentProduct?.price && (
                <p className="text-3xl tracking-tight text-gray-900">
                  {moneyFormat(currentProduct.price)}
                </p>
              )}
              {childProducts?.length > 0 && (
                <div className="mt-2">
                  <h3 className="text-sm font-medium text-gray-900">
                    Box Information
                  </h3>
                  <div className="mt-4">
                    <ul
                      role="list"
                      className="list-disc space-y-2 pl-4 text-sm"
                    >
                      {childProducts.map((product: TProduct, key: number) => (
                        <li
                          key={key}
                          className={clsx(
                            product.available ? "text-gray-400" : "text-red-400"
                          )}
                        >
                          <span
                            className={clsx(
                              product.available
                                ? "text-gray-600"
                                : "text-red-600"
                            )}
                          >
                            {product.title}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
              <div className="mt-5">
                <ProductForm
                  productId={currentProduct.id}
                  outOfStock={outOfStock}
                />
              </div>
            </div>
            {currentProduct?.description && (
              <div className="py-10 lg:pt-6">
                <div>
                  <h3 className="sr-only">Description</h3>
                  <div className="space-y-6">
                    <p className="text-base text-gray-900">
                      {currentProduct?.description}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
