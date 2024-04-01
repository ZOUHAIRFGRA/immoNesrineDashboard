const express = require('express');
const router = express.Router();
const clientController = require('../controllers/clientController');

// Create a new client
router.post('/', clientController.createClient);

// Retrieve all clients
router.get('/', clientController.getClients);


// Update an existing client
router.put('/:id', clientController.updateClient);

// Delete an existing client
router.delete('/:id', clientController.deleteClient);

// Retrieve all clients with their associated projects
router.get('/with-projects', clientController.getClientsWithProjects);

module.exports = router;
