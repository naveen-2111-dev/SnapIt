import { addressService } from "@/src/service/addressservice";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const { usn, classNo, dept, floor, buyerId } = await request.json();

        if (!usn || !classNo || !dept || !floor) {
            return NextResponse.json({ message: "All fields are required" }, { status: 400 });
        }

        const service = await addressService();
        const result = await service.add_address({ usn, classNo, dept, floor }, new ObjectId(buyerId));

        return NextResponse.json({ message: "Address added successfully", data: result }, { status: 201 });
    } catch {
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}