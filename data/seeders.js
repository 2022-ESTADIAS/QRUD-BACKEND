require("dotenv").config();
const Department = require("../models/mexcal/Department");
const VisitorTypes = require("../models/mexcal/VisitorTypes");
const Devices = require("../models/mexcal/Devices");
const Server = require("../models/server");
const ReasonForAdmission = require("../models/mexcal/ReasonForAdmission");
const server = new Server();

const departments = [
  { name: "SEGURIDAD" },
  { name: "OPERACIONES" },
  { name: "RECURSOS HUMANOS" },
  { name: "SISTEMAS" },
  { name: "ADMINISTRACION" },
  { name: "FACTURACION" },
  { name: "DIESEL" },
  { name: "DIRECCION" },
];

const visitorsTypes = [
  { name: "Proveedores" },
  { name: "Transportistas" },
  { name: "Visitantes" },
];
const devices = [
  { name: "COMPUTADORA" },
  { name: "CAMARA" },
  { name: "USB" },
  { name: "HERRAMIENTA" },
];
const reasons = [
  { name: "ENTREGA DE MATERIAL" },
  { name: "REALIZAR REPARACION O SERVICIO" },
];

server.conectarDB();

const importData = async () => {
  try {
    await Department.deleteMany();
    await VisitorTypes.deleteMany();
    await Devices.deleteMany();
    await ReasonForAdmission.deleteMany();

    await Department.insertMany(departments);
    await VisitorTypes.insertMany(visitorsTypes);
    await Devices.insertMany(devices);
    await ReasonForAdmission.insertMany(reasons);

    console.log("DATA IMPORTED SUSCCESSSFULLY");
    process.exit(1);
  } catch (error) {
    console.log(error, "ERROR DE IMPORTACION");
    process.exit(1);
  }
};

importData();
