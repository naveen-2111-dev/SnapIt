import { Collection } from "mongodb";
import { Admin, Buyer, Runner } from "../types/auth";
import { getCollection } from "@/src/config/dbConfig";
import { Batch } from "../types/batch";

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

export {
    getAdminCollection,
    getBuyerCollection,
    getRunnerCollection,
    getBatchCollection
}
