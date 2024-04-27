const express = require('express');
const router = express.Router();
const rentController = require('../controllers/rentController');

router.post('/rents', rentController.rentMaterial);
router.put('/rents/cancel/:id', rentController.cancelRent);
router.put('/rents/complete/:id', rentController.completeRent);
router.get('/rents', rentController.getRents);

module.exports = router;
