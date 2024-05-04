import { TOrderAddData, TOrderResponse } from "@/utils/interface";
import { useEffect, useState } from "react";
import InputText from "../elements/input";
import { hasEmptyValues } from "@/utils/helper";
import Link from "next/link";

/* ========== TYPE PROPS (ARGUMENTS) ========== */
type TProps = {
  productId: string;
  outOfStock: boolean;
};

/* =============================================================
 *  PRODUCT FORM
 * ========================================================== */
export default function ProductForm({ productId, outOfStock }: TProps) {
  /* ========== STATE ========== */
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [shippingAddress, setShippingAddress] = useState<string>("");
  const [customerName, setCustomerName] = useState<string>("");
  const [customerEmail, setCustomerEmail] = useState<string>("");
  const [orderData, setOrderData] = useState<TOrderAddData | undefined>(
    undefined
  );
  /* ========== HANDLE FORM SUBMIT ========== */
  const handleSubmit: React.MouseEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    console.log("orderData", orderData, orderData && hasEmptyValues(orderData));
    if (
      outOfStock ||
      productId === undefined ||
      orderData === undefined ||
      hasEmptyValues(orderData)
    )
      return;
    setLoading(true);
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        body: JSON.stringify(orderData),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const response: TOrderResponse = await res.json();
      response.status === 200
        ? setSuccess(response.message)
        : setError(response.message);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError("Something went wrong, please try again later");
    }
  };
  /* ========== SET ORDER DATA ========== */
  useEffect(() => {
    setOrderData({
      productId,
      shippingAddress,
      customerName,
      customerEmail,
    });
  }, [shippingAddress, customerName, customerEmail]);
  /* ========== CLEAR ERROR AND SUCCESS MESSAGE ========== */
  useEffect(() => {
    if (success) {
      setShippingAddress("");
      setCustomerName("");
      setCustomerEmail("");
      setOrderData(undefined);
    }
    setTimeout(() => {
      setError("");
      setSuccess("");
    }, 10000);
  }, [error, success]);

  return (
    <form
      action="/api/orders"
      method="POST"
      className="mt-10"
      onSubmit={handleSubmit}
    >
      {!outOfStock && (
        <div className="flex gap-4 py-3">
          <InputText
            type="text"
            label="Shipping Address"
            name="shippingAddress"
            value={shippingAddress}
            onChange={(e) => setShippingAddress(e.target.value)}
            required={true}
          />
          <InputText
            type="text"
            label="Customer Name"
            name="customerName"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            required={true}
          />
          <InputText
            type="email"
            label="Customer Email"
            name="customerEmail"
            value={customerEmail}
            onChange={(e) => setCustomerEmail(e.target.value)}
            required={true}
          />
        </div>
      )}
      <input type="hidden" name="productId" value={productId} />
      <button
        disabled={outOfStock}
        type="submit"
        className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:hover:bg-indigo-600 disabled:cursor-not-allowed"
      >
        {loading
          ? "Adding to Orders..."
          : outOfStock
          ? "Out of Stock"
          : "Order Now"}
      </button>
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      {success && (
        <p className="text-green-500 text-sm mt-2">
          {success}.{" "}
          <Link href="/orders">
            <span className="text-blue-500">View Orders</span>
          </Link>
        </p>
      )}
    </form>
  );
}
