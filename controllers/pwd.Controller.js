const bcryptjs = require("bcryptjs");
const  Personal  = require("../models/personal.Model");
const  Token  = require("../models/token.Model");
const { passwordEmail,transport } = require("../helpers/qrEmail");



//Cambio de Contraseña Interno
const changePwd = async(req, res) => {
  const id = req.usuario.id;
  const { lastpwd, newpwd, newpwd2 } = req.body;

  const pwd = req.usuario.password;
  const coincide = bcryptjs.compareSync(lastpwd, pwd); 

  if (coincide) {
    if (newpwd == newpwd2) {
        const salt = bcryptjs.genSaltSync()
        
        const password = bcryptjs.hashSync(newpwd,salt)
        await Personal.findByIdAndUpdate(id,{password})
    
      return res.status(200).json({ msg: "Contraseña actualizada correctamente" });

    } else {

      return res.status(400).json({ msg: "Las contraseñas no coinciden" });
    }
  }else{

    return res.status(400).json({ msg: "Las contraseñas no coinciden" });
  }

};



//¿Olvidaste tu contraseña?
const forgotPwd = async(req,res)=>{
  const {email} = req.body
  const user = await Personal.findOne({email})

  if (!user) {
    return res.status(404).json({msg: "usuario no encontrado"})
  }


  let token = await Token.findOne({userId: user.id})
  
  if (token){
   await Token.deleteOne();
  }

  const salt = bcryptjs.genSaltSync()
  
  let resetToken = await bcryptjs.hash("koso",salt)

  const hash = await bcryptjs.hash(resetToken,salt);

  await new Token({userId: user.id,token: hash,createdAt: Date.now()}).save();
  
  const link = `https://frosty-visvesvaraya-177bf5.netlify.app/#/personal/email-pwd?token=${resetToken}&id=${user.id}`;


  transport.sendMail(passwordEmail(email,link)).then(_info =>{
    res.status(200).json({msg: "Correo enviado exitosamente"})
  })
}



//El chistoso
const forgotPwd2 = async(req,res = response) =>{
  const salt = bcryptjs.genSaltSync()

  const {token,id} = req.query
  const {newpwd,again} = req.body

  let passwordResetToken = await Token.findOne({ userId:id });

  const tokenID = passwordResetToken.id
  
  if (!passwordResetToken) {
    return res.status(404).json({msg: "token invalido o expirado"})
  }
  
  const isValid = await bcryptjs.compare(token, passwordResetToken.token);
  
  if (!isValid) {
    return res.status(400).json({msg: "token no coincide"})
  }else{
    
    if(newpwd == again){
      
      const hash = await bcryptjs.hash(newpwd,salt);
      await Personal.updateOne({ _id: id },{ $set: { password: hash } },{ new: true });
      await Token.findByIdAndDelete(tokenID)

      return res.status(200).json({msg:"Se ha cambiado la contraseña correctamente."})
      }else{

      return res.status(400).json({msg: "las contraseñas no coinciden"})
      }
  }
  

} 


module.exports = {
  changePwd,
  forgotPwd,
  forgotPwd2
};
