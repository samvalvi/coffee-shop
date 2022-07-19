const productSchema = require('../models/product-model');


const validateProductById = async (id) => {
    const product = await productSchema.findById(id);

    if (!product) {
        throw new Error('Product not found');
    }

    if(!product.status){
        throw new Error('Product not found');
    }
}


const validateProductByName = async (name) => {
    const product = await productSchema.findOne({ name: name }, { status: true });

    if (product) {
        throw new Error('Product already exist');
    }
}


module.exports = {
    validateProductById,
    validateProductByName
}
