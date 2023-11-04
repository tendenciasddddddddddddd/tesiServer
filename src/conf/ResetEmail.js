const nodemailer = require('nodemailer');
const ejs = require("ejs");

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: 'weswebsystem@gmail.com', 
      pass: 'gfjlvwlpurzesxni', 
    },
  });

const sendMail = async (user, code) => {
    try {
        const data = await ejs.renderFile(__dirname + "/resetTemplate.ejs", { codigo: code });
        await transporter.sendMail({
            from: '"ARCHIVADOR" <weswebsystem@gmail.com>', 
            to : `${user}`,
            subject: "Restablece tu contraseña del gestor de archivos", 
            html : data
          });
          
    } catch (error) {
        console.log('fallo email');
    } 
}


exports.sendMail = (user, code) => sendMail(user, code);