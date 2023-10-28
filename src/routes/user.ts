import { Request, Response, Router } from "express";
import { deleteUser, getUserByEmail, getUserById, updateUser } from "../controllers/user";

const router = Router();

router.put(('/:id'), async (req: Request, res: Response) => {
    const { id } = req.params;

    const userData = req.body;

    try {
        const user = await getUserById(id);

        if (!user) return res.status(404).send('User no exists');

        const updatedUser = await updateUser(id, userData);

        return res.json(updatedUser);
    } catch (error) {
        console.error(error);
        return res.status(500).send('Something went wrong');
    }
}) 

router.delete(('/:id'), async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        await deleteUser(id);

        return res.json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).send('Something went wrong');
    }
});

export default router;
