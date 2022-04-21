const { response } = require("express");


/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns DEPRECATED.
 */
const esAdminRole = (req,res = response,next) =>{

    if(!req.usuario){
        return res.status(500).json({msg:"Se quiere verificar el rol sin validar el token primero"})
    }

    const { rol,nombre } = req.usuario
    if(rol !== 'ADMIN_ROLE'  || rol !=="MASTER_ROLE"){
        return res.status(401).json({msg: `${nombre} no es administrador, permiso denegado`})
    }

    next()

}
/**
 * 
 * @param  {...any} roles 
 * @returns Lista de roles permitidos.
 * @description Al pasar la lista de roles, estas son las que tendrán acceso a las rutas.
 */
const hasRole = (  ...roles  ) =>{
    return (req, res = response, next)=>{
        if(!req.usuario){
            return res.status(500).json({msg:"Se quiere verificar el rol sin validar el token primero"})
        }

        if(!roles.includes(req.usuario.rol.rol)){
            return res.status(401).json({msg: `El servicio requiere uno de estos roles ${roles}`})
        }

        next()
    }
}



module.exports = {
    esAdminRole,
    hasRole
};