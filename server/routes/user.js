const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Routes
router.get('/', userController.home);
router.get('/about-page', userController.about);
router.get('/take-action', userController.action);
router.get('/achievements', userController.achievements);
router.get('/endorsements', userController.endorsements);

module.exports = router;