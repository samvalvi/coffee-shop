const { response, request } = require('express');


const adminRoleValidate = (req=request, res=response, next) => {
    if(!req.user){
        return res.status(401).json({
            msg: 'Forbidden, you cannot access this resource until you verify the token.'
        });
    }
    
    const { role } = req.user;

    if(role !== 'ADMIN_ROLE'){
        return res.status(401).json({
            msg: 'Forbidden, only admins can access this resource.'
        });
    }

    next();
}

module.exports = { adminRoleValidate };
