const { generarJWT } = require("../helpers/generarJWT");
const Personal = require("../models/personal.Model");
const bcryptjs = require("bcryptjs");
const es = require("../lang/es.json");
const en = require("../lang/en.json");

/**
 * @param {request} req
 * @param {response} res
 * @returns Si este es correcto, retorna el usuario en sesión y un token.
 * @description Funcionalidad que permite el login al sistema.
 */
const login = async (req, res) => {
  const userNotFound =
    req.headers.lang == "es" ? es.personalNotFound : en.personalNotFound;
  const wrongPassword =
    req.headers.lang == "es" ? es.wrongPassword : en.wrongPassword;
  const userFound =
    req.headers.lang == "es" ? es.personalFound : en.personalFound;
  const serverError =
    req.headers.lang == "es" ? es.serverError : en.serverError;

  const { email, password } = req.body;

  try {
    let token;

    const personal = await Personal.findOne({ email })
      .select("+password")
      .populate({ path: "rol" });

    if (!personal) {
      return res.status(404).json({ msg: userNotFound });
    }

    if (!personal.isActivo) {
      return res.status(404).json({ msg: userNotFound });
    }

    const compararPassword = await bcryptjs.compare(
      password,
      personal.password
    );
    if (!compararPassword) {
      return res.status(400).json({ msg: wrongPassword });
    }
    token = await generarJWT(personal._id);

    return res.status(200).json({
      msg: userFound,
      token,
      personal,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: serverError,
    });
  }
};

module.exports = {
  login,
};
