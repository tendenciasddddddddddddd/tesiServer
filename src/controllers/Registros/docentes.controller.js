import User from "../../models/User";
import Role from "../../models/Role";
import Tutores from "../../models/distributivos/Tutores";
import Distributivo from "../../models/distributivos/Distributivo";
import Matriculas from "../../models/Matriculas";

async function editarTutores(iddocente, modelo) {
  try {
    const docente = {
      _id: modelo._id,
      fullname: modelo.fullname,
    }
    await Tutores.updateMany({ fkdocente: iddocente }, { $set: { docente: docente} });
  } catch (error) {
    
  }
}
async function editarDistributivo(iddocente, modelo) {
  try {
    const docente = {
      _id: modelo._id,
      fullname: modelo.fullname,
    }
    await Distributivo.updateMany({}, { $set: { "carga.$[perf].docente" :docente } },
    {
      arrayFilters: [{
        "perf.fkdocentes": {$eq : iddocente}}],
      new: true,
    });
  } catch (error) {
    
  }
}

async function editarMatriculas(iddocente, modelo) {
  try {
    const docente = {
      _id: modelo._id,
      fullname: modelo.fullname,
    }
    const reg = await Matriculas.find({"matriculas.computo.fkdocentes": iddocente})
    if (reg) {
      for (let i = 0; i < reg.length; i++) {
        const element = reg[i].matriculas;
        for (let j = 0; j < element.length; j++) {
          const subElement = element[j].computo;
          for (let m = 0; m < subElement.length; m++) {
            const Inelement = subElement[m];
            if (Inelement.fkdocente ==iddocente) {
              await Matriculas.updateOne(
                { _id: reg[i]._id },
                { $set: 
                    { 
                      "matriculas.$[perf].computo.$[est].docente": docente,
                    } 
                },
                {
                    arrayFilters: [{
                        "perf._id": {$eq : element[j]._id}},
                        {"est.fkdocente": {$eq : iddocente}}],
                    new: true,
                }
              );
            }
          }
        }
      }
    }
  } catch (error) {
    
  }
}

async function eliminarTutores(array) {
  try {
    await Tutores.deleteMany({ fkdocente: { $in: array }});
  } catch (error) {
    
  }
}
async function eliminarDistributivo(array) {
  try {
    await Distributivo.updateMany({}, { $pull: { carga : { fkdocentes: array } } },); 
  } catch (error) {
    
  }
}
//--------------------------------EDITAR USUARIO POR EL ID--------------------
export const updateDocenteById = async (req, res) => {
  try {
    const updatedUsuarios = await User.findByIdAndUpdate(
      req.params.usuariosId,
      req.body,
      {
        new: true,
      }
    );
    editarTutores(req.params.usuariosId, req.body)
    editarDistributivo(req.params.usuariosId, req.body)
    editarMatriculas(req.params.usuariosId, req.body)
    res.status(200).json(updatedUsuarios);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
}
export const updatePerfil = async (req, res) => {
  try {
    const updatedUsuarios = await User.findByIdAndUpdate(
      req.params.usuario,
      req.body,
      {
        new: true,
      }
    );
    res.status(200).json(updatedUsuarios);
  } catch (err) {
    return res.status(500).json(err);
  }
}
export const getDocentes = async (req, res) => {
  try {
    const limit = parseInt(req.query.take);
    const skip = parseInt(req.query.page);
    const total = await User.countDocuments({ typo: { $in: ["DOCS"] } });
    const paginas = Math.ceil(total / limit);
    const usuarios = await User.find({ typo: { $in: ["DOCS"] } }).skip((limit * skip) - limit).limit(limit).sort({ updatedAt: -1 });
    const coleccion = {
      usuarios: usuarios,
      pagina: skip,
      paginas: paginas,
      total: total
    }
    return res.json(coleccion);
  } catch (error) {
    return res.status(500).json(err);
  }
}


//--------------------------------LISTA PARA FILTROS [DISTRIBUTIVO, ]  --------------------
export const getListasDocentes = async (req, res) => {
  try {
    const products = await User.find({ typo: { $in: ["DOCS"] } }).lean().select({ fullname: 1, cedula: 1 });
    return res.json(products);
  } catch (error) {
    return res.status(500).json(err);
  }
}

//--------------------------------OPTENEMOS UN USUARIO POR ID--------------------
export const getDocenteById = async (req, res) => {
  try {
    const { id } = req.params;
    const usuarios = await User.findById(id);
    res.status(200).json(usuarios);
  } catch (error) {
    return res.status(500).json(err);
  }
}


//--------------------------------ELIMINAR USUARIOS POR EL ID--------------------
export const deleteDocenteById = async (req, res) => {
  try {
    let cadenaId = req.params.id;
    const array = cadenaId.split(",");
    await User.deleteMany({
      _id: {
        $in: array,
      },
    });
    eliminarTutores(array )
    eliminarDistributivo(array)
    res.status(200).json();
  } catch (e) {
    console.log(e);
    return res.status(500).json();
  }
}

//--------------------------------CREAR ESTUDIANTE--------------------
export const createDocentes = async (req, res) => {
  try {
    const {
      email, password, roles, status, cedula, foto, fullname, ifPassword, typo
    } = req.body;
    const newUser = new User({
      email, status, foto, cedula, fullname, ifPassword, typo,
      password: await User.encryptPassword(password),
    });
    const role = await Role.findOne({
      name: "Docente"
    });
    newUser.roles = [role._id];
    const savedUser = await newUser.save();
    return res.status(200).json({
      savedUser
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Problem' });
  }
};

//--------------------------------CREAR DOCENTE--------------------
export const createDocenteMany = async (req, res) => {
  try {
    let array = req.body;
    const docs = [];
    const duplicados = []
    const role = await Role.findOne({
      name: "Docente"
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
    const result = await User.find({ fullname: { '$regex': querys, "$options": "i" } });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).send({
      message: "Ocurrió un error",
    });
  }
};
