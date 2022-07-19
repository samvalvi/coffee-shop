const router = require('express').Router();
const { check } = require('express-validator');
const { getCategories, getCategoryById, createCategory, updateCategory, deleteCategory } = require('../controllers/category-controller');
const { hasRole } = require('../middlewares/role-validate');
const { validateFields } = require('../middlewares/fields-validate');
const { validateToken } = require('../middlewares/jwt-validate');
const { validateById, validateByName } = require('../helpers/category-validator');
const { activateCategory } = require('../middlewares/activate-category');


router.get('/', [
    validateToken,
    hasRole('ADMIN_ROLE'),
], getCategories);

router.get('/:id', [
    validateToken,
    hasRole('ADMIN_ROLE'),
    check('id').not().isEmpty().withMessage('Id is required'),
    check('id').isMongoId().withMessage('Id is invalid'),
    check('id').custom(validateById),
    validateFields
], getCategoryById);

router.post('/', [
    validateToken,
    hasRole('ADMIN_ROLE'),
    check('name').not().isEmpty().withMessage('Name is required'),
    check('name').isLength({ max: 30 }).withMessage('Name must be less than 30 characters'),
    activateCategory,
    check('name').custom(validateByName),
    validateFields
], createCategory);

router.put('/:id', [
    validateToken,
    hasRole('ADMIN_ROLE'),
    check('id').not().isEmpty().withMessage('Id is required'),
    check('id').isMongoId().withMessage('Id is invalid'),
    check('id').custom(validateById),
    check('name').not().isEmpty().withMessage('Name is required'),
    check('name').isLength({ max: 30 }).withMessage('Name must be less than 30 characters'),
    check('name').custom(validateByName),
    validateFields
], updateCategory)

router.delete('/:id', [
    validateToken,
    hasRole('ADMIN_ROLE'),
    check('id').not().isEmpty().withMessage('Id is required'),
    check('id').isMongoId().withMessage('Id is invalid'),
    check('id').custom(validateById),
    validateFields
], deleteCategory)


module.exports = router;
