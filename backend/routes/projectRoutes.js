const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');

// Create a new project
router.post('/', projectController.createProject);

// Retrieve all projects
router.get('/', projectController.getProjects);

// Retrieve a single project by ID
router.get('/:id', projectController.getProjectById);

// Update an existing project
router.put('/:id', projectController.updateProject);

// Delete an existing project
router.delete('/:id', projectController.deleteProject);

module.exports = router;
