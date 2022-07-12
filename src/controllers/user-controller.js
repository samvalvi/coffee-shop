const {request, response} = require('express')
const userSchema = require('../models/user-model');
const bcrypt = require('bcrypt');


const getUsers = async (req=request, res=response) => {
   const users = await userSchema.find();
    res.status(200).json({
        statusCode: 200,
        message: 'Get users',
        data: {
            users
        }
    });
}


const getUserById = (req, res=response) => {
    res.status(200).json({
        statusCode: 200,
        message: 'Get user by id'
    });
}


const createUser = async (req, res=response) => {
    const {name, email, password, role} = req.body;
    const user = new userSchema({name, email, password, role});

    //Salts
    const salt = await bcrypt.genSaltSync(13);

    //Hash
    const hash = await bcrypt.hashSync(user.password, salt);
    user.password = hash;

    await user.save();

    res.status(201).json({
        statusCode: 201,
        message: 'User created',
        data: {
            user
        }
    });
}


const updateUser = async(req=require, res=response) => {
    const {id} = req.params;
    const {_id, password, role, google, ...user} = req.body;

    const userUpdated = await userSchema.findByIdAndUpdate(id, user);

    res.status(200).json({
        statusCode: 200,
        message: 'User updated',
        data: {
            user
        }
    });
}


const deleteUser = (req, res=response) => {
    res.status(200).json({
        statusCode: 200,
        message: 'Delete user'
    });
}


module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
}