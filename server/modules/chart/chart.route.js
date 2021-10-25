const express = require('express');
const router = express.Router();
const chartController = require('./chart.controller');

router.get('/power', chartController.getPower);
module.exports = router;