const express = require('express');
const router = express.Router();
const workerController = require('../controllers/workerController');

// Create a new worker
router.post('/workers', workerController.createWorker);

// Retrieve all workers
router.get('/workers', workerController.getWorkers);

// Update an existing worker (partial update)
router.put('/workers/:id', workerController.updateWorker);

// Delete an existing worker
router.delete('/workers/:id', workerController.deleteWorker);

// Assign worker to project
router.post('/workers/assign-project', workerController.assignWorkerToProject);

module.exports = router;
