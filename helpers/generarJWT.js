const jwt = require('jsonwebtoken');

exports.generarJWT = async(id) => {

try {
   return await jwt.sign({ id }, process.env.JSON_KEY, { expiresIn: process.env.JSON_DURATION });
} catch (error) {
    return error;
}
}