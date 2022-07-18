const jwt = require('jsonwebtoken');
const userSchema = require('../models/user-model');
const { response, request } = require('express');


const validateToken = async (req=request, res=response, next) => {
    const token = req.header('authorization');
    if (!token) {
        return res.status(401).json({
            msg: 'No token provided.'
        });
    }

    try {
        const { id } = jwt.verify(token, process.env.JWT_SECRET);
       
        //Validade user
        const user = await userSchema.findById(id);

        req.user = user;
        
        next();
    } catch (err) {
        return res.status(401).json({
            msg: 'Invalid token.'
        });
    }
}


module.exports = { validateToken }
