const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: String,
}, { timestamps: true });

module.exports = mongoose.model('ContactType', schema);
