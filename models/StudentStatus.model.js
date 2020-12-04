const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  studentId: String,
  statusId: String,
}, { timestamps: true });

module.exports = mongoose.model('StudentStatus', schema);
