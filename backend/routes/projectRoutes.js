const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');

// Create a new project
router.post('/projects', projectController.createProject);

// Retrieve all projects
router.get('/projects', projectController.getProjects);

// Retrieve a single project by ID
router.get('/projects/:id', projectController.getProjectById);

// Update an existing project
router.put('/projects/:id', projectController.updateProject);

// Delete an existing project
router.delete('/projects/:id', projectController.deleteProject);

module.exports = router;
