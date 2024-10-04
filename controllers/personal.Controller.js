const bcryptjs = require("bcryptjs");
const { PwdRgx } = require("../helpers/regex");

const Personal = require("../models/personal.Model");
const Rol = require("../models/role.Model");
const TruckAssignation = require("../models/mexcal/TruckAssignation");

/**
 * @param {request} req
 * @param {response} res
 * @returns Todo el personal ACTIVO del sistema.
 * @description Busca en BD el personal con el filtro de que estos mismo tengan la propiedad isActivo en true. y popula el rol por cada personal.
 * Se omite el personal que tenga el rol de MASTER_ROLE
 */
const PersonalGetAll = async (req, res) => {
  try {
    let personal = await Personal.find({ isActivo: true }).populate({
      path: "rol",
    });

    personal = personal.filter((persona) => persona.rol.rol != "MASTER_ROLE");

    return res.status(200).json({ personal });
  } catch (error) {
    return res.status(500).json({ err: "Error de servidor.", error });
  }
};

//Todo el personal eliminado
/**
 * @param {request} req
 * @param {response} res
 * @returns Todo el personal INACTIVO del sistema.
 * @description Busca en BD el personal con el filtro de que estos mismo tengan la propiedad isActivo en false. y popula el rol por cada personal.
 */
const PersonalGetAllEliminados = async (req, res) => {
  try {
    const eliminados = await Personal.find({ isActivo: false }).populate({
      path: "rol",
    });

    return res.status(200).json({ eliminados });
  } catch (error) {
    return res.status(500).json({ err: "Error de servidor.", error });
  }
};

//un solo personal
/**
 *
 * @param {request} req
 * @param {response} res
 * @returns Un solo personal ACTIVO del sistema.
 * @description Recibe un ID como parametro. Este se busca en BD y se comprueba que este activo, de otra manera, este falla.
 */
const PersonalGet = async (req = request, res = response) => {
  try {
    const { id } = req.params;
    const activo = await Personal.find({ id });

    if (activo.isActivo == false) {
      return res.status(404).json({ msg: "Personal no existe" });
    }

    const personal = await Personal.findById(id).populate({ path: "rol" });

    return res.status(200).json({ personal });
  } catch (error) {
    return res.status(500).json({ err: "Error de servidor.", error });
  }
};

/**
 * @param {request} req
 * @param {response} res
 * @returns Si este es correcto, "Personal Creado Exitosamente", si falla, "Formato Incorrecto".
 * @description Se realiza la creación de Personal con ciertas validaciones tanto de correo y contraseña.
 */
const PersonalPost = async (req, res = response) => {
  try {
    const salt = bcryptjs.genSaltSync();
    const { nombre, telefono, email, password } = req.body;
    const rol = await Rol.findOne({
      rol: "CLIENT_ROLE",
    });

    const personal = new Personal({
      nombre,
      telefono,
      email,
      password,
      rol: rol._id,
    });
    personal.password = bcryptjs.hashSync(password, salt);
    await personal.save();
    return res.status(201).json({ msg: "Personal creado exitosamente" });
  } catch (error) {
    console.log(error, "ERROR PERSONAL");
    return res.status(500).json({ err: "Error de servidor.", error });
  }
};

//Actualizar Personal
/**
 *
 * @param {request} req
 * @param {response} res
 * @returns El objeto actualizado del personal.
 * @description Recibe un ID como parametro y permite la actualización del usuario.
 * Mediante esta funcion no se puede editar NI CONTRASEÑA, NI EMAIL.
 */
const PersonalPut = async (req, res = response) => {
  try {
    const { id } = req.params;
    const { _id, password, email, ...resto } = req.body;
    const activo = await Personal.findById(id);

    if (!activo.isActivo) {
      return res.status(404).json({ msg: "El personal no existe" });
    }

    const personal = await Personal.findByIdAndUpdate(id, resto, {
      new: true,
    }).populate({ path: "rol" });

    return res.json(personal);
  } catch (error) {
    return res.status(500).json({ err: "Error de servidor.", error });
  }
};

/**
 *
 * @param {request} req
 * @param {response} res
 * @returns Si es correcto, retorna "Personal eliminado Correctamente". Si no, "El id no existe - personalExistID"
 * @description Se recibe un id como parametro y se verifica que este no sea MASTER_ROLE.
 * Si NO es MASTER_ROLE, procede a eliminar el usuario por estado. Se pasa isActivo = false.
 */
const PersonalDelete = async (req, res = response) => {
  try {
    const { id } = req.params;
    const rol = await Personal.findById(id).populate({ path: "rol" });
    const isMaster = rol.rol.rol;

    if (isMaster == "MASTER_ROLE") {
      return res.status(401).json({ msg: "No se puede eliminar MASTER_ROLE" });
    }

    await Personal.findByIdAndUpdate(id, { isActivo: false });
    return res.status(200).json({ msg: "Personal eliminado correctamente" });
  } catch (error) {
    return res.status(500).json({ err: "Error de servidor.", error });
  }
};

//Delete Usuario Permanente
/**
 *
 * @param {request} req
 * @param {response} res
 * @returns Si es correcto, retorna "Personal eliminado Definitivamente". Si no, "El id no existe - personalExistID"
 * @description Se recibe un id como parametro y se verifica que este no sea MASTER_ROLE.
 * Si NO es MASTER_ROLE, procede a eliminar el usuario de la base de datos. Este ya no existe dentro del sistema.
 */
const PersonalDeletePermanente = async (req, res = response) => {
  try {
    const { id } = req.params;

    const rol = await Personal.findById(id).populate({ path: "rol" });
    const isMaster = rol.rol.rol;

    if (isMaster == "MASTER_ROLE") {
      return res.status(401).json({ msg: "No se puede eliminar MASTER_ROLE" });
    }

    await Personal.findByIdAndDelete(id);
    return res.status(200).json({ msg: "Personal Eliminado Definitivamente" });
  } catch (error) {
    return res.status(500).json({ err: "Error de servidor.", error });
  }
};

/**
 *
 * @param {request} req
 * @param {response} res
 * @returns Si es correcto, retorna "Personal reactivado correctamente". Si no, "EL personal ya se encuentra activo"
 * @description Se recibe un id como parametro y actualiza el campo isActivo = true.
 */
const PersonalActive = async (req, res = response) => {
  try {
    const { id } = req.params;
    const personal = await Personal.findByIdAndUpdate(id, { isActivo: true });

    return personal.isActivo == true
      ? res.status(400).json({ msg: "EL personal ya se encuentra activo" }) //Error
      : res.status(200).json({ msg: "Personal reactivado correctamente" }); //Success
  } catch (error) {
    return res.status(500).json({ err: "Error de servidor.", error });
  }
};

const AssignationTruck = async (req, res) => {
  try {
    const { id } = req.params;
    const { drivers } = req.body;
    const formatData = [];

    console.log(id, "ID");
    console.log(drivers, "DRIVERS");

    for (const driver of drivers) {
      formatData.push({
        client_id: id,
        visitor_id: driver,
      });
    }
    console.log(formatData, "DATA FORMATEADA");

    await TruckAssignation.insertMany(formatData);

    return res.status(201).json({ msg: "Camiones asignados exitosamente" });
  } catch (error) {
    console.log(error, "ERROR BULK TRUCK ASSIGNATION");
    return res.status(500).json({ err: "Error de servidor.", error });
  }
};

module.exports = {
  PersonalGetAll,
  PersonalGet,
  PersonalPost,
  PersonalPut,
  PersonalDelete,
  PersonalDeletePermanente,
  PersonalGetAllEliminados,
  PersonalActive,
  AssignationTruck,
};
