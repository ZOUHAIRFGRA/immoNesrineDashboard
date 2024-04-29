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
const authRoutes = require('./routes/authRoutes');
const expenseRoutes = require('./routes/expenseRoutes');
const connectDB = require('./config/db')
const authMiddleware = require('./middlewares/auth')
// Initialize express app
const app = express();
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use('/public', express.static('public'));
app.use(cors({
  origin: 'https://immonesrine.vercel.app',
  credentials:true, 
  exposedHeaders: ['Content-Disposition','Authorization'],   
  allowedHeaders: ['Content-Type','Authorization'],        
  optionSuccessStatus:200
}))
// Connect to MongoDB
connectDB();  // Call the MongoDB connection function
app.get('/',(req,res)=>{
  res.json('Server is running')
})
// Routes
app.use('/api/v1/employee',authMiddleware, employeeRoutes);
app.use('/api/v1/client',authMiddleware, clientRoutes);
app.use('/api/v1/project',authMiddleware, projectRoutes);
app.use('/api/v1/worker',authMiddleware, workerRoutes);
app.use('/api/v1/material',authMiddleware, materialRoutes);
app.use('/api/v1/rent',authMiddleware, rentRoutes);
app.use('/api/v1/expense',authMiddleware, expenseRoutes);
app.use('/api/v1/auth', authRoutes);

// Server port 
const PORT = process.env.PORT || 3000;

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});



