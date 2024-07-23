const { Schema, model, Types } = require("mongoose");

const ReasonFormAdmissionSchema = Schema({
  name: {
    type: String,
    required: [true, "El nombre del dispositivo es obligatorio"],
  },
  isActive: {
    type: Boolean,
    default: true,
  },
});

ReasonFormAdmissionSchema.methods.toJSON = function () {
  const { __v, _id, ...visitor } = this.toObject();
  //Se cambia visualmente el uid por _id
  visitor.uid = _id;

  return visitor;
};

const ReasonForAdmission = model(
  "Reason_for_admission",
  ReasonFormAdmissionSchema
);
module.exports = ReasonForAdmission;
