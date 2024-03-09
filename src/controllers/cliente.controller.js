import Cliente from "../models/Cliente.js";
import Drive from "../models/Drive.js";

import fetch from 'node-fetch';

async function createArchivador(data) {
  try {
    const model = {
      cliente : data,
      fkCliente : data._id
    }
    await Drive.create(model);
  } catch (error) { }
}

async function updateDrive(id, model) {
  try {
    await Drive.updateOne({fkCliente:id}, { cliente: model }, { new: true, });
  } catch (error) {
    console.log(error);
  }
}

async function fetchRegistroCivilJSON(cedula) {
  try {
      const response = await fetch(`https://saccs.acess.gob.ec/wsc/registrocivil/infopersona/${cedula}`);
      const movies = await response.json();
      return movies;
  } catch (error) {
      return false
  }
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
    const reg = await Cliente.create(req.body);
    res.status(200).json({});
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

export const getByCedulaWebService = async (req, res) => {
  try {
    const { cedula } = req.params
    const reg = await fetchRegistroCivilJSON(cedula)
    if(reg.status === 0) return res.status(400).send({});
    const {Nombre, Domicilio, FechaNacimiento, NUI, Nacionalidad, Profesion, Sexo} = reg.response
    const model = {
        identificacion : NUI,
        nombres : Nombre,
        direccion : Domicilio,
        sexo : Sexo,
        nacionalidad : Nacionalidad,
        fechaNacimiento : FechaNacimiento,
        profesion : Profesion
    }
    //console.log(reg);
    res.status(200).json(model);
} catch (e) {
    res.status(500).send(e);
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
    await Drive.deleteMany({
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
