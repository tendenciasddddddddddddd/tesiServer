import nodemailer from 'nodemailer'

import path from 'path';
import ejs from 'ejs'
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: 'weswebsystem@gmail.com', 
      pass: 'gfjlvwlpurzesxni', 
    },
  });


export const sendMail = async (user, code) => {
    try {
      const data = await ejs.renderFile(__dirname + "/theme/sendCodePw.ejs", { codigo: code });
      await transporter.sendMail({
        from: '"WYS-WEB" <weswebsystem@gmail.com>',
        to: `${user}`,
        subject: "Restablece tu contraseña de plataforma",
        html: data
      });
  
    } catch (error) {
      console.log('fallo email');
    }
  }
