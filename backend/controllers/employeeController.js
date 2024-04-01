const Employee = require('../models/Employee');

// Create a new employee
exports.createEmployee = async (req, res) => {
  try {
    const { firstName, lastName, CIN, phone } = req.body;

    const employee = new Employee({
      firstName,
      lastName,
      CIN,
      phone
    });

    await employee.save();

    res.status(201).json({ message: 'Employee created successfully', employee });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Update an existing employee (partial update)
exports.updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const { firstName, lastName, CIN, phone } = req.body;

    let employee = await Employee.findById(id);
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    if (firstName) employee.firstName = firstName;
    if (lastName) employee.lastName = lastName;
    if (CIN) employee.CIN = CIN;
    if (phone) employee.phone = phone;

    await employee.save();

    res.json({ message: 'Employee updated successfully', employee });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Delete an existing employee
exports.deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;

    let employee = await Employee.findById(id);
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    await Employee.findByIdAndRemove(id);

    res.json({ message: 'Employee deleted successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Assign project to employee
exports.assignProjectToEmployee = async (req, res) => {
  try {
    const { employeeId, projectId } = req.body;

    const employee = await Employee.findById(employeeId);
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    // Check if the project is already assigned to the employee
    if (employee.projects.includes(projectId)) {
      return res.status(400).json({ message: 'Project already assigned to employee' });
    }

    // Assign project to employee
    employee.projects.push(projectId);
    await employee.save();

    res.json({ message: 'Project assigned to employee successfully', employee });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
// Retrieve all employees
exports.getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
