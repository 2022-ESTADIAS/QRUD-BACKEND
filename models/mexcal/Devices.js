const { Schema, model, Types } = require("mongoose");

const DeviceSchema = Schema({
  name: {
    type: String,
    required: [true, "El nombre del dispositivo es obligatorio"],
  },
  isActive: {
    type: Boolean,
    default: true,
  },
});

DeviceSchema.methods.toJSON = function () {
  const { __v, _id, ...visitor } = this.toObject();
  //Se cambia visualmente el uid por _id
  visitor.uid = _id;

  return visitor;
};

const Device = model("Device", DeviceSchema);
module.exports = Device;
