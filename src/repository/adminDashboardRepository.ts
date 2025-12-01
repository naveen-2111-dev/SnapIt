import { getBatchCollection } from "../helper/collectionloader";
import { Batch } from "../types/batch"
import { ObjectId } from "mongodb";

export const adminDashboardRepository = () => {
    //getters
    const get_batches = () => {
        return getBatchCollection().then(collection => collection.find({}).toArray());
    }

    //setters
    const add_batch = async (batch: Batch) => {
        const collection = await getBatchCollection();
        return collection.insertOne(batch);
    }

    const update_batch = async (batchId: string, updateData: Partial<Batch>) => {
        const collection = await getBatchCollection();
        return collection.updateOne({ _id: new ObjectId(batchId) }, { $set: updateData });
    }

    const delete_batch = async (batchId: string) => {
        const collection = await getBatchCollection();
        return collection.deleteMany({ _id: new ObjectId(batchId) });
    }

    return {
        add_batch,
        update_batch,
        delete_batch,
        get_batches
    }
}