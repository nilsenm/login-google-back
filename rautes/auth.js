const { Router } = require('express');
const { googleLogin } = require('../controlres/auth');
const { connectDB } = require('../databse/config');

const router  = Router();	

router.get('/', (req, res) => {
    connectDB();
    res.send('Connected to MongoDB');
});

router.post('/google', googleLogin);

router.post('/newuser', (req, res = response ) => {
    res.json({
        message: 'User created successfully',
        user: req.body
    });
});

module.exports = router;