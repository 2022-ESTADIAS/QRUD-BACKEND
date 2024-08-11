const bcryptjs = require("bcryptjs");
const Personal = require("../models/personal.Model");
const Token = require("../models/token.Model");
const { passwordEmail, transport } = require("../helpers/qrEmail");
const { PwdRgx } = require("../helpers/regex");

/**
 * @param {request} req
 * @param {response} res
 * @returns Si es correcto, retorna "Contraseña actualizada correctamente", si no, "Las contraseñas no coinciden" o "Formato Incorrecto"
 * @description Es el cambio de contraseña interno del sistema. En este caso, el Personal en sesión se sabe
 * su contraseña antigua pero aun así desea cambiarla. Este se protege mediante una regex para hacer contraseñas seguras.
 */
const changePwd = async (req, res) => {
  try {
    const id = req.usuario.id;
    const { lastpwd, newpwd, newpwd2 } = req.body;

    const pwd = req.usuario.password;
    const coincide = bcryptjs.compareSync(lastpwd, pwd);

    if (coincide) {
      // if(PwdRgx(newpwd) && PwdRgx(newpwd2)){

      if (newpwd == newpwd2) {
        const salt = bcryptjs.genSaltSync();

        const password = bcryptjs.hashSync(newpwd, salt);
        await Personal.findByIdAndUpdate(id, { password });

        return res
          .status(200)
          .json({ msg: "Contraseña actualizada correctamente" });
      } else {
        return res.status(400).json({ msg: "Las contraseñas no coinciden" });
      }
      // }else{
      //   return res.status(400).json({msg: "formato incorrecto"})
      // }
    } else {
      return res.status(400).json({ msg: "Las contraseñas no coinciden" });
    }
  } catch (error) {
    return res.status(500).json({ err: "Error de servidor.", error });
  }
};

/**
 *
 * @param {request} req
 * @param {response} res
 * @returns Retorna un correo de cambio de contraseña. El cual esta formado por una URL base, token y un id de usuario.
 * @description Se recibe un correo por el body de la petición. El cual si existe, procede a generar un URL para el correo.
 * Si este no existe, manda error "Usuario no encontrado".
 */
const forgotPwd = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await Personal.findOne({ email });

    if (!user) {
      return res.status(404).json({ msg: "usuario no encontrado" });
    }

    let token = await Token.findOne({ userId: user.id });

    if (token) {
      await Token.deleteOne();
    }

    const salt = bcryptjs.genSaltSync();

    let resetToken = await bcryptjs.hash("koso", salt);

    const hash = await bcryptjs.hash(resetToken, salt);

    await new Token({
      userId: user.id,
      token: hash,
      createdAt: Date.now(),
    }).save();
    //TODO: RENOVAR ENLACE
    const link = `https://qrud.proyectosalm.com/#/personal/email-pwd?token=${resetToken}&id=${user.id}`;

    transport.sendMail(passwordEmail(email, link)).then((_info) => {
      res.status(200).json({ msg: "Correo enviado exitosamente" });
    });
  } catch (error) {
    return res.status(500).json({ err: "Error de servidor.", error });
  }
};

/**
 *
 * @param {request} req
 * @param {response} res
 * @returns Si es correcto, retorna "Se ha cambiado la contraseña correctamente.", si no "las contraseñas no coinciden" o "formato incorrecto".
 * @description Aqui se accede despues de dar click al enlace del correo. Pide 2 campos de contraseña. Estas deben cumplir las condiciones del regex.
 * Minimo 8 caracteres, 1 mayuscula, 1 minuscula, 1 simbolo y un numero.
 */
const forgotPwd2 = async (req, res = response) => {
  try {
    const salt = bcryptjs.genSaltSync();

    const { token, id } = req.query;
    const { newpwd, again } = req.body;

    let passwordResetToken = await Token.findOne({ userId: id });

    const tokenID = passwordResetToken.id;

    if (!passwordResetToken) {
      return res.status(404).json({ msg: "token invalido o expirado" });
    }

    const isValid = await bcryptjs.compare(token, passwordResetToken.token);

    if (!isValid) {
      return res.status(400).json({ msg: "token no coincide" });
    } else {
      if (PwdRgx(newpwd) && PwdRgx(again)) {
        if (newpwd == again) {
          const hash = await bcryptjs.hash(newpwd, salt);
          await Personal.updateOne(
            { _id: id },
            { $set: { password: hash } },
            { new: true }
          );
          await Token.findByIdAndDelete(tokenID);

          return res
            .status(200)
            .json({ msg: "Se ha cambiado la contraseña correctamente." });
        } else {
          return res.status(400).json({ msg: "las contraseñas no coinciden" });
        }
      } else {
        return res.status(400).json({ msg: "formato incorrecto" });
      }
    }
  } catch (error) {
    return res.status(500).json({ err: "Error de servidor.", error });
  }
};

module.exports = {
  changePwd,
  forgotPwd,
  forgotPwd2,
};
