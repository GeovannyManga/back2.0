const mongoose = require("mongoose");

const { Schema } = require("mongoose");

// este modelo define la estructura de la tabla RoomSchema en la base de datos
const dataSchema = new Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "Usuario" },
    start: { type: Date },
    end: { type: Date },
    idRoom: { type: mongoose.Schema.Types.ObjectId, ref: "Room" }
  },
  { timestamps: true }
);

const RoomSchema = Schema(
  {
    type: { type: String, required: true },
    status: Boolean,
    guests: Number,
    name: String,
    description: String,
    image: [String],
    price: Number,
    bookedDates: [dataSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Room", RoomSchema);

//MATRIMONIAL
//FAMILIAR
//INDIVIDUAL
