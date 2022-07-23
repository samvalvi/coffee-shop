const { request, response, next } = require('express');


const validateExtension = (req=request, res=response, next) => {

    if (!req.files || Object.keys(req.files).length === 0 || !req.files.file) {
        return res.status(400).json({
            ok: false,
            message: 'No file uploaded'
        });
    }

    const {  file } = req.files;

    const extension = file.name.split('.');
    const validExtensions = ['jpg', 'jpeg', 'png', 'gif'];

    if (!validExtensions.includes(extension[extension.length - 1])) {
        return res.status(400).json({
            ok: false,
            message: 'Invalid file extension'
        });
    }

    next();
}


module.exports = { validateExtension };