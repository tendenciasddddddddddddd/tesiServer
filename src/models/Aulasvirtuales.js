import { Schema, model } from "mongoose";

const AulasSchema = new Schema(
    {
        fkdocente:
        {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
        docente: String,
        nombre: String,
        paralelo: String,
        materia: String,
        codigo: String,
        estudiantes: [
            {
                fkestudiante: {
                    type: Schema.Types.ObjectId,
                    ref: "Estudiante",
                },
                estudiante: {}
            }
        ],
        //-----------------------------------------------------LIBROS----------------
        libros: [{
            tipo: String,
            title: String,
            archivo: [{
                link : String,
                tipo : String,
                size : String,
                name : String,
                formato : String,
                created_at : String,
            }],
            disponibilidad: String,
            fechOrden: String,
            descripcion: String,
            parcial : {},
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
            parcial : {},
            foro : [{
                fkestudiante: String,
                nombre: String,
                foto: String,
                context: String,
                fecha: String,
                like : [],
                nolike : [],
                subForo : [{
                    fkestudiante: String,
                    nombre: String,
                    foto: String,
                    context: String,
                    fecha: String,
                }]
            }]
        }],
        videos: [{
            tipo: String,
            title: String,
            archivo: [{
                link : String,
                tipo : String,
                size : String,
                name : String,
                formato : String,
                created_at : String,
            }],
            disponibilidad: String,
            fechOrden: String,
            parcial : {},
            foro : [{
                fkestudiante: String,
                nombre: String,
                foto: String,
                context: String,
                fecha: String,
                like : [],
                nolike : [],
                subForo : [{
                    fkestudiante: String,
                    nombre: String,
                    foto: String,
                    context: String,
                    fecha: String,
                }]
            }]
        }],
        youtube: [{
            tipo: String,
            title: String,
            link: String,
            disponibilidad: String,
            fechOrden: String,
            parcial : {},
            foro : [{
                fkestudiante: String,
                nombre: String,
                foto: String,
                context: String,
                fecha: String,
                like : [],
                nolike : [],
                subForo : [{
                    fkestudiante: String,
                    nombre: String,
                    foto: String,
                    context: String,
                    fecha: String,
                }]
            }]
        }],
        lecturas: [{
            tipo: String,
            title: String,
            content: String,
            disponibilidad: String,
            fechOrden: String,
            parcial : {},
        }],
        tareas: [{
            tipo: String,
            title: String,
            descripcion: String,
            archivo: [{
                link : String,
                tipo : String,
                size : String,
                name : String,
                formato : String,
                created_at : String,
              }],
            start: String,
            fechOrden: String,
            disponibilidad: String,
            fechad: String,
            parcial : String,
            ofIndex : String,
            entrega: [
                {
                    fkestudiante: String,
                    estudiante: {},
                    link: String,
                    nota: String,
                    observar: String,
                    comentario: String,
                }],
                foro : [{
                    fkestudiante: String,
                    nombre: String,
                    foto: String,
                    context: String,
                    fecha: String,
                    like : [],
                    nolike : [],
                    subForo : [{
                        fkestudiante: String,
                        nombre: String,
                        foto: String,
                        context: String,
                        fecha: String,
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
            parcial : {},
            fechad: String,
            intenAllowed: Number,
            revisar : String,
            publicar : String,
            security: String,
            surveys: [{
                question: String,
                options: [{}],
                reqq: [],
                tipo: Number,
                id: Number,
            }],
            answers: [{
                fkestudiante: String,
                responses: [{}],
                puntage: String
            }],
            archivo: [{
                link : String,
                tipo : String,
                size : String,
                name : String,
                formato : String,
                created_at : String,
              }],
        }]
    },
    {
        timestamps: true,
        versionKey: false
    }
);

export default model("Aulasvirtuals", AulasSchema);