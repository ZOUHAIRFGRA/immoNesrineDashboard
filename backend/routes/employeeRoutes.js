const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');

// Create a new employee
router.post('/', employeeController.createEmployee);
router.get('/', employeeController.getEmployees);

// Update an existing employee (partial update)
router.put('/:id', employeeController.updateEmployee);

// Delete an existing employee
router.delete('/:id', employeeController.deleteEmployee);

// Assign project to employee
router.post('/assign-project', employeeController.assignProjectToEmployee);

module.exports = router;
