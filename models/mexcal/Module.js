const { Schema, model, Types } = require("mongoose");

const ModuleSchema = Schema(
  {
    icon: {
      type: String,
    },
    module_name: {
      type: String,
    },
    routes: [
      {
        name: {
          type: String,
        },
        link: {
          type: String,
        },
      },
    ],

    isActive: {
      type: Boolean,
      default: true,
    },
    role_id: {
      type: Types.ObjectId,
      ref: "Role",
      required: [true, "La referencia del rol es requerida"],
    },
  },
  {
    timestamps: true,
  }
);

ModuleSchema.methods.toJSON = function () {
  const { __v, _id, ...visitor } = this.toObject();
  //Se cambia visualmente el uid por _id
  visitor.uid = _id;

  return visitor;
};

const Module = model("Module", ModuleSchema);

module.exports = Module;
