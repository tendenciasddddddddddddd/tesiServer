import Matriculas from "../../models/Matriculas";
import Distributivo from "../../models/distributivos/Distributivo";
import { promedioReportes } from "./helper/promReporte";
import Configure from "../../models/Configure";
import { client } from "../../middlewares/rediss";
const ejs = require("ejs");
const pdf = require('html-pdf');
var fs = require('fs');
var options = { format: 'A4', border:'23px' };
const { formatPromociones, formatMatricula,formatLibretas,formatJuntas,formatInforme} = promedioReportes();
async function autoridad () {
    try {
        const reply = await client.get("5001autoridades");
        if (reply) return JSON.parse(reply);
        const result = await Configure.find().lean();
        await client.set('5001autoridades',JSON.stringify(result), { EX: 36000});
        return result
      } catch (error) {
        console.log(error);
      }
}
function makeid(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
}
export default {
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
            const tema = await ejs.renderFile(__dirname + "/themes/promocion.ejs", { result: result,auth: auth[0],nextCourse:nextCourse });
            res.status(200).json(tema);
        } catch (error) {
            console.log(error);
            return res.status(500).json(error);
        }
    },
    promocionPdf: async (req, res) => {
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
            const tema = await ejs.renderFile(__dirname + "/themes/promocion.ejs", { result: result,auth: auth[0],nextCourse:nextCourse });
            var name = makeid(10)
            pdf.create(tema, options).toFile('./document/'+name+'.pdf', function(err, data) {
                if (err) return res.send(err);
                res.send(name);
            });
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
            const tema = await ejs.renderFile(__dirname + "/themes/matricula.ejs", { result: result,auth: auth[0] });
            res.status(200).json(tema);
        } catch (error) {
            console.log(error);
            return res.status(500).json(error);
        }
    },
    matriculaPdf: async (req, res) => {
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
            const tema = await ejs.renderFile(__dirname + "/themes/matricula.ejs", { result: result,auth: auth[0] });
            var name = makeid(10)
            pdf.create(tema, options).toFile('./document/'+name+'.pdf', function(err, data) {
                if (err) return res.send(err);
                res.send(name);
            });
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
                result = formatLibretas(rowM, rowD, estudiantes,ops.quimestre)
            }
            const auth = await autoridad()
            const tema = await ejs.renderFile(__dirname + "/themes/libretas.ejs", { result: result,auth: auth[0], ops:ops });
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
                result = formatJuntas(rowM, rowD, estudiantes,ops.quimestre,paralelo)
            }
            const auth = await autoridad()
            const tema = await ejs.renderFile(__dirname + "/themes/juntas.ejs", { result: result,auth: auth[0], ops:ops });
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
            const tema = await ejs.renderFile(__dirname + "/themes/informe.ejs", { result: result,auth: auth[0] });
            res.status(200).json(tema);
        } catch (error) {
            console.log(error);
            return res.status(500).json(error);
        }
    },
}