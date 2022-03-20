const Usuario = require("../models/user.Model");
const QRCode = require("qrcode");

const { qrEmail, transport } = require("../helpers/qrEmail");

//test QR
const opt = {
  errorCorrectionLevel: 'H',
  
  // color: {
  //   // dark: '#593e73 ',  // Blue dots
  // //   light: '#ffffff' // Transparent background
  // }
}

const usuariosGetAll = async (req, res) => {
try {
  
  const usuarios = await Usuario.find({isActivo: true})
  
  return res.status(200).json({ usuarios });
  
} catch (error) {

  return res.status(500).json({ err: "Error de servidor.", error });
}
};



//ELIMINADOS 

const usuariosGetAllEliminados = async (req, res) => {
try {
  
  const usuarios = await Usuario.find({isActivo: false})

  return res.status(200).json({ usuarios });

} catch (error) {

  return res.status(500).json({ err: "Error de servidor.", error });
  
}
};




//un solo usuario
const usuariosGet = async (req, res) => {
    try {
      const {id} = req.params
      const usuario = await Usuario.findById(id)
      
      return res.status(200).json({ usuario });
      
    } catch (error) {
  
      return res.status(500).json({ err: "Error de servidor.", error });   
    }
  };


const usuariosPost = async (req, res) => {

  try {
    const { nombre,rfc,direccion,telefono,email } = req.body;
    const usuario = new Usuario({ nombre,rfc,direccion,telefono,email });
    
    await usuario.save();
    return res.status(201).json({ msg : "Usuario Creado Exitosamente" });
    
  } catch (error) {
    
    return res.status(500).json({ err: "Error de servidor.", error });   
    
  }
    
};

const usuariosPut = async (req, res) => {
try {
  const { id } = req.params;
  const { _id, ...resto } = req.body;
  const activo = await Usuario.findById(id)

  if(!activo.isActivo){
    return res.status(404).json({msg: "El usuario no existe"})
  }
  const usuario = await Usuario.findByIdAndUpdate(id, resto,{new:true});
  
  return res.status(200).json(usuario);
  
  } catch (error) {

    return res.status(500).json({ err: "Error de servidor.", error });   
  }
};



const generarQRuser = async (req, res = response) => {
try {
  const {id} = req.params
  const usuario = await Usuario.findById(id)
  
  const {nombre,rfc,direccion,telefono,email} = usuario
  
  if (usuario.isActivo == false){
    return res.status(404).json({msg: "usuario no esta activo"})
  }

  const qrUser = JSON.stringify({
    nombre,
    rfc,
    direccion,
    telefono,
    email,
  })

  if(usuario.qr == false){

  QRCode.toDataURL(qrUser, opt, function (err, url) {
    
    transport.sendMail(qrEmail(email,nombre,url)).then(async(_info)=>{
      usuario.qr = true
      await usuario.save()
      //Ocupar para debug
      // console.log(info.response)
      return res.status(200).send({
        status: "success",
        msg:"Codigo QR enviado al correo correctamente",
      })
    }).catch((err)=>{

      console.log(err);
    }) 
  })
  
}else{
  return res.status(400).json({msg: "El QR se ha generado para este usuario."})
}

} catch (error) {

  return res.status(500).json({ err: "Error de servidor.", error });   

}
}

//Borrado por Estado
const usuariosDelete = async(req, res = response) => {
try{

  const { id } = req.params
  
  const usuario = await Usuario.findByIdAndUpdate(id, { isActivo: false})
  
  return usuario.isActivo == false ? res.status(404).json({msg: "usuario no encontrado"}) : res.status(200).json({msg: "usuario eliminado correctamente"})

}catch (error) {

  return res.status(500).json({ err: "Error de servidor.", error });   

}

};


//Delete permanente
const usuariosDeletePermanente = async(req,res = response)=>{
  try {
    const { id } = req.params
    
    const usuario = await Usuario.findByIdAndDelete( id )
    
    
    return res.json( {msg: "Usuario eliminado definitivamente"} );
    
  } catch (error) {
  
    return res.status(500).json({ err: "Error de servidor.", error });     
  }
}

const usuarioActive = async (req, res = response)=> {
  try {
  
    const { id } = req.params
    
    const usuario = await Usuario.findByIdAndUpdate(id, { isActivo: true})
    
    return usuario.isActivo == true ? res.status(400).json({msg: "El usuario ya se encuentra activo"}) : res.status(200).json({msg: "usuario reactivado correctamente"})
  } catch (error) {
  
  return res.status(500).json({ err: "Error de servidor.", error });   
    
  }
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



