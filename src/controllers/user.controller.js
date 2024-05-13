import User from "../models/User.js";
import Role from "../models/Role.js";

export const getUsuarios = async (req, res) => {
  try {
    const limit = parseInt(req.query.take);
    const skip = parseInt(req.query.page);
    const total = await User.countDocuments({  visible: true });
    const paginas = Math.ceil(total / limit);
    const reg = await User.find({ visible: true })
      .skip(limit * skip - limit)
      .limit(limit);
    const coleccion = {
      reg: reg,
      pagina: skip,
      paginas: paginas,
      total: total,
    };
    return res.json(coleccion);
  } catch (error) {
    return res.status(500).json(err);
  }
};

export const getBuscadorUsuarios = async (req, res) => {
  try {
    const usuarios = await User.find({ visible: true })
      .lean()
      .select({ fullname: 1, cedula: 1, email: 1, status: 1 });
    const coleccion = {
      usuarios: usuarios,
    };
    return res.json(coleccion);
  } catch (error) {
    return res.status(500).json(err);
  }
};

export const getLista = async (req, res) => {
  try {
    const usuarios = await User.find()
    res.status(200).json(usuarios);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const getUsuariosById = async (req, res) => {
  try {
    const usuarios = await User.findById(req.params.id);
    res.status(200).json(usuarios);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const updateUsuariosById = async (req, res) => {
  try {
    const updatedUsuarios = await User.findByIdAndUpdate(
      req.params.usuariosId,
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

export const deleteUsuariosById = async (req, res) => {
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
    const roless = await Role.find();
    return res.json(roless);
  } catch (error) {
    return res.status(500).json(err);
  }
};

export const createUser = async (req, res) => {
  try {
    const rolesFound = await Role.find({ name: 'Tramitador'});
    req.body['roles'] = rolesFound.map((role) => role._id)
    req.body.password = await User.encryptPassword(req.body.password);
    const reg = await User.insertMany(req.body);
    res.status(200).json(reg);
} catch (e) {
  console.log(e);
    res.status(500).send({
        message: 'Ocurrió un error'
    });
}
};

export const activate = async (req, res, next) => {
  try {
    const reg = await User.findByIdAndUpdate(
      { _id: req.params.id },
      { status: req.query.state }
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
    const result = await User.find({ fullname: { '$regex': querys, "$options": "i" }, typo: { $in: ["ADMS"] } });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).send({
      message: "Ocurrió un error",
    });
  }
};