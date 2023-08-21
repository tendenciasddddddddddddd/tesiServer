"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = require("mongoose");

var AulasSchema = new _mongoose.Schema({
  fkdocente: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  docente: String,
  nombre: String,
  paralelo: String,
  materia: String,
  codigo: String,
  estudiantes: [{
    fkestudiante: {
      type: _mongoose.Schema.Types.ObjectId,
      ref: "Estudiante"
    },
    estudiante: {}
  }],
  //-----------------------------------------------------LIBROS----------------
  libros: [{
    tipo: String,
    title: String,
    archivo: [{
      link: String,
      tipo: String,
      size: String,
      name: String,
      formato: String,
      created_at: String
    }],
    disponibilidad: String,
    fechOrden: String,
    descripcion: String,
    parcial: String,
    ofIndex: String
  }],
  //-----------------------------------------------------FOROS----------------
  foros: [{
    tipo: String,
    title: String,
    disponibilidad: String,
    fechOrden: String,
    start: String,
    fechad: String,
    descripcion: String,
    parcial: String,
    ofIndex: String,
    foro: [{
      fkestudiante: String,
      nombre: String,
      foto: String,
      context: String,
      fecha: String,
      like: [],
      nolike: [],
      subForo: [{
        fkestudiante: String,
        nombre: String,
        foto: String,
        context: String,
        fecha: String
      }]
    }]
  }],
  videos: [{
    tipo: String,
    title: String,
    archivo: [{
      link: String,
      tipo: String,
      size: String,
      name: String,
      formato: String,
      created_at: String
    }],
    disponibilidad: String,
    fechOrden: String,
    parcial: String,
    ofIndex: String,
    foro: [{
      fkestudiante: String,
      nombre: String,
      foto: String,
      context: String,
      fecha: String,
      like: [],
      nolike: [],
      subForo: [{
        fkestudiante: String,
        nombre: String,
        foto: String,
        context: String,
        fecha: String
      }]
    }]
  }],
  youtube: [{
    tipo: String,
    title: String,
    link: String,
    disponibilidad: String,
    fechOrden: String,
    parcial: String,
    ofIndex: String,
    foro: [{
      fkestudiante: String,
      nombre: String,
      foto: String,
      context: String,
      fecha: String,
      like: [],
      nolike: [],
      subForo: [{
        fkestudiante: String,
        nombre: String,
        foto: String,
        context: String,
        fecha: String
      }]
    }]
  }],
  lecturas: [{
    tipo: String,
    title: String,
    content: String,
    disponibilidad: String,
    fechOrden: String,
    parcial: String,
    ofIndex: String
  }],
  tareas: [{
    tipo: String,
    title: String,
    descripcion: String,
    archivo: [{
      link: String,
      tipo: String,
      size: String,
      name: String,
      formato: String,
      created_at: String
    }],
    start: String,
    fechOrden: String,
    disponibilidad: String,
    fechad: String,
    parcial: String,
    ofIndex: String,
    entrega: [{
      fkestudiante: String,
      estudiante: {},
      link: String,
      nota: String,
      observar: String,
      comentario: String
    }],
    foro: [{
      fkestudiante: String,
      nombre: String,
      foto: String,
      context: String,
      fecha: String,
      like: [],
      nolike: [],
      subForo: [{
        fkestudiante: String,
        nombre: String,
        foto: String,
        context: String,
        fecha: String
      }]
    }]
  }],
  evaluacion: [{
    tipo: String,
    title: String,
    descripcion: String,
    start: String,
    end: String,
    fechOrden: String,
    tempo: {},
    disponibilidad: String,
    parcial: String,
    ofIndex: String,
    fechad: String,
    intenAllowed: Number,
    revisar: String,
    publicar: String,
    security: String,
    surveys: [{
      question: String,
      options: [{}],
      reqq: [],
      tipo: Number,
      id: Number
    }],
    answers: [{
      fkestudiante: String,
      responses: [{}],
      puntage: String
    }],
    archivo: [{
      link: String,
      tipo: String,
      size: String,
      name: String,
      formato: String,
      created_at: String
    }]
  }]
}, {
  timestamps: true,
  versionKey: false
});

var _default = (0, _mongoose.model)("Aulasvirtuals", AulasSchema);

exports.default = _default;