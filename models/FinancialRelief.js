const mongoose = require('mongoose');

first_name
email_address


const schema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('User', schema);
