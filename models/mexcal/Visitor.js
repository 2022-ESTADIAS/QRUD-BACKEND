const { Schema, model, Types, SchemaTypes } = require("mongoose");

const VisitorSchema = Schema({
  name: {
    type: String,
    required: [true, "El nombre es obligatorio"],
  },
  email: {
    type: String,
    required: [true, "El emails es obligatorio"],
    unique: true,
  },
  created_at: {
    type: Date,
    default: new Date(),
  },
  visit_date: {
    type: String,
    required: [true, "La fecha de visita es requerida"],
  },
  contact_name: {
    type: String,
    required: [true, "El contacto es obligatorio"],
  },
  department_id: {
    type: Types.ObjectId,
    ref: "Department",
    required: [true, "La referencia del departamento es requerida"],
  },
  enter_device: {
    type: String,
    required: [true, "El dispositivo es obligatorio"],
  },
  visitor_type_id: {
    type: SchemaTypes.ObjectId,
    ref: "Visitors_type",
    required: [true, "La referencia del visitante es requerida"],
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  image_licence_file_id: {
    type: String,
  },
  ine_file_id: {
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
