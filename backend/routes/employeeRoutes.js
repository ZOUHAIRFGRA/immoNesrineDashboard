const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');

// Create a new employee
router.post('/employees', employeeController.createEmployee);
router.get('/employees', employeeController.getEmployees);

// Update an existing employee (partial update)
router.put('/employees/:id', employeeController.updateEmployee);

// Delete an existing employee
router.delete('/employees/:id', employeeController.deleteEmployee);

// Assign project to employee
router.post('/employees/assign-project', employeeController.assignProjectToEmployee);

module.exports = router;
