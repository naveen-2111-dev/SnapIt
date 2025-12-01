import { MongoClient, Collection, ServerApiVersion } from "mongodb";
import { configDotenv } from "dotenv";

configDotenv();
const uri = process.env.MONGODB_URI as string;

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

const connect = async () => {
    try {
        return await client.connect();
    } catch (error) {
        console.error("Failed to connect to MongoDB", error);
        throw error;
    }
};

export const getCollection = async <T extends object>(collection_name: string): Promise<Collection<T>> => {
    const con = await connect();
    const db = con.db("snapIt");
    return db.collection<T>(collection_name);
};
