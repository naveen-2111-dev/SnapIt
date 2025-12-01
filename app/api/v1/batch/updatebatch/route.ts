import { batchService } from "@/src/service/batchservice";
import { Batch } from "@/src/types/batch";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const body: Partial<Batch> = await request.json();
    const { ...rest } = body;

    if (!rest.batchId) {
        return NextResponse.json(
            { message: "batchId is required to update batch" },
            { status: 400 }
        );
    }

    const service = await batchService();
    const result = await service.update_batch_data(rest);

    return NextResponse.json(result, { status: 200 });
}