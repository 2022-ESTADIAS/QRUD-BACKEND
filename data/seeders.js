require("dotenv").config();
const Department = require("../models/mexcal/Department");
const VisitorTypes = require("../models/mexcal/VisitorTypes");
const Devices = require("../models/mexcal/Devices");
const Server = require("../models/server");
const ReasonForAdmission = require("../models/mexcal/ReasonForAdmission");
const Role = require("../models/role.Model");
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

const roles = [
  { name: "MASTER_ROLE", description: "master de la app" },
  { name: "CLIENT_ROLE", description: "cliente de la empresa" },
];

const modules = [
  {
    icon: "fa-solid fa-user",
    module_name: "visitantes",
    routes: [
      { name: "crear", link: "/registro-visitante", english_name: "create" },
      {
        name: "ver Visitantes",
        link: "/ver-visitantes",
        english_name: "see Visitors",
      },
    ],
    role_id: "66999aecde6079bb9a11aa29",
    english_name: "Visitors",
  },
  {
    icon: "fa-solid fa-users-gear",
    module_name: "Clientes",
    routes: [
      {
        name: "ver",
        link: "/ver-personal",
        english_name: "see ",
      },
    ],
    role_id: "66999aecde6079bb9a11aa29",
    english_name: "Clients",
  },
  {
    icon: "fa-solid fa-qrcode",
    module_name: "QR",
    routes: [
      {
        name: "Escanear QR",
        link: "/qr",
        english_name: "QR Scan",
      },
    ],
    role_id: "66999aecde6079bb9a11aa29",
    english_name: "QR",
  },
  {
    icon: "fa-solid fa-key",
    module_name: "Contraseña",
    routes: [
      {
        name: "Cambiar Contraseña",
        link: "/contrasena",
        english_name: "Change Password",
      },
    ],
    role_id: "66999aecde6079bb9a11aa29",
    english_name: "Password",
  },
  {
    icon: "fa fa-truck",
    module_name: "Mis Camiones",
    routes: [
      {
        name: "ver",
        link: "/ver-camiones",
        english_name: "See trucks",
      },
    ],
    role_id: "669b12086bbc68d7dcba9297",
    english_name: "My Trucks",
  },
  {
    icon: "fa fa-truck",
    module_name: "Camiones",
    routes: [
      {
        name: "registrar camiones",
        link: "/registro-camion",
        english_name: "register truck",
      },
    ],
    role_id: "66999aecde6079bb9a11aa29",
    english_name: "Trucks",
  },
];

server.conectarDB();

const importData = async () => {
  try {
    await Department.deleteMany();
    await VisitorTypes.deleteMany();
    await Devices.deleteMany();
    await ReasonForAdmission.deleteMany();
    await Role.deleteMany();

    await Department.insertMany(departments);
    await VisitorTypes.insertMany(visitorsTypes);
    await Devices.insertMany(devices);
    await ReasonForAdmission.insertMany(reasons);
    await Role.insertMany(roles);

    console.log("DATA IMPORTED SUSCCESSSFULLY");
    process.exit(1);
  } catch (error) {
    console.log(error, "ERROR DE IMPORTACION");
    process.exit(1);
  }
};

importData();
