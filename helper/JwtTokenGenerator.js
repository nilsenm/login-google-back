const jwt = require('jsonwebtoken');
require('dotenv').config();

const generateToken = async (id) => {

    return new Promise((resolve, reject) => {
        const payload = {
            id: id
        }
        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '24h' }, (err, token) => {
            if(err) {
                reject(err);
            }
            resolve(token);
        });
    });
    
}


module.exports = {
    generateToken
};