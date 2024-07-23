import Caja from '../../models/Cajas/Caja.js';
import Archivador from '../../models/Archivador.js';
import fetch from 'node-fetch';

import path from 'path';
import ejs from 'ejs'
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import moment from 'moment-timezone';
moment().tz("America/Guayaquil").format();

const convertPdf = async (params, size) => {
    try {
        const datax = JSON.stringify({ name: size, content: params }) /*num, 3 is media hoja */
        const requestOptions = { method: 'POST', headers: { 'Content-Type': 'application/json', }, body: datax };
        const response = await fetch('https://reportes.chullmooecutkd.com/?op=Insert', requestOptions);
        const data = await response.json();
        const link = `https://reportes.chullmooecutkd.com/pdf/${data}.pdf`
        return link;
    } catch (error) {
        return false
    }
}

const getServicios = async () => {
    const reg = await Archivador.find({
        $expr: {
            $eq: [
                { $dateToString: { format: '%Y-%m-%d', date: '$$NOW', timezone: "America/Guayaquil" } },
                { $dateToString: { format: '%Y-%m-%d', date: '$updatedAt', timezone: "America/Guayaquil" } },
            ],
        },
    })
    const fechaHoy = moment().format("DD-MM-YYYY")
    const cobros = []
    if (reg) {
        reg.forEach((item) => {
            const { pagos } = item
            pagos.forEach((subItem) => {
                const { fecha, monto, text, tipo } = subItem
                const fechaMovimiento = moment(fecha).format("DD-MM-YYYY")
                if (fechaHoy === fechaMovimiento && tipo === 'EFECTIVO') {
                    cobros.push({ id: 1000, text, monto })
                }
            })
        })
    }
    return cobros
}

export default {
    cajaAbierta: async (req, res) => {
        try {
            const caja = await Caja.findOne()
            const user = req.query.user;
            const total = req.query.total;
            const fecha = fechaActual()
            if (caja) {
                const cobros = await getServicios()
                if (cobros.length > 0) {
                    for (let i = 0; i < cobros.length; i++) {
                        caja.ingresos.push(cobros[i])
                    }
                }
                let sumVentas = 0
                let ingresos = 0
                caja?.ingresos?.forEach(item => ingresos += Number(item.monto))
                let tolalIngresos = sumVentas + ingresos

                let sumCompras = 0
                let gastos = 0
                caja?.gastos?.forEach(item => gastos += Number(item.monto))
                let tolalGastos = sumCompras + gastos
                const tema = await ejs.renderFile(__dirname + "/themes/CajaActual.ejs", {
                    sales: [], fecha, caja, inventario: [],
                    tolalIngresos, tolalGastos, user, total
                });
                return res.status(200).json(tema);
            }

            res.status(200).json(null);
        } catch (error) {
            console.log(error);
            return res.status(500).json(error);
        }
    },
    cajaHistorial: async (req, res) => {
        try {
            const fecha = fechaActual()
            const caja = req.body
            const { sales, inventario, detalles } = req.body

            let sumVentas = 0
            let ingresos = 0
            caja?.ingresos?.forEach(item => ingresos += Number(item.monto))
            let tolalIngresos = sumVentas + ingresos

            let sumCompras = 0
            let gastos = 0
            caja?.gastos?.forEach(item => gastos += Number(item.monto))
            let tolalGastos = sumCompras + gastos

            const tema = await ejs.renderFile(__dirname + "/themes/CajaActual.ejs", {
                sales, fecha, caja,
                inventario,
                tolalIngresos, tolalGastos,
                user: detalles.responsable,
                total: detalles.total,
                noEfe: detalles.noEfe,
                contado: detalles.contado,
            });
            res.status(200).json(tema);
        } catch (error) {
            console.log(error);
            return res.status(500).json(error);
        }
    },
    builfPdf: async (req, res) => {
        try {
            const box = req.body
            const link = await convertPdf(box?.info, 3)
            res.status(200).json(link);
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