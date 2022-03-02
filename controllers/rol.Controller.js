const {response} = require('express')
const Rol = require('../models/role.Model')

const RolGet = (req,res = response)=>{

    const query = req.query

    res.json({
        ok: true,
        msg: 'QRUD API',
        query
    })
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
    RolPost,
    RolPut
};
