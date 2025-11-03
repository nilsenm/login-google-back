const { Router } = require('express');

const router = Router();

router.get('/nuevo', (req, res) => {
    res.send('newuser OK');
});

router.get('/crear', (req, res) => {
    res.send('crear cuenta OK');
});

module.exports = router;


