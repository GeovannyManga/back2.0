const { Router } = require("express");

const { getAllAlmuerzo } = require("../../controller/AlmuerzoController")
const { getAllCena } = require("../../controller/CenaController")
const { getAllDesayuno } = require("../../controller/DesayunoController");
const api = require("./Usuario");

// const api = Router()
api.get("/comidas", async (req, res) => {
try {
     const desayuno = await getAllDesayuno()
     console.log(desayuno)
     const  almuerzo = await getAllAlmuerzo()
     console.log(almuerzo)
    const cena = await getAllCena()
    console.log(cena)
   const todo = [...Array.from(desayuno), ...Array.from(almuerzo), ...Array.from(cena)];
   res.send(todo)
} catch (error) {
    console.log(error)
}
})

module.exports = api
