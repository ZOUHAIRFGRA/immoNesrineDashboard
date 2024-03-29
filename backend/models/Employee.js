const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const employeeSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  CIN: {
    type: String,
    required: true,
    unique: true
  },
  phone: {
    type: String,
    required: true
  },
  projects: [{
    type: Schema.Types.ObjectId,
    ref: 'Project'
  }]
});

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;
