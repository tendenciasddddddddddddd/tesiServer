import Matriculas from "../../models/Matriculas";
import Distributivo from "../../models/distributivos/Distributivo";
import { superior } from "./services/superior.service";
import { element } from "./services/elemental.service";
import { general } from "./services/general.services";
import Configure from "../../models/Configure";
import User from "../../models/User";
import { client, claveOnPort } from "../../middlewares/rediss";

const ejs = require("ejs");
const { formarNomina } = general();
const { juntasOnly, juntasFinal, juntasGeneral, promJuntaComportamiento, promLibretasElem,
    promFinalElem, promPromocionElem, promInformeElem } = element()

//TODO: check CALCULOS DE COMPUTO

const { juntasExamProyec, promParcial, promQuimestral, promAnual, promPromociones, promMatricula,
    promLibretas, promJuntas, promInforme, promFinal, promJuntasOnly } = superior()

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
    promocion: async (req, res) => {
        try {
            const { nextCourse, data } = req.body;
            if (data?.length == 0) return res.status(200).json('Sin calificaciones');

            const idMatricula = data[0].key;
            const idCurso = data[0].curso?._id
            const paralelo = data[0].paralelo;
            const cursoNum = data[0].curso?.num
            const estudiantes = [];

            for (let i = 0; i < data.length; i++) 
                estudiantes.push(data[i]._id)

            const rowM = await Matriculas.findById(idMatricula)
            const rowD = await Distributivo.findOne({ fkcurso: idCurso, paralelo });
            const auth = await autoridad()
            let tema = ''

            if (cursoNum == 4 || cursoNum == 5 || cursoNum == 6){
                const result = promPromocionElem(rowM, rowD, estudiantes)
                tema = await ejs.renderFile(__dirname + "/themes/elemental/promocion.ejs", { result, auth, nextCourse });
                return res.status(200).json(tema);
            }

            const result = promPromociones(rowM, rowD, estudiantes)
            tema = await ejs.renderFile(__dirname + "/themes/superior/promocion.ejs", { result, auth, nextCourse });
            res.status(200).json(tema);
        } catch (error) {
            console.log(error);
            return res.status(500).json(error);
        }
    },

    matricula: async (req, res) => {
        try {
            const data = req.body;
            if (data?.length == 0) return res.status(200).json('Sin calificaciones');
            const idMatricula = data[0].key;
            const estudiantes = [];
            for (let i = 0; i < data.length; i++) 
                estudiantes.push(data[i]._id)
            
            const rowM = await Matriculas.findById(idMatricula)
            const auth = await autoridad()
            const result = promMatricula(rowM, estudiantes)
           
            const tema = await ejs.renderFile(__dirname + "/themes/matricula.ejs", { result, auth });
            res.status(200).json(tema);
        } catch (error) {
            console.log(error);
            return res.status(500).json(error);
        }
    },

    libretas: async (req, res) => {
        try {
            const { ops, data } = req.body;
            if (data?.length == 0) return res.status(200).json('Sin calificaciones');
  
            const idMatricula = data[0].key;
            const idCurso = data[0].curso?._id
            const paralelo = data[0].paralelo;
            const cursoNum = data[0].curso?.num
            const estudiantes = [];

            for (let i = 0; i < data.length; i++) 
                estudiantes.push(data[i]._id)
            
            const rowM = await Matriculas.findById(idMatricula)
            const rowD = await Distributivo.findOne({ fkcurso: idCurso, paralelo });
            const auth = await autoridad()
            let tema = ''
            if (cursoNum == 4 || cursoNum == 5 || cursoNum == 6){
                const result = promLibretasElem(rowM, rowD, estudiantes, ops.quimestre)
                if (cursoNum != 6) tema = await ejs.renderFile(__dirname + "/themes/elemental/libretas.ejs", { result, auth, ops });
                else tema = await ejs.renderFile(__dirname + "/themes/elemental/libretaCuarto.ejs", { result, auth, ops });
                return  res.status(200).json(tema);
            }

            const result = promLibretas(rowM, rowD, estudiantes, ops.quimestre)
            tema = await ejs.renderFile(__dirname + "/themes/superior/libretas.ejs", { result, auth, ops: ops });
            res.status(200).json(tema);
        } catch (error) {
            console.log(error);
            return res.status(500).json(error);
        }
    },

    juntas: async (req, res) => {
        try {
            const { ops, data } = req.body;
            if (data?.length == 0) return res.status(200).json('Sin calificaciones');
            
            const idMatricula = data[0].key;
            const idCurso = data[0].curso?._id
            const paralelo = data[0].paralelo;
            const keymateria = data[0].keymateria
            const cursoNum = data[0].curso?.num
            const estudiantes = [];

            for (let i = 0; i < data.length; i++) 
                estudiantes.push(data[i]._id)

            const rowM = await Matriculas.findById(idMatricula)
            const rowD = await Distributivo.findOne({ fkcurso: idCurso, paralelo });
            const auth = await autoridad()
            let tema = ''
            //TODO check SI ES DE 2DO 3RO DE BASICA 4TO
            if (cursoNum == 4 || cursoNum == 5 || cursoNum == 6){
              const result = juntasGeneral(rowM, rowD, estudiantes, ops.quimestre, paralelo, keymateria)
              if (cursoNum != 6) tema = await ejs.renderFile(__dirname + "/themes/elemental/juntas.ejs", { result, auth, ops });
              else tema = await ejs.renderFile(__dirname + "/themes/elemental/juntasCuarto.ejs", { result, auth, ops });
              return  res.status(200).json(tema);
            }

            //TODO check TODOS LOS CURSOS CUALITATIVOS Y CUANTITATIVO
            const result = promJuntas(rowM, rowD, estudiantes, ops.quimestre, paralelo)
            tema = await ejs.renderFile(__dirname + "/themes/superior/juntas.ejs", { result, auth, ops });
            res.status(200).json(tema);
        } catch (error) {
            console.log(error);
            return res.status(500).json(error);
        }
    },

    juntasIndividual: async (req, res) => {
        try {
            const { ops, data } = req.body;
            if (data?.length == 0) return res.status(200).json('Sin calificaciones');

            const idMatricula = data[0].key;
            const idCurso = data[0].curso?._id
            const paralelo = data[0].paralelo;
            const keymateria = data[0].keymateria
            const cursoNum = data[0].curso?.num
            const estudiantes = [];

            for (let i = 0; i < data.length; i++) {
                estudiantes.push(data[i]._id)
            }
            
            const rowM = await Matriculas.findById(idMatricula)
            const rowD = await Distributivo.findOne({ fkcurso: idCurso, paralelo: paralelo });
            const auth = await autoridad()
            let tema = ''
            //TODO check SI ES DE 2DO 3RO DE BASICA 4TO
            if (cursoNum == 4 || cursoNum == 5 || cursoNum == 6){
              const result = juntasOnly(rowM, rowD, estudiantes, ops.quimestre, paralelo, keymateria)
              if (cursoNum != 6) tema = await ejs.renderFile(__dirname + "/themes/elemental/juntas.ejs", { result, auth, ops });
              else tema = await ejs.renderFile(__dirname + "/themes/elemental/juntasCuarto.ejs", { result, auth, ops });
              return  res.status(200).json(tema);
            }
            console.log('LLEGA')

            //TODO check TODOS LOS CURSOS CUALITATIVOS Y CUANTITATIVO
            const result = promJuntasOnly(rowM, rowD, estudiantes, ops.quimestre, paralelo, keymateria)
            tema = await ejs.renderFile(__dirname + "/themes/superior/juntas.ejs", { result, auth: auth, ops })
            res.status(200).json(tema);
        } catch (error) {
            console.log(error);
            return res.status(500).json(error);
        }
    },

    juntasFinal: async (req, res) => {
        try {
            const { ops, data } = req.body;
            if (data?.length == 0) return res.status(200).json('Sin calificaciones');

            const idMatricula = data[0].key;
            const idCurso = data[0].curso?._id
            const paralelo = data[0].paralelo;
            const keymateria = data[0].keymateria
            const cursoNum = data[0].curso?.num
            const estudiantes = [];

            for (let i = 0; i < data.length; i++)
                estudiantes.push(data[i]._id)

            const rowM = await Matriculas.findById(idMatricula)
            const rowD = await Distributivo.findOne({ fkcurso: idCurso, paralelo: paralelo });
            const auth = await autoridad()
            let tema = ''

            //TODO check SI ES COMPORTAMIENTO DE TODOS 
            if(ops.tipo === 'COMP'){
                const result = promJuntaComportamiento(rowM, rowD, estudiantes, paralelo, keymateria)
                tema = await ejs.renderFile(__dirname + "/themes/comportamiento.ejs", { result, auth, ops });
                return  res.status(200).json(tema);
            }

            //TODO check SI ES DE 2DO 3RO DE BASICA 4TO
            if (cursoNum == 4 || cursoNum == 5 || cursoNum == 6){
                const result = juntasFinal(rowM, rowD, estudiantes, paralelo, keymateria)
                if (cursoNum != 6) tema = await ejs.renderFile(__dirname + "/themes/elemental/juntasFinal.ejs", { result, auth, ops });
                else tema = await ejs.renderFile(__dirname + "/themes/elemental/juntasFinExam.ejs", { result, auth, ops });
                return  res.status(200).json(tema);
            }

            //TODO check PROMEDIO FINAL CON PROYECTOS SUPERIOS
            const result = juntasExamProyec(rowM, rowD, estudiantes, paralelo, keymateria)
            if (ops.tipo === 'PY') {
                if (ops.subnivel == 2) tema = await ejs.renderFile(__dirname + "/themes/superior/juntasExaProy.ejs", { result, auth, ops });
                else tema = await ejs.renderFile(__dirname + "/themes/superior/juntasExam.ejs", { result, auth, ops });
                return  res.status(200).json(tema);
            }

            //TODO check GENERAR HTML DE SUPLETORIOS Y PROMEDIO FINAL
            if (ops.subnivel == 2) tema = await ejs.renderFile(__dirname + "/themes/superior/juntasFinEP.ejs", { result, auth, ops });
            else tema = await ejs.renderFile(__dirname + "/themes/superior/juntasFinal.ejs", { result, auth, ops });
            res.status(200).json(tema);
        } catch (error) {
            console.log(error);
            return res.status(500).json(error);
        }
    },

    informe: async (req, res) => {
        try {
            const { data } = req.body;
            if (data?.length == 0) return res.status(200).json('Sin calificaciones');
  
            const idMatricula = data[0].key;
            const idCurso = data[0].curso?._id
            const paralelo = data[0].paralelo;
            const cursoNum = data[0].curso?.num
            const subnivel = data[0].curso?.subnivel
            const estudiantes = [];

            for (let i = 0; i < data.length; i++) 
                estudiantes.push(data[i]._id)

            const rowM = await Matriculas.findById(idMatricula)
            const rowD = await Distributivo.findOne({ fkcurso: idCurso, paralelo });
            const auth = await autoridad()
            let tema = ''

            if (cursoNum == 4 || cursoNum == 5 || cursoNum == 6){
                const result = promInformeElem(rowM, rowD, estudiantes)
                if (cursoNum != 6) tema = await ejs.renderFile(__dirname + "/themes/elemental/informe.ejs", { result, auth });
                else tema = await ejs.renderFile(__dirname + "/themes/elemental/informeCuarto.ejs", { result, auth });
                return res.status(200).json(tema);
            }
            //TODO RETORNE SI UN CURSO QUE NO ES SUBNIVEL
            if(subnivel!=2) {
                const result = promInforme(rowM, rowD, estudiantes)
                tema = await ejs.renderFile(__dirname + "/themes/superior/informe.ejs", { result, auth });
                return res.status(200).json(tema);
            }
            const result = promInforme(rowM, rowD, estudiantes)
            tema = await ejs.renderFile(__dirname + "/themes/superior/informeSub.ejs", { result, auth });
            res.status(200).json(tema);
        } catch (error) {
            console.log(error);
            return res.status(500).json(error);
        }
    },

    final: async (req, res) => {
        try {
            const { data } = req.body;
            if (data?.length == 0) return res.status(200).json('Sin calificaciones');
  
            const idMatricula = data[0].key;
            const idCurso = data[0].curso?._id
            const paralelo = data[0].paralelo;
            const cursoNum = data[0].curso?.num
            const estudiantes = [];

            for (let i = 0; i < data.length; i++) 
                estudiantes.push(data[i]._id)

            const rowM = await Matriculas.findById(idMatricula)
            const rowD = await Distributivo.findOne({ fkcurso: idCurso, paralelo });
            const auth = await autoridad()
            let tema = ''
            if (cursoNum == 4 || cursoNum == 5 || cursoNum == 6){
                const result = promFinalElem(rowM, rowD, estudiantes)
                if (cursoNum != 6) tema = await ejs.renderFile(__dirname + "/themes/elemental/final.ejs", { result, auth});
                else tema = await ejs.renderFile(__dirname + "/themes/elemental/finalCuarto.ejs", { result, auth});
                return res.status(200).json(tema);
            }

            const result = promFinal(rowM, rowD, estudiantes,)
            tema = await ejs.renderFile(__dirname + "/themes/superior/final.ejs", { result, auth});
            res.status(200).json(tema);
        } catch (error) {
            console.log(error);
            return res.status(500).json(error);
        }
    },

    parcial: async (req, res) => {
        try {
            const { ops, data } = req.body;
            if (data?.length == 0) return res.status(200).json('Sin calificaciones');
           
            const idMatricula = data[0].key;
            const idCurso = data[0].curso?._id
            const paralelo = data[0].paralelo;
            const estudiantes = [];

            for (let i = 0; i < data.length; i++) {
                estudiantes.push(data[i]._id)
            }

            const rowM = await Matriculas.findById(idMatricula)
            const rowD = await Distributivo.findOne({ fkcurso: idCurso, paralelo });
            const auth = await autoridad()
            
            const result = promParcial(rowM, rowD, estudiantes, ops)
            const tema = await ejs.renderFile(__dirname + "/themes/parcial.ejs", { result, auth, ops, paralelo });
            res.status(200).json(tema);
        } catch (error) {
            console.log(error);
            return res.status(500).json(error);
        }
    },

    quimestral: async (req, res) => {
        try {
           const { ops, data } = req.body;
            if (data?.length == 0) return res.status(200).json('Sin calificaciones');
            
            const idMatricula = data[0].key;
            const idCurso = data[0].curso?._id
            const paralelo = data[0].paralelo;
            const estudiantes = [];

            for (let i = 0; i < data.length; i++) {
                estudiantes.push(data[i]._id)
            }

            const rowM = await Matriculas.findById(idMatricula)
            const rowD = await Distributivo.findOne({ fkcurso: idCurso, paralelo });
            const auth = await autoridad()
            const result = promQuimestral(rowM, rowD, estudiantes, ops)
            const tema = await ejs.renderFile(__dirname + "/themes/quimestral.ejs", { result, auth, ops, paralelo });
            res.status(200).json(tema);
        } catch (error) {
            console.log(error);
            return res.status(500).json(error);
        }
    },

    anual: async (req, res) => {
        try {
            const { data } = req.body;
            if (data?.length == 0) return res.status(200).json('Sin calificaciones');

            const idMatricula = data[0].key;
            const idCurso = data[0].curso?._id
            const paralelo = data[0].paralelo;
            const estudiantes = [];

            for (let i = 0; i < data.length; i++) {
                estudiantes.push(data[i]._id)
            }

            const rowM = await Matriculas.findById(idMatricula)
            const rowD = await Distributivo.findOne({ fkcurso: idCurso, paralelo });
            const auth = await autoridad()
            const result = promAnual(rowM, rowD, estudiantes)

            const tema = await ejs.renderFile(__dirname + "/themes/anual.ejs", { result: result, auth, paralelo});
            res.status(200).json(tema);
        } catch (error) {
            console.log(error);
            return res.status(500).json(error);
        }
    },

    getNomina: async (req, res) => {
        try {
            const reg = await Matriculas.find()
                .lean().select({
                    curso: 1, periodo: 1, paralelo: 1,
                    'matriculas.estudiante': 1, 'matriculas.nmatricula': 1
                });
            const result = formarNomina(reg)
            const auth = await autoridad()
            const tema = await ejs.renderFile(__dirname + "/themes/nomina/nomina.ejs", { result, auth });
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
            const tema = await ejs.renderFile(__dirname + "/themes/nomina/nominaDocente.ejs", { result, auth });
            return res.json(tema);
        } catch (error) {
            console.log(error);
            return res.status(500).json(error);
        }
    },

    Ambitos: async (req, res) => {
        try {
            const result = req.body
            var fechaA = fechaActual()
            const auth = await autoridad()
            const tema = await ejs.renderFile(__dirname + "/themes/inicial/ambitos.ejs", { result, auth, fechaA });
            res.status(200).json(tema);
        } catch (error) {
            console.log(error);
            return res.status(500).json(error);
        }
    },

    Destrezas: async (req, res) => {
        try {
            const result = req.body
            var fechaA = fechaActual()
            const auth = await autoridad()
            const tema = await ejs.renderFile(__dirname + "/themes/inicial/destrezas.ejs", { result, auth, fechaA });
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