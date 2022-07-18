const router = require('express').Router();
const { check } = require('express-validator');
const {validateFields} = require('../middlewares/fields-validate');
const {validateEmailExist} = require('../helpers/user-validator');
const { login } = require('../controllers/auth-controller');

router.post('/', [
    check('email').not().isEmpty().isEmail().withMessage('Email is not valid'),
    check('enmail').custom(validateEmailExist),
    check('password').not().isEmpty().withMessage('Password is required'),
    validateFields
], login);


module.exports = router;