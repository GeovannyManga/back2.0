const express = require("express");
const { addCarrito, getCarrito} = require("../../controller/carritoController");

const api = express.Router();

api.post("/carrito", addCarrito);
api.get("/carrito", getCarrito)


module.exports = api;
