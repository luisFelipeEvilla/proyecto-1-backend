export type UserType = Document & {
    first_name: string;
    last_name: string;
    password: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    postal_code: string;
    role: 'client' | 'admin';
};