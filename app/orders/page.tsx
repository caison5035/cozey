"use client";
import { TOrder } from "@/utils/interface";
import { useEffect, useState } from "react";
import OrderList from "../components/elements/orderItem";

/* =============================================================
 *  ORDERS PAGE
 * ========================================================== */
export default function Orders() {
  /* ========== STATE ========== */
  const [orders, setOrders] = useState<TOrder[]>([]);
/* ========== FETCHING ORDERS ========== */
  useEffect(() => {
    const fetchOrders = async () => {
      const res = await fetch("/api/orders");
      const data = await res.json();
      if (data?.status !== 500) setOrders(data.reverse());
    };
    fetchOrders();
  }, []);
  
  return (
    <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h2 className="text-3xl font-semibold text-gray-800 mb-4">Orders</h2>
      {orders.length === 0 ? (
        <div className="bg-white shadow-lg rounded-md p-4">
          <p className="text-gray-600">No orders</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          {orders.map((order) => (
            <OrderList key={order.orderId} order={order} />
          ))}
        </div>
      )}
    </div>
  );
}
