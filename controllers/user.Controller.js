const { response, request } = require("express");
const Usuario = require("../models/user.Model");
const nodemailer  = require('nodemailer');

const QRCode = require("qrcode")
// const bcryptjs = require("bcryptjs");

const usuariosGetAll = async (req = request, res = response) => {


    const [total, usuarios] = await Promise.all([
      Usuario.countDocuments({isActivo: true}),
      Usuario.find({isActivo: true})
    //   .skip(Number(desde))
    //   .limit(Number(limite))
    ])

    res.json({ total,usuarios });
//   }
};



//ELIMINADOS 

const usuariosGetAllEliminados = async (req = request, res = response) => {


  const [total, usuarios] = await Promise.all([
    Usuario.countDocuments({isActivo: false}),
    Usuario.find({isActivo: false})
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

const usuariosDelete = async(req, res = response) => {
  const { id } = req.params

  //BORRADO FISICAMENTE
  // const usuario = await Usuario.findByIdAndDelete( id )

  //borrado por estado, se pasa valor a false, queda deshabilitado
  const usuario = await Usuario.findByIdAndUpdate(id, { isActivo: false})

  res.json( usuario );
};




const generarQRuser = async (req, res = response) => {
  const {id} = req.params
  const usuario = await Usuario.findById(id)
  const destino = usuario.email
  const nombre = usuario.nombre

//verificar usuario activo
  if (usuario.isActivo == false){
    res.json({msg: "usuario no esta activo"})
  }


//verificar qr
  if(!usuario.qr){
    usuario.qr = true
    await usuario.save()


  }else if(usuario.qr){
    res.json({msg: "Ya se ha generado el QR para este usuario, por favor revisar su correo."})
  }



  const qrUser = JSON.stringify({usuario})



  QRCode.toDataURL(qrUser, { errorCorrectionLevel: 'H' }, function (err, url) {
  
  const transport = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
        user: 'qrud.app@gmail.com',
        pass: 'qrudapp999'
    }
});


  const opciones = {
    from: '"QRUD 👻" <qrud.app@gmail.com>', // sender address
    to: destino, // list of receivers
    subject: "Generando QR", // Subject line
    html: `<h1>bienvenido ${nombre}</h1><br><img src=cid:koso@koso.com></img>`, // html body
    text: "Bienvenido usuario al sistema QR le entregamos su codigo QR que nos ha solicitado", // plain text body


    attachments: [
    {
      filename: 'qr.png',
      path: `${url}`,
      cid: "koso@koso.com"
    }],
  }

 transport.sendMail(opciones).then(info =>{
   console.log(info)
 })


return res.status(200).send({
  status: "success",
  msg:"Codigo QR enviado al correo correctamente",

})


})


    // res.json(string);
}

module.exports = {
  usuariosGetAll,
  usuariosGet,
  usuariosPost,
  usuariosPut,
  usuariosDelete,
  usuariosGetAllEliminados,
  generarQRuser
};



//TODO: Pendiente refactor de validaciones.
//TODO: Auth Pendiente
//TODO: QR Pendiente
