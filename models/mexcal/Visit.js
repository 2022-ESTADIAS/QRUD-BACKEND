const { Schema, model, Types } = require("mongoose");

const VisitSchema = Schema(
  {
    visit_init_time: {
      type: String,
    },
    visit_end_time: {
      type: String,
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

VisitSchema.methods.toJSON = function () {
  const { __v, _id, ...visitor } = this.toObject();
  //Se cambia visualmente el uid por _id
  visitor.uid = _id;

  return visitor;
};

// module.exports = model("Visit", VisitSchema);
const Visit = model("Visit", VisitSchema);

module.exports = Visit;
