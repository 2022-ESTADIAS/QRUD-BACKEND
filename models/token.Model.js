const {Schema,model} = require("mongoose")


const TokenSchema =  Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Personal",
  },
  token: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
    expires: 9000,
  },
});




module.exports = model("Token", TokenSchema);