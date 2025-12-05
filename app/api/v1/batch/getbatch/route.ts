import { batchService } from "@/src/service/batchservice";
import { NextResponse } from "next/server";

export async function GET() {
    const service = await batchService();
    const batches = await service.get_batch_data();
    return NextResponse.json({
        batches
    }, { status: 200 });
}