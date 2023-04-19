const express = require("express");
const { addCena, getAllCena} = require("../../controller/CenaController");

const api = express.Router();

api.post("/cena", addCena);
api.get("/cena",getAllCena )

module.exports = api;
