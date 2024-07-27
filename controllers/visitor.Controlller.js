const Visitor = require("../models/mexcal/Visitor");

const getAllVisitors = async (req, res) => {
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
      err: "Error en el servidor",
      error,
    });
  }
};

module.exports = {
  getAllVisitors,
};
