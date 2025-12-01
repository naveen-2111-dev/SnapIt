import { NextRequest, NextResponse } from "next/server";
import { verify } from "jsonwebtoken";

export async function proxy(req: NextRequest) {
    try {
        const buyerToken = req.cookies.get("buyerToken")?.value;
        const adminToken = req.cookies.get("adminToken")?.value;
        const runnerToken = req.cookies.get("runnerToken")?.value;

        if (!buyerToken && !adminToken && !runnerToken) {
            return new NextResponse(
                JSON.stringify({ error: "Unauthorized: Token missing" }),
                { status: 401, headers: { "Content-Type": "application/json" } }
            );
        }

        try {
            if (buyerToken) {
                verify(
                    buyerToken,
                    process.env.USER_JSON_WEB_TOKEN_SECRET as string
                );
            } else if (adminToken) {
                verify(
                    adminToken,
                    process.env.ADMIN_JSON_WEB_TOKEN_SECRET as string
                );
            } else if (runnerToken) {
                verify(
                    runnerToken,
                    process.env.RUNNER_JSON_WEB_TOKEN_SECRET as string
                );
            }
        } catch {
            const res = new NextResponse(
                JSON.stringify({ error: "Unauthorized: Token invalid" }),
                { status: 401, headers: { "Content-Type": "application/json" } }
            );

            if (buyerToken) res.cookies.delete("buyerToken");
            if (adminToken) res.cookies.delete("adminToken");
            if (runnerToken) res.cookies.delete("runnerToken");

            return res;
        }

        return NextResponse.next();
    } catch {
        return new NextResponse(
            JSON.stringify({ error: "Unauthorized: Invalid token" }),
            { status: 401, headers: { "Content-Type": "application/json" } }
        );
    }
}

export const config = {
    matcher: ["/api/v1/:path*"],
};
