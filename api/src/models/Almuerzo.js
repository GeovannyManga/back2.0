const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const AlmuerzoSchema = Schema({
  type: Number,
  name: String,
  description: String,
  price: Number,
  image: [String],
});

module.exports = mongoose.model("Almuerzo", AlmuerzoSchema);
