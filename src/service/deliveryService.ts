import { ObjectId } from "mongodb";
import { deliveryRepository } from "../repository/deliveryRepository";
import { runnerRepository } from "../repository/runnerRepository";

export const deliveryService = async () => {
    const repository = await deliveryRepository();
    const runnerrepo = await runnerRepository();

    const deliveredOrder = async (runnerId: string, orderId: string) => {
        if (!runnerId || !orderId) {
            return {
                status: 400,
                message: "runnerId and orderId are required"
            };
        }

        const runner = await runnerrepo.getRunnerById(new ObjectId(runnerId));

        if (!runner) {
            return {
                status: 404,
                message: "Runner not found"
            };
        }

        if (runner.currentOrder !== orderId) {
            return {
                status: 400,
                message: "Runner is not currently delivering this order"
            };
        }

        const deliveryStatus = await repository.deliveryStatus(orderId);
        if (deliveryStatus !== "assigned") {
            return {
                status: 400,
                message: "Order is not in assigned state, cannot deliver"
            };
        }

        const result = await repository.deliveredOrder(runnerId, orderId);

        if (result.error) {
            return {
                status: 500,
                message: "Failed to complete delivery"
            };
        }

        return {
            status: 200,
            message: "Order delivered successfully",
            data: result
        };
    };

    const pickOrders = async (runnerId: string, orderId: string) => {
        if (!runnerId || !orderId) {
            return {
                status: 400,
                message: "runnerId and orderId are required"
            };
        }

        const runner = await runnerrepo.getRunnerById(new ObjectId(runnerId));

        if (!runner) {
            return {
                status: 404,
                message: "Runner not found"
            };
        }

        if (runner.currentOrder) {
            return {
                status: 400,
                message: "Runner already has an active order"
            };
        }

        const deliveryStatus = await repository.deliveryStatus(orderId);
        if (deliveryStatus !== "not-assigned") {
            return {
                status: 400,
                message: "Order is already assigned"
            };
        }

        const result = await repository.pickOrder(runnerId, orderId);

        if (result.error) {
            return {
                status: 500,
                message: "Failed to pick order"
            };
        }

        return {
            status: 200,
            message: "Order picked successfully",
            data: result
        };
    };

    const boughtOrder = async (orderId: string) => {
        if (!orderId) {
            return { status: 400, message: "orderId is required" };
        }

        const deliveryStatus = await repository.deliveryStatus(orderId);
        if (deliveryStatus !== "assigned") {
            return {
                status: 400,
                message: "Order is not in assigned state, cannot mark as bought"
            };
        }

        const result = await repository.boughtOrder(orderId);

        if (!result || result.modifiedCount === 0) {
            return {
                status: 500,
                message: "Failed to update bought status"
            };
        }

        return {
            status: 200,
            message: "Order marked as bought (picked) successfully",
            data: result
        };
    };

    return {
        pickOrders,
        deliveredOrder,
        boughtOrder
    };
};
