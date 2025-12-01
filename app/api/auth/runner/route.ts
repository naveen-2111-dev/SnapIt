import { authService } from "@/src/service/authservice";
import { NextRequest, NextResponse } from "next/server";
import { sign } from "jsonwebtoken";
import { configDotenv } from "dotenv";
import { VerifyRecaptcha } from "@/src/helper/recaptcha";

configDotenv();

export async function POST(request: NextRequest, response: NextResponse) {
    const { email, password, captchaToken } = await request.json();
    const authservice = await authService();

    try {
        const result = await authservice.runner_login(email, password);
        const isHuman = await VerifyRecaptcha(captchaToken);

        if (!isHuman) {
            return NextResponse.json({
                status: "error",
                message: "Captcha verification failed"
            }, { status: 400 });
        }

        const token = sign(
            { userId: result.user?.id },
            process.env.RUNNER_JSON_WEB_TOKEN_SECRET as string,
            { expiresIn: '7d' }
        )

        response.cookies.set("runnerToken", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            path: "/",
            maxAge: 7 * 24 * 60 * 60
        });

        return NextResponse.json(result);
    } catch {
        return NextResponse.json({
            status: "error",
            message: "Authentication failed"
        }, { status: 401 });
    }
}