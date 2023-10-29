import { ResourceAlreadyExistsError, ResourceNotFound } from "../errors";
import Product from "../models/product";
import Restaurant from "../models/restaurant";

type restaurantSchemaType = {
    name: string;
    address: string;
    category: string;
    products: typeof Product[]
}

export async function getRestaurants(categories?: string[], name?: string) {
    return await Restaurant.find({
        // en una app real, las categorias deben ser ids y no texto, pero para simplificar el ejemplo, lo dejamos asi
        // y por eso no ignoramos mayusculas y minusculas
        ...(categories && { category: { $in: categories } }),
        ...(name && { name: { $regex: name, $options: 'i' } }),
    }).sort({ popularity: -1 });
}

export async function getRestaurantById(id: string) {
    // return await Restaurant.findById(id).populate([ { path: 'products', select: '*'}]);
    const restaurant = await  Restaurant.findById(id).populate('products').exec();

    if (!restaurant) throw new ResourceNotFound('Restaurant not found');

    const products = await Product.find({ restaurant_id: id });

    return { restaurant, products } ;
}

export async function getRestaurantByName(name: string) {
    return await Restaurant.find({ name: { $regex: name, $options: 'i' } });
}

export async function createRestaurant(restaurantData: restaurantSchemaType) {
    // check if exits any restaurant with the same name
    const restaurant = await getRestaurantByName(restaurantData.name);

    if (restaurant.length > 0) throw new ResourceAlreadyExistsError('Restaurant already exists');

    const newRestaurant = new Restaurant(restaurantData);
    return await newRestaurant.save();
}

    export async function updateRestaurant(id: string, restaurantData: restaurantSchemaType) {
    const restaurant = await Restaurant.findById(id);

    if (!restaurant) throw new ResourceNotFound('Restaurant not found');

    Object.assign(restaurant, restaurantData);

    return await restaurant.save();
}

export async  function deleteRestaurant(id: string) {
    return await Restaurant.findByIdAndDelete(id);
}
