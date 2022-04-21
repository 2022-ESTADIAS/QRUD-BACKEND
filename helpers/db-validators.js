const Usuario = require("../models/user.Model")
const Personal = require("../models/personal.Model")
const Role = require("../models/role.Model")


/**
 * 
 * @param {string} email
 * @description Verifica la existencia de un correo en base de datos (colección de Personal). 
 */
const emailExistPersonal = async (email) => {
    // console.log(req);
    const existe = await Personal.findOne({ email });
    if (existe) {
      throw new Error("El email ya ha sido registrado, desea iniciar sesion?");
    }
  };


  /**
 * 
 * @param {string} email
 * @description Verifica la existencia de un correo en base de datos (colección de Usuarios). 
 */
  const emailExistUsuario = async (email) => {
    // console.log(req);
    const existe = await Usuario.findOne({ email });
    if (existe) {
      throw new Error("El email ya ha sido registrado, desea generar su QR?");
    }
  };

  /**
 * 
 * @param {string} rfc
 * @description Verifica la existencia de un rfc en base de datos (colección de Usuario). 
 */
  const rfcUsuario = async(rfc)=>{

    const existe = await Usuario.findOne({rfc})
    if(existe){
      throw new Error("El RFC ya ha sido registrado")
    }
  }
  
/**
 * 
 * @param {*} id
 * @description Verifica la existencia de un id en base de datos (colección Personal) 
 */
  const personalExistID = async (id) => {
    const existePersonalID = await Personal.findById(id);
    if (!existePersonalID) {
      throw new Error("El id no existe - personalExistID");
    }
  };


  /**
   * 
   * @param {*} id
   * @description Verifica la existencia de un id en base de datos (colección Usuarios) 
   */
  const userExistID = async (id) => {
    const existeUsuarioID = await Usuario.findById(id);
    if (!existeUsuarioID) {
      throw new Error("El id no existe - userExistID");
    }
  };


  /**
   * 
   * @param {*} id 
   * @description Verifica la existencia de un rol en base de datos (colección Role)
   */
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
  