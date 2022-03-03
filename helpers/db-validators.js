const { Usuario, Personal, Role } = require("../models/");

const emailExistPersonal = async (email) => {
    // console.log(req);
    const existe = await Personal.findOne({ email });
    if (existe) {
      throw new Error("El email ya ha sido registrado, desea iniciar sesion?");
    }
  };

  const emailExistUsuario = async (email) => {
    // console.log(req);
    const existe = await Usuario.findOne({ email });
    if (existe) {
      throw new Error("El email ya ha sido registrado, desea iniciar sesion?");
    }
  };
  





  const personalExistID = async (id) => {
    const existeUsuarioID = await Personal.findById(id);
    if (!existeUsuarioID) {
      throw new Error("El id no existe - personalExistID");
    }
  };
  const userExistID = async (id) => {
    const existeUsuarioID = await Usuario.findById(id);
    if (!existeUsuarioID) {
      throw new Error("El id no existe - userExistID");
    }
  };


  module.exports = {
      emailExistPersonal,
      emailExistUsuario,
      userExistID,
      personalExistID
  };
  