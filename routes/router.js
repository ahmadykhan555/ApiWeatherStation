const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const config = require('./../config');

router.get('/', (req, res) => {
    res.send('Hello from express router');
});

router.post('/login', (req, res) => {
    const payload = {username: req.body.username, password: req.body.password};
    jwt.sign({user: payload}, config.jwtKey, (err, token) => {
        res.json(token);
    })
    res.json({
        msg: 'login',
        username,
        password
    });
})

router.post('/api/user/posts', (req, res) => {
    const {username, id} = req.body;
    res.send({
        name: username,
        id: id,
        authData: req.authData
    });
});

module.exports = router;