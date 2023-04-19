
const mongoose = require("mongoose")


const cartSchema = new mongoose.Schema({
    user: { type: Object, ref: 'Usuario' },
    rooms: [{ type: Object, ref: 'Room' }],
    transport:[{ type: Object, ref: 'Transport' }],
  });

  module.exports = mongoose.model('Cart', cartSchema);