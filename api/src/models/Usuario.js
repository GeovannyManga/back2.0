const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const roomSchema = new mongoose.Schema({
  start: Date,
  end: Date,
  userId: mongoose.Schema.Types.ObjectId,
  idRoom: mongoose.Schema.Types.ObjectId,
  image: String,
  price: Number,
  name: String,
  dias: Number,
  total: Number,
});

const ComentSchema = Schema(
  {
    text: String,
    rating: Number,
    userId: {
      type: Schema.Types.ObjectId,
      ref: "Usuario",
    },
    type: { type: String, default: 'pending' }
  },
  { timestamps: true }
);

const UsuarioSchema = Schema(
  {
    fullName: String,
    image: String,
    userName: String,
    email: String,
    status: Boolean,
    type: String,
    coments: [ComentSchema],
    carrito: [roomSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Usuario", UsuarioSchema);
