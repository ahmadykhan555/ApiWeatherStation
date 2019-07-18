const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const router = require('./routes/router');
const config = require('./config'); 

// middlewares.
const verifyToken = (req, res, next) => {
    /**
     * Token format
     * bearer <access_token>
     */
    const jwt = require('jsonwebtoken');
    console.log(req.headers);
    const bearer = req.headers['authorization'];
    if(!bearer) {
        res.sendStatus(403);
        return;
    }
    const token = bearer.split(' ')[1];
    jwt.verify(token, config.jwtKey, (err, authData) => {
        if(err) {
            res.sendStatus(403);
            return;
        }
        req.authData = authData;
        next();
    });
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use('/api/*', verifyToken)
app.use(router);

app.listen(4200, () => {
    console.log('Running on 4200')
});
