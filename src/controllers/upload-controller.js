const { request, response } = require('express');
const path = require('path');
const { v4: uuidv4 }= require('uuid');


const uploadController = (req=request, res=response)=> {

    const { file } = req.files;

    const extension = file.name.split('.');
    const tempName = uuidv4() + '.' + extension[extension.length - 1];

    const uploadPath = path.join(__dirname, '../public/uploads/' + tempName);

    file.mv(uploadPath, (err) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                message: 'Error uploading file',
                err
            });
        }

        res.json({
            ok: true,
            message: 'File uploaded',
            file: tempName,
        });
    });
}


module.exports = { uploadController };
