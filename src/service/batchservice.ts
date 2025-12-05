import { adminDashboardRepository } from "../repository/adminDashboardRepository"
import { Batch } from "../types/batch";

export const batchService = async () => {
    //batch data
    const get_batch_data = async () => {
        const repository = adminDashboardRepository();
        return repository.get_batches();
    }

    const add_batch_data = async (batch: Batch) => {
        const repository = adminDashboardRepository();
        if (!batch) {
            return {
                status: "error",
                message: "batch data not found"
            }
        }
        const res = await repository.add_batch(batch);
        if (res.insertedId) {
            return {
                status: "success",
                batch_id: res.insertedId
            }
        }
    }

    const update_batch_data = async (updatedData: Partial<Batch>) => {
        const repository = adminDashboardRepository();
        if (!updatedData) {
            return {
                status: "error",
                message: "no data provided"
            }
        }

        const res = await repository.update_batch(updatedData.batchId as string, updatedData);
        if (res.modifiedCount > 0) {
            return {
                status: "success",
                message: "batch updated successfully"
            }
        }
    }

    const delete_batch = async (batchId: string) => {
        const repository = adminDashboardRepository();
        if (!batchId) {
            return {
                status: 400,
                message: "no batch id provided"
            }
        }

        const res = await repository.delete_batch(batchId);
        if (res.deletedCount > 0) {
            return {
                status: 200,
                message: "batch deleted successfully"
            }
        }
    }

    return {
        get_batch_data,
        add_batch_data,
        update_batch_data,
        delete_batch
    }
}