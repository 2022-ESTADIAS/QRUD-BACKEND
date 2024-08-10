const { Schema, model, Types, SchemaTypes } = require("mongoose");

const DriverSchema = Schema({
  company_name: {
    type: String,
    required: [true, "La compañia es obligatoria"],
  },
  operator_name: {
    type: String,
    required: [true, "el operador es obligatorio"],
  },
  phone: {
    type: String,
  },
  email: {
    type: String,
    required: [true, "el correo es obligatorio"],
  },
  office_name: {
    type: String,
  },
  office_phone: {
    type: String,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  image_licence_file_id: {
    type: SchemaTypes.ObjectId,
    ref: "File",
    // required: [true, "La referencia de la imagen es requerida"],
  },
  ine_file_id: {
    type: SchemaTypes.ObjectId,
    ref: "File",
    // required: [true, "La referencia de la imagen es requerida"],
  },
});

DriverSchema.methods.toJSON = function () {
  const { __v, _id, ...visitor } = this.toObject();
  //Se cambia visualmente el uid por _id
  visitor.uid = _id;

  return visitor;
};

const Driver = model("Driver", DriverSchema);
module.exports = Driver;
