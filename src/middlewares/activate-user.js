const userSchema = require('../models/user-model');
const { request, response } = require('express');
const bcrypt = require('bcrypt');


const activateUser = async (req=request, res=response, next) => {
    const email = req.body.email;
    const pass = req.body.password;
    
    const query = { email: email, status: false };

    const user = await userSchema.findOne(query);
    

    const salt = await bcrypt.genSaltSync(13);
    const hash = await bcrypt.hashSync(pass, salt);
  
    user.password = hash;
    user.status = true;

    await user.save();


    if(user) {
        return res.status(200).json({
            statusCode: 200,
            message: 'User created successfully',
            data: user
        });
    }

    next();
}


module.exports = { activateUser };
