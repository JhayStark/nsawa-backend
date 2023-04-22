const { Schema, model, default: mongoose } = require("mongoose");

const userSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    funerals: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Funeral",
    },
    keyPersons: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "KeyPerson",
    },
  },
  { timestamps: true }
);

module.exports = model("User", userSchema);
