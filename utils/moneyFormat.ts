import { TPrice } from "@/utils/interface";

export function moneyFormat(price: TPrice) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: price.currency,
    currencyDisplay: price.currency === "USD" ? "symbol" : "code",
  }).format(price.amount);
}