import { Schema } from 'mongoose';
import { createConnection } from '../db/index';

export const OrderSchema = new Schema({
    products: { type: Array, required: true },
    created_by: { type: Schema.Types.ObjectId, ref: 'User' },
    send_by: { type: Schema.Types.ObjectId, ref: 'User', default: null },
    status: { 
        type: String, 
        required: true,
        default: 'Creado',
        validate: {
            validator: function(v: string) {
                return v === 'Creado' || v === 'En Curso' || v== 'En Camino' || v === 'Entregado' ;
            },
            message: 'Status must be either "Creado", "En Curso", "En camino" or "Entregado"'
        }
    },
    restaurant: { type: Schema.Types.ObjectId, ref: 'Restaurant' },
    created_at: { type: Date, required: true, default: Date.now },
    updated_at: { type: Date, required: true, default: Date.now },
    deleted_at: { type: Date, required: false, default: null },
});

const Order = createConnection().model('Order', OrderSchema);

export default Order;