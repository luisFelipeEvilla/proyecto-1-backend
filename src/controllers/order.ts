import Order from "../models/order";
import Product from "../models/product";
import Restaurant from "../models/restaurant";
import { getRestaurantById } from "./restaurant";

type orderSchemaType = {
    products: any[];
    created_by: string;
    send_by: string;
    status: string;
    restaurant: string;
    date: Date;
}

export type orderQueryType = {
    created_by?: string |  undefined;
    send_by?: string | undefined;
    restaurant_id?: string | undefined;
    start_date?: Date | undefined;
    end_date?: Date | undefined;
    noAcepted?: boolean | undefined;
}


export async function getOrders(query: orderQueryType) {
    console.log(query);
    return await Order.find({
        ...(query.created_by && ( {created_by: query.created_by})),
        ...(query.send_by && ( {send_by: query.send_by} )),
        ...(query.restaurant_id && ( {restaurant: query.restaurant_id})),
        ...(query.start_date && ( {date: { $gte: query.start_date }})),
        ...(query.end_date && ( {date: { $lte: query.end_date }})),
        ...(query.noAcepted && ( {status: { $ne: 'Entregado' }}))
    });
}

export async function getOrderById(_id: string) {
    return await Order.findOne({ _id, deleted_at: null});
}

export async function createOrder(orderData: orderSchemaType) {
    
    // check if restaurant exists
    const restaurant = (await getRestaurantById(orderData.restaurant)).restaurant;

    if (!restaurant) throw new Error('Restaurant not found');

    // get prices of products at the moment of the order
    const products = await Product.find({ _id: { $in: orderData.products }, deleted_at: null });

    if (products.length !== orderData.products.length) throw new Error('Some products not found');

    const newOrder = new Order({
        restaurant: restaurant._id,
        products, // array of products with price at the moment of the order
        created_by: orderData.created_by,
    })

    return newOrder.save();
}

export async function updateOrder(id: string, orderData: any) {
    const order = await Order.findById(id);

    if (!order) throw new Error('Order not found');

    Object.assign(order, orderData);

    return await order.save();
}

export async function deleteOrder(id: string) {
    return await Order.findByIdAndDelete(id);
}

export async function getOrdersByUser(userId: string) {
    return await Order.find({ user: userId });
}

export async function getOrdersByRestaurant(restaurantId: string) {
    return await Order.find({ restaurant: restaurantId });
}

export async function getOrdersByStatus(status: string) {
    return await Order.find({ status });
}

export async function getOrdersByDate(date: Date) {
    return await Order.find({ date });
}

