const userSchema = require('../models/user-model');


const validateEmailExist = async(email='') => {
    const user = await userSchema.findOne({email});
    if(user) {
        throw new Error(`User ${email} already exist`);
    }
}


const validateUserById = async(id) => {
    const user = await userSchema.findById(id);   
    if(!user) {
        throw new Error(`User ${id} not found`);
    }

    if(!user.status) {
        throw new Error(`User ${id} not found`);
    }
}


module.exports = {
    validateEmailExist,
    validateUserById
}
