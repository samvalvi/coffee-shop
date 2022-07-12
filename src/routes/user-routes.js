const router = require('express').Router();
const { getUsers, getUserById, createUser, updateUser, deleteUser } = require('../controllers/user-controller');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validate');
const { roleValidate } = require('../helpers/db-validator');
const { validateEmailExist, validateUserById } = require('../helpers/user-validator');



router.get('/', getUsers);

router.get('/:id', getUserById);

router.post('/', [
    check('name').not().isEmpty().withMessage('Name is required'),
    check('email').isEmail().not().isEmpty().withMessage('Email is required'),
    check('email').custom(validateEmailExist),
    check('password').not().isEmpty().withMessage('Password is required'),
    check('role').custom(roleValidate),
    validateFields
] ,createUser);

router.put('/:id', [
    check('id').not().isEmpty().isMongoId().withMessage('Id is required'),
    check('id').custom(validateUserById),
    check('email').isEmail(),
    check('email').custom(validateEmailExist),
    validateFields
],updateUser);

router.delete('/:id', deleteUser);


module.exports = router;
