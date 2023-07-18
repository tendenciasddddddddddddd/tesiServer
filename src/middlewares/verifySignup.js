import User from "../models/User";
import Estudiante  from "../models/registros/Estudiante";
import Distributivo from "../models/distributivos/Distributivo";
import Tutores from "../models/distributivos/Tutores"
import { ROLES } from "../models/Role";

const checkDuplicateUsernameOrEmail = async (req, res, next) => {
  try {
    const user = await User.findOne({cedula: req.body.cedula });
    if (user)
      return res.status(400).json({ message: "El numero de cédula ya existe" });
    next();
  } catch (error) {
    res.status(500).json({ message: error });
    
  }
};
const checkDuplicateDistributivo = async (req, res, next) => {
  try {
    const result = await Distributivo.findOne({fkcurso: req.body.fkcurso, paralelo: req.body.paralelo });
    if (result)
      return res.status(400).json({ message: "Distributivo duplicado" });
    next();
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
const checkDuplicateTutores = async (req, res, next) => {
  try {
    const result = await Tutores.findOne({fkcurso: req.body.fkcurso, paralelo: req.body.paralelo, fkdocente: req.body.fkdocente });
    if (result)
      return res.status(400).json({ message: "Distributivo duplicado" });
    next();
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
const checkDuplicateEstudiante = async (req, res, next) => {
  try {
    const user = await Estudiante.findOne({cedula: req.body.cedula });
    if (user)
      return res.status(400).json({ message: "El numero de cédula ya existe" });
    next();
  } catch (error) {
    res.status(500).json({ message: error });
    
  }
};
const checkRolesExisted = (req, res, next) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        return res.status(400).json({
          message: `Role ${req.body.roles[i]} does not exist`,
        });
      }
    }
  }

  next();
};


export { checkDuplicateUsernameOrEmail, checkRolesExisted, checkDuplicateEstudiante, checkDuplicateDistributivo, checkDuplicateTutores };