const { Schema, model, Types } = require("mongoose");

const VisitSchema = Schema({
  visit_init_time: {
    type: Date,
  },
  visit_end_time: {
    type: Date,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  visitor_id: {
    type: Types.ObjectId,
    ref: "Visitor",
    required: [true, "La referencia del visitante es requerida"],
  },
});

VisitSchema.methods.toJSON = function () {
  const { __v, _id, ...visitor } = this.toObject();
  //Se cambia visualmente el uid por _id
  visitor.uid = _id;

  return visitor;
};

// module.exports = model("Visit", VisitSchema);
const Visit = model("Visit", VisitSchema);

module.exports = Visit;
