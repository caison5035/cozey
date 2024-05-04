import { TCollectionProduct } from '@/utils/interface';
import { moneyFormat } from '@/utils/moneyFormat';
import React from 'react';

type TProps = {
  product: TCollectionProduct;
};

const ProductGrid = ({product}:TProps) => {
  return (
    <div className="flex flex-col justify-evenly items-start gap-3">
      <div className="relative w-full h-[300px]">
        <div className="relative w-full h-full">
          <img
            className="absolute w-full h-full object-cover md:object-contain lg:object-contain rounded-[20px] border-2 border-solid border-cz-gray-700 cursor-pointer"
            src={product.image.src}
            alt={product.image.alt}
          />
        </div>
        <div className="absolute bottom-3 right-3 border border-solid border-cz-gray-600 flex justify-end items-center pl-[10px] pr-[6px] py-[6px] gap-2 bg-white rounded-[100px] z-40 cursor-pointer">
          <div className="text-xs text-cz-blue-400 leading-3">{product.color.name}</div>
          <div className="w-5 h-5 rounded-full" style={{"background": product.color.rgb}}></div>
        </div>
      </div>
      <div className="flex flex-col gap-1 w-full">
        <h2 className="text-base text-cz-blue-700 cursor-pointer font-semibold">{product.title}</h2>
        { product?.price?.discount ? (
          <div className="flex flex-col gap-1 w-full">
            <div className="flex items-center gap-2 h-[18px]">
              <span className="text-sm whitespace-nowrap text-cz-blue-400 font-light">{moneyFormat(product.price)}</span>
              <span className="text-sm text-cz-blue-400 font-light">|</span>
              <span className="text-sm text-cz-orange-100 whitespace-nowrap font-bold">{product.price.discount}</span>
            </div>
            <span className="text-sm flex items-center cursor-pointer text-cz-blue-300 font-bold">
              Customize
              <span className="pl-1">-&gt;</span>
            </span>
          </div>
        ) : (
          <div className="flex items-center gap-2 h-[18px]">
            <span className="text-sm whitespace-nowrap text-cz-blue-400 font-light">{moneyFormat(product.price)} or financing</span>
            <span className="text-sm text-cz-blue-400 font-light">|</span>
            <span className="text-sm flex items-center cursor-pointer text-cz-blue-300 font-bold">
              Customize
              <span className="pl-1">-&gt;</span>
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductGrid;
