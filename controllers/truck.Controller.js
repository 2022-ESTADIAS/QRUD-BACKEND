const es = require("../lang/es.json");
const en = require("../lang/en.json");
const Truck = require("../models/mexcal/Truck");

const createTruck = async (req, res) => {
  const serverError =
    req.headers.lang == "es" ? es.serverError : en.serverError;
  try {
    await Truck.create(req.body);

    return res.status(201).send({
      message: "Camión creado con exito",
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
        name: { $regex: req.query.keyword },
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
  try {
    const truck = await Truck.findOne({
      _id: req.params.id,
      isActive: true,
    });

    if (!truck) {
      return res.status(400).send({
        message: "El camión no existe",
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
        message: "El correo ya esta en uso",
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
        message: "El camión no existe",
      });
    }

    return res.status(200).send({
      message: "Camion actualizado con exito!",
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
        message: "El camión no existe",
      });
    }

    return res.status(200).send({
      message: "Camion eliminado con exito!",
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
};
