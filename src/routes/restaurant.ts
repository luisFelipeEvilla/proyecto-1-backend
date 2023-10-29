import { Router } from "express";
import { createRestaurant, deleteRestaurant, getRestaurantById, getRestaurants, updateRestaurant } from "../controllers/restaurant";

const router = Router();

router.get('/', async (req, res) => {
    const categories = req.query.categories?.toString().split(',');
    const name = req.query.name;

    try {
        const restaurants = await getRestaurants(categories, name as string);

        return res.json(restaurants);
    } catch (error) {
        console.error(error);
        return res.status(500).send('Something went wrong');
    }
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const restaurant = await getRestaurantById(id);

        if (!restaurant) return res.status(404).send('Restaurant no exists');

        return res.json(restaurant);
    } catch (error) {
        console.error(error);
        return res.status(500).send('Something went wrong');
    }
});

router.post('/', async (req, res) => {
    const restaurantData = req.body;

    try {
        const newRestaurant = await createRestaurant(restaurantData);

        return res.json(newRestaurant);
    } catch (error: any) {
        console.error(error);
        if (error.name === 'ResourceAlreadyExistsError')  return res.status(409).send(error.message);
        return res.status(500).send('Something went wrong');
    }
});

router.put(('/:id'), async (req, res) => {
    const { id } = req.params;

    const restaurantData = req.body;

    try {
        const updatedRestaurant = await updateRestaurant(id, restaurantData);

        return res.json(updatedRestaurant);
    } catch (error: any) {
        console.error(error);
        if (error.name === 'ResourceNotFound') return res.status(404).send(error.message);
        return res.status(500).send('Something went wrong');
    }
})

router.delete(('/:id'), async (req, res) => {
    const { id } = req.params;

    try {
        await deleteRestaurant(id);

        return res.json({ message: 'Restaurant deleted successfully' });
    } catch (error: any) {
        console.error(error);
        if (error.name === 'ResourceNotFound') return res.status(404).send(error.message);
        return res.status(500).send('Something went wrong');
    }
});

export default router;