import User from "../../models/registros/Estudiante";
import Role from "../../models/Role";
import Matriculas from "../../models/Matriculas";

async function editarMatricula(keyEstudiante, modelo) {
  try {
    const estudiante = {
      _id: modelo._id,
      fullname: modelo.fullname,
      cedula: modelo.cedula,
    }
    await Matriculas.updateMany({}, { $set: { "matriculas.$[perf].estudiante" :estudiante } },
    {
      arrayFilters: [{
        "perf.fkestudiante": {$eq : keyEstudiante}}],
      new: true,
    });
  } catch (error) {
    
  }
}

async function eliminarMatricula(array) {
  try {
    await Matriculas.updateMany({}, { $pull: { matriculas : { fkestudiante: array } } },);
  } catch (error) {  
  }
}

export const getEstudiantes = async (req, res) => {
  try {
    const limit = parseInt(req.query.take);
    const skip = parseInt(req.query.page);
    const total = await User.countDocuments();
    const paginas = Math.ceil(total / limit);
    const usuarios = await User.find().skip((limit * skip) - limit).limit(limit).sort({ createdAt: -1 });
    const coleccion = {
      usuarios: usuarios,
      pagina: skip,
      paginas: paginas,
      total: total
    }
    return res.json(coleccion);
  } catch (error) {
    return res.status(500).json(error);
  }
}

//--------------------------------LISTA PARA FILTROS [MATRICULAS, ]  --------------------
export const getListasEstudiantes = async (req, res) => {
  try {
    const result = await User.find().lean().select({ fullname: 1,  cedula: 1 });
    return res.json(result);
  } catch (error) {
    return res.status(500).json(error);
  }
}
//--------------------------------LISTA PARA FILTROS [AULAS, ]  --------------------
export const getListEstudAulas = async (req, res) => {
  try {
    const result = await User.find().lean().select({ fullname: 1,  cedula: 1, foto:1 ,telefono:1});
    return res.json(result);
  } catch (error) {
    return res.status(500).json(error);
  }
}
//--------------------------------OPTENEMOS UN USUARIO POR ID--------------------
export const getEstudianteById = async (req, res) => {
  try {
    const { id } = req.params
    const usuarios = await User.findById(id);
    res.status(200).json(usuarios);
  } catch (error) {
    return res.status(500).json(error);
  }
}

//--------------------------------EDITAR USUARIO POR EL ID--------------------
export const updateEstudianteById = async (req, res) => {
  try {
    const updatedUsuarios = await User.findByIdAndUpdate(
      req.params.usuariosId,
      req.body,
      {
        new: true,
      }
    );
    await editarMatricula(req.params.usuariosId, req.body)
    res.status(200).json(updatedUsuarios);
  } catch (error) {
    return res.status(500).json(error);
  }
}

//--------------------------------EDITAR USUARIO PARA REPRESENTANTE-------------------
export const updateRepresentante = async (req, res) => {
  try {
    const updatedUsuarios = await User.findByIdAndUpdate(
      req.params.usuariosId,
      req.body,
      {
        new: true,
      }
    );
    res.status(200).json(updatedUsuarios);
  } catch (error) {
    return res.status(500).json(error);
  }
}

//--------------------------------ELIMINAR USUARIOS POR EL ID--------------------
export const deleteEstudianteById = async (req, res) => {
  try {
    let cadenaId = req.params.id;
    const array = cadenaId.split(",");
    await User.deleteMany({
      _id: {
        $in: array,
      },
    });
    await eliminarMatricula(array)
    res.status(200).json();
  } catch (e) {
    return res.status(500).json();
  }
}

//--------------------------------CREAR ESTUDIANTE--------------------
export const createEstudiante = async (req, res) => {
  try {
    const {
      email, password, roles, status, cedula, foto, fullname, ifPassword
    } = req.body;
    const newUser = new User({
      email, status, foto, cedula, fullname,ifPassword,
      password: await User.encryptPassword(password),
    });
    const role = await Role.findOne({
      name: "Estudiante"
    });
    newUser.roles = [role._id];
    const savedUser = await newUser.save();
    return res.status(200).json({
      savedUser
    });
  } catch (error) {
    return res.status(500).json({ message: 'Problem' });
  }
};

//--------------------------------CREAR ESTUDIANTE MASIVOS--------------------
export const createEstudianteMany = async (req, res) => {
  try {
    let array = req.body;
    const docs = [];
    const duplicados = []
    const role = await Role.findOne({
      name: "Estudiante"
    });
    for (let i = 0; i < array.length; i++) {
      const ifcedula = await User.findOne({ cedula: array[i].cedula });
      if (ifcedula) {
        duplicados.push(array[i])
      } else {
        array[i].password = await User.encryptPassword(array[i].password)
        array[i].roles = [role._id];
        docs.push(array[i])
      }
    }
    if (docs) {
      const options = { ordered: false };
      await User.insertMany(docs, options);
    }
    return res.status(200).json({
      duplicados
    });
  } catch (error) {
    return res.status(500).json({ message: 'Problem' });
  }
};

//--------------------------------ACTUALIZAR INFORMEACIONS ESTUDIANTE MASIVOS--------------------
export const updateEstudianteMany = async (req, res) => {
  try {
    let array = req.body;
    const exist = []
    const noexist = []
    for (let i = 0; i < array.length; i++) {
      const founds = await User.findOne({ cedula: array[i].cedula });
      if (founds) {
        exist.push(array[i])
        if(founds.information) continue;
        await User.findByIdAndUpdate(
          founds._id,
          array[i],
          {
            new: true,
          }
        );
      } else {
        noexist.push(array[i])
      }
    }
    return res.status(200).json(noexist);
  } catch (error) {
    return res.status(500).json({ message: 'Problem' });
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
    const result = await User.find({ fullname: { '$regex': querys, "$options": "i" }});
    res.status(200).json(result);
  } catch (error) {
    res.status(500).send({
      message: "Ocurrió un error",
    });
  }
};