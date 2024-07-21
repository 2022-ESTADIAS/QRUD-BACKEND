const { Schema, model, Types } = require("mongoose");

const FileSchema = Schema({
  filename: {
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
});

FileSchema.methods.toJSON = function () {
  const { __v, _id, ...file } = this.toObject();
  //Se cambia visualmente el uid por _id
  file.uid = _id;

  return file;
};

module.exports = model("Visit", FileSchema);
