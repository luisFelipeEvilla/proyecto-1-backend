import { Schema } from 'mongoose';
import { createConnection } from '../db/index';

export const restaurantSchema = new Schema({
    name: { type: String, required: true},
    address: { type: String, required: true},
    category: { type: String, required: true},
    popularity: { type: Number, required: true, default: 0},
});

const Restaurant = createConnection().model('Restaurant', restaurantSchema);

export default Restaurant;