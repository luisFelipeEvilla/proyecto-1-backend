import { ObjectId } from "mongoose";
import User from "../models/user";
import { UserType } from "../types/user";
import { ResourceNotFound } from "../errors";

export async function createUser(userData: UserType) {
    // check if exits any user with the same email
    const user = await getUserByEmail(userData.email);

    if (user) throw new Error('User already exists');

    const newUser = new User(userData);
    return await newUser.save();
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