import Role from "../models/Role";
import User from "../models/User";

import bcrypt from "bcryptjs";

export const createRoles = async () => {
  try {
    const count = await Role.estimatedDocumentCount();
    if (count > 0) return;
    const values = await Promise.all([
      new Role({ name: "Admin" }).save(),
      new Role({ name: "Empleado" }).save(),
      new Role({ name: "Cliente" }).save(),
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
      password: await bcrypt.hash("Admin**", 4),
      roles: roles.map((role) => role._id),//****APARTIR DE A1QUI LOS NUEVOS DATOS
      fullname: "MARTINEZ MARTINEZ ESTEBAN WLADIMIR",
      cedula: "1004095632",
      foto: "https://res.cloudinary.com/dvpp07pji/image/upload/v1678812180/avatar_def_qkmwey.webp",
      estado: true,
      visible : false,
      telefono: "0995283857",
    });
    console.log('Admin User Created!')
  }
};

