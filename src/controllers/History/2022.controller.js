import Matriculas from "../../models/Respaldo";
import Distributivo from "../../models/history/Dis2023";
import { promedioReportes } from "./helper/promReporte";
import Configure from "../../models/Configure";
import { client, claveOnPort } from "../../middlewares/rediss";
const ejs = require("ejs");
const { formatPromociones, formatMatricula, formatLibretas, formatJuntas, formatInforme, formatFinal, formatParcial,
    formatQuimestral, formatAnual, formatJuntasIndividual, formatJuntasFinal } = promedioReportes();
async function autoridad() {
    try {
        const reply = await client.get(`${claveOnPort}autoridades`);
        if (reply) return JSON.parse(reply);
        const result = await Configure.findOne()
        await client.set(`${claveOnPort}autoridades`, JSON.stringify(result), { EX: 36000 });
        return result
    } catch (error) {
        console.log(error);
    }
}
export default {
  //======================LISTAR MATRICULAS PARA LOS REPORTES =================================
   getById: async (req, res) => {
    try {
      const { id } = req.params;
      const result = await Matriculas.find({
        fkcurso: {
          $in: [id],
        },
      }).lean()
      .select({ curso:1,fkcurso:1,fkperiodo:1,paralelo:1,
        "matriculas.estudiante": 1,"matriculas.fkestudiante": 1,
        'matriculas._id': 1,});
      res.status(200).json(result);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  },
    promocion: async (req, res) => {
        try {
            const arr = req.body.data
            const nextCourse = req.body.nextCourse
            let idMatricula = '';
            let idCurso = '';
            let paralelo = '';
            const estudiantes = [];
            for (let i = 0; i < arr.length; i++) {
                const element = arr[i];
                idMatricula = element.key;
                idCurso = element.curso?._id
                paralelo = element.paralelo
                estudiantes.push(element._id)
            }
            var result = [];
            if (arr) {
                const rowM = await Matriculas.findById(idMatricula)
                const rowD = await Distributivo.findOne({ fkcurso: idCurso, paralelo: paralelo });
                result = formatPromociones(rowM, rowD, estudiantes)
            }
            const auth = await autoridad()
            const tema = await ejs.renderFile(__dirname + "/themes/promocion.ejs", { result: result, auth, nextCourse: nextCourse });
            res.status(200).json(tema);
        } catch (error) {
            console.log(error);
            return res.status(500).json(error);
        }
    },
    matricula: async (req, res) => {
        try {
            const arr = req.body
            
            let idMatricula = '';
            const estudiantes = [];
            for (let i = 0; i < arr.length; i++) {
                const element = arr[i];
                idMatricula = element.key;
                estudiantes.push(element._id)
            }
            var result = [];
            if (arr) {
                const rowM = await Matriculas.findById(idMatricula)
                
                result = formatMatricula(rowM, estudiantes)
                
            }
            const auth = await autoridad()
            const tema = await ejs.renderFile(__dirname + "/themes/matricula.ejs", { result: result, auth });
           // console.log(tema)
            res.status(200).json(tema);
        } catch (error) {
            console.log(error);
            return res.status(500).json(error);
        }
    },
    libretas: async (req, res) => {
        try {
            const arr = req.body.data
            const ops = req.body.ops;
            let idMatricula = '';
            let idCurso = '';
            let paralelo = '';
            const estudiantes = [];
            for (let i = 0; i < arr.length; i++) {
                const element = arr[i];
                idMatricula = element.key;
                idCurso = element.curso?._id
                paralelo = element.paralelo
                estudiantes.push(element._id)
            }
            var result = [];
            if (arr) {
                const rowM = await Matriculas.findById(idMatricula)
                const rowD = await Distributivo.findOne({ fkcurso: idCurso, paralelo: paralelo });
                result = formatLibretas(rowM, rowD, estudiantes, ops.quimestre)
            }
            const auth = await autoridad()
            const tema = await ejs.renderFile(__dirname + "/themes/libretas.ejs", { result: result, auth, ops: ops });
            res.status(200).json(tema);
        } catch (error) {
            console.log(error);
            return res.status(500).json(error);
        }
    },
    juntas: async (req, res) => {
        try {
            const arr = req.body.data
            const ops = req.body.ops;
            let idMatricula = '';
            let idCurso = '';
            let paralelo = '';
            const estudiantes = [];
            for (let i = 0; i < arr.length; i++) {
                const element = arr[i];
                idMatricula = element.key;
                idCurso = element.curso?._id
                paralelo = element.paralelo
                estudiantes.push(element._id)
            }
            var result = [];
            if (arr) {
                const rowM = await Matriculas.findById(idMatricula)
                const rowD = await Distributivo.findOne({ fkcurso: idCurso, paralelo: paralelo });
                result = formatJuntas(rowM, rowD, estudiantes, ops.quimestre, paralelo)
            }
            const auth = await autoridad()
            const tema = await ejs.renderFile(__dirname + "/themes/juntas.ejs", { result: result, auth, ops: ops });
            res.status(200).json(tema);
        } catch (error) {
            console.log(error);
            return res.status(500).json(error);
        }
    },
    juntasIndividual: async (req, res) => {
        try {
            const arr = req.body.data
            const ops = req.body.ops;
            let idMatricula = '';
            let idCurso = '';
            let paralelo = '';
            let keymateria = '';
            const estudiantes = [];
            for (let i = 0; i < arr.length; i++) {
                const element = arr[i];
                idMatricula = element.key;
                idCurso = element.curso?._id
                paralelo = element.paralelo
                estudiantes.push(element._id)
                keymateria = element.keymateria
            }
            var result = [];
            if (arr.length > 0) {
                const rowM = await Matriculas.findById(idMatricula)
                const rowD = await Distributivo.findOne({ fkcurso: idCurso, paralelo: paralelo });
                result = formatJuntasIndividual(rowM, rowD, estudiantes, ops.quimestre, paralelo, keymateria)
            }
            const auth = await autoridad()
            const tema = await ejs.renderFile(__dirname + "/themes/juntas.ejs", { result: result, auth, ops: ops });
            res.status(200).json(tema);
        } catch (error) {
            console.log(error);
            return res.status(500).json(error);
        }
    },
    juntasFinal: async (req, res) => {
        try {
            const arr = req.body.data
            const ops = req.body.ops;
            let idMatricula = '';
            let idCurso = '';
            let paralelo = '';
            let keymateria = '';
            const estudiantes = [];
            for (let i = 0; i < arr.length; i++) {
                const element = arr[i];
                idMatricula = element.key;
                idCurso = element.curso?._id
                paralelo = element.paralelo
                estudiantes.push(element._id)
                keymateria = element.keymateria
            }
            var result = [];
            if (arr.length > 0) {
                const rowM = await Matriculas.findById(idMatricula)
                const rowD = await Distributivo.findOne({ fkcurso: idCurso, paralelo: paralelo });
                result = formatJuntasFinal(rowM, rowD, estudiantes, ops.quimestre, paralelo, keymateria)
            }
            const auth = await autoridad()
            const tema = await ejs.renderFile(__dirname + "/themes/juntasAnual.ejs", { result: result, auth, ops: ops });
            res.status(200).json(tema);
        } catch (error) {
            console.log(error);
            return res.status(500).json(error);
        }
    },
    informe: async (req, res) => {
        try {
            const arr = req.body.data
            let idMatricula = '';
            let idCurso = '';
            let paralelo = '';
            const estudiantes = [];
            for (let i = 0; i < arr.length; i++) {
                const element = arr[i];
                idMatricula = element.key;
                idCurso = element.curso?._id
                paralelo = element.paralelo
                estudiantes.push(element._id)
            }
            var result = [];
            if (arr) {
                const rowM = await Matriculas.findById(idMatricula)
                const rowD = await Distributivo.findOne({ fkcurso: idCurso, paralelo: paralelo });
                result = formatInforme(rowM, rowD, estudiantes,)
            }
            const auth = await autoridad()
            const tema = await ejs.renderFile(__dirname + "/themes/informe.ejs", { result: result, auth });
            res.status(200).json(tema);
        } catch (error) {
            console.log(error);
            return res.status(500).json(error);
        }
    },
    final: async (req, res) => {
        try {
            const arr = req.body.data
            let idMatricula = '';
            let idCurso = '';
            let paralelo = '';
            const estudiantes = [];
            for (let i = 0; i < arr.length; i++) {
                const element = arr[i];
                idMatricula = element.key;
                idCurso = element.curso?._id
                paralelo = element.paralelo
                estudiantes.push(element._id)
            }
            var result = [];
            if (arr) {
                const rowM = await Matriculas.findById(idMatricula)
                const rowD = await Distributivo.findOne({ fkcurso: idCurso, paralelo: paralelo });
                result = formatFinal(rowM, rowD, estudiantes,)
            }
            const auth = await autoridad()
            const tema = await ejs.renderFile(__dirname + "/themes/final.ejs", { result: result, auth });
            res.status(200).json(tema);
        } catch (error) {
            console.log(error);
            return res.status(500).json(error);
        }
    },
    parcial: async (req, res) => {
        try {
            const arr = req.body.data
            const ops = req.body.ops;
            let idMatricula = '';
            let idCurso = '';
            let paralelo = '';
            const estudiantes = [];
            for (let i = 0; i < arr.length; i++) {
                const element = arr[i];
                idMatricula = element.key;
                idCurso = element.curso?._id
                paralelo = element.paralelo
                estudiantes.push(element._id)
            }
            var result = [];
            if (arr) {
                const rowM = await Matriculas.findById(idMatricula)
                const rowD = await Distributivo.findOne({ fkcurso: idCurso, paralelo: paralelo });
                result = formatParcial(rowM, rowD, estudiantes, ops)
            }
            const auth = await autoridad()
            const tema = await ejs.renderFile(__dirname + "/themes/parcial.ejs", { result: result, auth, ops: ops, paralelo: paralelo });
            res.status(200).json(tema);
        } catch (error) {
            console.log(error);
            return res.status(500).json(error);
        }
    },
    quimestral: async (req, res) => {
        try {
            const arr = req.body.data
            const ops = req.body.ops;
            let idMatricula = '';
            let idCurso = '';
            let paralelo = '';
            const estudiantes = [];
            for (let i = 0; i < arr.length; i++) {
                const element = arr[i];
                idMatricula = element.key;
                idCurso = element.curso?._id
                paralelo = element.paralelo
                estudiantes.push(element._id)
            }
            var result = [];
            if (arr) {
                const rowM = await Matriculas.findById(idMatricula)
                const rowD = await Distributivo.findOne({ fkcurso: idCurso, paralelo: paralelo });
                result = formatQuimestral(rowM, rowD, estudiantes, ops)
            }
            const auth = await autoridad()
            const tema = await ejs.renderFile(__dirname + "/themes/quimestral.ejs", { result: result, auth, ops: ops, paralelo: paralelo });
            res.status(200).json(tema);
        } catch (error) {
            console.log(error);
            return res.status(500).json(error);
        }
    },
    anual: async (req, res) => {
        try {
            const arr = req.body.data
            const ops = req.body.ops;
            let idMatricula = '';
            let idCurso = '';
            let paralelo = '';
            const estudiantes = [];
            for (let i = 0; i < arr.length; i++) {
                const element = arr[i];
                idMatricula = element.key;
                idCurso = element.curso?._id
                paralelo = element.paralelo
                estudiantes.push(element._id)
            }
            var result = [];
            if (arr) {
                const rowM = await Matriculas.findById(idMatricula)
                const rowD = await Distributivo.findOne({ fkcurso: idCurso, paralelo: paralelo });
                result = formatAnual(rowM, rowD, estudiantes)
            }
            const auth = await autoridad()
            const tema = await ejs.renderFile(__dirname + "/themes/anual.ejs", { result: result, auth, paralelo: paralelo });
            res.status(200).json(tema);
        } catch (error) {
            console.log(error);
            return res.status(500).json(error);
        }
    },
    Ambitos: async (req, res) => {
        try {
            const arr = req.body
            var fechaA = fechaActual()
            const auth = await autoridad()
            const tema = await ejs.renderFile(__dirname + "/themes/ambitos.ejs", { result: arr, auth, fechaA:fechaA });
            res.status(200).json(tema);
        } catch (error) {
            console.log(error);
            return res.status(500).json(error);
        }
    },
    Destrezas: async (req, res) => {
        try {
            const arr = req.body
            var fechaA = fechaActual()
            const auth = await autoridad()
            const tema = await ejs.renderFile(__dirname + "/themes/destrezas.ejs", { result: arr, auth, fechaA:fechaA });
            res.status(200).json(tema);
        } catch (error) {
            console.log(error);
            return res.status(500).json(error);
        }
    },
}


const fechaActual = () => {
    const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
        "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    const dateObj = new Date();
    const month = monthNames[dateObj.getMonth()];
    const day = String(dateObj.getDate()).padStart(2, '0');
    const year = dateObj.getFullYear();
    const output = day + " de " + month + '\n' + ' del ' + year;
    return output
}