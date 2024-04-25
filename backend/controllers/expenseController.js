const Expense = require("../models/Expense");

// Create a new expense
exports.createExpense = async (req, res) => {
  try {
    const { name, price, type, date } = req.body;

    const expense = new Expense({
      name,
      price,
      type,
      date,
    });

    await expense.save();

    res.status(201).json({ message: "Expense created successfully", expense });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// Retrieve all expenses
exports.getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find();
    res.json(expenses);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// Update an existing expense
exports.updateExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, type, date } = req.body;

    let expense = await Expense.findById(id);
    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    if (name) expense.name = name;
    if (price) expense.price = price;
    if (type) expense.type = type;
    if (date) expense.date = date;

    await expense.save();

    res.json({ message: "Expense updated successfully", expense });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// Delete an existing expense
exports.deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;

    let expense = await Expense.findById(id);
    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    await Expense.findByIdAndRemove(id);

    res.json({ message: "Expense deleted successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};


