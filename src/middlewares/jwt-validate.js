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
        const { uid } = jwt.verify(token, process.env.JWT_SECRET);
       
        //Validade user
        const user = await userSchema.findById(uid);
       
        if (!user) {
            return res.status(401).json({
                msg: 'Token is not valid.'
            }); 
        }

        //Validate user status
        if (!user.status) {
            return res.status(401).json({
                msg: 'Token is not valid.'
            });
        }

        req.user = user;
        next();
    } catch (err) {
        return res.status(401).json({
            msg: 'Invalid token.'
        });
    }
}


module.exports = { validateToken }
