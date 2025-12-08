export interface Address {
    usn: string;
    classNo: number;
    dept: string;
    floor: number;
}

export interface Items {
    productName: string;
    productImage: string;
    price: number;
    quantity: number;
    uom: string;
    skuCode: string;
}

export interface Orders {
    orderId: string;
    customerId: string;
    name: string;
    phone: string;
    address: Address;
    items: Items[];
    totalAmount: number;
    paymentType: "cod" | "online";
    orderDate: string;
    status: "pending" | "shipped" | "delivered";
}

export interface OrderRunner {
    runnerId: string;
    name: string;
    phone: string;
    usn: string;
    department: string;
}