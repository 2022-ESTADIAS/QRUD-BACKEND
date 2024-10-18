const Driver = require("../models/mexcal/Driver");
const Visitor = require("../models/mexcal/Visitor");
const es = require("../lang/es.json");
const en = require("../lang/en.json");
const TruckAssignation = require("../models/mexcal/TruckAssignation");
const { default: mongoose } = require("mongoose");
const Truck = require("../models/mexcal/Truck");

const getAllVisitors = async (req, res) => {
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
    const count = await Visitor.countDocuments({
      ...keyword,
    });
    const visitors = await Visitor.find({
      ...keyword,
    })
      .sort([["_id", "desc"]])
      .populate("visitor_type_id", "name")
      .limit(pageSize)
      .skip(pageSize * (page - 1));

    return res.status(200).send({
      status: "success",
      visitors,
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
const getAllDrivers = async (req, res) => {
  const serverError =
    req.headers.lang == "es" ? es.serverError : en.serverError;
  const page = +req.query.pageNumber || 1;
  const pageSize = 10;
  const keyword = req.query.keyword
    ? {
        // name: { $regex: req.query.keyword, $options: "i" },
        operator_name: { $regex: req.query.keyword },
        isActive: true,
      }
    : {
        isActive: true,
      };
  try {
    const count = await Driver.countDocuments({
      ...keyword,
    });

    const drivers = await Driver.find({
      ...keyword,
    })
      .sort([["_id", "desc"]])
      .limit(pageSize)
      .skip(pageSize * (page - 1));

    return res.status(200).send({
      status: "success",
      drivers,
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

const getAllDriversByClientId = async (req, res) => {
  const serverError =
    req.headers.lang == "es" ? es.serverError : en.serverError;
  try {
    const id = req.usuario._id;
    const page = +req.query.pageNumber || 1;
    const pageSize = 10;

    let count, drivers;

    if (req.query.keyword) {
      const clientTrucksIds = [];
      const visitorsIds = [];

      const clientTrucks = await TruckAssignation.find({
        isActive: true,
        client_id: id,
      }).select("truck_id");
      for (const client of clientTrucks) {
        clientTrucksIds.push(client.truck_id);
      }

      const visitors = await Truck.find({
        _id: {
          $in: clientTrucksIds,
        },
        name: {
          $regex: req.query.keyword,
        },
      }).select("_id");
      for (const visitor of visitors) {
        visitorsIds.push(visitor._id);
      }

      count = await TruckAssignation.countDocuments({
        isActive: true,
        client_id: id,
        truck_id: {
          $in: visitorsIds,
        },
      });

      drivers = await TruckAssignation.find({
        client_id: id,
        isActive: true,
        truck_id: {
          $in: visitorsIds,
        },
      })
        .populate("truck_id", "name email visit_company phone")
        .sort([["_id", "desc"]])
        .limit(pageSize)
        .skip(pageSize * (page - 1));
    } else {
      count = await TruckAssignation.countDocuments({
        client_id: id,
        isActive: true,
      });

      drivers = await TruckAssignation.find({
        client_id: id,
        isActive: true,
      })
        .populate("truck_id")
        .sort([["_id", "desc"]])
        .limit(pageSize)
        .skip(pageSize * (page - 1));
    }

    console.log(drivers, "ASIGNADOS");

    return res.status(200).send({
      status: "success",
      drivers,
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
const getTrucksAssigned = async (req, res) => {
  const serverError =
    req.headers.lang == "es" ? es.serverError : en.serverError;

  try {
    const trucks = await TruckAssignation.find({
      client_id: req.params.id,
      isActive: true,
    }).select("_id truck_id");

    return res.status(200).send({
      trucks,
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
  getAllVisitors,
  getAllDrivers,
  getAllDriversByClientId,
  getTrucksAssigned,
};
