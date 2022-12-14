const jwt = require('jsonwebtoken');


const createToken = (id) => {
    
    return new Promise((resolve, reject) => {

        const payload = { id };

        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '10m' }, (err, token) => {
            if(err){
                reject('Token creation failed');
            }
            else{
                resolve(token);
            }
        });
    });
}


const createRefreshToken = (id) => {

    return new Promise((resolve, reject) => {
        
        const payload = { id };

        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' }, (err, token) => {
            if(err){
                reject('Refresh token creation failed');
            }
            else{
                resolve(token);
            }
        });
    });
}


const validateRefreshToken = (refreshToken) => {
    
        return new Promise((resolve, reject) => { 
            jwt.verify(refreshToken, process.env.JWT_SECRET, (err, payload) => {
                if(payload.expiresIn < Date.now()){
                    reject(true);
                }
                else{
                    resolve(false);
                }
            });
        });
}


module.exports = { 
    createToken, 
    createRefreshToken,
    validateRefreshToken

};
