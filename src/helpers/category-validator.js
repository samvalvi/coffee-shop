const categorySchema = require('../models/category-model');


const validateById = async (id) => {
    const category = await categorySchema.findById(id);

    if (!category) {
        throw new Error(`Category ${id} not found`);
    }

    if (!category.status) {
        throw new Error(`Category ${id} not found`);
    }
}


const validateByName = async (name) => {
    const category = await categorySchema.findOne({ name: name.toUpperCase(), status: true });

    if (category) {
        throw new Error(`Category ${name} already exists`);
    }
}


module.exports = {
    validateById,
    validateByName
}
