const router = require('express').Router();
const { check } = require('express-validator');
const { getProducts, getProductById, createProduct, updateProduct, deleteProduct } = require('../controllers/product-controller');
const { validateProductById, validateProductByName } = require('../helpers/product-validator');
const { activateProduct } = require('../middlewares/activate-product');
const { validateToken } = require('../middlewares/jwt-validate');
const { hasRole } = require('../middlewares/role-validate');
const { validateFields } = require('../middlewares/fields-validate');


router.get('/', [
    validateToken,
    hasRole('ADMIN_ROLE', 'USER_ROLE')
], getProducts);


router.get('/:id', [
    validateToken,
    hasRole('ADMIN_ROLE', 'USER_ROLE'),
    check('id').not().isEmpty().withMessage('Id is required'),
    check('id').isMongoId().withMessage('Id must be a valid MongoId'),
    check('id').custom(validateProductById),
    validateFields
], getProductById);


router.post('/', [
    validateToken,
    hasRole('ADMIN_ROLE'),
    check('name').not().isEmpty().withMessage('Name is required'),
    check('name').isLength({ max: 30 }).withMessage('Name must be less than 30 characters'),
    activateProduct,
    check('name').custom(validateProductByName),
    check('description').not().isEmpty().withMessage('Description is required'),
    check('price').not().isEmpty().withMessage('Price is required'),
    check('category').not().isEmpty().withMessage('Category is required'),
    check('category').isMongoId().withMessage('Category must be a valid MongoId'),
    validateFields
], createProduct);


router.put('/:id', [
    validateToken,
    hasRole('ADMIN_ROLE'),
    check('id').not().isEmpty().withMessage('Id is required'),
    check('id').isMongoId().withMessage('Id must be a valid MongoId'),
    check('id').custom(validateProductById),
    validateFields
], updateProduct);


router.delete('/:id', [
    validateToken,
    hasRole('ADMIN_ROLE'),
    check('id').not().isEmpty().withMessage('Id is required'),
    check('id').isMongoId().withMessage('Id must be a valid MongoId'),
    check('id').custom(validateProductById),
    validateFields
], deleteProduct);


module.exports = router;
