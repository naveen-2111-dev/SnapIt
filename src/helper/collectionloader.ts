import { Collection } from "mongodb";
import { Admin, Buyer, Runner } from "../types/auth";
import { getCollection } from "@/src/config/dbConfig";
import { Batch } from "../types/batch";
import { Orders } from "../types/orders";

let adminCollection: Collection<Admin> | null = null;
let buyerCollection: Collection<Buyer> | null = null;
let runnerCollection: Collection<Runner> | null = null;

const getAdminCollection = async () => {
    adminCollection ??= await getCollection<Admin>('admin');
    return adminCollection;
};

const getBuyerCollection = async () => {
    buyerCollection ??= await getCollection<Buyer>('buyer');
    return buyerCollection;
};

const getRunnerCollection = async () => {
    runnerCollection ??= await getCollection<Runner>('runner');
    return runnerCollection;
};

const getBatchCollection = async () => {
    const batchCollection = await getCollection<Batch>('batches');
    return batchCollection;
}

const getOrderCollection = async () => {
    const orderCollection = await getCollection<Orders>('orders');
    return orderCollection;
}

export {
    getAdminCollection,
    getBuyerCollection,
    getRunnerCollection,
    getBatchCollection,
    getOrderCollection
}
