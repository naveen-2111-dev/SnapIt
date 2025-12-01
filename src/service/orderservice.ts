import { orderRepository } from "../repository/orderRepository";
import { Orders } from "../types/orders";

export const orderService = async () => {
    const repo = orderRepository();

    const create_Order = async (orderData: Orders) => {
        if (!orderData.customerId) return {
            status: 400,
            message: "Customer ID is required"
        }
        if (!orderData.items || orderData.items.length === 0) return {
            status: 400,
            message: "At least one item is required in the order"
        }

        orderData.orderId = "ORD-" + Date.now();

        orderData.status = "pending";

        orderData.totalAmount = orderData.items.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0
        );

        const res = await repo.create_order(orderData);
        return {
            status: 201,
            message: "Order created successfully",
            data: res
        }
    }

    const getOrderById = async (orderId: string) => {
        if (!orderId) return {
            status: 400,
            message: "orderId is required"
        }

        const order = await repo.get_order_by_id(orderId);
        if (!order) throw new Error("Order not found");

        return order;
    };

    const getOrdersByCustomer = async (customerId: string) => {
        if (!customerId) return {
            status: 400,
            message: "customerId is required"
        }

        return await repo.get_orders_by_customer(customerId);
    };

    const getAllOrders = async () => {
        return await repo.getOrders();
    };

    return {
        create_Order,
        getOrderById,
        getOrdersByCustomer,
        getAllOrders
    }
}
