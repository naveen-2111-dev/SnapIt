import { Document, ObjectId } from "mongodb";
import { Address, Orders } from "./orders";

interface Admin {
    username: string;
    password: string;
}

interface Buyer extends Admin {
    buyer_usn: string;
    buyer_name: string;
    buyer_email: string;
    buyer_department: string;
    buyer_class_number: string;
    buyer_phone_number: string;
    address: Address[];
    orders: Orders[];
}

interface Runner extends Admin {
    runner_usn: string;
    runner_name: string;
    runner_email: string;
    runner_department: string;
    runner_class_number: string;
    runner_phone_number: string;
    delivered: string[];
    isAvailable: boolean;
    currentOrder?: string;
}

export {
    Admin,
    Buyer,
    Runner
}