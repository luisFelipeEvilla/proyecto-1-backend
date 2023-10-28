import { Router } from "express";
import User from "../models/user"
import { comparePassword } from "../utils/comparePassword";
import { createUser, getUserByEmail } from "../controllers/user";

const router = Router();

router.post("/signup", async (req, res) => {
    const user_data = req.body;

    try {
        // todo: implement password hashing
        const user = await createUser(user_data);
        res.send(user);
    } catch (error: any) {
        console.error("Error creating user", error);
        if ( error.name === 'ValidationError') return res.status(400).json({ error: error.message });
        if ( error.message === 'User already exists' ) return res.status(409).json({ error: error.message });
        res.status(500).json({ error: error.message });
    }
});

router.post("/signin", async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await getUserByEmail(email);

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // todo implement compare password
        const isMatch = await comparePassword(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        // todo implement token generation
       // const token = user.generateAuthToken();

        res.json({ user });
    } catch (error: any) {
        console.error("Error signing in user", error);
        res.status(500).json({ error: error.message });
    }
});




export default router;