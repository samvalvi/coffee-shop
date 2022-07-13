const { response, request } = require('express');
const userSchema = require('../models/user-model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { createToken } = require('../helpers/jwt-creator');


const login = async (req=request, res=response) => {
    const { email, password } = req.body;

    try{
        //Validate user
        const user = await userSchema.findOne({ email });
        if(!user){
            return res.status(400).json({
                msg: 'User or password is incorrect'
            });
        }

        //User status
        if(!user.status){
            return res.status(400).json({
                msg: 'User not found'
            });
        }

        //Compare password
        const isMatch = await bcrypt.compareSync(password, user.password);
        if(!isMatch){
            return res.status(400).json({
                msg: 'User or password is incorrect'
            });
        }

        //Create token
        const token = await createToken(user.id);

        //Send response
        res.status(200).json({
            msg: 'Login successful',
            data: {
                "token": token,
                "user": user
            }
        });

    }catch(err){
        console.log(err);
    }
}


const signup = async (req=request, res=response) => {
}


module.exports = {
    login,
    signup
}
