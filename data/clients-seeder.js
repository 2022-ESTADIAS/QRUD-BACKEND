require("dotenv").config();
const Truck = require("../models/mexcal/Truck");
const Server = require("../models/server");
const server = new Server();

server.conectarDB();

const clients = [
  {
    name: "JAVIER ROGEL",
    company: "MEXCAL",
    email: "jrogel+1@jrgtransportation.com",
    tract: 435,
    brand: "FREIGHTLINER",
    year: 2006,
    vin: "1FUJA6CKX6PV83722",
    model: "Cascadia",
  },
  {
    name: "JAVIER ROGEL",
    company: "MEXCAL",
    email: "jrogel@jrgtransportation.com",
    "tipo de usuario": "TRANSPORTISTAS",
    tract: 629,
    brand: "FREIGHTLINER",
    year: 2011,
    vin: "1FUJGLDR0BSBB9692",
    model: "Cascadia",
  },
  {
    name: "JAVIER ROGEL",
    company: "MEXCAL",
    email: "jrogel@jrgtransportation.com",
    "tipo de usuario": "TRANSPORTISTAS",
    tract: 542,
    brand: "VOLVO",
    year: 2009,
    vin: "4V4NC9TG69N268582",
    model: "6X4 VNL CONV",
  },
  {
    name: "JAVIER ROGEL",
    company: "MEXCAL",
    email: "jrogel@jrgtransportation.com",
    "tipo de usuario": "TRANSPORTISTAS",
    tract: 631,
    brand: "FREIGHTLINER",
    year: 2011,
    vin: "1FUJGLDR9BSBC1716",
    model: "Cascadia",
  },
  {
    name: "JAVIER ROGEL",
    company: "MEXCAL",
    email: "jrogel@jrgtransportation.com",
    "tipo de usuario": "TRANSPORTISTAS",
    tract: 547,
    brand: "VOLVO",
    year: 2009,
    vin: "4V4NC9TG09N268447",
    model: "6X4 VNL CONV",
  },
  {
    name: "JAVIER ROGEL",
    company: "MEXCAL",
    email: "jrogel@jrgtransportation.com",
    "tipo de usuario": "TRANSPORTISTAS",
    tract: 546,
    brand: "VOLVO",
    year: 2009,
    vin: "4V4NC9TG29N277876",
    model: "6X4 VNL CONV",
  },
  {
    name: "JAVIER ROGEL",
    company: "MEXCAL",
    email: "jrogel@jrgtransportation.com",
    "tipo de usuario": "TRANSPORTISTAS",
    tract: 554,
    brand: "VOLVO",
    year: 2009,
    vin: "4V4NC9TG19N277903",
    model: "6X4 VNL CONV",
  },
  {
    name: "JAVIER ROGEL",
    company: "MEXCAL",
    email: "jrogel@jrgtransportation.com",
    "tipo de usuario": "TRANSPORTISTAS",
    tract: 543,
    brand: "VOLVO",
    year: 2009,
    vin: "4V4NC9TG89N277722",
    model: "6X4 VNL CONV",
  },
  {
    name: "JAVIER ROGEL",
    company: "MEXCAL",
    email: "jrogel@jrgtransportation.com",
    "tipo de usuario": "TRANSPORTISTAS",
    tract: 549,
    brand: "VOLVO",
    year: 2009,
    vin: "4V4NC9TGX9N268648",
    model: "6X4 VNL CONV",
  },
  {
    name: "JAVIER ROGEL",
    company: "MEXCAL",
    email: "jrogel@jrgtransportation.com",
    "tipo de usuario": "TRANSPORTISTAS",
    tract: 673,
    brand: "FREIGHTLINER",
    year: 2015,
    vin: "3AKGGLD59FSGJ2710",
    model: "Cascadia",
  },
  {
    name: "JAVIER ROGEL",
    company: "MEXCAL",
    email: "jrogel@jrgtransportation.com",
    "tipo de usuario": "TRANSPORTISTAS",
    tract: 556,
    brand: "INTERNATIONAL",
    year: 2015,
    vin: "3HSDJSNR0FN625667",
    model: "Prostar",
  },
  {
    name: "JAVIER ROGEL",
    company: "MEXCAL",
    email: "jrogel@jrgtransportation.com",
    "tipo de usuario": "TRANSPORTISTAS",
    tract: 548,
    brand: "VOLVO",
    year: 2009,
    vin: "4V4NC9TG49N277927",
    model: "6X4 VNL CONV",
  },
  {
    name: "JAVIER ROGEL",
    company: "MEXCAL",
    email: "jrogel@jrgtransportation.com",
    "tipo de usuario": "TRANSPORTISTAS",
    tract: 677,
    brand: "FREIGHTLINER",
    year: 2016,
    vin: "3AKGGLD52GSGY1238",
    model: "Cascadia",
  },
  {
    name: "JAVIER ROGEL",
    company: "MEXCAL",
    email: "jrogel@jrgtransportation.com",
    "tipo de usuario": "TRANSPORTISTAS",
    tract: 559,
    brand: "FREIGHTLINER",
    year: 2015,
    vin: "3AKGGLD51FSGL1333",
    model: "Cascadia",
  },
  {
    name: "JAVIER ROGEL",
    company: "MEXCAL",
    email: "jrogel@jrgtransportation.com",
    "tipo de usuario": "TRANSPORTISTAS",
    tract: 675,
    brand: "FREIGHTLINER",
    year: 2016,
    vin: "3AKGGLD54GSGT0162",
    model: "Cascadia",
  },
  {
    name: "JAVIER ROGEL",
    company: "MEXCAL",
    email: "jrogel@jrgtransportation.com",
    "tipo de usuario": "TRANSPORTISTAS",
    tract: 561,
    brand: "FREIGHTLINER",
    year: 2016,
    vin: "3AKGGLD57GSGT0169",
    model: "Cascadia",
  },
  {
    name: "JAVIER ROGEL",
    company: "MEXCAL",
    email: "jrogel@jrgtransportation.com",
    "tipo de usuario": "TRANSPORTISTAS",
    tract: 678,
    brand: "FREIGHTLINER",
    year: 2016,
    vin: "3AKGGLD54GSGY1239",
    model: "Cascadia",
  },
  {
    name: "JAVIER ROGEL",
    company: "MEXCAL",
    email: "jrogel@jrgtransportation.com",
    "tipo de usuario": "TRANSPORTISTAS",
    tract: 563,
    brand: "FREIGHTLINER",
    year: 2016,
    vin: "3AKGGLD55GSGT0171",
    model: "Cascadia",
  },
  {
    name: "JAVIER ROGEL",
    company: "MEXCAL",
    email: "jrogel@jrgtransportation.com",
    "tipo de usuario": "TRANSPORTISTAS",
    tract: 564,
    brand: "FREIGHTLINER",
    year: 2016,
    vin: "3AKGGLD57GSGT0172",
    model: "Cascadia",
  },
  {
    name: "JAVIER ROGEL",
    company: "MEXCAL",
    email: "jrogel@jrgtransportation.com",
    "tipo de usuario": "TRANSPORTISTAS",
    tract: 565,
    brand: "FREIGHTLINER",
    year: 2016,
    vin: "3AKGGLD59GSGT0173",
    model: "Cascadia",
  },
  {
    name: "JAVIER ROGEL",
    company: "MEXCAL",
    email: "jrogel@jrgtransportation.com",
    "tipo de usuario": "TRANSPORTISTAS",
    tract: 633,
    brand: "FREIGHTLINER",
    year: 2010,
    vin: "1FUJGEDR4ASAU1786",
    model: "Cascadia",
  },
  {
    name: "JAVIER ROGEL",
    company: "MEXCAL",
    email: "jrogel@jrgtransportation.com",
    "tipo de usuario": "TRANSPORTISTAS",
    tract: 632,
    brand: "FREIGHTLINER",
    year: 2010,
    vin: "1FUJGEDRXASAU1775",
    model: "Cascadia",
  },
  {
    name: "JAVIER ROGEL",
    company: "MEXCAL",
    email: "jrogel@jrgtransportation.com",
    "tipo de usuario": "TRANSPORTISTAS",
    tract: 568,
    brand: "FREIGHTLINER",
    year: 2016,
    vin: "3AKGGLD57GSGT0186",
    model: "Cascadia",
  },
  {
    name: "JAVIER ROGEL",
    company: "MEXCAL",
    email: "jrogel@jrgtransportation.com",
    "tipo de usuario": "TRANSPORTISTAS",
    tract: 582,
    brand: "FREIGHTLINER",
    year: 2009,
    vin: "1FUJA6CK09DAF8849",
    model: "Cascadia",
  },
  {
    name: "JAVIER ROGEL",
    company: "MEXCAL",
    email: "jrogel@jrgtransportation.com",
    "tipo de usuario": "TRANSPORTISTAS",
    tract: 567,
    brand: "FREIGHTLINER",
    year: 2016,
    vin: "3AKGGLD55GSGT0185",
    model: "Cascadia",
  },
  {
    name: "JAVIER ROGEL",
    company: "MEXCAL",
    email: "jrogel@jrgtransportation.com",
    "tipo de usuario": "TRANSPORTISTAS",
    tract: 562,
    brand: "FREIGHTLINER",
    year: 2016,
    vin: "3AKGGLD53GSGT0170",
    model: "Cascadia",
  },
  {
    name: "JAVIER ROGEL",
    company: "MEXCAL",
    email: "jrogel@jrgtransportation.com",
    "tipo de usuario": "TRANSPORTISTAS",
    tract: 571,
    brand: "FREIGHTLINER",
    year: 2016,
    vin: "3AKGGLD52GSGT0189",
    model: "Cascadia",
  },
  {
    name: "JAVIER ROGEL",
    company: "MEXCAL",
    email: "jrogel@jrgtransportation.com",
    "tipo de usuario": "TRANSPORTISTAS",
    tract: 558,
    brand: "FREIGHTLINER",
    year: 2015,
    vin: "3AKGGLD53FSGJ2704",
    model: "Cascadia",
  },
  {
    name: "JAVIER ROGEL",
    company: "MEXCAL",
    email: "jrogel@jrgtransportation.com",
    "tipo de usuario": "TRANSPORTISTAS",
    tract: 560,
    brand: "FREIGHTLINER",
    year: 2016,
    vin: "3AKGGLD55GSGT0168",
    model: "Cascadia",
  },
  {
    name: "JAVIER ROGEL",
    company: "MEXCAL",
    email: "jrogel@jrgtransportation.com",
    "tipo de usuario": "TRANSPORTISTAS",
    tract: 570,
    brand: "FREIGHTLINER",
    year: 2016,
    vin: "3AKGGLD50GSGT0188",
    model: "Cascadia",
  },
  {
    name: "JAVIER ROGEL",
    company: "MEXCAL",
    email: "jrogel@jrgtransportation.com",
    "tipo de usuario": "TRANSPORTISTAS",
    tract: 566,
    brand: "FREIGHTLINER",
    year: 2016,
    vin: "3AKGGLD50GSGT0174",
    model: "Cascadia",
  },
  {
    name: "JAVIER ROGEL",
    company: "MEXCAL",
    email: "jrogel@jrgtransportation.com",
    "tipo de usuario": "TRANSPORTISTAS",
    tract: 607,
    brand: "KENWORTH",
    year: 2018,
    vin: "3WKYC79X6JF501546",
    model: "T680",
  },
  {
    name: "JAVIER ROGEL",
    company: "MEXCAL",
    email: "jrogel@jrgtransportation.com",
    "tipo de usuario": "TRANSPORTISTAS",
    tract: 608,
    brand: "KENWORTH",
    year: 2018,
    vin: "3WKYC79X8JF501547",
    model: "T680",
  },
  {
    name: "JAVIER ROGEL",
    company: "MEXCAL",
    email: "jrogel@jrgtransportation.com",
    "tipo de usuario": "TRANSPORTISTAS",
    tract: 569,
    brand: "FREIGHTLINER",
    year: 2016,
    vin: "3AKGGLD59GSGT0187",
    model: "Cascadia",
  },
  {
    name: "JAVIER ROGEL",
    company: "MEXCAL",
    email: "jrogel@jrgtransportation.com",
    "tipo de usuario": "TRANSPORTISTAS",
    tract: 557,
    brand: "INTERNATIONAL",
    year: 2015,
    vin: "3HSDJSNR2FN625668",
    model: "Cascadia",
  },
  {
    name: "JAVIER ROGEL",
    company: "MEXCAL",
    email: "jrogel@jrgtransportation.com",
    "tipo de usuario": "TRANSPORTISTAS",
    tract: 661,
    brand: "FREIGHTLINER",
    year: 2019,
    vin: "3AKGHHDR8KSKF5732",
    model: "Cascadia",
  },
  {
    name: "JAVIER ROGEL",
    company: "MEXCAL",
    email: "jrogel@jrgtransportation.com",
    "tipo de usuario": "TRANSPORTISTAS",
    tract: 618,
    brand: "INTERNATIONAL",
    year: 2011,
    vin: "3HSCUAPR2BN186380",
    model: "Prostar",
  },
  {
    name: "JAVIER ROGEL",
    company: "MEXCAL",
    email: "jrogel@jrgtransportation.com",
    "tipo de usuario": "TRANSPORTISTAS",
    tract: 572,
    brand: "INTERNATIONAL",
    year: 2009,
    vin: "2HSCUSBR29C099572",
    model: "Prostar",
  },
  {
    name: "JAVIER ROGEL",
    company: "MEXCAL",
    email: "jrogel@jrgtransportation.com",
    "tipo de usuario": "TRANSPORTISTAS",
    tract: 615,
    brand: "INTERNATIONAL",
    year: 2010,
    vin: "1HSHXAHR8AJ173193",
    model: "Prostar",
  },
  {
    name: "JAVIER ROGEL",
    company: "MEXCAL",
    email: "jrogel@jrgtransportation.com",
    "tipo de usuario": "TRANSPORTISTAS",
    tract: 716,
    brand: "FREIGHTLINER",
    year: 2019,
    vin: "3AKJHTDVXKSKN2860",
    model: "Cascadia",
  },
  {
    name: "JAVIER ROGEL",
    company: "MEXCAL",
    email: "jrogel@jrgtransportation.com",
    "tipo de usuario": "TRANSPORTISTAS",
    tract: 622,
    brand: "FREIGHTLINER",
    year: 2012,
    vin: "1FUJGLDR8CLBE2665",
    model: "Cascadia",
  },
  {
    name: "JAVIER ROGEL",
    company: "MEXCAL",
    email: "jrogel@jrgtransportation.com",
    "tipo de usuario": "TRANSPORTISTAS",
    tract: 616,
    brand: "INTERNATIONAL",
    year: 2009,
    vin: "2HSCUAPR59C104461",
    model: "Prostar",
  },
  {
    name: "JAVIER ROGEL",
    company: "MEXCAL",
    email: "jrogel@jrgtransportation.com",
    "tipo de usuario": "TRANSPORTISTAS",
    tract: 626,
    brand: "FREIGHTLINER",
    year: 2015,
    vin: "1FUJGLDR9BSBB9402",
    model: "Cascadia",
  },
  {
    name: "JAVIER ROGEL",
    company: "MEXCAL",
    email: "jrogel@jrgtransportation.com",
    "tipo de usuario": "TRANSPORTISTAS",
    tract: 627,
    brand: "FREIGHTLINER",
    year: 2011,
    vin: "1FUJGLDR8BSBB9682",
    model: "Cascadia",
  },
  {
    name: "JAVIER ROGEL",
    company: "MEXCAL",
    email: "jrogel@jrgtransportation.com",
    "tipo de usuario": "TRANSPORTISTAS",
    tract: 628,
    brand: "FREIGHTLINER",
    year: 2011,
    vin: "1FUJGLDR6BSBB9714",
    model: "Cascadia",
  },
  {
    name: "JAVIER ROGEL",
    company: "MEXCAL",
    email: "jrogel@jrgtransportation.com",
    "tipo de usuario": "TRANSPORTISTAS",
    tract: 602,
    brand: "INTERNATIONAL",
    year: 2013,
    vin: "1HSDHSJR1DJ306005",
    model: "Prostar",
  },
  {
    name: "JAVIER ROGEL",
    company: "MEXCAL",
    email: "jrogel@jrgtransportation.com",
    "tipo de usuario": "TRANSPORTISTAS",
    tract: 717,
    brand: "FREIGHTLINER",
    year: 2019,
    vin: "3AKJHTDV6KSKN2922",
    model: "Cascadia",
  },
  {
    name: "JAVIER ROGEL",
    company: "MEXCAL",
    email: "jrogel@jrgtransportation.com",
    "tipo de usuario": "TRANSPORTISTAS",
    tract: 718,
    brand: "FREIGHTLINER",
    year: 2019,
    vin: "3AKJHTDV7KSKN2914",
    model: "Cascadia",
  },
  {
    name: "JAVIER ROGEL",
    company: "MEXCAL",
    email: "jrogel@jrgtransportation.com",
    "tipo de usuario": "TRANSPORTISTAS",
    tract: 611,
    brand: "KENWORTH",
    year: 2018,
    vin: "3WKYC79X8JF501550",
    model: "T680",
  },
  {
    name: "JAVIER ROGEL",
    company: "MEXCAL",
    email: "jrogel@jrgtransportation.com",
    "tipo de usuario": "TRANSPORTISTAS",
    tract: 638,
    brand: "FREIGHTLINER",
    year: 2018,
    vin: "3AKGHHDR3JSJM7778",
    model: "Cascadia",
  },
  {
    name: "JAVIER ROGEL",
    company: "MEXCAL",
    email: "jrogel@jrgtransportation.com",
    "tipo de usuario": "TRANSPORTISTAS",
    tract: 639,
    brand: "FREIGHTLINER",
    year: 2018,
    vin: "3AKGHHDR5JSJM7779",
    model: "Cascadia",
  },
  {
    name: "JAVIER ROGEL",
    company: "MEXCAL",
    email: "jrogel@jrgtransportation.com",
    "tipo de usuario": "TRANSPORTISTAS",
    tract: 640,
    brand: "FREIGHTLINER",
    year: 2018,
    vin: "3AKGHHDR1JSJM7780",
    model: "Cascadia",
  },
  {
    name: "JAVIER ROGEL",
    company: "MEXCAL",
    email: "jrogel@jrgtransportation.com",
    "tipo de usuario": "TRANSPORTISTAS",
    tract: 641,
    brand: "FREIGHTLINER",
    year: 2018,
    vin: "3AKGHHDR3JSJM7781",
    model: "Cascadia",
  },
  {
    name: "JAVIER ROGEL",
    company: "MEXCAL",
    email: "jrogel@jrgtransportation.com",
    "tipo de usuario": "TRANSPORTISTAS",
    tract: 642,
    brand: "FREIGHTLINER",
    year: 2018,
    vin: "3AKGHHDR5JSJM7782",
    model: "Cascadia",
  },
  {
    name: "JAVIER ROGEL",
    company: "MEXCAL",
    email: "jrogel@jrgtransportation.com",
    "tipo de usuario": "TRANSPORTISTAS",
    tract: 643,
    brand: "FREIGHTLINER",
    year: 2018,
    vin: "3AKGHHDR7JSJM7783",
    model: "Cascadia",
  },
  {
    name: "JAVIER ROGEL",
    company: "MEXCAL",
    email: "jrogel@jrgtransportation.com",
    "tipo de usuario": "TRANSPORTISTAS",
    tract: 645,
    brand: "FREIGHTLINER",
    year: 2019,
    vin: "3AKGHHDR0KSKF5739",
    model: "Cascadia",
  },
  {
    name: "JAVIER ROGEL",
    company: "MEXCAL",
    email: "jrogel@jrgtransportation.com",
    "tipo de usuario": "TRANSPORTISTAS",
    tract: 646,
    brand: "FREIGHTLINER",
    year: 2019,
    vin: "3AKGHHDR7KSKF5740",
    model: "Cascadia",
  },
  {
    name: "JAVIER ROGEL",
    company: "MEXCAL",
    email: "jrogel@jrgtransportation.com",
    "tipo de usuario": "TRANSPORTISTAS",
    tract: 647,
    brand: "FREIGHTLINER",
    year: 2019,
    vin: "3AKGHHDR1KSKF5734",
    model: "Cascadia",
  },
  {
    name: "JAVIER ROGEL",
    company: "MEXCAL",
    email: "jrogel@jrgtransportation.com",
    "tipo de usuario": "TRANSPORTISTAS",
    tract: 648,
    brand: "FREIGHTLINER",
    year: 2019,
    vin: "3AKGHHDR3KSKF5721",
    model: "Cascadia",
  },
  {
    name: "JAVIER ROGEL",
    company: "MEXCAL",
    email: "jrogel@jrgtransportation.com",
    "tipo de usuario": "TRANSPORTISTAS",
    tract: 649,
    brand: "FREIGHTLINER",
    year: 2019,
    vin: "3AKGHHDR3KSKF5735",
    model: "Cascadia",
  },
  {
    name: "JAVIER ROGEL",
    company: "MEXCAL",
    email: "jrogel@jrgtransportation.com",
    "tipo de usuario": "TRANSPORTISTAS",
    tract: 650,
    brand: "FREIGHTLINER",
    year: 2019,
    vin: "3AKGHHDR4KSKF5727",
    model: "Cascadia",
  },
  {
    name: "JAVIER ROGEL",
    company: "MEXCAL",
    email: "jrogel@jrgtransportation.com",
    "tipo de usuario": "TRANSPORTISTAS",
    tract: 651,
    brand: "FREIGHTLINER",
    year: 2019,
    vin: "3AKGHHDR4KSKF5730",
    model: "Cascadia",
  },
  {
    name: "JAVIER ROGEL",
    company: "MEXCAL",
    email: "jrogel@jrgtransportation.com",
    "tipo de usuario": "TRANSPORTISTAS",
    tract: 652,
    brand: "FREIGHTLINER",
    year: 2019,
    vin: "3AKGHHDR5KSKF5722",
    model: "Cascadia",
  },
  {
    name: "JAVIER ROGEL",
    company: "MEXCAL",
    email: "jrogel@jrgtransportation.com",
    "tipo de usuario": "TRANSPORTISTAS",
    tract: 654,
    brand: "FREIGHTLINER",
    year: 2019,
    vin: "3AKGHHDR6KSKF5728",
    model: "Cascadia",
  },
  {
    name: "JAVIER ROGEL",
    company: "MEXCAL",
    email: "jrogel@jrgtransportation.com",
    "tipo de usuario": "TRANSPORTISTAS",
    tract: 655,
    brand: "FREIGHTLINER",
    year: 2019,
    vin: "3AKGHHDR7KSKF5723",
    model: "Cascadia",
  },
  {
    name: "JAVIER ROGEL",
    company: "MEXCAL",
    email: "jrogel@jrgtransportation.com",
    "tipo de usuario": "TRANSPORTISTAS",
    tract: 656,
    brand: "FREIGHTLINER",
    year: 2019,
    vin: "3AKGHHDR7KSKF5737",
    model: "Cascadia",
  },
  {
    name: "JAVIER ROGEL",
    company: "MEXCAL",
    email: "jrogel@jrgtransportation.com",
    "tipo de usuario": "TRANSPORTISTAS",
    tract: 657,
    brand: "FREIGHTLINER",
    year: 2019,
    vin: "3AKGHHDR9KSKF5724",
    model: "Cascadia",
  },
  {
    name: "JAVIER ROGEL",
    company: "MEXCAL",
    email: "jrogel@jrgtransportation.com",
    "tipo de usuario": "TRANSPORTISTAS",
    tract: 658,
    brand: "FREIGHTLINER",
    year: 2019,
    vin: "3AKGHHDR9KSKF5738",
    model: "Cascadia",
  },
  {
    name: "JAVIER ROGEL",
    company: "MEXCAL",
    email: "jrogel@jrgtransportation.com",
    "tipo de usuario": "TRANSPORTISTAS",
    tract: 659,
    brand: "FREIGHTLINER",
    year: 2019,
    vin: "3AKGHHDRXKSKF5733",
    model: "Cascadia",
  },
  {
    name: "JAVIER ROGEL",
    company: "MEXCAL",
    email: "jrogel@jrgtransportation.com",
    "tipo de usuario": "TRANSPORTISTAS",
    tract: 660,
    brand: "FREIGHTLINER",
    year: 2019,
    vin: "3AKGHHDR9KSKF5741",
    model: "Cascadia",
  },
  {
    name: "JAVIER ROGEL",
    company: "MEXCAL",
    email: "jrogel@jrgtransportation.com",
    "tipo de usuario": "TRANSPORTISTAS",
    tract: 610,
    brand: "KENWORTH",
    year: 2018,
    vin: "3WKYC79X1JF501549",
    model: "T680",
  },
  {
    name: "JAVIER ROGEL",
    company: "MEXCAL",
    email: "jrogel@jrgtransportation.com",
    "tipo de usuario": "TRANSPORTISTAS",
    tract: 662,
    brand: "FREIGHTLINER",
    year: 2019,
    vin: "3AKGHHDR6KSKF5731",
    model: "Cascadia",
  },
  {
    name: "JAVIER ROGEL",
    company: "MEXCAL",
    email: "jrogel@jrgtransportation.com",
    "tipo de usuario": "TRANSPORTISTAS",
    tract: 663,
    brand: "FREIGHTLINER",
    year: 2019,
    vin: "3AKGHHDR8KSKF5729",
    model: "Cascadia",
  },
  {
    name: "JAVIER ROGEL",
    company: "MEXCAL",
    email: "jrogel@jrgtransportation.com",
    "tipo de usuario": "TRANSPORTISTAS",
    tract: 664,
    brand: "FREIGHTLINER",
    year: 2019,
    vin: "3AKGHHDR2KSKF5726",
    model: "Cascadia",
  },
  {
    name: "JAVIER ROGEL",
    company: "MEXCAL",
    email: "jrogel@jrgtransportation.com",
    "tipo de usuario": "TRANSPORTISTAS",
    tract: 665,
    brand: "FREIGHTLINER",
    year: 2019,
    vin: "3AKGHHDR0KSKF5725",
    model: "Cascadia",
  },
  {
    name: "JAVIER ROGEL",
    company: "MEXCAL",
    email: "jrogel@jrgtransportation.com",
    "tipo de usuario": "TRANSPORTISTAS",
    tract: 668,
    brand: "FREIGHTLINER",
    year: 2012,
    vin: "1FUJGEDV5CSBD6725",
    model: "Cascadia",
  },
  {
    name: "JAVIER ROGEL",
    company: "MEXCAL",
    email: "jrogel@jrgtransportation.com",
    "tipo de usuario": "TRANSPORTISTAS",
    tract: 612,
    brand: "KENWORTH",
    year: 2018,
    vin: "3WKYC79XXJF501551",
    model: "T680",
  },
  {
    name: "JAVIER ROGEL",
    company: "MEXCAL",
    email: "jrogel@jrgtransportation.com",
    "tipo de usuario": "TRANSPORTISTAS",
    tract: 674,
    brand: "FREIGHTLINER",
    year: 2015,
    vin: "3AKGGLD50FSGJ2711",
    model: "Cascadia",
  },
  {
    name: "JAVIER ROGEL",
    company: "MEXCAL",
    email: "jrogel@jrgtransportation.com",
    "tipo de usuario": "TRANSPORTISTAS",
    tract: 606,
    brand: "KENWORTH",
    year: 2018,
    vin: "3WKYC79X4JF501545",
    model: "T680",
  },
  {
    name: "JAVIER ROGEL",
    company: "MEXCAL",
    email: "jrogel@jrgtransportation.com",
    "tipo de usuario": "TRANSPORTISTAS",
    tract: 676,
    brand: "FREIGHTLINER",
    year: 2016,
    vin: "3AKGGLD55GSGY1234",
    model: "Cascadia",
  },
  {
    name: "JAVIER ROGEL",
    company: "MEXCAL",
    email: "jrogel@jrgtransportation.com",
    "tipo de usuario": "TRANSPORTISTAS",
    tract: 688,
    brand: "FREIGHTLINER",
    year: 2019,
    vin: "3AKJHHDR1KSKD3335",
    model: "Cascadia",
  },
  {
    name: "JAVIER ROGEL",
    company: "MEXCAL",
    email: "jrogel@jrgtransportation.com",
    "tipo de usuario": "TRANSPORTISTAS",
    tract: 719,
    brand: "FREIGHTLINER",
    year: 2019,
    vin: "3AKJHTDV3KSKN2859",
    model: "Cascadia",
  },
  {
    name: "JAVIER ROGEL",
    company: "MEXCAL",
    email: "jrogel@jrgtransportation.com",
    "tipo de usuario": "TRANSPORTISTAS",
    tract: 605,
    brand: "KENWORTH",
    year: 2018,
    vin: "3WKYC79X2JF501544",
    model: "T680",
  },
  {
    name: "JAVIER ROGEL",
    company: "MEXCAL",
    email: "jrogel@jrgtransportation.com",
    "tipo de usuario": "TRANSPORTISTAS",
    tract: 540,
    brand: "VOLVO",
    year: 2009,
    vin: "4V4NC9TG49N268449",
    model: "6X4 VNL CONV",
  },
  {
    name: "JAVIER ROGEL",
    company: "MEXCAL",
    email: "jrogel@jrgtransportation.com",
    "tipo de usuario": "TRANSPORTISTAS",
    tract: 613,
    brand: "KENWORTH",
    year: 2018,
    vin: "3WKYC79X1JF501552",
    model: "T680",
  },
  {
    name: "JAVIER ROGEL",
    company: "MEXCAL",
    email: "jrogel@jrgtransportation.com",
    "tipo de usuario": "TRANSPORTISTAS",
    tract: 679,
    brand: "FREIGHTLINER",
    year: 2014,
    vin: "1FUJGLD55ELFU0291",
    model: "Cascadia",
  },
  {
    name: "JAVIER ROGEL",
    company: "MEXCAL",
    email: "jrogel@jrgtransportation.com",
    "tipo de usuario": "TRANSPORTISTAS",
    tract: 545,
    brand: "VOLVO",
    year: 2009,
    vin: "4V4NC9TG59N271540",
    model: "6X4 VNL CONV",
  },
  {
    name: "JAVIER ROGEL",
    company: "MEXCAL",
    email: "jrogel@jrgtransportation.com",
    "tipo de usuario": "TRANSPORTISTAS",
    tract: 691,
    brand: "KENWORTH",
    year: 2023,
    vin: "3WKHDJ9X3PF323713",
    model: "T370",
  },
  {
    name: "JAVIER ROGEL",
    company: "MEXCAL",
    email: "jrogel@jrgtransportation.com",
    "tipo de usuario": "TRANSPORTISTAS",
    tract: 693,
    brand: "KENWORTH",
    year: 2023,
    vin: "3WKHDJ9X7PF323715",
    model: "T370",
  },
  {
    name: "JAVIER ROGEL",
    company: "MEXCAL",
    email: "jrogel@jrgtransportation.com",
    "tipo de usuario": "TRANSPORTISTAS",
    tract: 695,
    brand: "KENWORTH",
    year: 2023,
    vin: "3WKHDJ9X9PF323716",
    model: "T370",
  },
  {
    name: "JAVIER ROGEL",
    company: "MEXCAL",
    email: "jrogel@jrgtransportation.com",
    "tipo de usuario": "TRANSPORTISTAS",
    tract: 696,
    brand: "KENWORTH",
    year: 2023,
    vin: "3WKHDJ9XXPF323711",
    model: "T370",
  },
  {
    name: "JAVIER ROGEL",
    company: "MEXCAL",
    email: "jrogel@jrgtransportation.com",
    "tipo de usuario": "TRANSPORTISTAS",
    tract: 700,
    brand: "KENWORTH",
    year: 2023,
    vin: "3WKHDJ9X4PF323719",
    model: "T370",
  },
  {
    name: "JAVIER ROGEL",
    company: "MEXCAL",
    email: "jrogel@jrgtransportation.com",
    "tipo de usuario": "TRANSPORTISTAS",
    tract: 694,
    brand: "KENWORTH",
    year: 2023,
    vin: "3WKHDJ9X8PF323710",
    model: "T370",
  },
  {
    name: "JAVIER ROGEL",
    company: "MEXCAL",
    email: "jrogel@jrgtransportation.com",
    "tipo de usuario": "TRANSPORTISTAS",
    tract: 690,
    brand: "KENWORTH",
    year: 2023,
    vin: "3WKHDJ9X1PF323712",
    model: "T370",
  },
  {
    name: "JAVIER ROGEL",
    company: "MEXCAL",
    email: "jrogel@jrgtransportation.com",
    "tipo de usuario": "TRANSPORTISTAS",
    tract: 692,
    brand: "KENWORTH",
    year: 2023,
    vin: "3WKHDJ9X5PF323714",
    model: "T370",
  },
  {
    name: "JAVIER ROGEL",
    company: "MEXCAL",
    email: "jrogel@jrgtransportation.com",
    "tipo de usuario": "TRANSPORTISTAS",
    tract: 689,
    brand: "KENWORTH",
    year: 2023,
    vin: "3WKHDJ9X1PF323709",
    model: "T370",
  },
  {
    name: "JAVIER ROGEL",
    company: "MEXCAL",
    email: "jrogel@jrgtransportation.com",
    "tipo de usuario": "TRANSPORTISTAS",
    tract: 699,
    brand: "KENWORTH",
    year: 2023,
    vin: "3WKHDJ9X0PF323720",
    model: "T370",
  },
  {
    name: "JAVIER ROGEL",
    company: "MEXCAL",
    email: "jrogel@jrgtransportation.com",
    "tipo de usuario": "TRANSPORTISTAS",
    tract: 698,
    brand: "KENWORTH",
    year: 2023,
    vin: "3WKHDJ9X2PF323718",
    model: "T370",
  },
  {
    name: "JAVIER ROGEL",
    company: "MEXCAL",
    email: "jrogel@jrgtransportation.com",
    "tipo de usuario": "TRANSPORTISTAS",
    tract: 705,
    brand: "FREIGHTLINER",
    year: 2015,
    vin: "3AKJGLD57FSGJ5952",
    model: "Cascadia",
  },
  {
    name: "JAVIER ROGEL",
    company: "MEXCAL",
    email: "jrogel@jrgtransportation.com",
    "tipo de usuario": "TRANSPORTISTAS",
    tract: 710,
    brand: "KENWORTH",
    year: 2024,
    vin: "3BKYD39X0RF536718",
    model: "T680",
  },
  {
    name: "JAVIER ROGEL",
    company: "MEXCAL",
    email: "jrogel@jrgtransportation.com",
    "tipo de usuario": "TRANSPORTISTAS",
    tract: 711,
    brand: "KENWORTH",
    year: 2024,
    vin: "3BKYD39X2RF536719",
    model: "T680",
  },
  {
    name: "JAVIER ROGEL",
    company: "MEXCAL",
    email: "jrogel@jrgtransportation.com",
    "tipo de usuario": "TRANSPORTISTAS",
    tract: 712,
    brand: "KENWORTH",
    year: 2024,
    vin: "3BKYD39X9RF536720",
    model: "T680",
  },
  {
    name: "JAVIER ROGEL",
    company: "MEXCAL",
    email: "jrogel@jrgtransportation.com",
    "tipo de usuario": "TRANSPORTISTAS",
    tract: 713,
    brand: "KENWORTH",
    year: 2024,
    vin: "3BKYD39X0RF536721",
    model: "T680",
  },
  {
    name: "JAVIER ROGEL",
    company: "MEXCAL",
    email: "jrogel@jrgtransportation.com",
    "tipo de usuario": "TRANSPORTISTAS",
    tract: 714,
    brand: "KENWORTH",
    year: 2024,
    vin: "1NKYD39X8PJ248248",
    model: "T680",
  },
  {
    name: "JAVIER ROGEL",
    company: "MEXCAL",
    email: "jrogel@jrgtransportation.com",
    "tipo de usuario": "TRANSPORTISTAS",
    tract: 715,
    brand: "KENWORTH",
    year: 2024,
    vin: "1NKYD39XXPJ248249",
    model: "T680",
  },
  {
    name: "JAVIER ROGEL",
    company: "MEXCAL",
    email: "jrogel@jrgtransportation.com",
    "tipo de usuario": "TRANSPORTISTAS",
    tract: 702,
    brand: "KENWORTH",
    year: 2023,
    vin: "3WKHDJ9X4PF323722",
    model: "T370",
  },
  {
    name: "JAVIER ROGEL",
    company: "MEXCAL",
    email: "jrogel@jrgtransportation.com",
    "tipo de usuario": "TRANSPORTISTAS",
    tract: 701,
    brand: "KENWORTH",
    year: 2023,
    vin: "3WKHDJ9X2PF323721",
    model: "T370",
  },
  {
    name: "JAVIER ROGEL",
    company: "MEXCAL",
    email: "jrogel@jrgtransportation.com",
    "tipo de usuario": "TRANSPORTISTAS",
    tract: 697,
    brand: "KENWORTH",
    year: 2023,
    vin: "3WKHDJ9X0PF323717",
    model: "T370",
  },
  {
    name: "JAVIER ROGEL",
    company: "MEXCAL",
    email: "jrogel@jrgtransportation.com",
    "tipo de usuario": "TRANSPORTISTAS",
    tract: 617,
    brand: "INTERNATIONAL",
    year: 2011,
    vin: "3HSCUAPR0BN186099",
    model: "Prostar",
  },
  {
    name: "JAVIER ROGEL",
    company: "MEXCAL",
    email: "jrogel@jrgtransportation.com",
    "tipo de usuario": "TRANSPORTISTAS",
    tract: 720,
    brand: "FREIGHTLINER",
    year: 2019,
    vin: "3AKJHTDV0KSKN2866",
    model: "Cascadia",
  },
  {
    name: "JAVIER ROGEL",
    company: "MEXCAL",
    email: "jrogel@jrgtransportation.com",
    "tipo de usuario": "TRANSPORTISTAS",
    tract: 721,
    brand: "FREIGHTLINER",
    year: 2019,
    vin: "3AKJHTDV6KSKN2919",
    model: "Cascadia",
  },
  {
    name: "JAVIER ROGEL",
    company: "MEXCAL",
    email: "jrogel@jrgtransportation.com",
    "tipo de usuario": "TRANSPORTISTAS",
    tract: 722,
    brand: "FREIGHTLINER",
    year: 2019,
    vin: "3AKJHTDV6KSKN2936",
    model: "Cascadia",
  },
  {
    name: "JAVIER ROGEL",
    company: "MEXCAL",
    email: "jrogel@jrgtransportation.com",
    "tipo de usuario": "TRANSPORTISTAS",
    tract: 723,
    brand: "FREIGHTLINER",
    year: 2019,
    vin: "3AKJHTDVXKSKN2938",
    model: "Cascadia",
  },
  {
    name: "JAVIER ROGEL",
    company: "MEXCAL",
    email: "jrogel@jrgtransportation.com",
    "tipo de usuario": "TRANSPORTISTAS",
    tract: 724,
    brand: "FREIGHTLINER",
    year: 2019,
    vin: "3AKJHTDV1KSKN2911",
    model: "Cascadia",
  },
  {
    name: "JAVIER ROGEL",
    company: "MEXCAL",
    email: "jrogel@jrgtransportation.com",
    "tipo de usuario": "TRANSPORTISTAS",
    tract: 725,
    brand: "FREIGHTLINER",
    year: 2019,
    vin: "3AKJHTDV9KSKN2879",
    model: "Cascadia",
  },
  {
    name: "JAVIER ROGEL",
    company: "MEXCAL",
    email: "jrogel@jrgtransportation.com",
    "tipo de usuario": "TRANSPORTISTAS",
    tract: 726,
    brand: "FREIGHTLINER",
    year: 2017,
    vin: "1FUJGEDV9HLHS9056",
    model: "Cascadia",
  },
  {
    name: "JAVIER ROGEL",
    company: "MEXCAL",
    email: "jrogel@jrgtransportation.com",
    "tipo de usuario": "TRANSPORTISTAS",
    tract: 727,
    brand: "FREIGHTLINER",
    year: 2016,
    vin: "1FUJGED61GLHE3911",
    model: "Cascadia",
  },
  {
    name: "JAVIER ROGEL",
    company: "MEXCAL",
    email: "jrogel@jrgtransportation.com",
    "tipo de usuario": "TRANSPORTISTAS",
    tract: 728,
    brand: "FREIGHTLINER",
    year: 2018,
    vin: "3AKJHHDR4JSJS5522",
    model: "Cascadia",
  },
  {
    name: "JAVIER ROGEL",
    company: "MEXCAL",
    email: "jrogel@jrgtransportation.com",
    "tipo de usuario": "TRANSPORTISTAS",
    tract: 729,
    brand: "FREIGHTLINER",
    year: 2018,
    vin: "3AKJGEDV9JSJH2264",
    model: "Cascadia",
  },
  {
    name: "JAVIER ROGEL",
    company: "MEXCAL",
    email: "jrogel@jrgtransportation.com",
    "tipo de usuario": "TRANSPORTISTAS",
    tract: 730,
    brand: "FREIGHTLINER",
    year: 2016,
    vin: "3SKJGEDV2GSGV9726",
    model: "Cascadia",
  },
  {
    name: "JAVIER ROGEL",
    company: "MEXCAL",
    email: "jrogel@jrgtransportation.com",
    "tipo de usuario": "TRANSPORTISTAS",
    tract: 731,
    brand: "FREIGHTLINER",
    year: 2020,
    vin: "3AKJHPDV4LSKZ7043",
    model: "Cascadia",
  },
  {
    name: "JAVIER ROGEL",
    company: "MEXCAL",
    email: "jrogel@jrgtransportation.com",
    "tipo de usuario": "TRANSPORTISTAS",
    tract: 732,
    brand: "FREIGHTLINER",
    year: 2020,
    vin: "3AKJHPDV7LSKZ6873",
    model: "Cascadia",
  },
  {
    name: "JAVIER ROGEL",
    company: "MEXCAL",
    email: "jrogel@jrgtransportation.com",
    "tipo de usuario": "TRANSPORTISTAS",
    tract: 733,
    brand: "FREIGHTLINER",
    year: 2020,
    vin: "3AKJHPDV3LSKZ6885",
    model: "Cascadia",
  },
  {
    name: "JAVIER ROGEL",
    company: "MEXCAL",
    email: "jrogel@jrgtransportation.com",
    "tipo de usuario": "TRANSPORTISTAS",
    tract: 734,
    brand: "FREIGHTLINER",
    year: 2020,
    vin: "3AKJHPDV0LSKZ7086",
    model: "Cascadia",
  },
  {
    name: "JAVIER ROGEL",
    company: "MEXCAL",
    email: "jrogel@jrgtransportation.com",
    "tipo de usuario": "TRANSPORTISTAS",
    tract: 735,
    brand: "FREIGHTLINER",
    year: 2020,
    vin: "3AKJHPDV9LSKZ7085",
    model: "Cascadia",
  },
  {
    name: "JAVIER ROGEL",
    company: "MEXCAL",
    email: "jrogel@jrgtransportation.com",
    "tipo de usuario": "TRANSPORTISTAS",
    tract: 736,
    brand: "FREIGHTLINER",
    year: 2020,
    vin: "3AKJHPDV4LSKZ6877",
    model: "Cascadia",
  },
  {
    name: "JAVIER ROGEL",
    company: "MEXCAL",
    email: "jrogel@jrgtransportation.com",
    "tipo de usuario": "TRANSPORTISTAS",
    tract: 737,
    brand: "FREIGHTLINER",
    year: 2020,
    vin: "3AKJHPDV1LSKZ7016",
    model: "Cascadia",
  },
  {
    name: "JAVIER ROGEL",
    company: "MEXCAL",
    email: "jrogel@jrgtransportation.com",
    "tipo de usuario": "TRANSPORTISTAS",
    tract: 738,
    brand: "FREIGHTLINER",
    year: 2016,
    vin: "3AKJGEDV3GSGV9668",
  },
];

const importData = async () => {
  try {
    await Truck.deleteMany();

    clients.forEach((item, index) => {
      item.email = `bryanjm96+${index + 1}@gmail.com`;
    });

    await Truck.insertMany(clients);

    console.log("DATA IMPORTED SUSCCESSSFULLY");
    process.exit(1);
  } catch (error) {
    console.log(error, "ERROR DE IMPORTACION");
    process.exit(1);
  }
};

importData();
