const Expense = require("../models/Expense");
const fs = require("fs");
const path = require("path");
const fetch = require("node-fetch");

// Function to read HTML template file
const readHTMLTemplate = (templatePath) => {
  try {
    return fs.readFileSync(templatePath, "utf8");
    console.log("File read succ");
  } catch (error) {
    console.error("Error reading HTML template:", error);
    throw error;
  }
};

// Function to generate PDF using PDFShift API
const generatePDF = async (htmlContent, apiKey) => {
  try {
    const response = await fetch("https://api.pdfshift.io/v3/convert/pdf", {
      method: "POST",
      headers: {
        Authorization:
          "Basic " + Buffer.from(`api:${apiKey}`).toString("base64"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        source: htmlContent,
        landscape: false,
        use_print: false,
        sandbox: true,
      }),
    });

    if (!response.ok) {
      throw new Error(
        `PDFShift API request failed: ${response.status} - ${response.statusText}`
      );
    }

    console.log("res=>", response);

    const pdfBuffer = await response.buffer();
    return pdfBuffer;
  } catch (error) {
    console.error("Error generating PDF:", error);
    throw error;
  }
};

// Read HTML template file
const htmlTemplate = readHTMLTemplate(
  path.join(__dirname, "../utils/entete.html")
);

// Fetch expenses from MongoDB
const fetchExpenses = async () => {
  try {
    return await Expense.find();
  } catch (error) {
    console.error("Error fetching expenses:", error);
    throw error;
  }
};

// Controller function to handle bulk insertion of expenses
exports.bulkInsertExpenses = async (req, res) => {
  try {
    // Extract the array of expense objects from the request body
    const expenses = req.body;

    // Insert the expenses into the database
    const insertedExpenses = await Expense.insertMany(expenses);

    // Send a success response with the inserted expenses
    res.status(201).json({ success: true, insertedExpenses });
  } catch (error) {
    // Handle errors
    console.error("Error inserting expenses:", error);
    res
      .status(500)
      .json({ success: false, error: "Failed to insert expenses" });
  }
};

// Main function  to generate PDF
exports.downloadExpensesAsPDF = async (req, res) => {
  try {
    // Fetch expenses from MongoDB
    const expenses = await fetchExpenses();

    // Calculate total price
    const totalPrice = expenses.reduce(
      (total, expense) => total + expense.price,
      0
    ).toFixed(2);

    // Replace {{TOTAL}} with the total price in the HTML template
    let modifiedHTML = htmlTemplate.replace("{{TOTAL}}", totalPrice);

    // Replace table data placeholder with dynamic table rows
    const tableRows = expenses
      .map(
        (expense) => `
        <tr>
            <td>${expense.name}</td>
            <td>${expense.price}</td>
            <td>${expense.type}</td>
            <td>${new Date(expense.date).toLocaleDateString("en-GB")}</td>
        </tr>
    `
      )
      .join("");

    modifiedHTML = modifiedHTML.replace("{{TABLE_DATA}}", tableRows);

    // Generate PDF using PDFShift API
    const apiKey = "sk_8b659e4b45ed010d5bdb3d5157d4b915a517fddc";
    const pdfBuffer = await generatePDF(modifiedHTML, apiKey);

    // Set response headers for file download
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "attachment; filename=expenses.pdf");

    // Send the PDF data as the response
    res.send(pdfBuffer);

    console.log("PDF generated and sent successfully.");
  } catch (error) {
    console.error("Failed to generate and send PDF:", error);
    res.status(500).send("Failed to generate PDF");
  }
};

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
