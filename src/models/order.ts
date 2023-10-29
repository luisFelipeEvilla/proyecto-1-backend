import { Schema } from 'mongoose';
import { createConnection } from '../db/index';

export const OrderSchema = new Schema({
    name: { type: String, required: true},
    description: { type: String, required: true},
    category: { type: String, required: true},
    price: { type: Number, required: true},
    restaurant_id: { type: Schema.Types.ObjectId, ref: 'Restaurant' }
});

const Order = createConnection().model('Product', OrderSchema);

export default Order;