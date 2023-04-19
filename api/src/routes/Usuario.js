const express = require("express");
const {
  addUsuario,
  getAllUsers,
  addRoomDate,
  deleteRoomCard,
  crearComentario,
  deleteComnts,
  changeType,
  changeTypeComents,
  deleteCartUser
} = require("../../controller/UsuarioController");

const api = express.Router();

api.post("/usuarios", addUsuario);
api.get("/usuarios", getAllUsers);
api.patch("/usuarios/dateRoom", addRoomDate)
api.patch("/usuario/deleteCart",deleteRoomCard )
api.patch("/usuarios/:id/comentarios",crearComentario)
api.patch("/usuario/:id/coments/:user",deleteComnts )
api.patch("/usuarios/:id/types/:type", changeType)
api.patch("/usuarios/:userId/coments/:comentId",changeTypeComents)
api.patch("/usuario/delete/:userId/carrito",deleteCartUser)

module.exports = api;
