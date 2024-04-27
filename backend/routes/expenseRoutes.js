const express = require('express');
const router = express.Router();
const expenseController = require('../controllers/expenseController');

// Create a new expense
router.post('/expenses', expenseController.createExpense);
router.post('/bulk_expenses', expenseController.bulkInsertExpenses);





// Retrieve all expenses
router.get('/expenses', expenseController.getExpenses);

// Update an existing expense (partial update)
router.put('/expenses/:id', expenseController.updateExpense);

// Delete an existing expense
router.delete('/expenses/:id', expenseController.deleteExpense);

// Assign expense to project
router.get('/expenses/export-to-csv', expenseController.downloadExpensesAsPDF);

module.exports = router;
