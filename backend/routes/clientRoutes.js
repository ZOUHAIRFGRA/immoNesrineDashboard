const express = require('express');
const router = express.Router();
const clientController = require('../controllers/clientController');

// Create a new client
router.post('/clients', clientController.createClient);

// Retrieve all clients
router.get('/clients', clientController.getClients);


// Update an existing client
router.put('/clients/:id', clientController.updateClient);

// Delete an existing client
router.delete('/clients/:id', clientController.deleteClient);

// Retrieve all clients with their associated projects
router.get('/clients/with-projects', clientController.getClientsWithProjects);

module.exports = router;
