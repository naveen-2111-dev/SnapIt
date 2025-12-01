import { ObjectId } from "mongodb";
import { getRunnerCollection } from "../helper/collectionloader"

export const runnerRepository = async () => {
    //getters
    const getAllRunners = async () => {
        const collection = await getRunnerCollection();
        const runners = await collection.find({}).toArray();
        return runners;
    }

    const getRunnerById = async (id: ObjectId) => {
        const collection = await getRunnerCollection();
        const runner = await collection.findOne({ _id: id });
        return runner;
    }

    return {
        getRunnerById,
        getAllRunners
    }
}