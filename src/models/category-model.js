const { Schema, model } = require('mongoose');


const categorySchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        unique: true
    },
    status: {
        type: Boolean,
        default: true,
        required: [true, 'Status is required']
    },
    user:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User is required']
    }
});


categorySchema.methods.toJSON = function() {
    const {__v, status, _id, ...category} = this.toObject();
    category.uid = _id;
    return category;
}


module.exports = model('Category', categorySchema);
