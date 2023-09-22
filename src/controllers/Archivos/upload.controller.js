import multer from "multer";
const path = require("path");
const fs = require('fs');

const cloudinary = require('cloudinary');

cloudinary.config({
  cloud_name: 'stebann',
  api_key: '271159462412784',
  api_secret: 'xkvBEQuReYikF7WS-_LMHq-ogWs',
});


const storage = multer.diskStorage({
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

exports.upload = upload.single("myFile");

export const resizeImages = async (req, res, next) => {
  try {
    var ext = path.extname(req.file.filename).toLowerCase();
    const resultado = await cloudinary.v2.uploader.upload(req.file.path, { height: 128, crop: "thumb" });
    res.json(resultado.secure_url);
    next();
  } catch (error) {
    res.status(500).json("Los formatos aceptados son .png .jpg .jpeg");
    next();
  }

};

export const resizeImages2 = async (req, res, next) => {

  try {
    const resultado = await cloudinary.v2.uploader.upload(req.file.path, { folder: 'tasks', height: 350 });
    res.json(resultado.secure_url);
  } catch (error) {
    res.status(500).json("Los formatos aceptados son .png .jpg .jpeg");
    next();
  }
};

export const submitFilesPlanificacion = async (req, res, next) => {
  try {
    const resultado = await cloudinary.v2.uploader.upload(req.file.path, { folder: 'planificaciones', resource_type: "auto" });

    res.json(resultado);
  } catch (error) {
    console.log(error);
    res.status(500).json("Los formatos aceptados son .png .jpg .jpeg");
    next();
  }
};

export const submitFilesAulas = async (req, res, next) => {
  try {
    const resultado = await cloudinary.v2.uploader.upload(req.file.path, { folder: 'aulas', resource_type: "auto" });

    res.json(resultado);
  } catch (error) {
    console.log(error);
    res.status(500).json("Los formatos aceptados son .png .jpg .jpeg");
    next();
  }
};

//================================SUBIR VIDEOS =================================

const storage2 = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'videos')
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`)
  }
})

const upload2 = multer({ storage: storage2 })

exports.upload2 = upload2.single('myFile')

export const submitVideos = async (req, res) => {
  try {
    var ext = path.extname(req.file.filename).toLowerCase();
    if (ext === '.mp4' || ext === '.webm'|| ext === '.mov'|| ext === '.ogv') {
      res.send(req.file)
    }
    else {
      const deleteFile = './videos/' + req.file.filename
      fs.unlink(deleteFile, (err) => {
      })
      res.send(null)
    }
  } catch (error) {
    console.log(error);
    res.status(500).json("Los formatos aceptados son .png .jpg .jpeg");
  }
};

export const eliminar = async (req, res) => {
  try {
    const {nombre} = req.body
    const deleteFile = './archivoss/vid2024/'+nombre
    fs.unlink(deleteFile, (err) => {
      if (err) {
      }
    })
    res.send('req.file')
  } catch (error) {
    console.log(error);
    res.status(500).json("Los formatos aceptados son .png .jpg .jpeg");
  }
};

//================================SUBIR IMAGES =================================

const storage3 = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'archivoss/img2024')
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`)
  }
})

const upload3 = multer({ storage: storage3 })

exports.upload3 = upload3.single('myFile')

export const submitImages = async (req, res) => {
  try {
    var ext = path.extname(req.file.filename).toLowerCase();
    if (ext === '.png' || ext === '.jpg'|| ext === '.jpeg'|| ext === '.svg') {
      res.send(req.file)
    }
    else {
      const deleteFile = './archivoss/img2024/' + req.file.filename
      fs.unlink(deleteFile, (err) => {
      })
      res.send(null)
    }
  } catch (error) {
    console.log(error);
    res.status(500).json("Los formatos aceptados son .png .jpg .jpeg");
  }
};
