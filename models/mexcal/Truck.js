const { Schema, model, Types, SchemaTypes } = require("mongoose");

const TruckSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "El nombre es obligatorio"],
    },
    email: {
      type: String,
      required: [true, "El email es obligatorio"],
      unique: true,
    },

    company: {
      type: String,
      // required: [true, "La fecha de visita es requerida"],
    },
    tract: {
      type: String,
    },
    brand: {
      type: String,
      // required: [true, "El contacto es obligatorio"],
    },

    year: {
      type: String,
    },
    vin: {
      type: String,
    },
    model: {
      type: String,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

TruckSchema.methods.toJSON = function () {
  const { __v, _id, ...truck } = this.toObject();
  //Se cambia visualmente el uid por _id
  truck.uid = _id;

  return truck;
};

const Truck = model("Truck", TruckSchema);

module.exports = Truck;
