import { batchService } from "@/src/service/batchservice";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const { batchId } = await request.json();

    if (!batchId) {
        return NextResponse.json({ error: "batchId is required" }, { status: 400 });
    }

    const service = await batchService();
    const res = await service.delete_batch(batchId);
    return NextResponse.json(res, { status: res?.status });
}