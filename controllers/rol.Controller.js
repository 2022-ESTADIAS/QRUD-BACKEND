const Rol = require('../models/role.Model')

/**
 * 
 * @param {request} req 
 * @param {response} res 
 * @returns Todos los roles menos MASTER_ROLE.
 * @description Busca los roles en BD y saca siempre el primero, que siempre debe de ser MASTER_ROLE.
 */
const RolGetAll = async (req , res ) => {
try {
    
    const roles = await Rol.find()
    roles.shift()
    
    return res.status(200).json({roles})

} catch (error) {

  return res.status(500).json({ err: "Error de servidor.", error });
    
}
};
/**
 * 
 * @param {request} req 
 * @param {response} res 
 * @returns Retorna un solo rol mediante el ID recibido como parametro.
 * @description Busca el rol en la base de datos y lo retorna como respuesta. Si este ID no existe, retorna error "El id no existe - ROLID".
 */
const RolGet = async(req, res = response) => {
try {
    
    const {id} = req.params
    const role = await Rol.findById(id)

    
    
    return res.json({ role });

} catch (error) {

    return res.status(500).json({ err: "Error de servidor.", error });
    
}
}


/**
 * 
 * @param {request} req 
 * @param {response} res 
 * @returns Si es correcto, retorna "Rol Creado exitosamente!", y el rol creado.
 */
const RolPost = async(req,res = response)=>{
    try {
        
        const {rol,description} = req.body
        const role = new Rol( {rol,description} )
        
        await role.save()
        
        return res.json({msg: 'Rol Creado exitosamente!',role})

    } catch (error) {

        return res.status(500).json({ err: "Error de servidor.", error });
        
    }
}

/**
 * 
 * @param {request} req 
 * @param {response} res 
 * @returns Si es correcto, retorna el rol actualizado, si no "EL ROL NO EXISTE".
 * @description Mediante el ID como parametro, actualiza la información del rol.
 */
const RolPut = async (req, res = response) => {
    try {
        const { id } = req.params;
        const {rol , description} = req.body;
        
        const role = await Rol.findByIdAndUpdate(id,{rol,description},{new: true});
        if(!role){
            return res.status(404).json({msg:"EL ROL NO EXISTE"})
        }
        
        return res.json(role);
        
    } catch (error) {
        return res.status(500).json({ err: "Error de servidor.", error });
        
    }
};

//TODO: ROL DELETE 




module.exports = {
    RolGet,
    RolGetAll,
    RolPost,
    RolPut
};
