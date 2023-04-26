const Donation = require("./donations.model");
const Funeral = require("../funerals/funeral.model");
const KeyPerson = require("../keyPerson/keyPerson.model");

const createDonation = async (req, res) => {
  const { funeralId } = req.query;
  const {
    donorName,
    keyPerson,
    modeOfDonation,
    donorPhoneNumber,
    donorEmail,
    amountDonated,
  } = req.body;
  try {
    const funeral = await Funeral.findById(funeralId);
    if (!funeral) return res.status(404).send("Funeral not found");
    const keyPersonDoc = await KeyPerson.findById(keyPerson);
    if (!keyPersonDoc) return res.status(404).send("Key Person not found");
    const donation = await Donation.create({
      donorName,
      keyPerson: { keyPerson, name: keyPersonDoc.name },
      modeOfDonation,
      donorPhoneNumber,
      donorEmail,
      amountDonated,
    });
    if (!donation) return res.status(400).send("Donation not received");
    const totalFuneralDonation =
      funeral.totalDonations + amountDonated.amount * 1;
    const totalKeyPersonDonation =
      keyPersonDoc.totalDonations + amountDonated.amount * 1;
    let totalOnlineDonation = funeral.totalOnlineDonations;
    if (modeOfDonation === "e-pay") {
      totalOnlineDonation += amountDonated.amount * 1;
    }
    const totalDonors = funeral.totalDonor + 1;
    await funeral.updateOne({
      $push: { donations: donation },
      totalDonations: totalFuneralDonation,
      totalOnlineDonations: totalOnlineDonation,
      totalDonor: totalDonors,
    });
    await keyPersonDoc.updateOne({
      $push: { donations: donation },
      totalDonations: totalKeyPersonDonation,
    });
    return res.status(200).send("Donation received ");
  } catch (error) {
    throw error;
  }
};

module.exports = { createDonation };
