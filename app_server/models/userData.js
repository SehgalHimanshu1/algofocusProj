const mongoose = require('mongoose');
const userDataSchema = new mongoose.Schema({
  name: String,
  email: String,
  dob: Date,
  phone: Number
});

module.exports = userDataSchema;
