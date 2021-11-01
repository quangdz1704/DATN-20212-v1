const express = require('express');
const router = express.Router();
const chartController = require('./chart.controller');

router.get('/power', chartController.getPower);
router.get('/current', chartController.getCurrent);
router.get('/voltage', chartController.getVoltage);

module.exports = router;