import Caja from '../../models/Cajas/Caja.js';
import HistorialCaja from '../../models/Cajas/HistorialCaja.js';
import Archivador from '../../models/Archivador.js';
import fecha from '../../services/fecha.js';

import moment from 'moment-timezone';
moment().tz("America/Guayaquil").format();

const getCredito = async () => {
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

    add: async (req, res, next) => {
        try {
            await Caja.create(req.body);
            res.status(200).send({});
        } catch (err) {
            console.log(err);
            res.status(500).send({
                message: 'Ocurrió un error'
            });
        }
    },

    list: async (req, res, next) => {
        try {
            const caja = await Caja.findOne()
            if (caja) {
                const cobros = await getCredito()
                if(cobros.length > 0){
                    for (let i = 0; i < cobros.length; i++) {
                        caja.ingresos.push(cobros[i])
                    }
                }

                let totalInventarioContado = 0
                let totalInventarioCredito = 0
                let totalInventarioAbona = 0

                let ingresos = 0
                caja.ingresos?.forEach(item => ingresos += Number(item.monto))

                let gastos = 0
                caja.gastos?.forEach(item => gastos += Number(item.monto))

                const total = ((Number(caja.cajaInicial)  +  ingresos) - (totalInventarioContado + gastos + totalInventarioAbona)).toFixed(2)
                return res.status(200).json({caja, total, ingresos, gastos, 
                    totalInventarioContado, totalInventarioCredito, totalInventarioAbona});
            }
            res.status(200).json(null);
        } catch (e) {
            res.status(500).send({
                message: 'Ocurrió un error'
            });
            next(e);
        }
    },
    cerrarCaja: async (req, res, next) => {
        try {
            const caja = await Caja.findById(req.params.paramsId);
            if (caja) {
                const cobros = await getCredito()
                if(cobros.length > 0){
                    for (let i = 0; i < cobros.length; i++) {
                        caja.ingresos.push(cobros[i])
                    }
                }
                const model = {
                    sales:0, inventario:0,
                    detalles : req.body,
                    cajaInicial : req.body.cajaInicial,
                    ingresos : caja.ingresos,
                    gastos : caja.gastos,
                    fecha: fecha.getDate()
                }
                await HistorialCaja.create(model);
                await Caja.findOneAndDelete(req.params.paramsId)
                return res.status(200).json({});
            }
            res.status(200).json(null);
        } catch (e) {
            res.status(500).send({
                message: 'Ocurrió un error'
            });
            next(e);
        }
    },
    getById: async (req, res) => {
        try {
            const reg = await Caja.findById(req.params.id);
            res.status(200).json(reg);
        } catch (e) {
            res.status(500).send(e);
        }
    },
    getConfirm: async (req, res) => {
        try {
            const reg = await Caja.findOne()
            res.status(200).json(reg);
        } catch (e) {
            res.status(500).send(e);
        }
    },

    update: async (req, res, next) => {
        try {
            const reg = await Caja.findByIdAndUpdate(
                req.params.paramsId,
                req.body,
                {
                    new: true,
                }
            );
            res.status(200).json(reg);
        } catch (e) {
            console.log(e)
            res.status(500).send({
                message: 'Ocurrió un error'
            });
            next(e);
        }
    },
    remove: async (req, res, next) => {
        try {
            let cadenaId = req.params.id;
            const array = cadenaId.split(",");
            await Caja.deleteMany({
                _id: {
                    $in: array,
                },
            });
            res.status(200).json();
        } catch (e) {
            res.status(500).send({
                message: 'Ocurrió un error'
            });
            next(e);
        }
    },
}
