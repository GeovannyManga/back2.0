const express = require("express");
const { addDesayuno, getAllDesayuno } = require("../../controller/DesayunoController");

const api = express.Router();

api.post("/desayuno", addDesayuno);
api.get("/desayuno", getAllDesayuno)

module.exports = api;
