const roleSchema = require('../models/role-model');


const roleValidate = async (role="") => {
    const roleExist = await roleSchema.findOne({name: role});
    if(!roleExist) {
        throw new Error('Role does not exist');
    }
}


module.exports = {
    roleValidate
}
