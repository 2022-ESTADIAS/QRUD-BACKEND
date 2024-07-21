require("dotenv").config();
const Department = require("../models/mexcal/Department");
const VisitorTypes = require("../models/mexcal/VisitorTypes");
const Server = require("../models/server");
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
  { name: "Asistentes" },
  { name: "Visitantes" },
];

server.conectarDB();

const importData = async () => {
  try {
    await Department.deleteMany();
    await VisitorTypes.deleteMany();

    await Department.insertMany(departments);
    await VisitorTypes.insertMany(visitorsTypes);
    console.log("DATA IMPORTED SUSCCESSSFULLY");
    process.exit(1);
  } catch (error) {
    console.log(error, "ERROR DE IMPORTACION");
    process.exit(1);
  }
};

importData();
