import User from "../models/User";
import Role from "../models/Role";
var mongoose = require("mongoose");

export const gets = async (req, res) => {
  try {
    const limit = parseInt(req.query.take);
    const skip = parseInt(req.query.page);
    const total = await User.countDocuments({ visible: true});
    const paginas = Math.ceil(total / limit);
    const usuarios = await User.find({ visible: true})
      .skip(limit * skip - limit)
      .limit(limit);
    const coleccion = {
      usuarios: usuarios,
      pagina: skip,
      paginas: paginas,
      total: total,
    };
    return res.json(coleccion);
  } catch (error) {
    return res.status(500).json(err);
  }
};


export const getById = async (req, res) => {
  try {
    const UsuariosId = mongoose.Types.ObjectId(req.params.id);
    const usuarios = await User.findById(UsuariosId);
    res.status(200).json(usuarios);
  } catch (error) {
    return res.status(500).json(err);
  }
};

export const update = async (req, res) => {
  try {
    const {roles} = req.body
    req.body.roles = [roles];
    const updatedUsuarios = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    res.status(200).json(updatedUsuarios);
  } catch (err) {
    return res.status(500).json(err);
  }
};

export const updatePerfil = async (req, res) => {
  try {
    await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    res.status(200).json({});
  } catch (err) {
    return res.status(500).json(err);
  }
};

export const deletes = async (req, res) => {
  try {
    let cadenaId = req.params.id;
    const array = cadenaId.split(",");
    await User.deleteMany({
      _id: {
        $in: array,
      },
    });
    res.status(200).json();
  } catch (e) {
    return res.status(500).json();
  }
};

export const getRoles = async (req, res) => {
  try {
    const roless = await Role.find({
      name: { $in: ["Admin", "Empleado"] },
    });
    return res.json(roless);
  } catch (error) {
    return res.status(500).json(err);
  }
};

export const create = async (req, res) => {
  try {
    const { email, password, roles, visible, cedula, foto, fullname, ifPassword, estado, direccion, telefono } = req.body;

    const user = new User({
      email, visible, foto, cedula, fullname, ifPassword, estado,direccion,telefono,
      password: await User.encryptPassword(password),
    });

    const role = await Role.findOne({ name: "Empleado" });
    user.roles = [role._id];

    user.password = await User.encryptPassword(user.password);
    await user.save();
    return res.status(200).json({});
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

export const activate = async (req, res, next) => {
  try {
    const reg = await User.findByIdAndUpdate(
      { _id: req.params.id },
      { estado: req.query.state }
    );
    res.status(200).json(reg);
  } catch (e) {
    res.status(500).send({
      message: "Ocurrió un error",
    });
    next(e);
  }
}

export const query = async (req, res) => {
  try {
    const querys = req.query.querys;
    const result = await User.find({ fullname: { '$regex': querys, "$options": "i" }, typo: true});
    res.status(200).json(result);
  } catch (error) {
    res.status(500).send({
      message: "Ocurrió un error",
    });
  }
};
