const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const rentSchema = new Schema({
  material: {
    type: Schema.Types.ObjectId,
    ref: 'Material',
    required: true
  },
  client: {
    type: Schema.Types.ObjectId,
    ref: 'Client',
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  pricePerPiece: {
    type: Number,
    required: true
  },
  totalPrice: {
    type: Number,
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ['Active', 'Completed','Cancelled'],
    default: 'Active'
  }
});

const Rent = mongoose.model('Rent', rentSchema);

module.exports = Rent;
