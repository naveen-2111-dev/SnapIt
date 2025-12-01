import { getAdminCollection, getBuyerCollection, getRunnerCollection } from "../helper/collectionloader";
import { Buyer, Runner } from "../types/auth";

export const authRepository = () => {

    // Getters
    const admin = async ({ username }: { username: string }) => {
        const collection = await getAdminCollection();
        return collection.findOne({ username });
    };

    const buyer = async ({ buyer_email }: { buyer_email: string }) => {
        const collection = await getBuyerCollection();
        return collection.findOne({ buyer_email });
    };

    const runner = async ({ runner_email }: { runner_email: string }) => {
        const collection = await getRunnerCollection();
        return collection.findOne({ runner_email });
    };

    // Setters
    const buyer_create = async (buyerData: Buyer) => {
        const collection = await getBuyerCollection();
        return collection.insertOne(buyerData);
    };

    const runner_create = async (runnerData: Runner) => {
        const collection = await getRunnerCollection();
        return collection.insertOne(runnerData);
    };

    return {
        admin,
        buyer,
        runner,
        buyer_create,
        runner_create
    };
};
