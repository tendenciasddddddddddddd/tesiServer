import Role from "../models/Role";
import User from "../models/User";
import Configure from "../models/Configure";
import Apps from "../models/Apps";
import AperturaNotas from "../models/AperturaNotas";
import Secuencia from "../models/Secuencia";

import bcrypt from "bcryptjs";

export const createRoles = async () => {
  try {
    const count = await Role.estimatedDocumentCount();
    if (count > 0) return;
    const values = await Promise.all([
      new Role({ name: "Estudiante" }).save(),
      new Role({ name: "Docente" }).save(),
      new Role({ name: "Admin" }).save(),
      new Role({ name: "Vicerrector" }).save(),
      new Role({ name: "Inspector" }).save(),
      new Role({ name: "Secretario" }).save(),
    ]);

    console.log(values);
  } catch (error) {
    console.error(error);
  }
};

export const createAdmin = async () => {
  const user = await User.findOne({ email: "10004095632w@gmailcom" });
  const roles = await Role.find({ name: { $in: ["Admin"] } });
  if (!user) {
    await User.create({
      email: "10004095632w@gmail.com",
      password: await bcrypt.hash("Medid100.*", 4),
      roles: roles.map((role) => role._id),//****APARTIR DE A1QUI LOS NUEVOS DATOS
      fullname: "MARTINEZ MARTINEZ ESTEBAN WLADIMIR",
      cedula: "1004095632",
      foto: "https://res.cloudinary.com/dvpp07pji/image/upload/v1678812180/avatar_def_qkmwey.webp",
      status: "1",
      telefono: "0995283857",
    });
    console.log('Admin User Created!')
  }
};

export const config = async () => {
  await Configure.deleteMany();
  await Configure.create({
    logo: 'https://res.cloudinary.com/dvpp07pji/image/upload/v1678812136/logo_ic1ksc.png',
    logoMinisterio: 'https://res.cloudinary.com/dvpp07pji/image/upload/v1678812136/logo_ic1ksc.png',
    unidadeducativa: 'xxxx xxxx xxxx xxxx',
    ubicacion: 'xxxx xxxx xxxx xxxx',
    telefono: 'xxxx xxxx xxxx xxxx',
    direccion: 'xxxx xxxx xxxx xxxx',
    rector: 'xxxx xxxx xxxx xxxx',
    vicerector: 'xxxx xxxx xxxx xxxx',
    secretario: 'xxxx xxxx xxxx xxxx',
    inspector: 'xxxx xxxx xxxx xxxx',
  });
  console.log('config create');
};

export const aplicaciones = async () => {
  await Apps.deleteMany();
  await Apps.create({
    web: 'xxxx xxxx xxxx xxxx',
    movil: 'xxxx xxxx xxxx xxxx',
  });
  console.log('config create');
};

export const apertura = async () => {
  await AperturaNotas.deleteMany();
  await AperturaNotas.create({
    inicio: '2023-04-12T21:38:00.000Z',
    fin: '2023-04-12T21:38:00.000Z',
    parcial1: '0',
    parcial2: '0',
    parcial3: '0',
    parcial4: '0',
    parcial5: '0',
    parcial6: '0',
    examen1: '0',
    examen2: '0',
    examen3: '0',
    proyecto : '0',
    supletorios: '0',
  });
  console.log('Apertura create');
};
export const iniciarSecuencia = async () => {
  await Secuencia.deleteMany();
  await Secuencia.create({
    numMatricula: '1',
  });
  console.log('secuencia creada');
};
