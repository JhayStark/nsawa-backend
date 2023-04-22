const { Schema, model } = require("mongoose");
const donationsSchema = new Schema({
  donorName: {
    type: String,
    required: true,
  },
  keyPerson: {
    type: Object,
    required: true,
    default: {
      name: "",
      id: "",
    },
  },
  modeOfDonation: {
    type: String,
    required: true,
  },
  donorPhoneNumber: {
    type: String,
    require: true,
  },
  donorEmail: {
    type: String,
    require: true,
  },
  amountDonated: {
    type: Object,
    required: true,
    default: {
      amount: "",
      currency: "",
    },
  },
});

module.exports = model("Donation", donationsSchema);
