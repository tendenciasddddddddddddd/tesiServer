import Matriculas from "../../models/Matriculas";
import Distributivo from "../../models/distributivos/Distributivo";
import { promedioReportes } from "./helper/promReporte";
import { reporteSuper } from "./helper/repo/reporteSuper";
import { reporteElement } from "./helper/repo/reporteElement";
import Configure from "../../models/Configure";
import User from "../../models/User";
import { client } from "../../middlewares/rediss";

const ejs = require("ejs");
const { formatPromociones, formatMatricula, formatLibretas, formatJuntas, formatInforme, formatFinal, formatParcial,
    formatQuimestral, formatAnual, formarNomina, formatJuntasIndividual, formatJuntasFinal } = promedioReportes();
const {juntasOnly, juntasFinal} = reporteElement()

const {juntasExamProyec} = reporteSuper()

async function autoridad() {
    try {
        const reply = await client.get("3000autoridades");
        if (reply) return JSON.parse(reply);
        const result = await Configure.find().lean();
        await client.set('3000autoridades', JSON.stringify(result), { EX: 36000 });
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
            const tema = await ejs.renderFile(__dirname + "/themes/promocion.ejs", { result: result, auth: auth[0], nextCourse: nextCourse });
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
            //const tema = await ejs.renderFile(__dirname + "/themes/promocion.ejs", { result: result,auth: auth[0],nextCourse:nextCourse });
            var name = makeid(10)
            res.send(name);
            // pdf.create(tema, options).toFile('./document/'+name+'.pdf', function(err, data) {
            //     if (err) return res.send(err);
            //     res.send(name);
            // });
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
            const tema = await ejs.renderFile(__dirname + "/themes/matricula.ejs", { result: result, auth: auth[0] });
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
            //const tema = await ejs.renderFile(__dirname + "/themes/promocion.ejs", { result: result,auth: auth[0],nextCourse:nextCourse });
            var name = makeid(10)
            res.send(name);
            // pdf.create(tema, options).toFile('./document/'+name+'.pdf', function(err, data) {
            //     if (err) return res.send(err);
            //     res.send(name);
            // });
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
            const tema = await ejs.renderFile(__dirname + "/themes/libretas.ejs", { result: result, auth: auth[0], ops: ops });
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
            const tema = await ejs.renderFile(__dirname + "/themes/juntas.ejs", { result: result, auth: auth[0], ops: ops });
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
            let cursoNum = ''
            for (let i = 0; i < arr.length; i++) {
                const element = arr[i];
                idMatricula = element.key;
                idCurso = element.curso?._id
                paralelo = element.paralelo
                estudiantes.push(element._id)
                keymateria = element.keymateria
                cursoNum = element.curso?.num
            }
            var result = [];
            if (arr.length > 0) {
                const rowM = await Matriculas.findById(idMatricula)
                const rowD = await Distributivo.findOne({ fkcurso: idCurso, paralelo: paralelo });
               if(cursoNum==4||cursoNum==5||cursoNum==6)  result = juntasOnly(rowM, rowD, estudiantes, ops.quimestre, paralelo, keymateria)
               else result = formatJuntasIndividual(rowM, rowD, estudiantes, ops.quimestre, paralelo, keymateria)
            }
            const auth = await autoridad()
            let tema = ''

            //TODO check SI ES DE 2DO 3RO DE BASICA
            if(cursoNum==4||cursoNum==5) tema = await ejs.renderFile(__dirname + "/themes/elemental/juntas.ejs", { result, auth: auth[0], ops });
            
            //TODO check SI ES DE 4TO DE BASICA
            else if(cursoNum==6) tema = await ejs.renderFile(__dirname + "/themes/elemental/juntasCuarto.ejs", { result, auth: auth[0], ops });
           
            //TODO check SI ES DE RESTO DE CURSO
            else tema = await ejs.renderFile(__dirname + "/themes/superior/juntas.ejs", { result, auth: auth[0], ops });
           
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
            let cursoNum = ''
            const estudiantes = [];
            for (let i = 0; i < arr.length; i++) {
                const element = arr[i];
                idMatricula = element.key;
                idCurso = element.curso?._id
                paralelo = element.paralelo
                estudiantes.push(element._id)
                keymateria = element.keymateria
                cursoNum = element.curso?.num
            }
            var result = [];

            if (arr.length > 0) {
                const rowM = await Matriculas.findById(idMatricula)
                const rowD = await Distributivo.findOne({ fkcurso: idCurso, paralelo });
                if(cursoNum==4||cursoNum==5||cursoNum==6) result = juntasFinal(rowM, rowD, estudiantes,  paralelo, keymateria)
                else result = juntasExamProyec(rowM, rowD, estudiantes,  paralelo, keymateria)
            }
            const auth = await autoridad()
            let tema = ''
           // console.log(ops)

            //TODO check GENERAR HTML DE JUNTAS DE CURSO FINAL DE 2DO 3RO 4TO
            
            if(cursoNum==4||cursoNum==5)tema = await ejs.renderFile(__dirname + "/themes/elemental/juntasFinal.ejs", { result, auth: auth[0], ops });

            else if(cursoNum==6) tema = await ejs.renderFile(__dirname + "/themes/elemental/juntasFinExam.ejs", { result, auth: auth[0], ops });

            //TODO check GENERAR HTML DE JUNTAS DE CURSO DE PROYECTOS
            
            else if(ops.tipo ==='PY'){
                if(ops.subnivel==2) tema = await ejs.renderFile(__dirname + "/themes/superior/juntasExaProy.ejs", { result, auth: auth[0], ops });
                else tema = await ejs.renderFile(__dirname + "/themes/superior/juntasExam.ejs", { result, auth: auth[0], ops });
            } 
            
            //TODO check GENERAR HTML DE SUPLETORIOS Y PROMEDIO FINAL
           
            else {
                if(ops.subnivel==2) tema = await ejs.renderFile(__dirname + "/themes/superior/juntasFinEP.ejs", { result, auth: auth[0],ops });
                else tema = await ejs.renderFile(__dirname + "/themes/superior/juntasFinal.ejs", { result, auth: auth[0],ops });
            } 
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
            const tema = await ejs.renderFile(__dirname + "/themes/informe.ejs", { result: result, auth: auth[0] });
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
            const tema = await ejs.renderFile(__dirname + "/themes/final.ejs", { result: result, auth: auth[0] });
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
            const tema = await ejs.renderFile(__dirname + "/themes/parcial.ejs", { result: result, auth: auth[0], ops: ops, paralelo: paralelo });
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
            const tema = await ejs.renderFile(__dirname + "/themes/quimestral.ejs", { result: result, auth: auth[0], ops: ops, paralelo: paralelo });
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
            const tema = await ejs.renderFile(__dirname + "/themes/anual.ejs", { result: result, auth: auth[0], paralelo: paralelo });
            res.status(200).json(tema);
        } catch (error) {
            console.log(error);
            return res.status(500).json(error);
        }
    },
    getNomina: async (req, res) => {
        try {
            const result = await Matriculas.find()
                .lean().select({
                    curso: 1, periodo: 1, paralelo: 1,
                    'matriculas.estudiante': 1, 'matriculas.nmatricula': 1
                });
            const reg = formarNomina(result)
            const auth = await autoridad()
            const tema = await ejs.renderFile(__dirname + "/themes/nomina.ejs", { result: reg, auth: auth[0], });
            return res.json(tema);
        } catch (error) {
            console.log(error);
            return res.status(500).json(error);
        }
    },
    getNominaDocente: async (req, res) => {
        try {
            const result = await User.find({ typo: { $in: ["DOCS"] } }).lean().select({ fullname: 1, cedula: 1 });
            result.sort(function (a, b) {
                var nameA = a.fullname.toLowerCase(), nameB = b.fullname.toLowerCase();
                if (nameA < nameB)
                    return -1;
                if (nameA > nameB)
                    return 1;
                return 0;
            });
            const auth = await autoridad()
            const tema = await ejs.renderFile(__dirname + "/themes/nominaDocente.ejs", { result: result, auth: auth[0], });
            return res.json(tema);
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
            const tema = await ejs.renderFile(__dirname + "/themes/ambitos.ejs", { result: arr, auth: auth[0], fechaA:fechaA });
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
            const tema = await ejs.renderFile(__dirname + "/themes/destrezas.ejs", { result: arr, auth: auth[0], fechaA:fechaA });
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