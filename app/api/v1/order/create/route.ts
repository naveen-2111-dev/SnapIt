import { orderService } from "@/src/service/orderservice";
import { Orders } from "@/src/types/orders";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const {
        customerId,
        name,
        phone,
        address,
        totalAmount,
        paymentType,
        orderDate,
        items
    } = await request.json();
    const service = await orderService();

    const orderData = {
        customerId,
        name,
        phone,
        address,
        totalAmount,
        paymentType,
        orderDate,
        items,
    }

    const response = await service.create_Order(orderData as Orders);
    return NextResponse.json(response, { status: response.status });
}