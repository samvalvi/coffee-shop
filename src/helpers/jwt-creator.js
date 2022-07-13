const jwt = require('jsonwebtoken');


const createToken = (uid) => {
    
    return new Promise((resolve, reject) => {

        const payload = { uid };
        //console.log(payload);
        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '15m' }, (err, token) => {
            if(err){
                reject('Token creation failed');
            }
            else{
                resolve(token);
            }
        });
    });
}

module.exports = { createToken };
