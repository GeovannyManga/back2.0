const express = require("express");
const { addAlmuerzo, getAllAlmuerzo} = require("../../controller/AlmuerzoController");

const api = express.Router();

api.post("/almuerzo", addAlmuerzo);
api.get("/almuerzo", getAllAlmuerzo)

module.exports = api;
