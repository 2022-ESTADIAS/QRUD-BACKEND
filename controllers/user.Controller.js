const { response, request } = require("express");
const Usuario = require("../models/user.Model");
const nodemailer  = require('nodemailer');

const QRCode = require("qrcode");

const usuariosGetAll = async (req = request, res = response) => {


    const [total, usuarios] = await Promise.all([
      Usuario.countDocuments({isActivo: true}),
      Usuario.find({isActivo: true})
    ])

    res.json({ total,usuarios });
//   }
};



//ELIMINADOS 

const usuariosGetAllEliminados = async (req = request, res = response) => {


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


  }else if(usuario.qr){
    return res.json({msg: "Ya se ha generado el QR para este usuario, por favor revisar su correo."})
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
    html:  `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
    </head>
    <body>
        <style>
            @import url('https://fonts.googleapis.com/css2?family=Rosario:wght@300&display=swap');
            </style>
        <section style="font-family: 'Rosario', sans-serif; text-align: center; border-radius: 20px; margin-top: 30px; display: block; margin-left: auto; margin-right: auto; background: #fff; box-shadow: 0 2px 15px rgba(64,64,64,.7); width: 500px; height: 800px;">
            <img src="cid:logo" alt="Logo" style=" padding-top: 30px; width: 100px; height: 100px; display: block; margin-left: auto; margin-right: auto;">
            <h1 style="text-align: center;">Bienvenido ${nombre}</h1>
            <img src="cid:koso@koso.com" alt="QR" style="display: block; margin-left: auto; margin-right: auto; width: 250px; height: 250px;">
            <p style="font-size: 20px; padding-left: 30px; padding-right: 30px;"> Bienvenido a nuestro sistema de datos QRUD, escanea el codigo QR para verificar tus datos.</p>
            <a href="#">Si hay algun error en tus datos presione Aqui.</a>
        </section>
    </body>
    </html>`, // html body
    text: "Bienvenido usuario al sistema QR le entregamos su codigo QR que nos ha solicitado", // plain text body


    attachments: [
    {
      filename: 'qr.png',
      path: `${url}`,
      cid: "koso@koso.com"
    },
    {
      path: 'https://i.postimg.cc/DwkPJ400/QRUD.png',
      cid: 'logo'
    }
  ],
  }

 transport.sendMail(opciones).then(info =>{
   console.log(info)
 })


return res.status(200).send({
  status: "success",
  msg:"Codigo QR enviado al correo correctamente",

})


})


}


const usuariosDelete = async(req, res = response) => {
  const { id } = req.params

  //borrado por estado, se pasa valor a false, queda deshabilitado
  const usuario = await Usuario.findByIdAndUpdate(id, { isActivo: false})

  res.json( usuario );
};


//Delete permanente
const usuariosDeletePermanente = async(req,res = response)=>{
  const { id } = req.params

  //BORRADO FISICAMENTE
  const usuario = await Usuario.findByIdAndDelete( id )


  res.json( {msg: "Usuario eliminado definitivamente"} );
}



module.exports = {
  usuariosGetAll,
  usuariosGet,
  usuariosPost,
  usuariosPut,
  usuariosDelete,
  usuariosGetAllEliminados,
  generarQRuser,
  usuariosDeletePermanente
};



