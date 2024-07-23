import Cliente from "../models/Cliente.js";
import Archivador from "../models/Archivador.js";
import Servicios from "../models/Servicios.js";

export const tracks = async (req, res) => {
  try {
    const clientes = await Cliente.countDocuments();
    const servicios = await Servicios.countDocuments();
    const archivador = await Archivador.countDocuments();
    return res.json({servicios, clientes, archivador});
  } catch (err) {
    return res.status(500).json(err);
  }
};

export const list = async (req, res) => {
  try {
    const reg = await Cliente.find().sort({ 'createdAt': -1 });
    res.status(200).json(reg);
} catch (e) {
    res.status(500).send({
        message: 'Ocurrió un error'
    });
    next(e);
}
};

export const create = async (req, res) => {
  try {
    await Cliente.create(req.body);
    res.status(200).json({});
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};


export const getById = async (req, res) => {
  try {
    const UsuariosId = req.params.id;
    const usuarios = await Cliente.findById(UsuariosId);
    res.status(200).json(usuarios);
  } catch (err) {
    return res.status(500).json(err);
  }
};

export const update = async (req, res) => {
  try {
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
    await Archivador.deleteMany({
      fkCliente: {
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
