const { response } = require('express');


const { validateGoogleToken } = require('../helper/google-verify-token');
const {validationResult} = require('express-validator');
const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');
const { generateToken } = require('../helper/JwtTokenGenerator');

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

const newUser = async (req, res = response) => {

    const existeEmail = await Usuario.findOne({ email: req.body.email });
    if(existeEmail) {
        return res.status(400).json({
            ok: false,
            message: 'El email ya está registrado'
        });
    }

    try {
        const usuario = new Usuario( req.body);

        const salt = await bcrypt.genSaltSync();
        usuario.password = await bcrypt.hash(usuario.password, salt);
        await usuario.save();
        const token = await generateToken(usuario.id);
        res.json({
            ok: true,
            message: 'User created successfully', 
            user: usuario,
            token: token
            
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            message: 'Error creating user',
            error: error
        });
    }
  
}


const login = async (req, res = response) => {
    const { email, password } = req.body;
    try{
        const usuario = await Usuario.findOne({ email: email });
        
        if(!usuario) {
            return res.status(400).json({
                ok: false,
                message: 'El email no existe'
            });
        }

        const passwordMatch = await bcrypt.compare(password, usuario.password);
        if(!passwordMatch) {
            return res.status(400).json({
                ok: false,
                message: 'La contraseña no es correcta'
            });
        }
        const token = await generateToken(usuario.id);
        res.json({
            ok: true,
            message: 'Login successful',
            user: usuario,
            token: token
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            message: 'hable con el administrador de la aplicación',
            error: error
        });
    }
}

module.exports = {
    googleLogin, 
    newUser,
    login
}