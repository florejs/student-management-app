const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  studentId: String,
  text: String,
}, { timestamps: true });

module.exports = mongoose.model('Note', schema);
