const { response } = require('express');
const { validateGoogleToken } = require('../helper/google-verify-token');

const googleLogin = async (req, res = response) => {
    const  token  = req.body.token;
     
    if(!token) {
        return res.status(400).json({
            ok: false,
            message: 'Token is required'
        });
    }

   const payload = await validateGoogleToken(token);
   if(!payload) {
    return res.status(400).json({
        ok: false,
        message: 'Token is invalid'
    });
   }
   res.json({
        ok: true,
        message: 'success',
        data: {
            name: payload.name,
            email: payload.email,
            picture: payload.picture
        }
    });
}

module.exports = {
    googleLogin
}