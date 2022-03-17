const nodemailer  = require('nodemailer');




const transport = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
      user: 'qrud.app@gmail.com',
      pass: 'qrudapp999'
    }
});



const qrEmail = (destino,nombre,url) =>{
   
    const opt = {
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
      ]
      }
      return opt
    
      
}


const passwordEmail = (destino,link) =>{
  const opciones = {
    from: '"QRUD 👻" <qrud.app@gmail.com>', // sender address
    to: destino, // list of receivers
    subject: "Cambiando contraseña",
    html: `<html lang="en">
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
        <section style="font-family: 'Rosario', sans-serif; text-align: center; border-radius: 20px; margin-top: 30px; display: block; margin-left: auto; margin-right: auto; background: #fff; box-shadow: 0 2px 15px rgba(64,64,64,.7); width: 500px; height: 600px;">
            <img src="cid:logo" alt="Logo" style=" padding-top: 30px; width: 100px; height: 100px; display: block; margin-left: auto; margin-right: auto;">
            <h1 style="text-align: center; margin-top: 30px;">Notificación de cambio de contraseña</h1>
            <p style="font-size: 20px; margin-top: 50px; padding-left: 30px; padding-right: 30px;"> Para restablecer tu contraseña de QRUD, da clic en el siguiente enlace:</p>
            <a href="${link}">Enlace.</a>
            <p style="font-size: 20px; padding-left: 30px; padding-right: 30px;"> Si no quieres restablecer tu contraseña, puedes ignorar este mensaje; probablemente alguien escribió tu nombre de usuario o tu email por error.</p> 
            <span>¡Gracias!</span>  
        </section>
    </body>
    </html>`,
    text: "Solicitud de cambio de contraseña", // plain text body
    attachments : [
      {
        path: 'https://i.postimg.cc/DwkPJ400/QRUD.png',
        cid: 'logo'
      }
    ]
  
  
  
  }
  return opciones
  
  // transport.sendMail(opciones).then(info =>{
  //   console.log(info)
  // })
  
}









module.exports = {
    qrEmail,
    passwordEmail,
    transport
};
