const Response = require('express')


const getUsers = (req, res=Response) => {
    res.status(200).json({
        statusCode: 200,
        message: 'Get all users'
    });
}


const getUserById = (req, res=Response) => {
    res.status(200).json({
        statusCode: 200,
        message: 'Get user by id'
    });
}


const createUser = (req, res=Response) => {
    res.status(200).json({
        statusCode: 200,
        message: 'Create user'
    });
}


const updateUser = (req, res=Response) => {
    res.status(200).json({
        statusCode: 200,
        message: 'Update user'
    });
}


const deleteUser = (req, res=Response) => {
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