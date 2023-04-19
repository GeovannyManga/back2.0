const Usuario = require("../src/models/Usuario");
const Room = require("../src/models/Room");

const mongoose = require("mongoose");
async function addUsuario(req, res) {
  try {
    const { fullName, userName, image, email, status, type, carrito, coments } =
      req.body;
    console.log(req.body);

    const usuario = Usuario({
      fullName,
      userName,
      image,
      email,
      status,
      type,
      carrito,
      coments,
    });
    const usuarioStored = await usuario.save();
    res.status(201).send({ usuarioStored });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
}

const getAllUsers = async (req, res) => {
  try {
    const search = await Usuario.find();
    res.send(search);
  } catch (error) {
    console.log(error);
  }
};
const addRoomDate = async (req, res) => {
  const { start, end, userId, idRoom, image, name, price, dias, total } =
    req.body;

  let startUTC, endUTC;

  try {
    startUTC = new Date(start).toISOString();
    endUTC = new Date(end).toISOString();
  } catch (err) {
    res.status(400).json({ message: "Invalid date format" });
    return;
  }

  try {
    const userID = new mongoose.Types.ObjectId(userId);
    const roomID = new mongoose.Types.ObjectId(idRoom);

    const user = await Usuario.findByIdAndUpdate(userID, {
      $push: {
        carrito: {
          start: startUTC,
          end: endUTC,
          userId: userID,
          idRoom: roomID,
          image: image,
          price: price,
          name: name,
          dias: dias,
          total: total,
        },
      },
    });

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteRoomCard = async (req, res) => {
  const { userId, id } = req.body;

  try {
    const userID = new mongoose.Types.ObjectId(userId);

    const user = await Usuario.updateOne(
      { _id: userID },
      { $pull: { carrito: { _id: id } } }
    );

    res.json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};

//642df715b277bcadd21c3b38
async function crearComentario(req, res) {
  const usuarioId = req.params.id;

  try {
    const usuario = await Usuario.findByIdAndUpdate(usuarioId, {
      $push: {
        coments: {
          text: req.body.text,
          rating: req.body.rating,
          userId: usuarioId,
        },
      },
    });

    if (!usuario) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    } // Obtiene el último comentario añadido

    res.send(usuario);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al crear el comentario" });
  }
}

async function deleteComnts(req, res) {
  const comentsId = req.params.id;
  const userId = req.params.user;

  try {
    const usuario = await Usuario.findByIdAndUpdate(userId, {
      $pull: { coments: { _id: comentsId } },
    });

    if (!usuario) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    } // Obtiene el último comentario añadido

    res.send(usuario);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al crear el comentario" });
  }

  
}

const changeType = async (req, res) => {
  const id = req.params.id;
  const type = req.params.type;

  try {
    const usuario = await Usuario.findByIdAndUpdate(
      id,
      { type: type },
      { new: true } // Devuelve el usuario actualizado en lugar del usuario antiguo
    );

    res.send(usuario);
  } catch (error) {
    console.error(error);
    res.status(500).send("Ha ocurrido un error al actualizar el usuario.");
  }
};
const changeTypeComents = async (req, res) => {
  const userId = req.params.userId;
  const comentId = req.params.comentId;
  const type = req.body.type;

  try {
    const usuario = await Usuario.findOneAndUpdate(
      { _id: userId, "coments._id": comentId }, // Filtra el documento por el _id de usuario y el _id de comentario
      { $set: { "coments.$.type": type } }, // Actualiza el campo "type" del comentario en posición del array
      { new: true } // Devuelve el usuario actualizado en lugar del usuario antiguo
    );

    res.send(usuario);
  } catch (error) {
    console.error(error);
    res.status(500).send("Ha ocurrido un error al actualizar el tipo de comentario del usuario.");
  }
};


const deleteCartUser = async(req, res)=>{
  try {
    const userId = req.params.userId 

    const buscarUser = await Usuario.findById(userId)
    if (!buscarUser) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    buscarUser.carrito = [];
    const response = await Usuario.updateOne({ _id: userId }, { carrito: buscarUser.carrito });

    res.status(200).json({ message: 'El carrito del usuario ha sido limpiado exitosamente' });
    
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Ha ocurrido un error al intentar limpiar el carrito del usuario' });
  }
}



module.exports = {
  addUsuario,
  getAllUsers,
  addRoomDate,
  deleteRoomCard,
  crearComentario,
  deleteComnts,
  changeType,
  changeTypeComents,
  deleteCartUser
};
