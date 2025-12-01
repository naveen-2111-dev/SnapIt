import { ObjectId } from "mongodb";
import { addressRepository } from "../repository/addressRepository"
import { Address } from "../types/orders"

export const addressService = async () => {
    const add_address = async (addressData: Address, buyerId: ObjectId) => {
        const repo = await addressRepository();
        const result = await repo.setAddress(addressData, buyerId);
        return result;
    }

    const get_address = async (buyerId: ObjectId) => {
        const repo = await addressRepository();
        const result = await repo.getAddress(buyerId);
        return result;
    }

    return {
        add_address,
        get_address
    }
}