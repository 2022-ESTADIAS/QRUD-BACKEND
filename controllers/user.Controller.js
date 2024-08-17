const Usuario = require("../models/user.Model");
const QRCode = require("qrcode");

const { qrEmail, transport } = require("../helpers/qrEmail");
const { rfcRgx } = require("../helpers/regex");
const Visitor = require("../models/mexcal/Visitor");
const Driver = require("../models/mexcal/Driver");
const es = require("../lang/es.json");
const en = require("../lang/en.json");

const opt = {
  errorCorrectionLevel: "L",
  width: 300,
  scale: 1,

  // color: {
  //   // dark: '#593e73 ',  // Blue dots
  // //   light: '#ffffff' // Transparent background
  // }
};

/**
 *
 * @param {request} req
 * @param {response} res
 * @returns Retorna la lista de todos los usuarios activos del sistema.
 * @description Busca todos los usuarios con la propiedad isActivo = true.
 */
const usuariosGetAll = async (req, res) => {
  try {
    const usuarios = await Usuario.find({ isActivo: true });

    return res.status(200).json({ usuarios });
  } catch (error) {
    return res.status(500).json({ err: "Error de servidor.", error });
  }
};

//ELIMINADOS
/**
 *
 * @param {request} req
 * @param {response} res
 * @returns Retorna la lista de todos los usuarios inactivos del sistema.
 * @description Busca todos los usuarios con la propiedad isActivo = false.
 */

const usuariosGetAllEliminados = async (req, res) => {
  try {
    const usuarios = await Usuario.find({ isActivo: false });

    return res.status(200).json({ usuarios });
  } catch (error) {
    return res.status(500).json({ err: "Error de servidor.", error });
  }
};

/**
 *
 * @param {request} req
 * @param {response} res
 * @returns Un unico usuario ACTIVO mediante el ID.
 * @description Busca un usuario mediante el ID proporcionado. Si este no esta activo, manda error "El usuario no existe".
 * Si esta activo, retorna el usuario.
 */
const usuariosGet = async (req, res) => {
  try {
    const { id } = req.params;
    const usuario = await Usuario.findById(id);

    if (usuario.isActivo == false) {
      return res.status(400).json({ msg: "El usuario no existe" });
    }

    return res.status(200).json({ usuario });
  } catch (error) {
    return res.status(500).json({ err: "Error de servidor.", error });
  }
};

/**
 *
 * @param {request} req
 * @param {response} res
 * @returns "Usuario Creado Exitosamente", si falla, retorna "formato incorrecto".
 * @description Realiza la creación de usuario, cuenta con multiples regex para asegurar datos correctos.
 * Se utiliza regex para RFC.
 */
const usuariosPost = async (req, res) => {
  try {
    const { nombre, rfc, direccion, telefono, email } = req.body;
    if (rfcRgx(rfc)) {
      const usuario = new Usuario({ nombre, rfc, direccion, telefono, email });
      await usuario.save();
      return res.status(201).json({ msg: "Usuario Creado Exitosamente" });
    } else {
      res.status(400).json({ msg: "formato incorrecto" });
    }
  } catch (error) {
    return res.status(500).json({ err: "Error de servidor.", error });
  }
};

/**
 *
 * @param {request} req
 * @param {response} res
 * @returns El usuario actualizado.
 * @description Se permite actualizar al usuario, si este se proporciona con un Id invalido o inactivo, mostrará errores.
 * "El usuario no existe".
 */
const usuariosPut = async (req, res) => {
  try {
    const { id } = req.params;
    const { _id, ...resto } = req.body;
    const activo = await Usuario.findById(id);

    if (!activo.isActivo) {
      return res.status(404).json({ msg: "El usuario no existe" });
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto, { new: true });

    return res.status(200).json(usuario);
  } catch (error) {
    return res.status(500).json({ err: "Error de servidor.", error });
  }
};

/**
 *
 * @param {request} req
 * @param {response} res
 * @returns Correo electronico con QR del usuario en caso de ser exitoso. En caso de error "El QR se ha generado para este usuario." o "usuario no está activo".
 * @description Se genera un QR para el usuario con el id proporcionado. El QR contiene información como nombre, rfc, direccion, telefono y correo.
 * Este QR se envia al correo del usuario.
 */
const generarQRuser = async (req, res = response) => {
  const sendingEmail =
    req.headers.lang == "es" ? es.qrCodeSentToEmail : en.qrCodeSentToEmail;
  const sendingEmailError =
    req.headers.lang == "es"
      ? es.unableToGenerateQRCode
      : en.unableToGenerateQRCode;
  const serverError =
    req.headers.lang == "es" ? es.serverError : en.serverError;
  try {
    const { id } = req.params;
    let user = {};
    let userEmailSent = {};
    const driver = await Driver.findById(id);

    if (driver) {
      user = {
        _id: driver._doc._id,
      };
      userEmailSent = {
        name: driver?.operator_name,
        email: driver.email,
      };
    } else {
      const usuario = await Visitor.findById(id);

      user = {
        _id: usuario._doc._id,
      };
      userEmailSent = {
        name: usuario.name,
        email: usuario.email,
      };
    }

    if (user.isActive == false) {
      return res.status(404).json({ msg: "usuario no esta activo" });
    }

    const qrUser = JSON.stringify(user);

    QRCode.toDataURL(qrUser, opt, function (err, url) {
      transport
        .sendMail(qrEmail(userEmailSent?.email, userEmailSent?.name, url))
        .then(async (_info) => {
          // usuario.linkqr = url;
          // usuario.qr = true;
          // await usuario.save();
          //Ocupar para debug
          // console.log(info.response)
          return res.status(200).send({
            status: "success",
            msg: sendingEmail,
          });
        })
        .catch((err) => {
          console.log(err);
          return res.status(500).json({ err: sendingEmailError, error: err });
        });
    });

    // return res.status(200).send({
    //   status: "message",
    //   msg: "Codigo QR enviado al correo correctamente",
    // });
  } catch (error) {
    return res.status(500).json({ err: serverError, error });
  }
};

/**
 *
 * @param {request} req
 * @param {response} res
 * @returns Exito: "usuario eliminado correctamente", Error: "usuario no encontrado"
 * @description Se recibe un id por parametro y se elimina este usuario por estado. Cambia su propiedad isActivo = false.
 */
const usuariosDelete = async (req, res = response) => {
  try {
    const { id } = req.params;

    const usuario = await Usuario.findByIdAndUpdate(id, { isActivo: false });

    return usuario.isActivo == false
      ? res.status(404).json({ msg: "usuario no encontrado" })
      : res.status(200).json({ msg: "usuario eliminado correctamente" });
  } catch (error) {
    return res.status(500).json({ err: "Error de servidor.", error });
  }
};

//Delete permanente
/**
 *
 * @param {request} req
 * @param {response} res
 * @returns Exito: "usuario eliminado definitivamente", Error: "El id no existe - userExistID"
 * @description Se recibe un id por parametro y se elimina este usuario definitivamente.
 */
const usuariosDeletePermanente = async (req, res = response) => {
  try {
    const { id } = req.params;

    const usuario = await Usuario.findByIdAndDelete(id);

    return res.json({ msg: "Usuario eliminado definitivamente" });
  } catch (error) {
    return res.status(500).json({ err: "Error de servidor.", error });
  }
};
/**
 *
 * @param {request} req
 * @param {response} res
 * @returns Exito: "usuario reactivado correctamente". Error: "El usuario ya se encuentra activo"
 * @description Permite la reactivación del usuario mediante el ID proporcionado.
 */
const usuarioActive = async (req, res = response) => {
  try {
    const { id } = req.params;

    const usuario = await Usuario.findByIdAndUpdate(id, { isActivo: true });

    return usuario.isActivo == true
      ? res.status(400).json({ msg: "El usuario ya se encuentra activo" })
      : res.status(200).json({ msg: "usuario reactivado correctamente" });
  } catch (error) {
    return res.status(500).json({ err: "Error de servidor.", error });
  }
};

module.exports = {
  usuariosGetAll,
  usuariosGet,
  usuariosPost,
  usuariosPut,
  usuariosDelete,
  usuariosGetAllEliminados,
  generarQRuser,
  usuariosDeletePermanente,
  usuarioActive,
};
