import User from "../models/User.js";
import Cliente from "../models/Cliente.js";

const checkUsernameCedula = async (req, res, next) => {
  try {
    const user = await User.findOne({cedula: req.body.cedula });
    if (user)
      return res.status(400).json({ message: "El numero de cédula ya existe" });
    next();
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
const checkUsernameEmail = async (req, res, next) => {
  try {
    const user = await User.findOne({email: req.body.email });
    if (user)
      return res.status(400).json({ message: "El numero de cédula ya existe" });
    next();
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
const checkClientesCedula = async (req, res, next) => {
  try {
    const user = await Cliente.findOne({identificacion: req.body.identificacion });
    if (user)
      return res.status(400).json({ message: "El numero de cédula ya existe" });
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
    
  }
};
const checkClientesEmail = async (req, res, next) => {
  try {
    const user = await Cliente.findOne({email: req.body.email });
    if (user)
      return res.status(400).json({ message: "El numero de cédula ya existe" });
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
    
  }
};

export { checkUsernameCedula, checkUsernameEmail, checkClientesCedula, checkClientesEmail};