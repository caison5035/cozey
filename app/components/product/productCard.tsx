"use client";

import { TProduct } from "@/utils/interface";
import { moneyFormat } from "@/utils/moneyFormat";
import Link from "next/link";

type Props = {
  product: TProduct;
}

export default function ProductCard({ product }: Props) {
  return (
    <div className="group relative">
      <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
        {product?.image && (
          <img
            src={product.image.src}
            alt={product.image.alt}
            width={product.image.width}
            height={product.image.height}
            className="h-full w-full object-cover object-center lg:h-full lg:w-full"
          />
        )}
      </div>
      <div className="mt-4 flex justify-between">
        <div>
          <h3 className="text-sm text-gray-700">
            <Link href={`products/${product.handle}`}>
              <span aria-hidden="true" className="absolute inset-0" />
              {product.title}
            </Link>
          </h3>
        </div>
        {product?.price?.amount && (
          <p className="text-sm font-medium text-gray-900">
            {moneyFormat(product.price)}
          </p>
        )}
      </div>
    </div>
  );
}
