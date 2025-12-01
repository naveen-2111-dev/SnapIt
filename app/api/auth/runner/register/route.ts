import { authService } from "@/src/service/authservice";
import { NextRequest, NextResponse } from "next/server";
import { Runner } from "@/src/types/auth";
import { VerifyRecaptcha } from "@/src/helper/recaptcha";

export async function POST(request: NextRequest) {
    try {
        const {
            email,
            password,
            runner_usn,
            runner_name,
            runner_email,
            runner_department,
            runner_class_number,
            runner_phone_number,
            captchaToken
        } = await request.json();

        const authservice = await authService();
        const isHuman = await VerifyRecaptcha(captchaToken);

        if (!isHuman) {
            return NextResponse.json({
                status: "error",
                message: "Captcha verification failed"
            }, { status: 400 });
        }

        const dataObj: Runner = {
            username: email,
            password,
            runner_usn,
            runner_name,
            runner_email,
            runner_department,
            runner_class_number,
            runner_phone_number,
        };

        const result = await authservice.runner_register(dataObj);

        return NextResponse.json(result, { status: 200 });
    } catch (error) {
        console.error("Registration error:", error);

        return NextResponse.json(
            {
                status: "error",
                message: "Registration failed",
            },
            { status: 401 }
        );
    }
}
