const multer = require("multer");
const path = require("path");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../uploads"));
  },
  filename: function (req, file, cb) {
    // console.log(file, "ARCHIVO SUBIDO");

    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    const splitName = file.originalname.replace(" ", "-").split(".");
    // cb(null, newName + "-" + uniqueSuffix + ext);
    const newName = `${splitName[0]}-${uniqueSuffix}${ext}`;
    cb(null, newName);
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
