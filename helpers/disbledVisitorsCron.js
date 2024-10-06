const Driver = require("../models/mexcal/Driver");
const Visitor = require("../models/mexcal/Visitor");
const VisitorsTypes = require("../models/mexcal/VisitorTypes");
const fns = require("date-fns");

const visitorsCron = async () => {
  const visitType = await VisitorsTypes.findOne({
    name: "Proveedores",
  });

  const providers = await Visitor.find({
    isActive: true,
    visitor_type_id: visitType._id,
  });
  const drivers = await Driver.find({
    isActive: true,
  });

  for (const provider of providers) {
    const visitorDateRegister = new Date(provider.created_at);

    const compareMonths = fns.differenceInMonths(
      new Date(),
      visitorDateRegister
    );

    console.log(compareMonths, "DATE COMPARASION MONTHS");

    if (compareMonths === 6) {
      provider.isActive = false;
      await provider.save();
    }
  }

  for (const driver of drivers) {
    const visitorDateRegister = new Date(driver.created_at);

    const compareMonths = fns.differenceInMonths(
      new Date(),
      visitorDateRegister
    );

    console.log(compareMonths, "DATE COMPARASION MONTHS");

    if (compareMonths === 3) {
      driver.isActive = false;
      await driver.save();
    }
  }

  console.log("CRON FINALIZADO");
};

module.exports = {
  visitorsCron,
};
