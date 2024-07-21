const { Schema, model, Types } = require("mongoose");

const VisitorTypeSchema = Schema({
  name: {
    type: String,
    required: [true, "El nombre es obligatorio"],
  },
  isActive: {
    type: Boolean,
    default: true,
  },
});

VisitorTypeSchema.methods.toJSON = function () {
  const { __v, _id, ...visitor } = this.toObject();
  //Se cambia visualmente el uid por _id
  visitor.uid = _id;

  return visitor;
};

const VisitorsTypes = model("Visitors_type", VisitorTypeSchema);
module.exports = VisitorsTypes;
