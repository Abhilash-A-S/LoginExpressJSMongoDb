const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const mongoService = require('../mongodb/mongo.service');


router.get('/getObject', async function (req, res) {
    const result = await mongoService.getObjects(req.query);
    res.send(result)
});
router.post('/insertUser', async function (req, res) {
    const objectBody = req.body;
    objectBody.password = await bcrypt.hash(objectBody.password, 10);
    const result = await mongoService.insertObjects(objectBody);
    res.send(result);
});
module.exports = router;
