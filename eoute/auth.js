const { Router } = require('express');
const { googleLogin } = require('../controlres/auth');

const router  = Router();	

router.post('/google', googleLogin);
