import Product from "../models/product";

type productSchemaType = {
    name: string;
    description: string;
    category: string;
    price: number;
}

export async function getProducts(categories?: string[], name?: string) {
    return await Product.find({
        // en una app real, las categorias deben ser ids y no texto, pero para simplificar el ejemplo, lo dejamos asi
        // y por eso no ignoramos mayusculas y minusculas
        ...(categories && { category: { $in: categories } }),
        ...(name && { name: { $regex: name, $options: 'i' } }),
    });
}

export async function getProductById(id: string) {
    return await Product.findById(id);
}

export async function createProduct(productData: productSchemaType) {
    // check if exits any product with the same name
    const product = await Product.find({ name: productData.name });

    if (product) throw new Error('Product already exists');

    const newProduct = new Product(productData);
    return await newProduct.save();
}

export async function updateProduct(id: string, productData: productSchemaType) {
    const product = await Product.findById(id);

    if (!product) throw new Error('Product not found');

    Object.assign(product, productData);

    return await product.save();
}

export async  function deleteProduct(id: string) {
    return await Product.findByIdAndDelete(id);
}