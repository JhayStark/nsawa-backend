const { Schema, model, default: mongoose } = require("mongoose");

const funeralSchema = new Schema(
  {
    nameOfFuneral: {
      type: String,
      required: true,
    },
    nameOfDeceased: {
      type: String,
      required: true,
    },
    ageOfDeceased: {
      type: String,
      require: true,
    },
    phoneNumber: {
      type: String,
    },
    funeralLocation: {
      type: String,
      required: true,
    },
    startDate: {
      type: String,
      required: true,
    },
    endDate: {
      type: String,
      required: true,
    },
    keyPersonalities: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "KeyPerson",
    },
    donations: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Donation",
    },
    userId: {
      type: String,
      required: true,
    },
    totalDonations: {
      type: Number,
      default: 0,
    },
    totalDonor: {
      type: Number,
      default: 0,
    },
    totalOnlineDonations: {
      type: Number,
      default: 0,
    },
    status: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = model("Funeral", funeralSchema);
