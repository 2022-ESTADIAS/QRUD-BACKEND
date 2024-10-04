const Driver = require("../models/mexcal/Driver");
const Visitor = require("../models/mexcal/Visitor");
const es = require("../lang/es.json");
const en = require("../lang/en.json");
const TruckAssignation = require("../models/mexcal/TruckAssignation");

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

    console.log(id, "USER ID");

    let count, drivers;

    if (req.query.keyword) {
      count = await TruckAssignation.countDocuments({
        client_id: id,
        isActive: true,
      }).populate({
        path: "visitor_id",
        match: {
          name: {
            $regex: req.query.keyword,
            $options: "i",
          },
        },
      });

      drivers = await TruckAssignation.find({
        client_id: id,
        isActive: true,
      })
        .populate({
          path: "visitor_id",
          match: {
            name: {
              $regex: req.query.keyword,
              $options: "i",
            },
          },
        })
        .select("name license_number license_plates email visit_company phone")
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
        .populate(
          "visitor_id",
          "name license_number license_plates email visit_company phone"
        )
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

module.exports = {
  getAllVisitors,
  getAllDrivers,
  getAllDriversByClientId,
};
