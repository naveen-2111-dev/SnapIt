import { ObjectId } from "mongodb";

export interface DeliveryAddress {
    usn: string;
    classNo: number;
    dept: string;
    floor: number;
}

export interface DeliveryItem {
    productName: string;
    productImage: string;
    price: number;
    quantity: number;
    uom: string;
    skuCode: string;
}

export interface Delivery {
    _id: string;
    orderId: string;
    customerId: string | null;
    customerName: string | null;
    customerPhone: string | null;
    address: DeliveryAddress | null;
    items: DeliveryItem[];
    totalAmount: number;
    paymentType: string | null;
    orderDate: string | Date;
    orderStatus: "pending" | "confirmed" | "cancelled" | "delivered";
    deliveryStatus: "not-assigned" | "assigned" | "picked" | "delivered";
    runner: ObjectId;
    assignedAt: Date | null;
    pickedAt: Date | null;
    deliveredAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
}
