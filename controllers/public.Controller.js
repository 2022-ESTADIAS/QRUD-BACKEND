const { uploadFileToAWS, getFileFromAWS } = require("../helpers/awsClient");
const { qrEmail, activateEmail, transport } = require("../helpers/qrEmail");
const Department = require("../models/mexcal/Department");
const Device = require("../models/mexcal/Devices");
const Driver = require("../models/mexcal/Driver");
const ReasonForAdmission = require("../models/mexcal/ReasonForAdmission");
const Visit = require("../models/mexcal/Visit");
const Visitor = require("../models/mexcal/Visitor");
const VisitorsTypes = require("../models/mexcal/VisitorTypes");
const Usuario = require("../models/user.Model");
const File = require("../models/mexcal/File");
const QRCode = require("qrcode");
const es = require("../lang/es.json");
const en = require("../lang/en.json");

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
  const userCreated =
    req.headers.lang == "es" ? es.userHasBeenCreated : en.userHasBeenCreated;
  const serverError =
    req.headers.lang == "es" ? es.serverError : en.serverError;

  try {
    const visitorType = await VisitorsTypes.findById(req.body.visitor_type_id);
    let visitor = {};

    if (visitorType?.name == "Transportistas") {
      const driverFrom = await Visitor.create(req.body);
      const fileNameINE = await uploadFileToAWS(
        "mexcal-storage",
        "transportistas",
        req.files.ine_field[0]
      );
      const fileNameLicense = await uploadFileToAWS(
        "mexcal-storage",
        "transportistas",
        req.files.driver_licence_field[0]
      );
      const fileReferenceINE = await File.create({
        filename: fileNameINE,
        visitor_id: driverFrom._id,
      });
      const fileReferenceLicense = await File.create({
        filename: fileNameLicense,
        visitor_id: driverFrom._id,
      });
      await Visitor.findOneAndUpdate(
        { _id: driverFrom._id },
        {
          ine_file_id: fileReferenceINE._id,
          image_licence_file_id: fileReferenceLicense._id,
        }
      );

      // visitor = {
      //   ...driverFrom._doc,
      //   name: driverFrom._doc.operator_name,
      // };
    } else {
      const visitorForm = await Visitor.create({
        ...req.body,
        hasVehicle: req.body.hasVehicle == "true" ? true : false,
      });
      // const departament = await Department.findById(req.body.department_id);

      if (visitorType.name == "Proveedores") {
        const fileName = await uploadFileToAWS(
          "mexcal-storage",
          "proveedores",
          req.files.ine_field[0]
        );

        const fileReference = await File.create({
          filename: fileName,
          visitor_id: visitorForm._id,
        });
        await Visitor.findOneAndUpdate(
          { _id: visitorForm._id },
          {
            ine_file_id: fileReference._id,
          }
        );
      } else {
        const fileName = await uploadFileToAWS(
          "mexcal-storage",
          "visitantes",
          req.files.ine_field[0]
        );
        // await getFileFromAWS("mexcal-storage", fileName);

        const fileReference = await File.create({
          filename: fileName,
          visitor_id: visitorForm._id,
        });
        await Visitor.findOneAndUpdate(
          { _id: visitorForm._id },
          {
            ine_file_id: fileReference._id,
          }
        );
      }

      // visitor = {
      //   // ...visitorForm._doc,
      //   department: departament.name,
      //   visitor_type: visitorType.name,
      // };
    }

    // const data = visitor;
    // console.log(data, "VISITANTE");

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

    console.log("CAMION CREADO");

    return res.status(201).send({
      status: "success",
      msg: userCreated,
    });
  } catch (error) {
    console.log(error, "PUBLIC REGISTER");
    return res.status(500).json({ err: serverError, error });
  }
};

const getAllDepartments = async (req, res) => {
  const serverError =
    req.headers.lang == "es" ? es.serverError : en.serverError;
  try {
    const departments = await Department.find({
      isActive: true,
    });

    return res.status(200).send({
      message: "departamentos",
      departments,
    });
  } catch (error) {
    return res.status(500).json({ err: serverError, error });
  }
};
const getAllVisitorsTypes = async (req, res) => {
  const serverError =
    req.headers.lang == "es" ? es.serverError : en.serverError;
  try {
    const visitorTypes = await VisitorsTypes.find({
      isActive: true,
    });

    return res.status(200).send({
      message: "Visitantes",
      visitorTypes,
    });
  } catch (error) {
    return res.status(500).json({ err: serverError, error });
  }
};
const getAllDevices = async (req, res) => {
  const serverError =
    req.headers.lang == "es" ? es.serverError : en.serverError;
  try {
    const devices = await Device.find({
      isActive: true,
    });

    return res.status(200).send({
      message: "Dispositivos",
      devices,
    });
  } catch (error) {
    return res.status(500).json({ err: serverError, error });
  }
};
const getAllReasons = async (req, res) => {
  const serverError =
    req.headers.lang == "es" ? es.serverError : en.serverError;
  try {
    const reasons = await ReasonForAdmission.find({
      isActive: true,
    });

    return res.status(200).send({
      message: "Dispositivos",
      reasons,
    });
  } catch (error) {
    return res.status(500).json({ err: serverError, error });
  }
};

const visitorsEntries = async (req, res) => {
  const serverError =
    req.headers.lang == "es" ? es.serverError : en.serverError;
  const entryTime =
    req.headers.lang == "es"
      ? es.entryTimeSuccessfullyUpdate
      : en.entryTimeSuccessfullyUpdate;
  const departureTime =
    req.headers.lang == "es"
      ? es.departureTimeSuccessfullyUpdate
      : en.departureTimeSuccessfullyUpdate;
  try {
    let message = entryTime;

    const { visitorQr, scanDate } = req.body;

    const visit = await Visit.find({
      visitor_id: visitorQr._id,
    })
      .sort({
        _id: -1,
      })
      .limit(1);

    const visitor = await Visitor.findById(visitorQr._id);

    if (
      !visit ||
      visit.length == 0 ||
      (visit[0].visit_init_time && visit[0].visit_end_time)
    ) {
      await Visit.create({
        visit_init_time: scanDate,
        visitor_id: visitorQr._id,
      });
    } else {
      visit[0].visit_end_time = scanDate;
      await visit[0].save();

      if (visitorQr.visitor_type == "Visitantes") {
        visitor.isActive = false;
        await visitor.save();
      }
      message = departureTime;
    }

    return res.status(200).send({
      status: "success",
      message,
    });
  } catch (error) {
    console.log(error, "VISITOR ERROR");
    return res.status(500).json({ err: serverError, error });
  }
};

//MODIFICAR
const verifyActiveVisitor = async (req, res) => {
  const accessExpired =
    req.headers.lang == "es" ? es.errorAccess : en.errorAccess;
  const validVisitor =
    req.headers.lang == "es" ? es.validVisitor : en.validVisitor;

  try {
    const { id } = req.params;

    const visitor = await Visitor.findOne({
      _id: id,
      isActive: true,
    });

    if (visitor) {
      return res.status(200).send({
        status: "success",
        message: validVisitor,
        access: true,
      });
    } else {
      throw new Error(accessExpired);
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      err: accessExpired,
      error,
    });
  }
};

// MODIFICAR
const getUserFromQRCode = async (req, res) => {
  const serverError =
    req.headers.lang == "es" ? es.serverError : en.serverError;
  const qrCodeError =
    req.headers.lang == "es" ? es.invalidQRCode : en.invalidQRCode;
  const userSuccessfullyRecovered =
    req.headers.lang == "es"
      ? es.userSuccessfullyRecovered
      : en.userSuccessfullyRecovered;
  try {
    const { id } = req.params;
    let user = {};
    const visitorType = await VisitorsTypes.findOne({
      name: "Transportistas",
    });

    const visitor = await Visitor.findOne({
      _id: id,
      isActive: true,
    })
      .populate("ine_file_id", "filename")
      .populate("image_licence_file_id", "filename");

    if (visitor.visitor_type_id.toString() == visitorType._id.toString()) {
      const ine = await getFileFromAWS(
        "mexcal-storage",
        visitor.ine_file_id.filename
      );
      const license = await getFileFromAWS(
        "mexcal-storage",
        visitor.image_licence_file_id.filename
      );

      user = {
        ...visitor._doc,
        ine_field: ine,
        driver_licence_field: license,
      };
    } else {
      // const usuario = await Visitor.findById(id)
      const usuario = await Visitor.findOne({
        _id: id,
        isActive: true,
      })
        .populate("ine_file_id", "filename")
        .populate("department_id", "name")
        .populate("visitor_type_id", "name");

      if (!usuario) {
        throw new Error(qrCodeError);
      }
      const ine = await getFileFromAWS(
        "mexcal-storage",
        usuario.ine_file_id.filename
      );
      user = {
        ...usuario._doc,
        visitor_type: usuario.visitor_type_id.name,
        department: usuario.department_id.name,
        ine_field: ine,
      };
    }

    return res.status(200).send({
      status: "success",
      message: userSuccessfullyRecovered,
      user,
    });
  } catch (error) {
    console.log(error, "IMAGE ERROR");
    return res.status(500).json({ err: error.message, error });
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
  getUserFromQRCode,
};
