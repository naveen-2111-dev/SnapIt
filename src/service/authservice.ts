import { authRepository } from "../repository/authRepository"
import { Buyer, Runner } from "../types/auth";
import { passwordHash, passwordMatch } from "../helper/bcryptHash";

export const authService = async () => {
    //admin only auth service
    const admin_login = async (username: string, password: string) => {
        const repository = authRepository();
        const { admin } = repository;

        const adminData = await admin({ username });
        if (!adminData) {
            return {
                status: "error",
                message: "wrong username found"
            }
        }

        const isMatch = await passwordMatch(password, adminData.password);
        if (!isMatch) return {
            status: "error",
            message: "wrong password"
        }

        return {
            status: "success",
            user: {
                id: adminData._id,
                username: adminData.username
            }
        }
    }

    //buyer auth service
    const buyer_register = async (buyerData: Buyer) => {
        const repository = authRepository();
        const { buyer, buyer_create } = repository;

        if (!buyerData) {
            return {
                status: "error",
                message: "no data provided"
            }
        }

        const existingBuyer = await buyer({ buyer_email: buyerData.buyer_email });
        if (existingBuyer) {
            return {
                status: "error",
                message: "buyer already exists"
            }
        }

        const hashedPassword = await passwordHash(buyerData.password);
        buyerData.password = hashedPassword;

        const result = await buyer_create(buyerData);
        if (result.insertedId) {
            return {
                status: "success",
                user: {
                    id: result.insertedId,
                    buyer_email: buyerData.buyer_email
                }
            }
        }
    }

    const buyer_login = async (buyer_email: string, password: string) => {
        const repository = authRepository();
        const { buyer } = repository;

        const buyerData = await buyer({ buyer_email });
        if (!buyerData) {
            return {
                status: "error",
                message: "wrong email found"
            }
        }

        const isMatch = await passwordMatch(password, buyerData.password);
        if (!isMatch) return {
            status: "error",
            message: "wrong password"
        }
        return {
            status: "success",
            user: {
                id: buyerData._id,
                buyer_email: buyerData.buyer_email
            }
        }
    }

    //runner auth service
    const runner_register = async (runnerData: Runner) => {
        const repository = authRepository();
        const { runner, runner_create } = repository;

        if (!runnerData) {
            return {
                status: "error",
                message: "no data provided"
            }
        }

        const existingRunner = await runner({ runner_email: runnerData.runner_email });
        if (existingRunner) {
            return {
                status: "error",
                message: "runner already exists"
            }
        }

        const hashedPassword = await passwordHash(runnerData.password);
        runnerData.password = hashedPassword;

        const result = await runner_create(runnerData);
        if (result.insertedId) {
            return {
                status: "success",
                user: {
                    id: result.insertedId,
                    runner_email: runnerData.runner_email
                }
            }
        }
    };

    const runner_login = async (runner_email: string, password: string) => {
        const repository = authRepository();
        const { runner } = repository;

        const runnerData = await runner({ runner_email });
        if (!runnerData) {
            return {
                status: "error",
                message: "wrong email found"
            }
        }

        const isMatch = await passwordMatch(password, runnerData.password);
        if (!isMatch) {
            return {
                status: "error",
                message: "wrong password"
            }
        }

        return {
            status: "success",
            user: {
                id: runnerData._id,
                runner_email: runnerData.runner_email
            }
        }
    };

    return {
        admin_login,
        buyer_register,
        buyer_login,
        runner_register,
        runner_login
    }
}