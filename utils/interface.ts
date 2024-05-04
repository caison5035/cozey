export type TImage = {
    src: string;
    alt: string;
    width?: number;
    height?: number;
};

export type TPrice = {
    amount: number;
    currency: 'USD' | 'CAD';
    discountedAmount?: number;
    discount?: string,
};

export type TProduct = {
    id: string;
    available: boolean;
    title: string;
    handle: string;
    tags: string[];
    description?: string;
    type: string;
    image?: TImage;
    price?: TPrice;
};

export type TOrderLineItem = {
    lineItem: number;
    quantity: number;
    productId: string;
    productTitle: string;
    price: number;
};

export type TOrder = {
    orderId: string;
    orderTotal: number;
    orderDate: string;
    shippingAddress: string;
    customerName: string;
    customerEmail: string;
    lineItems: TOrderLineItem[];
};

export type TOrderAddData = {
    productId: string;
    shippingAddress: string;
    customerName: string;
    customerEmail: string;
};

export type TOrderResponse = {
    status: number;
    message: string;
};

export type TCollectionTab = {
    title: string;
    id: string;
};

export type TCollectionProduct = {
    id: string;
    title: string;
    image: TImage;
    color: {
        name: string;
        rgb: string;
    };
    price: TPrice;
};

export type TCollection = {
    title: string;
    id: string;
    products: TCollectionProduct[];
};