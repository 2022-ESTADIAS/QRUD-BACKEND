const jwt = require("jsonwebtoken");
const Personal = require("../models/personal.Model")

const validarTokens = async(req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(403).send({
            status: "Error",
            msgtk:"No tienes permiso para navegar en esta pagina por favor logueate"
       }) 
    }

    try {
        const {id} =  jwt.verify(token, process.env.JSON_KEY);
        const usuario = await Personal.findById(id).populate({
            path: 'rol',
            strictPopulate:false,
            
          })

        // console.log(usuario)
        req.usuario = usuario

        next();
    } catch (error) {
        console.log(error);
        return res.status(403).send({
            status: "Error",
            msgtk:"Este token no coincide con la firma, ha expirado o  no coincide con ningun usuario"
       })
   }
}

module.exports = {validarTokens};