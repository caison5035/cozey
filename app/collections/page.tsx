"use client";

import { useEffect, useState } from "react";
import ProductGrid from "../components/collections/productGrid";
import { CollectionTabs, Collections } from "@/data/collections";
import Tab from "../components/elements/tab";
import {
  TCollection,
  TCollectionProduct,
  TCollectionTab,
} from "@/utils/interface";
import clsx from "clsx";

export default function CollectionsPage() {
  const [activeTab, setActiveTab] = useState<string>(CollectionTabs[0].id);
  const [prevScrollPos, setPrevScrollPos] = useState<number>(0);
  const [scrolledUp, setScrolledUp] = useState<boolean>(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      const tabs = CollectionTabs.map((tab) => document.getElementById(tab.id));

      // Find the tab that is closest to the current scroll position
      let closestTab = tabs.reduce((prev, curr) => {
        if (!prev || !curr) return prev;
        const prevDistance = Math.abs(prev.offsetTop - currentScrollPos);
        const currDistance = Math.abs(curr.offsetTop - currentScrollPos);
        return prevDistance < currDistance ? prev : curr;
      });

      if (closestTab) {
        setActiveTab(closestTab.id);
      }
      setScrolledUp(prevScrollPos > currentScrollPos);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollPos]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = element.offsetTop - 69;
      window.scrollTo({ behavior: 'smooth', top: offset });
      setActiveTab(id);
    }
  };

  return (
    <div className="relative pt-[200px] bg-cz-gray-500 font-larsseit">
      <div
        className={clsx(
          "fixed w-full pb-4 top-0 transition-all duration-150 ease-in-out z-50 bg-cz-gray-500",
          scrolledUp ? "translate-y-0" : "-translate-y-32"
        )}
      >
        <div className="max-w-[1440px] mx-auto pt-3 px-4 md:px-6 lg:px-20">
          <div className="flex justify-between">
            <div className="flex flex-col gap-1">
              <h1 className="text-6xl text-cz-blue-700 font-quincyCF font-normal leading-[71px]">
                Tables
              </h1>
              <p className="text-lg mb-5 text-cz-blue-600 font-light leading-[26px]">
                A perfect pairing to your sofa.
              </p>
              <div className="flex flex-row h-11 bg-cz-gray-700 gap-1 md:gap-[10px] lg:gap-[10px] rounded-3xl overflow-hidden p-2">
                {CollectionTabs.map((tab: TCollectionTab, key: number) => (
                  <Tab
                    key={key}
                    id={tab.id}
                    title={tab.title}
                    onClick={scrollToSection}
                    active={activeTab === tab.id}
                  ></Tab>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      {Collections.map((collection: TCollection, key: number) => (
        <div key={key} id={collection.id} className="relative">
          <div className="max-w-[1440px] mx-auto pt-8 px-4 md:px-6 lg:px-20">
            <h2 className="text-5xl text-cz-blue-500 leaing-[58px] font-quincy font-light">
              {collection.title}
            </h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 max-w-[1440px] mx-auto gap-10 py-4 px-4 md:px-6 lg:px-20">
            {collection.products.map(
              (product: TCollectionProduct, key: number) => (
                <ProductGrid key={key} product={product}></ProductGrid>
              )
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
