const Usuario = require("../models/user.Model")
const Personal = require("../models/personal.Model")
const Role = require("../models/role.Model")


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

  const rfcUsuario = async(rfc)=>{

    const existe = await Usuario.findOne({rfc})
    if(existe){
      throw new Error("El RFC ya ha sido registrado")
    }
  }
  

  const personalExistID = async (id) => {
    const existePersonalID = await Personal.findById(id);
    if (!existePersonalID) {
      throw new Error("El id no existe - personalExistID");
    }
  };
  const userExistID = async (id) => {
    const existeUsuarioID = await Usuario.findById(id);
    if (!existeUsuarioID) {
      throw new Error("El id no existe - userExistID");
    }
  };

  const rolExistID = async (id) => {
    const existeRolID = await Role.findById(id);
    if (!existeRolID) {
      throw new Error("El id no existe - ROLID");
    }
  };


  module.exports = {
      emailExistPersonal,
      emailExistUsuario,
      userExistID,
      personalExistID,
      rolExistID,
      rfcUsuario
  };
  