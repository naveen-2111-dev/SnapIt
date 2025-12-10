import { client } from "../config/dbConfig";
import { getDeliveryCollection, getRunnerCollection } from "../helper/collectionloader";
import { ObjectId } from "mongodb";

export const deliveryRepository = async () => {
    const deliveryStatus = async (orderId: string) => {
        const deliveryCollection = await getDeliveryCollection();
        const data = await deliveryCollection.findOne({ orderId });

        return data?.deliveryStatus;
    }

    const boughtOrder = async (orderId: string) => {
        const deliveryCollection = await getDeliveryCollection();
        const data = await deliveryCollection.updateOne(
            { orderId },
            {
                $set: {
                    pickedAt: new Date(),
                    deliveryStatus: "picked",
                    updatedAt: new Date(),
                }
            }
        )

        return data;
    }

    const pickOrder = async (runnerId: string, orderId: string) => {
        const session = client.startSession();

        try {
            let runnerUpdate = null;
            let deliveryUpdate = null;

            await session.withTransaction(async () => {
                const runnerCollection = await getRunnerCollection();
                const deliveryCollection = await getDeliveryCollection();

                runnerUpdate = await runnerCollection.updateOne(
                    { _id: new ObjectId(runnerId) },
                    {
                        $set: {
                            currentOrder: orderId,
                            isAvailable: false
                        }
                    },
                    { session }
                );

                deliveryUpdate = await deliveryCollection.updateOne(
                    { orderId },
                    {
                        $set: {
                            deliveryStatus: "assigned",
                            runner: new ObjectId(runnerId),
                            assignedAt: new Date(),
                            updatedAt: new Date(),
                        }
                    },
                    { session }
                );
            });

            return {
                runnerUpdate,
                deliveryUpdate,
            };

        } catch (error) {
            return { error };
        } finally {
            session.endSession();
        }
    };

    const deliveredOrder = async (runnerId: string, orderId: string) => {
        const session = client.startSession();

        try {
            let runnerUpdate = null;
            let deliveryUpdate = null;

            await session.withTransaction(async () => {
                const runnerCollection = await getRunnerCollection();
                const deliveryCollection = await getDeliveryCollection();

                runnerUpdate = await runnerCollection.updateOne(
                    { _id: new ObjectId(runnerId) },
                    {
                        $unset: { currentOrder: "" },
                        $set: { isAvailable: true },
                        $push: { delivered: orderId }
                    },
                    { session }
                );

                deliveryUpdate = await deliveryCollection.updateOne(
                    { orderId },
                    {
                        $set: {
                            deliveryStatus: "delivered",
                            deliveredAt: new Date(),
                            updatedAt: new Date(),
                        },
                    },
                    { session }
                );
            });

            return {
                runnerUpdate,
                deliveryUpdate,
            };

        } catch (error) {
            return { error };
        } finally {
            session.endSession();
        }
    };

    return {
        pickOrder,
        deliveryStatus,
        boughtOrder,
        deliveredOrder
    };
};
