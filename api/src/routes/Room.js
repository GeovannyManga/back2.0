const { Router } = require("express");

const {
  addRoom,
  getAllRooms,
  getRoomId,
  getRoomType,
  getAvailableRooms,
  updateRooms,
  sendTicketToMail,
  updateRoomStatus,
  modifyRoomData
} = require("../../controller/roomController");

const api = Router();

api.get("/room/avalible", getAvailableRooms);
api.get("/room/type", getRoomType);
api.get("/room", getAllRooms);
api.post("/room", addRoom);
api.patch("/rooms/:id/bookings", updateRooms);
api.get("/room/:id", getRoomId);
api.post("/rooms/:id/enviarTicket", sendTicketToMail);
api.put('/update/room/:roomId/status', updateRoomStatus);
api.put('/update/roomData/:roomId',modifyRoomData)

module.exports = api;
