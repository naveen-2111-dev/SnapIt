import { getCollection } from "@/src/config/dbConfig";
import { Delivery } from "@/src/types/delivery";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    const collection = await getCollection<Delivery>("delivery");

    const changeStream = collection.watch([], {
        fullDocument: "updateLookup",
    });

    const encoder = new TextEncoder();

    return new Response(
        new ReadableStream({
            start(controller) {
                changeStream.on("change", (change) => {
                    if ("fullDocument" in change && change.fullDocument) {
                        const payload = JSON.stringify(change.fullDocument);
                        controller.enqueue(
                            encoder.encode(`data: ${payload}\n\n`)
                        );
                    }
                });

                changeStream.on("error", (error) => {
                    controller.error(error);
                });
            },
            cancel() {
                changeStream.close();
            },
        }),
        {
            headers: {
                "Content-Type": "text/event-stream",
                "Cache-Control": "no-cache",
                Connection: "keep-alive",
            },
        }
    );
}
