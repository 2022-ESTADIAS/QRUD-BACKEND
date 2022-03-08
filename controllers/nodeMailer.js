const nodemailer  = require('nodemailer');


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
    html: "<b>Hello world?</b>", // html body
  }

  transport.sendMail(opciones)