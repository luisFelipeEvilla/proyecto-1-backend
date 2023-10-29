import { Schema } from 'mongoose';
import { createConnection } from '../db/index';

export const productSchema = new Schema({
    name: { type: String, required: true},
    description: { type: String, required: true},
    category: { type: String, required: true},
    price: { type: Number, required: true},
    restaurant_id: { type: Schema.Types.ObjectId, ref: 'Restaurant' },
    created_at: { type: Date, required: true, default: Date.now },
    updated_at: { type: Date, required: true, default: Date.now },
    deleted_at: { type: Date, required: false, default: null },
});

const Product = createConnection().model('Product', productSchema);

export default Product;