const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const router = require('./routes/router');
const jwt = require('jsonwebtoken');
const config = require('./config');
const user = require('./handlers/user');

app.use(bodyParser.urlencoded());
app.use((req, res, next) => {
    try {
        jwt.verify(token, config.jwtKey, (err, payload) => {
            if(err) {
                next();
                return;
            }
            user.findById(payload.userId).then((doc) => {
                req.user = doc;
                next();
            });
        });
    } catch (e) {
        console.error(e);
        next();
    }
    const token = req.headers.authorization.split(' ')[1];
})
app.use(router);

app.listen(4200, () => {
    console.log('Running on 4200')
})
