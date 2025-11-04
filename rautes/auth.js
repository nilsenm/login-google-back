const { Router , response} = require('express');
const { check } = require('express-validator');
const { googleLogin , newUser , login , renewToken} = require('../controlres/auth');
const { connectDB } = require('../databse/config');
const { validarCampos } = require('../Middlewares/validar-campos..js');
const router  = Router();	



router.post('/google', googleLogin);



router.post('/nuevo', 
     check('name', 'El nombre es obligatorio').not().isEmpty(),
     check('email', 'El email es obligatorio').isEmail(),
     check('password', 'El password es obligatorio').not().isEmpty(),
     validarCampos,
     newUser);


router.post('/login', 
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    validarCampos,
    login);


router.get('/renew', validarJWT, renewToken);


module.exports = router;