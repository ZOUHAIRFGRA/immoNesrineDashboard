const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require('dotenv').config()
const cors = require("cors");

const employeeRoutes = require('./routes/employeeRoutes');
const clientRoutes = require('./routes/clientRoutes');
const projectRoutes = require('./routes/projectRoutes');
const workerRoutes = require('./routes/workerRoutes');
const materialRoutes = require('./routes/materialRoutes');
const rentRoutes = require('./routes/rentRoutes');
const connectDB = require('./config/db')
// Initialize express app
const app = express();
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use('/public', express.static('public'));

// Connect to MongoDB
connectDB();  // Call the MongoDB connection function
app.get('/',(req,res)=>{
  res.json('Server is running')
})
// Routes
app.use('/employee', employeeRoutes);
app.use('/client', clientRoutes);
app.use('/project', projectRoutes);
app.use('/worker', workerRoutes);
app.use('/material', materialRoutes);
app.use('/rent', rentRoutes);

// Server port 
const PORT = process.env.PORT || 3000;

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});



