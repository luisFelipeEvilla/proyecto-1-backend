import { ObjectId } from "mongoose";
import User from "../models/user";
import { UserType } from "../types/user";

export async function createUser(userData: UserType) {
    // check if exits any user with the same email
    const user = await User.find({ email: userData.email });

    if (user) throw new Error('User already exists');

    const newUser = new User(userData);
    return await newUser.save();
}

export async function getUsers() {
    return await User.find();
}

export async function getUserByEmail(email: string) {
    return await User.findOne({ email });
}

export async function updateUser(id: string, userData: UserType) {
    const user = await User.findById(id);

    if (!user) throw new Error('User not found');

    Object.assign(user, userData);

    return await user.save();
}

export async function getUserById(id: string) {
    return await User.findById(id);
}

export async function deleteUser(id: string) {
    return await User.findByIdAndDelete(id);
}