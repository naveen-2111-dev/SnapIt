import bcrypt from "bcrypt";

async function passwordMatch(p1: string, p2: string): Promise<boolean> {
    return await bcrypt.compare(p1, p2);
}

async function passwordHash(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
}

export { passwordMatch, passwordHash };