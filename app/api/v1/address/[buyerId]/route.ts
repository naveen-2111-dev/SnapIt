import { addressService } from "@/src/service/addressservice";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: { params: Promise<{ buyerId: string }> }) {
    try {
        const { buyerId } = await params;
        const service = await addressService();
        const result = await service.get_address(new ObjectId(buyerId));

        return NextResponse.json({ message: "address fetched successfully", data: result }, { status: 201 });
    } catch {
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}