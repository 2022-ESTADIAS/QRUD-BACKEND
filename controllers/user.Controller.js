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
  const qrUser = JSON.stringify({usuario})



  QRCode.toDataURL(qrUser, { errorCorrectionLevel: 'H' }, function (err, url) {
  // return res.json(url)
  const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "8a8d712feaee30",
      pass: "6af41bf9e742f9"
    }
  })

  const opciones = {
    from: '"QRUD 👻" <no-reply@QRUD.com>', // sender address
    to: "bar@example.com, baz@example.com", // list of receivers
    subject: "Generando QR", // Subject line
    text: "Bienvenido usuario al sistema QR le entregamos su codigo QR que nos ha solicitado", // plain text body
    html: `<img src="${url}"></img>`, // html body
  }

 transport.sendMail(opciones).then(info =>{
   console.log(info)
 })


return res.status(200).send({
  status: "success",
  msg:"Codigo QR enviado al correo correctamente"
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
