import Cliente from "../models/Cliente";
import Role from "../models/Role";
import Archivador from "../models/Archivador";
var mongoose = require("mongoose");

async function createArchivador(data) {
  try {
    const { _id, email, direccion, cedula, foto, fullname, telefono } = data
    const model = { 
      cliente : {email, direccion, cedula, foto, fullname, telefono},
      fkCliente : _id
    }
    await Archivador.create(model);
  } catch (error) { }
}

export const gets = async (req, res) => {
  try {
    const limit = parseInt(req.query.take);
    const skip = parseInt(req.query.page);
    const total = await Cliente.countDocuments();
    const paginas = Math.ceil(total / limit);
    const usuarios = await Cliente.find()
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

export const create = async (req, res) => {
  try {
    const { email, password, roles, direccion, cedula, foto, fullname, ifPassword, estado, telefono } = req.body;

    const newCliente = new Cliente({
      email, direccion, foto, cedula, fullname, ifPassword, estado, telefono,
      password: await Cliente.encryptPassword(password),
    });

    const role = await Role.findOne({ name: "Cliente" });

    newCliente.roles = [role._id];
    newCliente.password = await Cliente.encryptPassword(newCliente.password);

    const result =  await newCliente.save();
    await createArchivador(result)
    return res.status(200).json({});
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const getById = async (req, res) => {
  try {
    const UsuariosId = mongoose.Types.ObjectId(req.params.id);
    const usuarios = await Cliente.findById(UsuariosId);
    res.status(200).json(usuarios);
  } catch (error) {
    return res.status(500).json(err);
  }
};

export const update = async (req, res) => {
  try {
    const { roles } = req.body
    req.body.roles = [roles];
    const updatedUsuarios = await Cliente.findByIdAndUpdate(
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

export const deletes = async (req, res) => {
  try {
    let cadenaId = req.params.id;
    const array = cadenaId.split(",");
    await Cliente.deleteMany({
      _id: {
        $in: array,
      },
    });
    res.status(200).json();
  } catch (e) {
    return res.status(500).json();
  }
};

export const activate = async (req, res) => {
  try {
    const reg = await Cliente.findByIdAndUpdate(
      { _id: req.params.id },
      { estado: req.query.state }
    );
    res.status(200).json(reg);
  } catch (e) {
    return res.status(500).json(e);
  }
}

export const query = async (req, res) => {
  try {
    const querys = req.query.querys;
    const result = await Cliente.find({ fullname: { '$regex': querys, "$options": "i" }, typo: true });
    res.status(200).json(result);
  } catch (error) {
    return res.status(500).json(error);
  }
};
