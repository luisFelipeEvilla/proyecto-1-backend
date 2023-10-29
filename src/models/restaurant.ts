import { Schema } from 'mongoose';
import { createConnection } from '../db/index';

export const restaurantSchema = new Schema({
    name: { type: String, required: true},
    address: { type: String, required: true},
    category: { type: String, required: true},
    popularity: { type: Number, required: true, default: 0},
    products: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
    created_at: { type: Date, required: true, default: Date.now },
    updated_at: { type: Date, required: true, default: Date.now },
    deleted_at: { type: Date, required: false, default: null },
});

const Restaurant = createConnection().model('Restaurant', restaurantSchema);

export default Restaurant;