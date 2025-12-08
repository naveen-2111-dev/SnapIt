import { deliveryService } from "@/src/service/deliveryService";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const { runnerId, orderId } = await request.json();
        const service = await deliveryService();
        const result = await service.pickOrders(runnerId, orderId);

        return NextResponse.json(result, { status: result.status });
    } catch (error) {
        return NextResponse.json(
            {
                success: false,
                message: "Internal server error",
                error: (error as Error).message,
            },
            { status: 500 }
        );
    }
}
