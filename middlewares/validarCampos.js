const { response } = require('express');
const { validationResult } = require('express-validator')

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns Errores atrapados por ExpressValidator.
 */
const validarCampos = (req,res = response, next)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json(errors)
    }

    next()
}


module.exports = {
    validarCampos
};
