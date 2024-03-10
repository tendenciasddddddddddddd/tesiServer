import agencia from "../../models/Agencia.js";
//const ejs = require("ejs");
//const barcode = require('barcode');

import path from 'path';
import ejs from 'ejs'
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function getAgencia() {
    try {
        const result = await agencia.findOne()
        return result
    } catch (error) {
        console.log(error);
    }
}

export default {
    OrdenVenta: async (req, res) => {
        try {
            const result = req.body;
            const {facturaAuth} = req.body
            const agenc = await getAgencia()
            // if(facturaAuth === undefined) {
            //     const tema = await ejs.renderFile(__dirname + "/themes/OrdenVentaImpre.ejs", { result, agenc });
            //     return  res.status(200).json(tema);
            // }
            const tema = await ejs.renderFile(__dirname + "/themes/OrdenVenta.ejs", { result, agenc });
            res.status(200).json(tema);
        } catch (error) {
            console.log(error);
            return res.status(500).json(error);
        }
    },
    GuiasRemision: async (req, res) => {
        try {
            const result = req.body;
            const agenc = await getAgencia()
            const tema = await ejs.renderFile(__dirname + "/themes/Guias.ejs", { result, agenc });
            res.status(200).json(tema);
        } catch (error) {
            console.log(error);
            return res.status(500).json(error);
        }
    },
}

