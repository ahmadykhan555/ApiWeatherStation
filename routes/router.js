const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Hello from express router');
});

router.post('/user', (req, res) => {
    console.log('got post req: ', req.body);
    const {name, id} = req.body;
    res.send({
        name: name,
        id: id
    });
});

module.exports = router;