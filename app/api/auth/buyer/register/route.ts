import { authService } from "@/src/service/authservice";
import { NextRequest, NextResponse } from "next/server";
import { Buyer } from "@/src/types/auth";
import { VerifyRecaptcha } from "@/src/helper/recaptcha";

export async function POST(request: NextRequest) {
    try {
        const {
            email,
            password,
            buyer_usn,
            buyer_name,
            buyer_email,
            buyer_department,
            buyer_class_number,
            buyer_phone_number,
            captchaToken,
        } = await request.json();

        const authservice = await authService();
        const isHuman = await VerifyRecaptcha(captchaToken);

        if (!isHuman) {
            return NextResponse.json({
                status: "error",
                message: "Captcha verification failed"
            }, { status: 400 });
        }

        const dataObj: Buyer = {
            username: email,
            password,
            buyer_usn,
            buyer_name,
            buyer_email,
            buyer_department,
            buyer_class_number,
            buyer_phone_number,
        };

        const result = await authservice.buyer_register(dataObj);

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
