const es = require("../lang/es.json");
const en = require("../lang/en.json");
const Truck = require("../models/mexcal/Truck");
const QRCode = require("qrcode");
const { qrEmail, transport } = require("../helpers/qrEmail");

const opt = {
  errorCorrectionLevel: "L",
  width: 300,
  scale: 1,

  // color: {
  //   // dark: '#593e73 ',  // Blue dots
  // //   light: '#ffffff' // Transparent background
  // }
};

const createTruck = async (req, res) => {
  const serverError =
    req.headers.lang == "es" ? es.serverError : en.serverError;
  const truckCreatedSuccessfully =
    req.headers.lang == "es"
      ? es.truckCreatedSuccessfully
      : en.truckCreatedSuccessfully;

  try {
    const truck = await Truck.create(req.body);

    return res.status(201).send({
      message: truckCreatedSuccessfully,
      truck,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      err: serverError,
      error,
    });
  }
};
const getAllTrucks = async (req, res) => {
  const serverError =
    req.headers.lang == "es" ? es.serverError : en.serverError;
  const page = +req.query.pageNumber || 1;
  const pageSize = 10;
  const keyword = req.query.keyword
    ? {
        // name: { $regex: req.query.keyword, $options: "i" },
        vin: { $regex: req.query.keyword },
        isActive: true,
      }
    : {
        isActive: true,
      };

  try {
    const count = await Truck.countDocuments({
      ...keyword,
    });

    const trucks = await Truck.find({
      ...keyword,
    })
      .limit(pageSize)
      .skip(pageSize * (page - 1));

    return res.status(200).send({
      message: "Camiones",
      trucks,
      page,
      pages: Math.ceil(count / pageSize),
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      err: serverError,
      error,
    });
  }
};
const getOneTruck = async (req, res) => {
  const serverError =
    req.headers.lang == "es" ? es.serverError : en.serverError;
  const trucknotFound =
    req.headers.lang == "es" ? es.truckNotFound : en.truckNotFound;
  try {
    const truck = await Truck.findOne({
      _id: req.params.id,
      isActive: true,
    });

    if (!truck) {
      return res.status(400).send({
        message: trucknotFound,
      });
    }

    return res.status(200).send({
      message: "Camion encontrado",
      truck,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      err: serverError,
      error,
    });
  }
};
const updateTruck = async (req, res) => {
  const serverError =
    req.headers.lang == "es" ? es.serverError : en.serverError;
  const trucknotFound =
    req.headers.lang == "es" ? es.truckNotFound : en.truckNotFound;
  const emailAlreadyInUsed =
    req.headers.lang == "es" ? es.emailAlreadyInUsed : en.emailAlreadyInUsed;
  const truckUpdatedSuccessfully =
    req.headers.lang == "es"
      ? es.truckUpdatedSuccessfully
      : en.truckUpdatedSuccessfully;
  try {
    const truck = await Truck.findById(req.params.id);
    const truckEmailValidation = await Truck.find({
      email: req.body.email,
    });

    if (
      truckEmailValidation.email == truck.email &&
      truckEmailValidation._id.toString() !== truck._id.toString()
    ) {
      return res.status(400).send({
        message: emailAlreadyInUsed,
      });
    }

    await Truck.findOneAndUpdate(
      {
        _id: req.params.id,
        isActive: true,
      },
      req.body
    );

    if (!truck) {
      return res.status(400).send({
        message: trucknotFound,
      });
    }

    return res.status(200).send({
      message: truckUpdatedSuccessfully,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      err: serverError,
      error,
    });
  }
};
const deleteTruck = async (req, res) => {
  const serverError =
    req.headers.lang == "es" ? es.serverError : en.serverError;
  const trucknotFound =
    req.headers.lang == "es" ? es.truckNotFound : en.truckNotFound;
  const truckDeletedSuccessfully =
    req.headers.lang == "es"
      ? es.truckDeletedSuccessfully
      : en.truckDeletedSuccessfully;
  try {
    const truck = await Truck.findOneAndUpdate(
      {
        _id: req.params.id,
        isActive: true,
      },
      {
        isActive: false,
      }
    );

    if (!truck) {
      return res.status(400).send({
        message: trucknotFound,
      });
    }

    return res.status(200).send({
      message: truckDeletedSuccessfully,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      err: serverError,
      error,
    });
  }
};

const generateTruckQR = async (req, res) => {
  const serverError =
    req.headers.lang == "es" ? es.serverError : en.serverError;
  const sendingEmail =
    req.headers.lang == "es" ? es.qrCodeSentToEmail : en.qrCodeSentToEmail;
  const sendingEmailError =
    req.headers.lang == "es"
      ? es.unableToGenerateQRCode
      : en.unableToGenerateQRCode;

  try {
    const usuario = await Truck.findById(req.params.id);

    const qrUser = JSON.stringify(usuario._id);

    QRCode.toDataURL(qrUser, opt, function (err, url) {
      transport
        .sendMail(qrEmail(usuario?.email, usuario?.name, url))
        .then(async (_info) => {
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
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      err: serverError,
      error,
    });
  }
};

const getTruckFromQR = async (req, res) => {
  const serverError =
    req.headers.lang == "es" ? es.serverError : en.serverError;
  const trucknotFound =
    req.headers.lang == "es" ? es.truckNotFound : en.truckNotFound;
  try {
    const truck = await Truck.findOne({
      _id: req.params.id,
      isActive: true,
    });

    if (!truck) {
      return res.status(400).send({
        message: trucknotFound,
      });
    }

    const qrUser = JSON.stringify(truck._id);

    QRCode.toDataURL(qrUser, opt, function (err, url) {
      return res.status(200).send({
        message: "Camion encontrado",
        truck,
        qr: url,
      });
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      err: serverError,
      error,
    });
  }
};

module.exports = {
  createTruck,
  getAllTrucks,
  getOneTruck,
  updateTruck,
  deleteTruck,
  generateTruckQR,
  getTruckFromQR,
};
