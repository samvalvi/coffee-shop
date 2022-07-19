const { response, request } = require('express');
const userSchema = require('../models/user-model');
const bcrypt = require('bcrypt');
const { createToken, createRefreshToken, validateRefreshToken } = require('../helpers/jwt-creator');


const login = async (req=request, res=response) => {
    const { email, password } = req.body;

    try{
        //Validate user
        const user = await userSchema.findOne({ email });
        if(!user){
            return res.status(400).json({
                msg: 'Check your email and password'
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
                msg: 'Check your email and password'
            });
        }

        const [token, newRefreshToken] = await Promise.all([
            createToken(user.id),
            createRefreshToken(user.id)
        ]);

        if(!user.refreshToken){
            user.refreshToken = newRefreshToken;
            await user.save();
        }

        const isValid = await validateRefreshToken(user.refreshToken);
        if(isValid){
            user.refreshToken = newRefreshToken;
            await user.save();
        }

        //Send response
        res.status(200).json({
            msg: 'Login successful',
            data: {
                "accessToken": token,
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
    login
}
