const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const workerSchema = new Schema({
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
  projectId: {
    type: Schema.Types.ObjectId,
    ref: 'Project',
    default: null
  }
});

const Worker = mongoose.model('Worker', workerSchema);

module.exports = Worker;
