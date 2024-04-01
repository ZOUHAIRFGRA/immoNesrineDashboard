const express = require('express');
const router = express.Router();
const materialController = require('../controllers/materialController');

// Create a new material tool
router.post('/materials', materialController.createMaterial);

// Retrieve all material tools
router.get('/materials', materialController.getMaterials);

// Update an existing material tool
router.put('/materials/:id', materialController.updateMaterial);

// Delete an existing material tool
router.delete('/materials/:id', materialController.deleteMaterial);

module.exports = router;
