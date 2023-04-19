const Cena = require("../src/models/Cena");

async function addCena(req, res) {
  try {
    const { type, name, description, price, image } = req.body;

    const cena = Cena({
      type,
      name,
      description,
      price,
      image,
    });
    const cenaStored = await cena.save();
    res.status(201).send({ cenaStored });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
}

const getAllCena =  async (req, res)=>{
  try {
    const response = await Cena.find()
    return response
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  addCena,
  getAllCena
};
