const express = require('express');
const router = express.Router();

const appController = require('../controllers/appController');

// routes
router.get('/', appController.getRoot);
router.get('/logs', appController.getLogs);

module.exports = router;