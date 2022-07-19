const {request, response} = require('express')
const userSchema = require('../models/user-model');
const bcrypt = require('bcrypt');


const getUsers = async (req=request, res=response) => {
    const query = {status: true}

    const [total, users] = await Promise.all([
        userSchema.countDocuments(query),
        userSchema.find(query)
    ])

    res.status(200).json({
        statusCode: 200,
        message: 'Get users',
        data: {
            "records": total,
            users
        }
    });
}


const getUserById = async (req, res=response) => {
    const {id} = req.params;
    const user = await userSchema.findById(id);

    res.status(200).json({
        statusCode: 200,
        message: 'User founded',
        data: {
            user
        }   
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


const updateUser = async(req=request, res=response) => {
    const {id} = req.params;
    const {_id, password, role, google, ...user} = req.body;

    const userUpdated = await userSchema.findByIdAndUpdate(id, user);

    res.status(200).json({
        statusCode: 200,
        message: 'User updated',
        data: {
            userUpdated
        }
    });
}


const deleteUser = async (req, res=response) => {
    const {id} = req.params;
    const userDeactivated = await userSchema.findByIdAndUpdate(id, {status: false});

    res.status(200).json({
        statusCode: 200,
        message: 'User deactivated',
        data: {
            userDeactivated
        }
    });
}


module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
}