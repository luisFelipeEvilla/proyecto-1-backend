import { Router } from "express";
import { createUser, getUserByEmail } from "../controllers/user";
import { generateJwtToken } from "../utils/generateJwtToken";
import { validatePassword } from "../utils/auth";

const router = Router();

router.post("/signup", async (req, res) => {
    const user_data = req.body;

    try {
        // todo: implement password hashing
        const user = await createUser(user_data);

       const token = generateJwtToken(user);

        res.send({ token, user});
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

        const isMatch = await validatePassword(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        // todo implement token generation
       const token = generateJwtToken(user);

        res.json({ token, user });
    } catch (error: any) {
        console.error("Error signing in user", error);
        res.status(500).json({ error: error.message });
    }
});




export default router;