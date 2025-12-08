import { deliveryRepository } from "../repository/deliveryRepository";

export const deliveryService = async () => {
    const repository = await deliveryRepository();

    const pickOrders = async (runnerId: string, orderId: string) => {
        if (!runnerId || !orderId) {
            return {
                status: 400,
                message: "runnerId and orderId are required"
            }
        }

        if (await repository.deliveryStatus(orderId) !== "not-assigned") {
            return {
                status: 400,
                message: "Order is already assigned"
            }
        }

        const result = await repository.pickOrder(runnerId, orderId);
        if (result.error) {
            return {
                status: 500,
                message: "Failed to pick order",
            }
        }

        return {
            status: 200,
            message: "Order picked successfully",
            data: result
        }
    }

    return {
        pickOrders
    }
}