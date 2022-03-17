const { response, request } = require("express");
const Usuario = require("../models/user.Model");

const QRCode = require("qrcode");
const { qrEmail, transport } = require("../helpers/qrEmail");

//test QR
const opt = {
  errorCorrectionLevel: 'H',
  
  // color: {
  //   dark: '#090939',  // Blue dots
  //   light: '#ffffff' // Transparent background
  // }
}

const usuariosGetAll = async (_req = request, res = response) => {


    const [total, usuarios] = await Promise.all([
      Usuario.countDocuments({isActivo: true}),
      Usuario.find({isActivo: true})
    ])

    res.json({ total,usuarios });
//   }
};



//ELIMINADOS 

const usuariosGetAllEliminados = async (_req = request, res = response) => {


  const [total, usuarios] = await Promise.all([
    Usuario.countDocuments({isActivo: false}),
    Usuario.find({isActivo: false})
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
  //GUARDA DB
  await usuario.save();
  res.json({ msg : "Usuario Creado Exitosamente" });
};

const usuariosPut = async (req, res = response) => {
  //Params es lo que trae la request
  const { id } = req.params;
  const { _id, ...resto } = req.body;
  

 
  const usuario = await Usuario.findByIdAndUpdate(id, resto,{new:true});

  res.json(usuario);
};






const generarQRuser = async (req, res = response) => {
  const {id} = req.params
  const usuario = await Usuario.findById(id)
  const destino = usuario.email
  const nombre = usuario.nombre

//verificar usuario activo
  if (usuario.isActivo == false){
    return res.json({msg: "usuario no esta activo"})
  }

//verificar qr
  if(!usuario.qr){
    usuario.qr = true
    await usuario.save()
  }else{
    return res.json({msg: "Ya se ha generado el QR para este usuario, por favor revisar su correo."})
  }

  const qrUser = JSON.stringify({usuario})

  
  QRCode.toDataURL(qrUser, opt, function (_err, url) {
    
    //ENVIO DE CORREO PARA QR
    transport.sendMail(qrEmail(destino,nombre,url)).then(_info=>{
      
      //Ocupar para debug
      // console.log(info)
      return res.status(200).send({
        status: "success",
        msg:"Codigo QR enviado al correo correctamente",
      })
    })
  
 
    
})


}


const usuariosDelete = async(req, res = response) => {
  const { id } = req.params

  //borrado por estado, se pasa valor a false, queda deshabilitado
  const usuario = await Usuario.findByIdAndUpdate(id, { isActivo: false})

  usuario.isActivo == false ? res.json({msg: "usuario no encontrado"}) : res.json({msg: "usuario eliminado correctamente"})

  // res.json( usuario );
};


//Delete permanente
const usuariosDeletePermanente = async(req,res = response)=>{
  const { id } = req.params

  //BORRADO FISICAMENTE


  res.json( {msg: "Usuario eliminado definitivamente"} );
}

const usuarioActive = async (req, res = response)=> {
  const { id } = req.params

  const usuario = await Usuario.findByIdAndUpdate(id, { isActivo: true})

  usuario.isActivo == true ? res.json({msg: "El usuario ya se encuentra activo"}) : res.json({msg: "usuario reactivado correctamente"})
}



module.exports = {
  usuariosGetAll,
  usuariosGet,
  usuariosPost,
  usuariosPut,
  usuariosDelete,
  usuariosGetAllEliminados,
  generarQRuser,
  usuariosDeletePermanente,
  usuarioActive
};



