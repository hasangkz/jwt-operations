const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, required: true, max: 20, min: 2 },

  email: { type: String, required: true },

  password: { type: String, required: true, max: 1024, min: 6 },

  date: { type: Date, default: Date.now },
});

const Ders = mongoose.model('User', userSchema);

module.exports = Ders;
