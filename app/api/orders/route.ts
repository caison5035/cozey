/* ========== IMPORTS ========== */
import { type NextRequest } from 'next/server';
import { TOrder, TOrderAddData, TProduct } from "@/utils/interface";
import { products } from '@/data/products';
import fs from 'fs';
import path from 'path';

/* =============================================================
 *  ORDERS API GET REQUEST (get all orders)
 * ========================================================== */
export async function GET(request: NextRequest) {
    try {
        // Read orders.json file
        const filePath:string = path.join(process.cwd(), 'data', 'orders.json');
        const orders = fs.readFileSync(filePath, 'utf-8');
        // Return response
        return new Response(orders);
    } catch (error) {
        // Return error response
        return new Response(JSON.stringify({ status: 500, message: "Internal Server Error" }));
    }
}
/* =============================================================
 *  ORDERS API POST REQUEST (add new order)
 * ========================================================== */
export async function POST(request: NextRequest) {
    try {
        // Get form data
        const formData:TOrderAddData = await request.json();
        // Check if form data is valid
        if(!formData?.productId) return new Response(JSON.stringify({ status: 400, message: "Bad Request" }));
        // Check if required fields are not empty
        if(formData.shippingAddress === undefined || formData.customerName === undefined || formData.customerEmail === undefined){
            return new Response(JSON.stringify({ status: 400, message: "Bad Request" }));
        }
        // Find product by productId
        const findProduct:TProduct | undefined = products.find((product) => product.id === formData.productId);
        // Check if product not found
        if(!findProduct) return new Response(JSON.stringify({ status: 404, message: "Product Not Found" }));
        // Get all child products that has parent product handle
        const childProducts:TProduct[] = products.filter((product) => product.type === "child" && product.tags.includes(`parent-${findProduct?.handle}`));
        // Check if child products are not available
        const notAvailable:TProduct | undefined = childProducts?.find((product) => product.available === false);
        if(childProducts.length === 0 || notAvailable) return new Response(JSON.stringify({ status: 404, message: "Product Out of Stock" }));
        // Create new order
        const newOrder:TOrder = {
            orderId: Math.floor(Math.random() * 1000000).toString(),
            orderTotal: childProducts.reduce((total, product) => total + (product.price?.amount || 0), 0),
            orderDate: new Date().toISOString(),
            shippingAddress: formData.shippingAddress,
            customerName: formData.customerName,
            customerEmail: formData.customerEmail,
            lineItems: childProducts.map((product, index) => ({
                lineItem: index + 1,
                quantity: 1,
                productId: product.id,
                productTitle: product.title,
                price: product.price?.amount || 0
            }))
        };
        // Save new order to orders.json file
        const filePath:string = path.join(process.cwd(), 'data', 'orders.json');
        const orders:TOrder[] = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
        const newOrders:TOrder[] = orders;
        newOrders.push(newOrder);
        fs.writeFileSync(filePath, JSON.stringify(newOrders, null, 2));
        // Return response
        return new Response(JSON.stringify({ status: 200, message: "Order Added Successfully" }));
    } catch (error) {
        // Return error response
        return new Response(JSON.stringify({ status: 500, message: "Internal Server Error" }));
    }
}