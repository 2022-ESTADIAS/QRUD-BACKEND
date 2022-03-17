const {response} = require('express')
const Rol = require('../models/role.Model')

const RolGetAll = async (req = request, res = response) => {

const roles = await Rol.find()
roles.shift()

res.json({roles})
};

const RolGet = async(req, res = response) => {
    const {id} = req.params
    const role = await Rol.findById(id)
  
      res.json({ role });
}



const RolPost = async(req,res = response)=>{
    
    const {rol,description} = req.body
    const role = new Rol( {rol,description} )

    await role.save()
    
    res.json({
        msg: 'Rol Creado exitosamente!',
        role
    })
}


const RolPut = async (req, res = response) => {
    //Params es lo que trae la request
    const { id } = req.params;
    const {rol , description} = req.body;
  
    const role = await Rol.findByIdAndUpdate(id,{rol,description},{new: true});
  
    res.json(role);
};



module.exports = {
    RolGet,
    RolGetAll,
    RolPost,
    RolPut
};
