import { configDotenv } from "dotenv";

configDotenv();

export async function VerifyRecaptcha(token: string): Promise<boolean> {
    const secret = process.env.RECAPTCHA_SECRET_KEY!;
    const params = new URLSearchParams({ secret: secret, response: token });
    const res = await fetch("https://www.google.com/recaptcha/api/siteverify", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: params.toString(),
    });

    const verification = await res.json();

    if (!verification.success || verification.score < 0.5) {
        return false;
    }

    return true;
}