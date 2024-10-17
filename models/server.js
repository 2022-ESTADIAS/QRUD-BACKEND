const express = require("express");
const cors = require("cors");
const { dbConnection } = require("../database/config");
const path = require("path");
const cron = require("node-cron");
const { visitorsCron } = require("../helpers/disbledVisitorsCron");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.userRoutes = "/user";
    this.PersonalRoutes = "/personal";
    this.VisitorsRoutes = "/visitors";
    this.RoleRoutes = "/rol";
    this.AuthRoutes = "/auth";
    this.PublicRoutes = "/public";
    this.moduleRoutes = "/module";
    this.truckRoutes = "/trucks";
    //DB
    this.conectarDB();
    //Middlewares
    this.middlewares();
    //Rutas
    this.routes();

    this.cronJob();
  }
  async conectarDB() {
    await dbConnection();
  }

  middlewares() {
    //CORS
    this.app.use(cors());
    //JSON
    this.app.use(express.json());
    //Public
    this.app.use(express.static(path.join(__dirname, "../public")));
  }

  routes() {
    this.app.use(this.userRoutes, require("../routes/user.Routes"));
    this.app.use(this.PersonalRoutes, require("../routes/personal.Routes"));
    this.app.use(this.RoleRoutes, require("../routes/rol.Routes"));
    this.app.use(this.AuthRoutes, require("../routes/auth.Routes"));
    this.app.use(this.PublicRoutes, require("../routes/public.Routes"));
    this.app.use(this.VisitorsRoutes, require("../routes/visitor.Routes"));
    this.app.use(this.moduleRoutes, require("../routes/module.Routes"));
    this.app.use(this.truckRoutes, require("../routes/truck.Routes"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Servidor corriendo en el puerto", this.port);
    });
  }
  cronJob() {
    cron.schedule("0 20 * * *", async () => {
      console.log("EJECUTANDO CRON ");
      visitorsCron();
    });
  }
}

module.exports = Server;
