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
    
    const body = req.body
    const rol = new Rol(body)

    await rol.save()
    
    res.json({
        msg: 'QRUD API POST controller',
        body,
        rol
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
