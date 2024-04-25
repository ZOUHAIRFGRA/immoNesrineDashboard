const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const expenseSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  type: {
    type: String,
    enum: ['credit card', 'cash'],
    required: true
  },
  date: {
    type: Date,
    required: true
  }
});

const Expense = mongoose.model('Expense', expenseSchema);

module.exports = Expense;
