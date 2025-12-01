import { getOrderCollection } from "../helper/collectionloader"
import { Orders } from "../types/orders"

export const orderRepository = () => {
    //getters
    const get_order_by_id = async (orderId: string) => {
        const collection = await getOrderCollection();
        const order = await collection.findOne({ orderId });
        return order;
    }

    const get_orders_by_customer = async (customerId: string) => {
        const collection = await getOrderCollection();
        const orders = await collection.find({ customerId }).toArray();
        return orders;
    }

    const getOrders = async () => {
        const collection = await getOrderCollection();
        const orders = await collection.find({}).toArray();
        return orders;
    }

    //setters
    const create_order = async (orderData: Orders) => {
        const collection = await getOrderCollection();
        const result = await collection.insertOne(orderData);
        return result;
    }

    return {
        create_order,
        getOrders,
        get_order_by_id,
        get_orders_by_customer
    }
}