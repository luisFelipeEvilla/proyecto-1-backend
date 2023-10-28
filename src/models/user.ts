import { Schema } from 'mongoose';
import { createConnection } from '../db/index';

export const userSchema = new Schema({
    first_name: { type: String, required: true},
    last_name: { type: String, required: true},
    password: { type: String, required: true},
    email: { type: String, required: true, unique: true, index: true},
    phone: { type: String, required: true},
    address: { type: String, required: true},
    city: { type: String, required: true},
    postal_code: { type: String, required: true},
    role: { 
        type: String, 
        required: true,
        default: 'client',
        validate: {
            validator: function(v: string) {
                return v === 'client' || v === 'admin';
            },
            message: 'Role must be either "client" or "admin".'
        }
    }
});

const User = createConnection().model('User', userSchema);

export default User;