import { ObjectId } from "mongodb";
import { getBuyerCollection } from "../helper/collectionloader"
import { Address } from "../types/orders"

export const addressRepository = async () => {
    //setters
    const setAddress = async (addressData: Address, buyerId: ObjectId) => {
        const collection = await getBuyerCollection();
        const result = await collection.updateOne(
            { _id: buyerId },
            {
                $push: {
                    address: addressData
                }
            }
        )

        return result;
    }

    //getters
    const getAddress = async (buyerId: ObjectId) => {
        const collection = await getBuyerCollection();
        const buyer = await collection.findOne(
            { _id: buyerId },
            {
                projection: { address: 1 }
            }
        )

        return buyer;
    }

    return {
        setAddress,
        getAddress
    }
}