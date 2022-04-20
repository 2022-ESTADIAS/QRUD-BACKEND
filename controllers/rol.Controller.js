const Rol = require('../models/role.Model')

const RolGetAll = async (req , res ) => {
try {
    
    const roles = await Rol.find()
    roles.shift()
    
    return res.status(200).json({roles})

} catch (error) {

  return res.status(500).json({ err: "Error de servidor.", error });
    
}
};

const RolGet = async(req, res = response) => {
try {
    
    const {id} = req.params
    const role = await Rol.findById(id)
    
    return res.json({ role });

} catch (error) {

    return res.status(500).json({ err: "Error de servidor.", error });
    
}
}



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
