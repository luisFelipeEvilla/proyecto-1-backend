import User from "../models/user";
import { UserType } from "../types/user";

export async function createUser(userData: UserType) {
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