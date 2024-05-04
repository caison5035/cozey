import { TOrder } from "@/utils/interface";

/* ========== PROPS ========== */
type TProps = {
  order: TOrder;
};

/* =============================================================
 *  ORDER LIST
 * ========================================================== */
export default function OrderList({ order }: TProps) {
  /* ========== DESTRUCTURING ORDER ========== */
  const {
    orderId,
    orderTotal,
    orderDate,
    shippingAddress,
    customerName,
    customerEmail,
    lineItems,
  } = order;

  return (
    <div className="max-w-md mx-auto w-full bg-gray-800 shadow-lg rounded-lg overflow-hidden text-white">
      <div className="px-6 py-4">
        <h3 className="text-lg font-semibold">Order ID: {orderId}</h3>
        <p className="text-sm mt-1">
          Order Date: {new Date(orderDate).toLocaleString()}
        </p>
        <p className="text-sm mt-1">Customer Name: {customerName}</p>
        <p className="text-sm mt-1">Customer Email: {customerEmail}</p>
        <p className="text-sm mt-1">Shipping Address: {shippingAddress}</p>
      </div>
      <div className="border-t border-gray-700 px-6 py-4">
        <h4 className="text-lg font-semibold mb-2">Line Items</h4>
        {lineItems.map((item) => (
          <div
            key={item.lineItem}
            className="flex justify-between items-center border-b border-gray-700 py-2"
          >
            <div>
              <p className="text-sm font-medium">{item.productTitle}</p>
              <p className="text-xs">Quantity: {item.quantity}</p>
            </div>
            <p className="text-sm font-medium">${item.price}</p>
          </div>
        ))}
        <div className="flex justify-between items-center py-2">
          <p className="text-sm font-semibold">Total:</p>
          <p className="text-sm font-semibold">${orderTotal}</p>
        </div>
      </div>
    </div>
  );
}
