const Room = require("../src/models/Room");
const nodemailer = require("nodemailer"); //para el envio de mails con un ticket al usuario

const Usuario = require("../src/models/Usuario");

const addRoom = async (req, res) => {
  try {
    console.log('esto e lo que viene por body: ',req.body); // Agregar esta línea para imprimir req.body en la consola
    const {
      type,
      status,
      guests,
      name,
      description, // Corregi el nombre de la propiedad
      image,
      price,
      bookedDates,
    } = req.body;

    const room = Room({
      type,
      status,
      guests,
      name,
      description, // Corregi el nombre de la propiedad
      image,
      price,
      bookedDates,
    });

    const roomStored = await room.save();
    console.log(roomStored);
    res.status(201).send({ roomStored });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const getAllRooms = async (req, res) => {
  try {
    const response = await Room.find();
    res.send(response);
  } catch (error) {
    console.log(error);
  }
};

const getRoomId = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await Room.findById(id);
    res.send(response);
  } catch (error) {}
};

async function getRoomType(req, res) {
  const { type } = req.query;
  const result = await Room.findOne({ type });
  res.send(result);
}

const getAvailableRooms = async (req, res) => {
  const { start, end } = req.query;

  let startUTC, endUTC;

  try {
    startUTC = new Date(start).toISOString();
    endUTC = new Date(end).toISOString();
  } catch (err) {
    res.status(400).json({ message: "Invalid date format" });
    return;
  }

  try {
    const availableRooms = await Room.find({
      bookedDates: {
        $not: {
          $elemMatch: {
            start: { $lt: endUTC },
            end: { $gt: startUTC },
          },
        },
      },
    });
    res.json(availableRooms);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateRooms = async (req, res) => {
  const roomId = req.params.id;
  const { start, end, userId } = req.body;

  let startUTC, endUTC;

  try {
    startUTC = new Date(start).toISOString();
    endUTC = new Date(end).toISOString();
  } catch (err) {
    res.status(400).json({ message: "Invalid date format" });
    return;
  }

  try {
    const room = await Room.findByIdAndUpdate(roomId, {
      $push: { bookedDates: { start: startUTC, end: endUTC, userId: userId } },
    });

    res.json(room);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const pushAsync = async (array, elem) => {
  await array.push(elem);
};

const sendTicketToMail = async (req, res) => {
  try {
    const { id } = req.params;
    // const habitacion = await Room.findOne({ "bookedDates._id": id }).populate('bookedDates.idRoom');
    const usuario = await Usuario.findOne({ _id: id });

    const rooms = usuario.carrito
    let dias = 0;
    const cuartos = [];
    rooms.forEach((room) => {
      const startDate = new Date(room.start);
      const endDate = new Date(room.end);
      if (
        endDate instanceof Date &&
        !isNaN(startDate.getTime()) &&
        !isNaN(endDate.getTime())
      ) {
        const resta = endDate.getTime() - startDate.getTime();
        dias += Math.floor(resta / (1000 * 60 * 60 * 24));
      } else {
        console.log(
          `El objeto room con start = ${room.start} y end = ${room.end} no cumple con el criterio requerido`
        );
      }
    });

    console.log(dias);

    // rooms.forEach(async element => {

    //   //console.log(element.idRoom)

    //   const hab = await Room.findById(element.idRoom)
    //   cuartos[] = pushAync(hab)
    //   // console.log(hab)

    // });
    for (let index = 0; index < rooms.length; index++) {
      const hab = await Room.findById(rooms[index].idRoom);
      await pushAsync(cuartos, hab);
    }

    if (!usuario) {
      return res.status(404).json({ mensaje: "Usuario no encontrado" });
    }

    // Generar el contenido del ticket con los productos del carrito
    let ticket = "Ticket del hotel Tayrona:\n ";
    let total = 0;
    cuartos.forEach((producto) => {
      ticket += `${producto.name}: $${producto.price}\n`;
      console.log(producto.name);
      total += producto.price;
    });

    ticket += `Dias: ${dias}\nTotal: $${total*dias}`;
    console.log(dias);

    // Configurar el transporte de nodemailer
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com", // servidor SMTP
      port: 465, // puerto del servidor SMTP
      secure: true, // utiliza SSL
      auth: {
        user: "miradortayronaproyectohenry@gmail.com", // dirección de correo electrónico del remitente
        pass: "xewmidrfubohbesq", // contraseña del remitente
      },
    });

    // Enviar el ticket al email del usuario
    const info = await transporter.sendMail({
      from: "miradorTayronaProyectoHenry@gmail.com",
      to: usuario.email,
      subject: "Ticket de compra ",
      text: ticket + "\nMuchas gracias por elegir hospedarse aqui",
    });

    transporter.verify().then(() => {
      console.log("Ready for send emails");
    });

    res.json({ mensaje: "Ticket enviado exitosamente", info: info });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const updateRoomStatus = async (req, res) => {
  const roomId = req.params.roomId;
  if (roomId) {
    try {
      const room = await Room.findById(roomId);
      if (!room) {
        return res.status(404).send({ error: 'No se encontró la habitación' });
      }
      room.status = !room.status; // Cambia el estado de la habitación
      console.log(room)
      await room.save(); // Guarda los cambios en la base de datos
      res.status(200).send({ message: 'Estado de la habitación actualizado correctamente' });
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: 'Error al actualizar el estado de la habitación' });
    }
  } else {
    res.status(400).send({ error: 'Es necesario el id para poder realizar la petición' });
  }
};



const modifyRoomData = async (req, res) => {
  try {
    const { roomId } = req.params;
    const room = await Room.findByIdAndUpdate(roomId, req.body, { new: true });

    if (!room) {
      return res.status(404).send({ message: "Room not found" });
    }
    
    res.status(200).send({ room });
  } catch (error) {
    console.error(error); // Agrega console.error para mostrar el error en la consola
    res.status(500).send({ message: "Error updating room" });
  }
};





module.exports = {
  addRoom,
  getAllRooms,
  getRoomId,
  getRoomType,
  getAvailableRooms,
  updateRooms,
  sendTicketToMail,
  updateRoomStatus,
  modifyRoomData
};
