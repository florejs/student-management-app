const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
}, { timestamps: true });

userSchema.methods.isPasswordMatch = (password, callback) => {
  bcrypt.compare(password, this.password, (err, same) => {
    if (err) {
      callback(err);
    } else {
      callback(err, same);
    }
  });
}

module.exports = mongoose.model('User', userSchema);
