const productSchema = require('../models/product-model');
const { request, response } = require('express');


const getProducts = async (req=request, resp=response) => {
    const [total, products] = await Promise.all([
        productSchema.countDocuments({ status: true }),
        productSchema.find({ status: true }).populate('user', 'name').populate('category', 'name')
    ]);
    
    resp.status(200).json({
        statusCode: 200,
        total: `${total} documents`,
        message: 'Products retrieved successfully',
        data: products
    });
}


const getProductById = async (req=request, resp=response) => {
    const { id } = req.params;
    const product = await productSchema.findById(id, {status: true}).populate('user', 'name').populate('category', 'name');
    
    return resp.status(200).json({
        statusCode: 200,
        message: 'Product retrieved successfully',
        data: product
    });
}


const createProduct = async (req=request, resp=response) => {
    const { name, description, price, category, available } = req.body;

    const product = new productSchema({
        name,
        description,
        price,
        category,
        available,
        user: req.user._id
    });
    await product.save();
    
    return resp.status(201).json({
        statusCode: 201,
        message: 'Product created successfully',
        data: product
    });

}


const updateProduct = async (req=request, resp=response) => {
    const { id } = req.params;
    const { name, description, price, category, available } = req.body;

    const product = await productSchema.findByIdAndUpdate(id, {
        name,
        description,
        price,
        category,
        available,
        user: req.user._id
    }, { new: true });
    
    return resp.status(200).json({
        statusCode: 200,
        message: 'Product updated successfully',
        data: product
    });
}


const deleteProduct = async (req=request, resp=response) => {
    const { id } = req.params;

    const product = await productSchema.findByIdAndUpdate(id, {
        status: false
    }, { new: true });
    
    return resp.status(200).json({
        statusCode: 200,
        message: 'Product deleted successfully',
        data: product
    });
}


module.exports = {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
}
