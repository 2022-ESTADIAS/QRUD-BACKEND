const express = require('express')
const cors = require('cors')
const { dbConnection } = require('../database/config')

class Server{

    constructor(){
        this.app = express()
        this.port = process.env.PORT
        this.userRoutes = '/user'
        this.PersonalRoutes = '/personal'
        this.RoleRoutes = '/rol'
        //DB
        this.conectarDB()
        //Middlewares
        this.middlewares()
        //Rutas
        this.routes()
    }
    async conectarDB(){
        await dbConnection()
    }

    middlewares(){
        //CORS
        this.app.use(cors())
        //JSON
        this.app.use(express.json())
        //Public
        this.app.use(express.static('public'))

    }


    routes(){
       this.app.use(this.userRoutes, require("../routes/user.Routes"))
       this.app.use(this.PersonalRoutes, require("../routes/personal.Routes"))
       this.app.use(this.RoleRoutes, require("../routes/rol.Routes"))
    }
    

    listen(){
        this.app.listen(this.port,()=>{
            console.log('Servidor corriendo en el puerto', this.port)
        })
    }


}


module.exports = Server