import {encryptPassword} from "./encrypt-password";

require('dotenv').config(); //must be on top, above imported services

import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";


interface TokenData {
    id: number;
    tfa: string;
}

export async function getParsedToken(token: string): Promise<TokenData | null> {
    return new Promise((resolve, reject) => jwt.verify(token, "darko", (err: any, parsedToken: any) => {
        resolve(parsedToken);
    }))
}

export function createToken(user: any) {
    let tokenData = {id: user.id, tfa: user.tfa} as TokenData;
    return jwt.sign(tokenData, "darko", {expiresIn: '2h'});
}

export async function comparePassword(password: string, hash: string) {
    return bcrypt.compare(password, hash)
}
