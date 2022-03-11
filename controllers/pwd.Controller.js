const bcryptjs = require("bcryptjs");
const { Personal } = require("../models/index");

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

module.exports = {
  changePwd,
};
