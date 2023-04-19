const {addTransporte, getAllTransporte} = require("../../controller/TransportController")
const {Router}= require("express")

const api = Router()

api.post("/transporte", addTransporte)
api.get("/transporte", getAllTransporte)

module.exports = api