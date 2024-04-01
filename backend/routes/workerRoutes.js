const express = require('express');
const router = express.Router();
const workerController = require('../controllers/workerController');

// Create a new worker
router.post('/', workerController.createWorker);

// Retrieve all workers
router.get('/', workerController.getWorkers);

// Update an existing worker (partial update)
router.put('/:id', workerController.updateWorker);

// Delete an existing worker
router.delete('/:id', workerController.deleteWorker);

// Assign worker to project
router.post('/assign-project', workerController.assignWorkerToProject);

module.exports = router;
