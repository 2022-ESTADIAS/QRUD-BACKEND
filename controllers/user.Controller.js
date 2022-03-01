const {response} = require('express')
const Usuario = require('../models/usuario.Model')

const UsuariosGet = (req,res = response)=>{

    const query = req.query

    res.json({
        ok: true,
        msg: 'QRUD API',
        query
    })
}
const UsuariosPost = async(req,res = response)=>{
    
    const body = req.body
    const usuario = new Usuario(body)

    await usuario.save()
    
    res.json({
        msg: 'QRUD API POST controller',
        body,
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
