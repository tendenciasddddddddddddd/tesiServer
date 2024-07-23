import agencia from "../../models/Agencia.js";
import fetch from 'node-fetch';

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

export default {
    OrdenVenta: async (req, res) => {
        try {
            const result = req.body;
            const agenc = await getAgencia()
            const tema = await ejs.renderFile(__dirname + "/themes/OrdenVenta.ejs", { result, agenc });
            res.status(200).json(tema);
        } catch (error) {
            console.log(error);
            return res.status(500).json(error);
        }
    },
    Abonos: async (req, res) => {
        try {
            const result = req.body.info;
            const data = req.body.data
            const abonos = req.body.abonos
            const agenc = await getAgencia()
            const tema = await ejs.renderFile(__dirname + "/themes/Abonos.ejs", { result, agenc, data, abonos });
            res.status(200).json(tema);
        } catch (error) {
            console.log(error);
            return res.status(500).json(error);
        }
    },
    buildPdf: async (req, res) => {
        try {
            const result = req.body;
            const agenc = await getAgencia()
            const tema = await ejs.renderFile(__dirname + "/themes/OrdenVenta.ejs", { result, agenc });
            const link = await convertPdf(tema, 3)
            res.status(200).json(link);
        } catch (error) {
            console.log(error);
            return res.status(500).json(error);
        }
    },
    buildPdfAbonos: async (req, res) => {
        try {
            const result = req.body.info;
            const data = req.body.data
            const abonos = req.body.abonos
            const agenc = await getAgencia()
            const tema = await ejs.renderFile(__dirname + "/themes/Abonos.ejs", { result, agenc, data, abonos });
            const link = await convertPdf(tema, 3)
            res.status(200).json(link);
        } catch (error) {
            console.log(error);
            return res.status(500).json(error);
        }
    },
}

