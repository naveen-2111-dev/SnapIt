import { batchService } from "@/src/service/batchservice";
import { Batch } from "@/src/types/batch";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const { batchId, productName, productImage, price, quantity, uom, batchDate, paymentType, discount, skuCode } = await request.json();

    const batch: Batch = {
        batchId,
        productName,
        productImage,
        price,
        quantity,
        uom,
        batchDate: new Date(batchDate).toISOString(),
        paymentType,
        discount,
        skuCode
    }

    const service = await batchService();
    const response = await service.add_batch_data(batch);

    return NextResponse.json(response, { status: 200 });
}