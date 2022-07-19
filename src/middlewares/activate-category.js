const categorySchema = require('../models/category-model');
const { request, response } = require('express');


const activateCategory = async (req=request, res=response, next) => {
    const { name } = req.body;
    const query = { name: name.toUpperCase(), status: false };

    const isDeactivated = await categorySchema.findOneAndUpdate(query, { status: true }, {new: true});

    if(isDeactivated) {
        return res.status(200).json({
            statusCode: 200,
            message: 'Category activated successfully',
            data: isDeactivated
        })
    }

    next();
}


module.exports ={ activateCategory };
