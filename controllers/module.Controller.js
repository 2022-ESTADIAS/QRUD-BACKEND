const Module = require("../models/mexcal/Module");
const es = require("../lang/es.json");
const en = require("../lang/en.json");

const createModule = async (req, res) => {
  const serverError =
    req.headers.lang == "es" ? es.serverError : en.serverError;
  try {
    await Module.create(req.body);

    return res.status(201).send({
      msg: "Modulo creado con exito",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: serverError,
    });
  }
};

const getModulesByRol = async (req, res) => {
  const serverError =
    req.headers.lang == "es" ? es.serverError : en.serverError;
  try {
    const modules = await Module.find({
      role_id: req.usuario.rol,
    });

    return res.status(201).send({
      msg: "Modulos",
      modules,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: serverError,
    });
  }
};

module.exports = {
  createModule,
  getModulesByRol,
};
