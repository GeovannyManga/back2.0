const Almuerzo = require("../src/models/Almuerzo");

async function addAlmuerzo(req, res) {
  try {
    const { type, name, description, price, image } = req.body;

    const almuerzo = Almuerzo({
      type,
      name,
      description,
      price,
      image,
    });
    const almuerzoStored = await almuerzo.save();
    res.status(201).send({ almuerzoStored });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }

}

const getAllAlmuerzo =  async (req, res)=>{
  try {
    const response = await Almuerzo.find()
    return response
  } catch (error) {
    console.log(error)
  }
}


module.exports = {
  addAlmuerzo,
  getAllAlmuerzo

};
