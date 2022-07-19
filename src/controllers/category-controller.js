const categorySchema = require('../models/category-model');
const { request, response } = require('express');


const getCategories = async (req=request, res=response) => {

    const [total, categories] = await Promise.all([
        categorySchema.countDocuments({ status: true }),
        categorySchema.find({ status: true }).populate('user', 'name')
    ]);

    res.status(200).json({
        statusCode: 200,
        message: 'Categories retrieved successfully',
        total: `${total} documents`,
        data: categories
    })
}


const getCategoryById = async (req=request, res=response) => {
    const { id } = req.params;

    const category = await categorySchema.findById(id).populate('user', 'name');

    if (!category) {
        res.status(404).json({
            statusCode: 404,
            message: 'Category not found'
        })
    }

    res.status(200).json({
        statusCode: 200,
        message: 'Category retrieved successfully',
        data: category
    })
}


const createCategory = async (req=request, res=response) => {
    const name = req.body.name.toUpperCase();

    const newCategory = new categorySchema({
        name,
        user: req.user._id
    });

    await newCategory.save();

    res.status(201).json({
        statusCode: 201,
        message: 'Category created successfully',
        data: newCategory
    })
}


const updateCategory = async (req=request, res=response) => {
    const { id } = req.params;
    const name = req.body.name.toUpperCase();

    const category = await categorySchema.findByIdAndUpdate(id, { name }, { new: true});

    res.status(200).json({
        statusCode: 200,
        message: 'Category updated successfully',
        data: category
    });
}


const deleteCategory = async (req=request, res=response) => {
    const { id } = req.params;

    const category = await categorySchema.findByIdAndUpdate(id, { status: false });

    res.status(200).json({
        statusCode: 200,
        message: 'Category deleted successfully',
        data: category
    });
}

module.exports = {
    getCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory
}
