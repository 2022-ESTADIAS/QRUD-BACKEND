require("dotenv").config();
const Visitor = require("../models/mexcal/Visitor");
const Server = require("../models/server");
const server = new Server();

server.conectarDB();

const clients = [
  {
    name: "JAVIER ROGEL",
    visit_company: "MEXCAL",
    email: "jrogel+1@jrgtransportation.com",
    visitor_type_id: "66a02dddc58cf23c82597f21",
    tracto_id: 435,
    brand: "FREIGHTLINER",
    year: 2006,
    license_plates: "1FUJA6CKX6PV83722",
    model: "Cascadia",
  },
  {
    name: "JAVIER ROGEL",
    visit_company: "MEXCAL",
    email: "jrogel+2@jrgtransportation.com",
    visitor_type_id: "66a02dddc58cf23c82597f21",
    tracto_id: 629,
    brand: "FREIGHTLINER",
    year: 2011,
    license_plates: "1FUJGLDR0BSBB9692",
    model: "Cascadia",
  },
  {
    name: "JAVIER ROGEL",
    visit_company: "MEXCAL",
    email: "jrogel+3@jrgtransportation.com",
    visitor_type_id: "66a02dddc58cf23c82597f21",
    tracto_id: 542,
    brand: "VOLVO",
    year: 2009,
    license_plates: "4V4NC9TG69N268582",
    model: "6X4 VNL CONV",
  },
  {
    name: "JAVIER ROGEL",
    visit_company: "MEXCAL",
    email: "jrogel+4@jrgtransportation.com",
    visitor_type_id: "66a02dddc58cf23c82597f21",
    tracto_id: 631,
    brand: "FREIGHTLINER",
    year: 2011,
    license_plates: "1FUJGLDR9BSBC1716",
    model: "Cascadia",
  },
  {
    name: "JAVIER ROGEL",
    visit_company: "MEXCAL",
    email: "jrogel+5@jrgtransportation.com",
    visitor_type_id: "66a02dddc58cf23c82597f21",
    tracto_id: 547,
    brand: "VOLVO",
    year: 2009,
    license_plates: "4V4NC9TG09N268447",
    model: "6X4 VNL CONV",
  },
  {
    name: "JAVIER ROGEL",
    visit_company: "MEXCAL",
    email: "jrogel+6jrgtransportation.com",
    visitor_type_id: "66a02dddc58cf23c82597f21",
    tracto_id: 546,
    brand: "VOLVO",
    year: 2009,
    license_plates: "4V4NC9TG29N277876",
    model: "6X4 VNL CONV",
  },
  {
    name: "JAVIER ROGEL",
    visit_company: "MEXCAL",
    email: "jrogel+7@jrgtransportation.com",
    visitor_type_id: "66a02dddc58cf23c82597f21",
    tracto_id: 554,
    brand: "VOLVO",
    year: 2009,
    license_plates: "4V4NC9TG19N277903",
    model: "6X4 VNL CONV",
  },
  {
    name: "JAVIER ROGEL",
    visit_company: "MEXCAL",
    email: "jrogel+8@jrgtransportation.com",
    visitor_type_id: "66a02dddc58cf23c82597f21",
    tracto_id: 543,
    brand: "VOLVO",
    year: 2009,
    license_plates: "4V4NC9TG89N277722",
    model: "6X4 VNL CONV",
  },
  {
    name: "JAVIER ROGEL",
    visit_company: "MEXCAL",
    email: "jrogel+9@jrgtransportation.com",
    visitor_type_id: "66a02dddc58cf23c82597f21",
    tracto_id: 549,
    brand: "VOLVO",
    year: 2009,
    license_plates: "4V4NC9TGX9N268648",
    model: "6X4 VNL CONV",
  },
  {
    name: "JAVIER ROGEL",
    visit_company: "MEXCAL",
    email: "jrogel+10@jrgtransportation.com",
    visitor_type_id: "66a02dddc58cf23c82597f21",
    tracto_id: 673,
    brand: "FREIGHTLINER",
    year: 2015,
    license_plates: "3AKGGLD59FSGJ2710",
    model: "Cascadia",
  },
];

const importData = async () => {
  try {
    await Visitor.insertMany(clients);

    console.log("DATA IMPORTED SUSCCESSSFULLY");
    process.exit(1);
  } catch (error) {
    console.log(error, "ERROR DE IMPORTACION");
    process.exit(1);
  }
};

importData();
