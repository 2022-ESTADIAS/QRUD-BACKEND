const bcryptjs = require("bcryptjs");
const { PwdRgx } = require("../helpers/regex");

const Personal = require("../models/personal.Model");

//Todo el personal
const PersonalGetAll = async (req, res) => {
  try {
    let personal = await Personal.find({ isActivo: true }).populate({path: "rol"});

    personal = personal.filter((persona) => persona.rol.rol != "MASTER_ROLE");

    return res.status(200).json({ personal });

  } catch (error) {
    return res.status(500).json({ err: "Error de servidor.", error });
  }
};

//Todo el personal eliminado
const PersonalGetAllEliminados = async (req, res) => {
  try {
    const eliminados = await Personal.find({ isActivo: false }).populate({path: "rol"});

    return res.status(200).json({ eliminados });

  } catch (error) {
    return res.status(500).json({ err: "Error de servidor.", error });
  }
};

//un solo personal
const PersonalGet = async (req = request, res = response) => {
  try {
    const { id } = req.params;
    const activo = await Personal.find({id})

    if (activo.isActivo == false){
      return res.status(404).json({msg: "Personal no existe"})
    }
    
    const personal = await Personal.findById(id).populate({ path: "rol" });

    return res.status(200).json({ personal });
    
  } catch (error) {

    return res.status(500).json({ err: "Error de servidor.", error });
  }
};

//Crear Personal
const PersonalPost = async (req, res = response) => {
  try {
    const salt = bcryptjs.genSaltSync();
    const { nombre, telefono, email, password, rol } = req.body;

    if(PwdRgx(password)){

      const personal = new Personal({ nombre, telefono, email, password, rol });
      personal.password = bcryptjs.hashSync(password, salt);
      await personal.save();
      return res.status(201).json({ msg: "Personal creado exitosamente" });

    }else{
      return res.status(400).json({msg: "formato incorrecto"})
    }

  } catch (error) {

    return res.status(500).json({ err: "Error de servidor.", error });
  }
};

//Actualizar Personal
const PersonalPut = async (req, res = response) => {
  try {
  
  const { id } = req.params;
  const { _id, password, qr, email, ...resto } = req.body;
  const activo = await Personal.findById(id)

  if(!activo.isActivo){
    return res.status(404).json({msg: "El personal no existe"})
  }

  const personal = await Personal.findByIdAndUpdate(id, resto, {new: true}).populate({ path: "rol" });

  return res.json(personal);

} catch (error) {

  return res.status(500).json({ err: "Error de servidor.", error });
}
};

//Delete Usuario (Por Estado)
const PersonalDelete = async (req, res = response) => {
  try {
    
  const { id } = req.params;
  const rol = await Personal.findById(id).populate({ path: "rol" });
  const isMaster = rol.rol.rol;
  
  if(isMaster == "MASTER_ROLE"){
    return res.status(401).json({ msg: "No se puede eliminar MASTER_ROLE" })
  }
    
  await Personal.findByIdAndUpdate(id, { isActivo: false })
  return res.status(200).json({ msg: "Personal eliminado correctamente" });
  
} catch (error) {

  return res.status(500).json({ err: "Error de servidor.", error });
    
}
};



//Delete Usuario Permanente
const PersonalDeletePermanente = async (req, res = response) => {
  try {
    
    const { id } = req.params;
    
    
    const rol = await Personal.findById(id).populate({ path: "rol" });
    const isMaster = rol.rol.rol;
    
    if(isMaster == "MASTER_ROLE"){
      return res.status(401).json({ msg: "No se puede eliminar MASTER_ROLE" })
    }
  
    await Personal.findByIdAndDelete(id)
    return res.status(200).json({ msg: "Personal Eliminado Definitivamente" });

  } catch (error) {
    return res.status(500).json({ err: "Error de servidor.", error });
    
  }
  };

  
  
  const PersonalActive = async (req, res = response) => {
    try {
      
      const { id } = req.params;
      const personal = await Personal.findByIdAndUpdate(id, { isActivo: true });
      
      return personal.isActivo == true
      ? res.status(400).json({ msg: "EL personal ya se encuentra activo" }) //Error
      : res.status(200).json({ msg: "Personal reactivado correctamente" }); //Success

    } catch (error) {

      return res.status(500).json({ err: "Error de servidor.", error });
    }
};

module.exports = {
  PersonalGetAll,
  PersonalGet,
  PersonalPost,
  PersonalPut,
  PersonalDelete,
  PersonalDeletePermanente,
  PersonalGetAllEliminados,
  PersonalActive,
};



//REGEX CONTRASEÑA 
//La contraseña debe tener al entre 8 y 16 caracteres, al menos un dígito, al menos una minúscula, al menos una mayúscula y al menos un caracter no alfanumérico.
//  Ejemplo:
//w3Unpo<code>t0d0

// ^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{8,16}$
