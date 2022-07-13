const router = require('express').Router();
const { check } = require('express-validator');
const {validateFields} = require('../middlewares/fields-validate');
const {validateEmailExist} = require('../helpers/user-validator');
const { login, signup } = require('../controllers/auth-controller');

router.post('/login', [
    check('email').not().isEmpty().isEmail().withMessage('Email is not valid'),
    check('password').not().isEmpty().withMessage('Password is required'),
    validateFields
], login);

router.post('/', [], signup);


module.exports = router;