export interface Batch {
    batchId: string;
    productName: string;
    productImage: string;
    price: number;
    quantity: number;
    uom: string;
    batchDate: string;
    paymentType: "cod" | "online";
    discount: number;
    skuCode: string;
}