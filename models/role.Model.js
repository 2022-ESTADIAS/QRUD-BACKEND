const {Schema,model} = require("mongoose")


const RoleSchema = Schema({
    rol: {
        type: String,
        required: [true, 'El rol es obligatorio']
    },
    description: {
        type: String,
        required: [true, 'La description es obligatoria']
    }
})


module.exports = model( 'Role',RoleSchema)