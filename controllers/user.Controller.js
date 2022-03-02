const { response, request } = require("express");
const Usuario = require("../models/user.Model");
// const bcryptjs = require("bcryptjs");

const usuariosGetAll = async (req = request, res = response) => {
//   const { limite = 5, desde = 0 } = req.query;
//   //IMPLEMENTACION OPCIONAL PARA VERIFICAR NUMEROS
//   if (isNaN(limite) || isNaN(desde)) {
//     return res.status(400).json({msg : "peticion invalida"})
//   } else {

    const [total, usuarios] = await Promise.all([
      Usuario.countDocuments({isActivo: true}),
      Usuario.find({estado: true})
    //   .skip(Number(desde))
    //   .limit(Number(limite))
    ])

    res.json({ total,usuarios });
//   }
};

//un solo usuario
const usuariosGet = async (req = request, res = response) => {
    const {id} = req.params
    const usuario = await Usuario.findById(id)

      res.json({ usuario });
  };


const usuariosPost = async (req, res = response) => {
  const { nombre,rfc,direccion,telefono,email } = req.body;
  const usuario = new Usuario({ nombre,rfc,direccion,telefono,email });
  //verificar correo existe
  const existeEmail = await Usuario.findOne({email})
  if(existeEmail){
      return res.status(400).json({
          msg: 'El correo ya existe'
      })
  }

  //GUARDA DB
  await usuario.save();
  res.json({ msg : "Usuario Creado Exitosamente" });
};

const usuariosPut = async (req, res = response) => {
  //Params es lo que trae la request
  const { id } = req.params;
  const { _id, ...resto } = req.body;
  

 
  const usuario = await Usuario.findByIdAndUpdate(id, resto);

  res.json(usuario);
};

const usuariosDelete = async(req, res = response) => {
  const { id } = req.params

  //BORRADO FISICAMENTE
  // const usuario = await Usuario.findByIdAndDelete( id )

  //borrado por estado, se pasa valor a false, queda deshabilitado
  const usuario = await Usuario.findByIdAndUpdate(id, { isActivo: false})

  res.json( usuario );
};

module.exports = {
  usuariosGetAll,
  usuariosGet,
  usuariosPost,
  usuariosPut,
  usuariosDelete
};
