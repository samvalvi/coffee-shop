const router = require('express').Router();
const { uploadController } = require('../controllers/upload-controller');
const  { validateExtension } = require('../middlewares/validate-file');


router.post('/', [
    validateExtension,
], uploadController);


module.exports = router;
