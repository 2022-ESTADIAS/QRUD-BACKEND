const { Schema, model, Types, SchemaTypes } = require("mongoose");

const VisitorSchema = Schema({
  name: {
    type: String,
    required: [true, "El nombre es obligatorio"],
  },
  email: {
    type: String,
    required: [true, "El email es obligatorio"],
    unique: true,
  },
  created_at: {
    type: Date,
    default: new Date(),
  },
  visit_date: {
    type: String,
    // required: [true, "La fecha de visita es requerida"],
  },
  visit_company: {
    type: String,
  },
  contact_name: {
    type: String,
    // required: [true, "El contacto es obligatorio"],
  },
  department_id: {
    type: Types.ObjectId,
    ref: "Department",
    // required: [true, "La referencia del departamento es requerida"],
  },
  enter_device: {
    type: String,
    // required: [true, "El dispositivo es obligatorio"],
  },
  visitor_type_id: {
    type: SchemaTypes.ObjectId,
    ref: "Visitors_type",
    // required: [true, "La referencia del visitante es requerida"],
  },
  reason_id: {
    type: SchemaTypes.ObjectId,
    ref: "Reason_for_admission",
  },
  hasVehicle: {
    type: Boolean,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  ine_file_id: {
    type: SchemaTypes.ObjectId,
    ref: "File",
  },
  // DRIVER'S MODEL FIELDS

  image_licence_file_id: {
    type: SchemaTypes.ObjectId,
    ref: "File",
  },

  office_name: {
    type: String,
  },
  office_phone: {
    type: String,
  },
  phone: {
    type: String,
  },
  license_number: {
    type: String,
  },
  license_plates: {
    type: String,
  },
});

VisitorSchema.methods.toJSON = function () {
  const { __v, _id, ...visitor } = this.toObject();
  //Se cambia visualmente el uid por _id
  visitor.uid = _id;

  return visitor;
};

// module.exports = model("Visitor", VisitorSchema);
const Visitor = model("Visitor", VisitorSchema);

module.exports = Visitor;
