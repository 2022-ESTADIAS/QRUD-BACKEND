const jwt = require("jsonwebtoken");

const validarTokens = async(req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(403).send({
            status: "Error",
            message:"No tienes permiso para navegar en esta pagina por favor logueate"
       }) 
    }

    try {
        const tokenVerificado = jwt.verify(token, process.env.JSON_KEY);
        req.token = tokenVerificado;
        console.log(req.token)
        next();
    } catch (error) {
        console.log(error);
        return res.status(403).send({
            status: "Error",
            message:"Este token no coincide con la firma, ha expirado o  no coincide con ningun usuario"
       })
   }
}

exports.default = validarTokens;