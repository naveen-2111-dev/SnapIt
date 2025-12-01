import { authService } from "@/src/service/authservice";
import { NextRequest, NextResponse } from "next/server";
import { sign } from "jsonwebtoken";
import { configDotenv } from "dotenv";
import { VerifyRecaptcha } from "@/src/helper/recaptcha";

configDotenv();

export async function POST(request: NextRequest, response: NextResponse) {
    const { username, password, captchaToken } = await request.json();
    const authservice = await authService();

    try {
        const result = await authservice.admin_login(username, password);
        const isHuman = await VerifyRecaptcha(captchaToken);

        if (!isHuman) {
            return NextResponse.json({
                status: "error",
                message: "Captcha verification failed"
            }, { status: 400 });
        }

        const token = sign(
            { userId: result.user?.id },
            process.env.ADMIN_JSON_WEB_TOKEN_SECRET as string,
            { expiresIn: '1h' }
        )

        response.cookies.set("adminToken", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            path: "/",
            maxAge: 60 * 60
        });

        return NextResponse.json(result);
    } catch {
        return NextResponse.json({
            status: "error",
            message: "Authentication failed"
        }, { status: 401 });
    }
}