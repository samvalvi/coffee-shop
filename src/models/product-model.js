const {  Schema, model } = require('mongoose');


const productSchema = new Schema({

    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    available: {
        type: Boolean,
        default: true,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    status: {
        type: Boolean,
        default: true
    }

});


productSchema.methods.toJSON = function() {
    const { __v, _id, ...object } = this.toObject();
    object.uid = _id;
    return object;
}


module.exports = model('Product', productSchema);

