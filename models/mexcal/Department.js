const { Schema, model, Types } = require("mongoose");

const DepartmentSchema = Schema({
  name: {
    type: String,
    required: [true, "El nombre es obligatorio"],
  },
  isActive: {
    type: Boolean,
    default: true,
  },
});

DepartmentSchema.methods.toJSON = function () {
  const { __v, _id, ...department } = this.toObject();
  //Se cambia visualmente el uid por _id
  department.uid = _id;

  return department;
};

const Department = model("Department", DepartmentSchema);
module.exports = Department;
