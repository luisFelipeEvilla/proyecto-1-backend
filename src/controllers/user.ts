import mongoose, { ObjectId } from "mongoose";
import User, { userSchema } from "../models/user";

type User = Document & {
    first_name: string;
    last_name: string;
    password: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    postal_code: string;
    role: 'client' | 'admin';
};

export async function createUser(userData: User) {
    // check if exits any user with the same email
    const user = await User.find({ email: userData.email });

    if (user) throw new Error('User already exists');

    const newUser = new User(userData);
    return newUser.save();
}

export async function getUsers() {
    return User.find();
}

export async function getUserByEmail(email: string) {
    return User.findOne({ email });
}