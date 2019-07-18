const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const config = require('./../config');

router.get('/', (req, res) => {
    res.send('Hello from express router');
});

router.post('/login', (req, res) => {
    const { username, password } = req.body;
    const payload = {
        username,
        password
    };
    jwt.sign( {user: payload} , config.jwtKey, (err, token) => {
        if(err) {
            console.log('====================================');
            console.log('Sending Error');
            console.log('====================================');
            res.statusCode(403);
            return;
        }
        res.json({
            username,
            password,
            token
        });
    })
})

router.post('/api/user/posts', (req, res) => {
    const {username, id} = req.body;
    res.json({
        name: username,
        id: id,
        authData: req.authData
    });
});

module.exports = router;