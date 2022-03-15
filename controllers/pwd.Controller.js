const bcryptjs = require("bcryptjs");
const crypto = require("crypto-js");
const { Personal,Token } = require("../models/index");
const nodemailer  = require('nodemailer');


const changePwd = async(req, res = response) => {
  const id = req.usuario.id;
  const { lastpwd, newpwd, newpwd2 } = req.body;
  const pwd = req.usuario.password;
  const coincide = bcryptjs.compareSync(lastpwd, pwd); // true

  if (coincide) {
    if (newpwd == newpwd2) {
        const salt = bcryptjs.genSaltSync()
        
        const password = bcryptjs.hashSync(newpwd,salt)
        await Personal.findByIdAndUpdate(id,{password})
    
      return res.json({ msg: "Contraseña actualizada correctamente" });
    } else {
      return res.json({ msg: "Las contraseñas NUEVAS no coinciden" });
    }
  } else {
    return res.json({ msg: "contraseña antigua no coincide" });
  }

};


//====================================================================================
const forgotPwd = async(req,res,)=>{
  const {email} = req.body
  const user = await Personal.findOne({email})
  // console.log(user.id);
  if (!user) res.status(400).json({msg: "usuario no encontrado"})


  let token = await Token.findOne({userId: user.id})
  
  if (token){
    console.log('token aqui');
   await Token.deleteOne();
  }
  const salt = bcryptjs.genSaltSync()
  let resetToken = crypto.AES.encrypt('my message', 'secret key 123').toString();
  const hash = await bcryptjs.hash(resetToken,salt);
  console.log(hash)

  const newToken = await new Token({
    userId: user.id,
    token: hash,
    createdAt: Date.now(),
  }).save();

  const link = `https://qrudapp.herokuapp.com/personal/email-pwd?token=${resetToken}&id=${user.id}`;
console.log(user.email)
  //ENviar correo
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
  to: user.email, // list of receivers
  subject: "Cambiando contraseña",
  html: `<b>${link}</b>`,
  text: "Solicitud de cambio de contraseña", // plain text body



}

transport.sendMail(opciones).then(info =>{
  console.log(info)
})
//=======================
res.json({newToken,link})
}


//paso2 despues de clikear el enlace del correo
const forgotPwd2 = async(req,res = response) =>{
  const salt = bcryptjs.genSaltSync()

  const {token,id} = req.query
  const {newpwd,again} = req.body
  let passwordResetToken = await Token.findOne({ userId:id });
  if (!passwordResetToken) {
   return res.json({msg: "token invalido o expirado"})
  }
  const isValid = await bcryptjs.compare(token, passwordResetToken.token);

  if (!isValid) {
   return res.json({msg: "token no coincide"})
  }else{
    // return res.json({msg:"koso"}) //Si coincide

    if(newpwd == again){

      const hash = await bcryptjs.hash(newpwd,salt);
      await Personal.updateOne(
        { _id: id },
        { $set: { password: hash } },
        { new: true }
        );

      return res.json({msg:"contraseña cambiada exitosamente mediante el correo"})
      }else{
        return res.json({msg: "las contraseñas no coinciden"})
      }
  }
  
  // const hash = await bcryptjs.hash(password, Number(bcryptSalt));

} 


module.exports = {
  changePwd,
  forgotPwd,
  forgotPwd2
};
