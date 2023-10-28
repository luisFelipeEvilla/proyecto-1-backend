import Restaurant from "../models/restaurant";

type restaurantSchemaType = {
    name: string;
    address: string;
    category: string;
}

export async function getRestaurants(categories?: string[], name?: string) {
    return await Restaurant.find({
        ...(categories && { category: { $in: categories } }),
        ...(name && { name: { $regex: name, $options: 'i' } }),
    });
}

export async function getRestaurantById(id: string) {
    return await Restaurant.findById(id);
}

export async function createRestaurant(restaurantData: restaurantSchemaType) {
    // check if exits any restaurant with the same name
    const restaurant = await Restaurant.find({ name: restaurantData.name });

    if (restaurant) throw new Error('Restaurant already exists');

    const newRestaurant = new Restaurant(restaurantData);
    return await newRestaurant.save();
}

    export async function updateRestaurant(id: string, restaurantData: restaurantSchemaType) {
    const restaurant = await Restaurant.findById(id);

    if (!restaurant) throw new Error('Restaurant not found');

    Object.assign(restaurant, restaurantData);

    return await restaurant.save();
}

export async  function deleteRestaurant(id: string) {
    return await Restaurant.findByIdAndDelete(id);
}