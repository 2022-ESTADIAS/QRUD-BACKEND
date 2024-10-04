const { Schema, model, Types } = require("mongoose");

const TruckAssignationSchema = Schema(
  {
    client_id: {
      type: Types.ObjectId,
      ref: "Personal",
      required: [true, "La referencia del cliente es requerida"],
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
  },
  {
    timestamps: true,
  }
);

TruckAssignationSchema.methods.toJSON = function () {
  const { __v, _id, ...visitor } = this.toObject();
  //Se cambia visualmente el uid por _id
  visitor.uid = _id;

  return visitor;
};

const TruckAssignation = model("TruckAssignation", TruckAssignationSchema);

module.exports = TruckAssignation;
