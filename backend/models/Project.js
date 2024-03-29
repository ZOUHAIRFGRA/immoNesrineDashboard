const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projectSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  client: {
    type: Schema.Types.ObjectId,
    ref: 'Client'
  },
  employees: [{
    type: Schema.Types.ObjectId,
    ref: 'Employee'
  }],
  workers: [{
    type: Schema.Types.ObjectId,
    ref: 'Worker'
  }],
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date
  },
  status: {
    type: String,
    enum: ['Pending', 'Ongoing', 'Completed'],
    default: 'Pending'
  }
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
