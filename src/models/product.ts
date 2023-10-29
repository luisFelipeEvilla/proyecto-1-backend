import { Schema } from 'mongoose';
import { createConnection } from '../db/index';

export const productSchema = new Schema({
    name: { type: String, required: true},
    description: { type: String, required: true},
    category: { type: String, required: true},
    price: { type: Number, required: true},
});

const Product = createConnection().model('Product', productSchema);

export default Product;