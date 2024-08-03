const { qrEmail, activateEmail, transport } = require("../helpers/qrEmail");
const Department = require("../models/mexcal/Department");
const Device = require("../models/mexcal/Devices");
const Driver = require("../models/mexcal/Driver");
const ReasonForAdmission = require("../models/mexcal/ReasonForAdmission");
const Visit = require("../models/mexcal/Visit");
const Visitor = require("../models/mexcal/Visitor");
const VisitorsTypes = require("../models/mexcal/VisitorTypes");
const Usuario = require("../models/user.Model");
const QRCode = require("qrcode");

const opt = {
  errorCorrectionLevel: "L",
  width: 250,
  scale: 1,
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
    const visitorType = await VisitorsTypes.findById(req.body.visitor_type_id);
    let visitor = {};

    if (visitorType.name == "Transportistas") {
      const driverFrom = await Driver.create(req.body);

      visitor = {
        ...driverFrom._doc,
        name: driverFrom._doc.operator_name,
      };
    } else {
      const visitorForm = await Visitor.create(req.body);
      const departament = await Department.findById(req.body.department_id);
      visitor = {
        ...visitorForm._doc,
        department: departament.name,
        visitor_type: visitorType.name,
      };
    }

    const data = visitor;
    console.log(data, "VISITANTE");

    // const qrData = JSON.stringify(data);

    // QRCode.toDataURL(qrData, opt, function (err, url) {
    //   transport
    //     .sendMail(qrEmail(visitor.email, visitor.name, url))
    //     .then(async (_info) => {
    //       //Ocupar para debug
    //       // console.log(info.response)
    //       return res.status(200).send({
    //         status: "success",
    //         msg: "Codigo QR enviado al correo correctamente",
    //       });
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //       return res
    //         .status(500)
    //         .json({ err: "Credenciales de servidor invalidas", error: err });
    //     });
    // });

    return res.status(201).send({
      status: "success",
      msg: "El usuario fue creado correctamente",
    });
  } catch (error) {
    console.log(error, "PUBLIC REGISTER");
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
const getAllDevices = async (req, res) => {
  try {
    const devices = await Device.find({
      isActive: true,
    });

    return res.status(200).send({
      message: "Dispositivos",
      devices,
    });
  } catch (error) {
    return res.status(500).json({ err: "Error de servidor.", error });
  }
};
const getAllReasons = async (req, res) => {
  try {
    const reasons = await ReasonForAdmission.find({
      isActive: true,
    });

    return res.status(200).send({
      message: "Dispositivos",
      reasons,
    });
  } catch (error) {
    return res.status(500).json({ err: "Error de servidor.", error });
  }
};
const visitorsEntries = async (req, res) => {
  try {
    let message = "hora de entrada actualizada con exito!";

    const { visitorQr, scanDate } = req.body;

    const visit = await Visit.findOne({
      visitor_id: visitorQr._id,
    });
    const visitType = await VisitorsTypes.findOne({
      name: "Visitantes",
    });
    const visitor = await Visitor.findById(visitorQr._id);

    if (!visit) {
      await Visit.create({
        visit_init_time: scanDate,
        visitor_id: visitorQr._id,
      });
    } else {
      visit.visit_end_time = scanDate;
      await visit.save();

      if (visitType._id.toString() == visitorQr.visitor_type_id.toString()) {
        visitor.isActive = false;
        await visitor.save();
      }

      message = "hora de salida actualizada con exito!";
    }

    return res.status(200).send({
      status: "success",
      message,
    });
  } catch (error) {
    console.log(error, "VISITOR ERROR");
    return res.status(500).json({ err: "Error de servidor.", error });
  }
};

const verifyActiveVisitor = async (req, res) => {
  try {
    const { id } = req.params;

    const visitor = await Visitor.findOne({
      _id: id,
      isActive: true,
    });
    const driver = await Driver.findOne({
      _id: id,
      isActive: true,
    });
    if (driver || visitor) {
      return res.status(200).send({
        status: "success",
        message: "visitante valido",
        access: true,
      });
    } else {
      throw new Error(
        "El acceso del visitante ha caducado, debe realizar otro registro"
      );
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      err: "El acceso del visitante ha caducado, debe realizar otro registro",
      error,
    });
  }
};

module.exports = {
  registroPublico,
  activarUsuarioEmail,
  getAllDepartments,
  getAllVisitorsTypes,
  visitorsEntries,
  verifyActiveVisitor,
  getAllDevices,
  getAllReasons,
};
