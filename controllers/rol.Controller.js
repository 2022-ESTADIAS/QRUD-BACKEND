const {response} = require('express')
const Rol = require('../models/role.Model')

const RolGetAll = async (req = request, res = response) => {

  
    const [total, personal] = await Promise.all([
      Rol.countDocuments(),
      Rol.find()
    ])

    res.json({ total,personal });
  // }
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
        msg: 'QRUD API Rol POST controller',
        role
    })
}


const RolPut = (req,res = response)=>{
    
    const id = req.params.id    
    res.json({
        msg: 'QRUD API POST controller',
        id
    })
}



module.exports = {
    RolGet,
    RolGetAll,
    RolPost,
    RolPut
};
