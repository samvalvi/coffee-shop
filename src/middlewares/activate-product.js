const productSchema = require('../models/product-model');
const { request, response } = require('express');


const activateProduct = async (req=request, res=response, next) => {
    const name = req.body.name;
    const query = { name: name, status: false };

    const product = await productSchema.findOneAndUpdate(query, { status: true }, { new: true });

    if(product) {
        return res.status(200).json({
            statusCode: 200,
            message: 'Product activated successfully',
            data: product
        });
    }

    next();
}

module.exports = { activateProduct };
