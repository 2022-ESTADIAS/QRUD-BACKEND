const { qrEmail, activateEmail, transport } = require("../helpers/qrEmail");
const Department = require("../models/mexcal/Department");
const Visitor = require("../models/mexcal/Visitor");
const VisitorsTypes = require("../models/mexcal/VisitorTypes");
const Usuario = require("../models/user.Model");
const QRCode = require("qrcode");

const opt = {
  errorCorrectionLevel: "H",

  // color: {
  //   // dark: '#593e73 ',  // Blue dots
  // //   light: '#ffffff' // Transparent background
  // }
};

/**
 *
 * @param {*} req
 * @param {*} res
 * @returns EXITO:  "Usuario activado exitosamente". Error:"No se puede activar al usuario"
 * @description FUNCIONALIDAD PWA. Este es el paso despues de realizar el registro y hacer click al enlace del correo.
 */
const activarUsuarioEmail = async (req, res) => {
  try {
    const { id } = req.params;
    const usuario = await Usuario.findById(id);
    if (!usuario.isActivo) {
      usuario.isActivo = true;
      usuario.save();
      return res.status(200).json({ msg: "Usuario activado exitosamente" });
    } else {
      return res.status(400).json({ msg: "No se puede activar al usuario" });
    }
  } catch (error) {
    return res.status(500).json({ err: "Error de servidor.", error });
  }
};

/**
 *
 * @param {*} req
 * @param {*} res
 * @returns Un correo para activación de cuentas de usuarios.
 * @description FUNCIONALIDAD PWA. Se realiza el registro de usuarios de manera publica.
 * @Todo Actualizar url de correo.
 */
const registroPublico = async (req, res) => {
  try {
    // const {
    //   name,
    //   email,
    //   visit_date,
    //   enter_device,
    //   department_id,
    //   visitor_type_id,
    // } = req.body;
    const visitor = await Visitor.create(req.body);

    const departament = await Department.findById(visitor.department_id);
    const visitorType = await VisitorsTypes.findById(visitor.visitor_type_id);
    const data = {
      ...visitor,
      department: departament.name,
      visitor_type: visitorType.name,
    };
    console.log(data, "VISITANTE");

    const qrData = JSON.stringify(data);

    QRCode.toDataURL(qrData, opt, function (err, url) {
      transport
        .sendMail(qrEmail(visitor.email, visitor.name, url))
        .then(async (_info) => {
          //Ocupar para debug
          // console.log(info.response)
          return res.status(200).send({
            status: "success",
            msg: "Codigo QR enviado al correo correctamente",
          });
        })
        .catch((err) => {
          console.log(err);
        });
    });
  } catch (error) {
    return res.status(500).json({ err: "Error de servidor.", error });
  }
};

const getAllDepartments = async (req, res) => {
  try {
    const departments = await Department.find({
      isActive: true,
    });

    return res.status(200).send({
      message: "departamentos",
      departments,
    });
  } catch (error) {
    return res.status(500).json({ err: "Error de servidor.", error });
  }
};
const getAllVisitorsTypes = async (req, res) => {
  try {
    const visitorTypes = await VisitorsTypes.find({
      isActive: true,
    });

    return res.status(200).send({
      message: "Visitantes",
      visitorTypes,
    });
  } catch (error) {
    return res.status(500).json({ err: "Error de servidor.", error });
  }
};

module.exports = {
  registroPublico,
  activarUsuarioEmail,
  getAllDepartments,
  getAllVisitorsTypes,
};
