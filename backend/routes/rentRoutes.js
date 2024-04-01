const express = require('express');
const router = express.Router();
const rentController = require('../controllers/rentController');

router.post('/rents', rentController.rentMaterial);
router.put('/rents/:id/cancel', rentController.cancelRent);
router.put('/rents/:id/complete', rentController.completeRent);
router.get('/rents', rentController.getRents);

module.exports = router;
