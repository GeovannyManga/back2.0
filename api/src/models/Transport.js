const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const TransportSchema = Schema({
  asientos: Number,
  price : Number,
  numero: Number,
  description: String,
  image: [String]
});

module.exports = mongoose.model("Transport", TransportSchema);