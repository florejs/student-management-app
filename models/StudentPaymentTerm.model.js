const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  paymentTermId: String,
  studentId, String,
}, { timestamps: true });

module.exports = mongoose.model('StudentPaymentTerm', schema);
