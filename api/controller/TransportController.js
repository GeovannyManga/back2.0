const Transporte = require("../src/models/Transport");

const addTransporte = async (req, res) => {
  const { asientos, price, numero, description, image } = req.body;
  const transporte = Transporte({
    asientos,
    price,
    numero,
    description,
    image
  });

  await transporte.save();
  res.send(transporte);
};

const getAllTransporte= async(req,res)=>{
    try {
        const response = await Transporte.find()
        res.send(response)
        
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
  addTransporte,
  getAllTransporte
};
