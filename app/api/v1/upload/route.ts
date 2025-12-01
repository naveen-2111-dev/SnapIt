import { NextRequest, NextResponse } from "next/server";
import { join } from "node:path";
import { writeFile, mkdir } from "node:fs/promises";

export async function POST(request: NextRequest) {
    const data = await request.formData();
    const file = data.get("file") as unknown as File;

    if (!file) {
        return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadDir = join(process.cwd(), "public", "media");
    await mkdir(uploadDir, { recursive: true });
    const filePath = join(uploadDir, file.name);
    await writeFile(filePath, buffer);

    return NextResponse.json({
        success: true,
        url: `/media/${file.name}`
    });
}
