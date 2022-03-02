const {response} = require('express')
const Usuario = require('../models/user.Model')

const UsuariosGet = (req,res = response)=>{

    const query = req.query

    res.json({
        ok: true,
        msg: 'QRUD API',
        query
    })
}
const UsuariosPost = async(req,res = response)=>{
    
    const {nombre, rfc,direccion,telefono,email} = req.body
    const usuario = new Usuario({nombre,rfc,direccion,telefono,email})

    await usuario.save()
    
    res.json({
        msg: 'QRUD API User POST controller',
        usuario
    })
}


const UsuariosPut = (req,res = response)=>{
    
    const id = req.params.id    
    res.json({
        msg: 'QRUD API POST controller',
        id
    })
}



module.exports = {
    UsuariosGet,
    UsuariosPost,
    UsuariosPut
};
