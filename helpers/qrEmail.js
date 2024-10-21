const nodemailer = require("nodemailer");
const esEmail = require("../lang/esEmail.json");
const enEmail = require("../lang/enEmail.json");

const transport = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  auth: {
    user: "ctpat@mexcaltruckline.com",
    pass: "dtuohqqdzfjfrmaq",
  },
  secure: false,
  tls: {
    rejectUnauthorized: false,
  },
});

/**
 *
 * @param {*} destino
 * @param {*} nombre
 * @param {*} url
 * @returns formato de correo para generación de QR.
 */
const qrEmail = (destino, nombre, url, lang) => {
  const qrGenerating =
    lang == "es" ? esEmail.qrGenerating : enEmail.qrGenerating;
  const welcome = lang == "es" ? esEmail.welcome : enEmail.welcome;
  const templateDescription =
    lang == "es" ? esEmail.templateDescription : enEmail.templateDescription;
  const emailDescription =
    lang == "es" ? esEmail.emailDescription : enEmail.emailDescription;

  const opt = {
    from: '"MEXCAL Truckline 🛻" <qrud.app@gmail.com>', // sender address
    to: destino, // list of receivers
    subject: qrGenerating, // Subject line
    html: `<!DOCTYPE html>
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
                <img src="cid:logo" alt="Logo" style=" padding-top: 30px;  display: block; margin-left: auto; margin-right: auto;">
                <h1 style="text-align: center;">${welcome} ${nombre}</h1>
                <img src="cid:koso@koso.com" alt="QR" style="display: block; margin-left: auto; margin-right: auto; width: 250px; height: 250px;">
                <p style="font-size: 20px; padding-left: 30px; padding-right: 30px;"> ${templateDescription}</p>
               
            </section>
        </body>
        </html>`, // html body
    text: emailDescription, // plain text body

    attachments: [
      {
        filename: "qr.png",
        path: `${url}`,
        cid: "koso@koso.com",
      },
      {
        // path: "http://localhost:3000/logo.png",
        path: "https://qrud-backend-6ra0.onrender.com/logo.png",
        cid: "logo",
      },
    ],
  };
  return opt;
};

/**
 *
 * @param {*} destino
 * @param {*} link
 * @returns formato de correo para cambio de contraseña QRUD.
 */
const passwordEmail = (destino, link, lang) => {
  const changePasswordEmail =
    lang == "es" ? esEmail.changePasswordEmail : enEmail.changePasswordEmail;
  const changePasswordNotification =
    lang == "es"
      ? esEmail.changePasswordNotification
      : enEmail.changePasswordNotification;
  const changePasswordDescription =
    lang == "es"
      ? esEmail.changePasswordDescription
      : enEmail.changePasswordDescription;
  const changePasswordLink =
    lang == "es" ? esEmail.changePasswordLink : enEmail.changePasswordLink;
  const changePasswordPD =
    lang == "es" ? esEmail.changePasswordPD : enEmail.changePasswordPD;
  const changePasswordThanks =
    lang == "es" ? esEmail.changePasswordThanks : enEmail.changePasswordThanks;
  const changePasswordRequest =
    lang == "es"
      ? esEmail.changePasswordRequest
      : enEmail.changePasswordRequest;

  const opciones = {
    from: '"MEXCAL Truckline 🛻" <qrud.app@gmail.com>', // sender address
    to: destino, // list of receivers
    subject: changePasswordEmail,
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
            <img src="cid:logo" alt="Logo" style=" padding-top: 30px;  display: block; margin-left: auto; margin-right: auto;">
            <h1 style="text-align: center; margin-top: 30px;">${changePasswordNotification}</h1>
            <p style="font-size: 20px; margin-top: 50px; padding-left: 30px; padding-right: 30px;">${changePasswordDescription}</p>
            <a href="${link}">${changePasswordLink}</a>
            <p style="font-size: 20px; padding-left: 30px; padding-right: 30px;">${changePasswordPD}</p> 
            <span>${changePasswordThanks}</span>  
        </section>
    </body>
    </html>`,
    text: changePasswordRequest, // plain text body
    attachments: [
      {
        // path: "https://i.postimg.cc/DwkPJ400/QRUD.png",
        path: "https://qrud-backend-6ra0.onrender.com/logo.png",
        // path: "http://localhost:3000/logo.png",
        cid: "logo",
      },
    ],
  };
  return opciones;

  // transport.sendMail(opciones).then(info =>{
  //   console.log(info)
  // })
};

/**
 *
 * @param {*} destino
 * @param {*} link
 * @returns Formato de correo para activación de cuenta de usuarios.
 * @description FUNCIONALIDAD PWA.
 */
const activateEmail = (destino, link) => {
  const opciones = {
    from: '"QRUD 👻" <qrud.app@gmail.com>', // sender address
    to: destino, // list of receivers
    subject: "Activar Usuario",
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
            <img src="cid:logo" alt="Logo" style=" padding-top: 30px;  display: block; margin-left: auto; margin-right: auto;">
            <h1 style="text-align: center; margin-top: 30px;">Notificación de Activación de Usuario</h1>
            <p style="font-size: 20px; margin-top: 50px; padding-left: 30px; padding-right: 30px;"> Para activar tu cuenta de QRUD, da clic en el siguiente enlace:</p>
            <a href="${link}">Enlace.</a>
            <p style="font-size: 20px; padding-left: 30px; padding-right: 30px;"> Si no quieres activar tu cuenta, puedes ignorar este mensaje; El usuario se elimina automáticamente en 3 horas.</p> 
            <span>¡Gracias!</span>  
        </section>
    </body>
    </html>`,
    text: "Solicitud de Activación de Cuenta", // plain text body
    attachments: [
      {
        // path: "https://i.postimg.cc/DwkPJ400/QRUD.png",
        path: "https://qrud-backend-6ra0.onrender.com/logo.png",
        cid: "logo",
      },
    ],
  };
  return opciones;
};

module.exports = {
  qrEmail,
  passwordEmail,
  activateEmail,
  transport,
};
