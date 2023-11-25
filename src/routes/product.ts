import { Router } from "express";
import { createProduct, deleteProduct, getProductById, getProducts, updateProduct } from "../controllers/product";
import { ResourceAlreadyExistsError, ResourceNotFound } from "../errors";
import authorizationMiddleware from "../middlewares/authorization";

const router = Router();

router.get('/', async (req, res) => {
    // restaurant es un _id de un restaurante
    // categories es una lista de categorias, para este ejercicio son string pero en una app real deberian ser ids
    const categories = req.query.categories?.toString().split(',');
    const restaurant = req.query.restaurant;

    try {
        const products = await getProducts(categories, restaurant as string);
        
        res.json(products);
    } catch (error: any) {
        console.error(error);
        res.status(500).send('Something went wrong');
    }
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const product = await getProductById(id);

        return res.json(product);
    } catch (error: any) {
        console.error(error);
        if (error.name === ResourceNotFound.name) return res.status(404).send(error.message);
        return res.status(500).send('Something went wrong');
    }
});

router.post('/', authorizationMiddleware, async (req, res) => {
    const productData = req.body;

    try {
        const newProduct = await createProduct(productData);

        return res.json(newProduct);
    } catch (error: any) {
        console.error(error);
        if (error.name === ResourceAlreadyExistsError.name)  return res.status(409).send(error.message);
        return res.status(500).send('Something went wrong');
    }
});

router.put('/:id', authorizationMiddleware, async (req, res) => {
    const { id } = req.params;

    const productData = req.body;

    try {
        const updatedProduct = await updateProduct(id, productData);

        return res.json(updatedProduct);
    } catch (error: any) {
        if (error.name === ResourceNotFound.name) return res.status(404).send(error.message);
        return res.status(500).send('Something went wrong');
    }
});

router.delete('/:id', authorizationMiddleware, async (req, res) => {
    const { id } = req.params;

    try {
        await deleteProduct(id);

        return res.json({ message: 'Product deleted successfully' });
    } catch (error: any) {
        console.error(error);

        if (error.name === ResourceNotFound.name) return res.status(404).send(error.message);
        return res.status(500).send('Something went wrong');
    }
});

export default router;