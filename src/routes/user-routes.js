const router = require('express').Router();
const { getUsers, getUserById, createUser, updateUser, deleteUser } = require('../controllers/user-controller');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/fields-validate');
const { roleValidate } = require('../helpers/db-validator');
const { validateEmailExist, validateUserById } = require('../helpers/user-validator');
const { validateToken } = require('../middlewares/jwt-validate');
const { adminRoleValidate, hasRole } = require('../middlewares/role-validate');


router.get('/', [
    validateToken,
    adminRoleValidate,
],getUsers);

router.get('/:id', [
    validateToken,
    hasRole('ADMIN_ROLE'),
    check('id').not().isEmpty().isMongoId().withMessage('Id is required'),
    check('id').custom(validateUserById),
    validateFields
], getUserById);

router.post('/', [
    check('name').not().isEmpty().withMessage('Name is required'),
    check('email').isEmail().not().isEmpty().withMessage('Email is required'),
    check('email').custom(validateEmailExist),
    check('password').not().isEmpty().withMessage('Password is required'),
    check('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'),
    check('role').custom(roleValidate),
    validateFields
] ,createUser);

router.put('/:id', [
    validateToken,
    hasRole('ADMIN_ROLE', 'USER_ROLE'),
    check('id').not().isEmpty().isMongoId().withMessage('Id is required'),
    check('id').custom(validateUserById),
    check('email').isEmail(),
    check('email').custom(validateEmailExist),
    validateFields
],updateUser);

router.delete('/:id', [
    validateToken,
    hasRole('ADMIN_ROLE','USER_ROLE'),
    check('id').not().isEmpty().isMongoId().withMessage('Id is required'),
    check('id').custom(validateUserById),
    validateFields
], deleteUser);


module.exports = router;
