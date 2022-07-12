const {Schema, model} = require('mongoose');


const userSchema = new Schema({

        name: {
            type: String,
            required: [true, "Name is required"]
        },
        email: {
            type: String,
            unique: true,
            required: [true, "Email is required"],
        },
        password: {
            type: String,
            required: [true, "Password is required"],
        },
        img: {
            type: String,
        },
        role: {
            type: String,
            required: [true, "Role is required"],
            enum: ['USER_ROLE', 'ADMIN_ROLE'],
        },
        status: {
            type: Boolean,
            default: true,
        },
        google: {
            type: Boolean,
            default: false,
        },
});


userSchema.methods.toJSON = function() {
    const {__v, password, ...user} = this.toObject();
    return user;
}

module.exports = model('User', userSchema);