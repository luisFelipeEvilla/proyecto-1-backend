import { Router } from "express";
import { createOrder, deleteOrder, getOrderById, getOrders, updateOrder } from "../controllers/order";

const router = Router();

router.get('/', async (req, res) => {

    const query = {
        created_by: req.query.created_by as string || undefined,
        send_by: req.query.send_by as string || undefined,
        restaurant_id: req.query.restaurant_id as string || undefined,
        start_date: req.query.start_date ? new Date(req.query.start_date as string) : undefined,
        end_date: req.query.end_date ? new Date(req.query.end_date as string) : undefined,
        noAcepted: req.query.noAcepted ? req.query.noAcepted == 'true' : undefined,
    }
    
    try {
        const orders = await getOrders(query);

        return res.json(orders);
    } catch (error) {
        console.error(error);
        return res.status(500).send('Something went wrong');
    }
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const order = await getOrderById(id);

        if (!order) return res.status(404).send('Order no exists');

        return res.json(order);
    } catch (error) {
        console.error(error);
        return res.status(500).send('Something went wrong');
    }
});

router.post('/', async (req, res) => {
    const orderData = req.body;

    try {
        const newOrder = await createOrder(orderData);
        return res.json(newOrder);
    } catch (error: any) {
        console.error(error);
        if (error.name === 'ResourceAlreadyExistsError') return res.status(409).send(error.message);
        return res.status(500).send('Something went wrong');
    }
});

router.put(('/:id'), async (req, res) => {
    const { id } = req.params;

    const orderData = req.body;

    try {
        const updatedRestaurant = await updateOrder(id, orderData);

        return res.json(updatedRestaurant);
    } catch (error: any) {
        console.error(error);
        if (error.name === 'ResourceNotFound') return res.status(404).send(error.message);
        return res.status(500).send('Something went wrong');
    }
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
       const order = await deleteOrder(id);

        return res.json(order);
    } catch (error) {
        console.error(error);
        return res.status(500).send('Something went wrong');
    }
});

export default router;