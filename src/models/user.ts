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
    twofa: { 
        type: {
		    secret: String,
		    url: String,
		    qr: String,
	    },
        required: false,
        default: ''
    },
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
    },
    created_at: { type: Date, required: true, default: Date.now },
    updated_at: { type: Date, required: true, default: Date.now },
    deleted_at: { type: Date, required: false, default: null },
});

const User = createConnection().model('User', userSchema);

export default User;