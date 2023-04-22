const { Schema, model, default: mongoose } = require("mongoose");

const keyPersonSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    relation: {
      type: String,
      required: true,
    },
    funeralId: {
      type: String,
      required: true,
    },
    donations: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Donation",
    },
    totalDonations: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = model("KeyPerson", keyPersonSchema);
