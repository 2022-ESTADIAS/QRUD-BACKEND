const Driver = require("../models/mexcal/Driver");
const Visitor = require("../models/mexcal/Visitor");
const es = require("../lang/es.json");
const en = require("../lang/en.json");

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

module.exports = {
  getAllVisitors,
  getAllDrivers,
};
