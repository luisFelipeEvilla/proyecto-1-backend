import { ObjectId } from "mongoose";
import User from "../models/user";
import { UserType } from "../types/user";
import { ResourceNotFound } from "../errors";
import { hashPassword } from "../utils/auth";
import { url } from "inspector";
const tfa = require('node-2fa');


export async function createUser(userData: UserType) {
    // check if exits any user with the same email
    const user = await getUserByEmail(userData.email);
    if (user) throw new Error('User already exists');
    // hash password before saving
    userData.password = await hashPassword(userData.password);
    const newUser = new User(userData);

    // add 2fa secret if role is admin

    if(userData.role === 'admin') {
        const secret = tfa.generateSecret({name: 'ProyectoBackend', account: userData.email});
        newUser.twofa={
            secret: secret.secret,
            qr: secret.qr,
            url: secret.url
        }
    }


    return await newUser.save();
}


export async function get2faQR(id: string) {
    const user = await getUserById(id);
    if (!user) throw new Error('User not found');
    if (!user.twofa) throw new Error('User does not have 2fa enabled');
    return user.twofa.qr;
}


//login
export async function login(email: string, password: string, code?: string) {
    const user = await getUserByEmail(email);
    if (!user) throw new Error('User not found');
    if (!user.twofa) {
        //user does not have 2fa enabled
        if (user.password !== await hashPassword(password)) throw new Error('Invalid password');
        return user;
    }
    //user has 2fa enabled
    if (!code) throw new Error('2fa code is required');
    if (!tfa.verifyToken(user.twofa.secret, code)) throw new Error('Invalid 2fa code');
    if (user.password !== await hashPassword(password)) throw new Error('Invalid password');
    return user;
}





export async function getUsers() {
    return await User.find();
}

export async function getUserByEmail(email: string) {
    return await User.findOne({ email, deleted_at: null });
}

export async function updateUser(id: string, userData: UserType) {
    const user = await getUserById(id);

    if (!user) throw new Error('User not found');

    Object.assign(user, userData);

    return await user.save();
}

export async function getUserById(_id: string) {
    return await User.findOne({ _id, deleted_at: null });
}

export async function deleteUser(id: string) {
    const user = await getUserById(id);

    if (!user) throw new ResourceNotFound('User not found');

    user.deleted_at = new Date();

    return await user.save();
}