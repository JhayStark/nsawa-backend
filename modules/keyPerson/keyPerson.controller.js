const KeyPerson = require("./keyPerson.model");
const Funeral = require("../funerals/funeral.model");

const createKeyPerson = async (req, res) => {
  const { name, phoneNumber, relation } = req.body;
  const { funeralId } = req.query;

  try {
    const funeral = await Funeral.findById(funeralId);
    if (!funeral) return res.status(404).send("Funeral not found");
    const person = await KeyPerson.create({
      name,
      phoneNumber,
      relation,
      funeralId: funeral._id,
    });
    if (person) {
      await funeral.updateOne({ $push: { keyPersonalities: person._id } });
      return res.status(200).send("Key person created");
    }
    return res.status(404).send("Key Person not created");
  } catch (error) {
    return res.status(500).send("Internal Server Error");
  }
};

const editKeyPerson = async (req, res) => {
  const { keyPersonId } = req.query;
  try {
    const person = await KeyPerson.findById(keyPersonId);
    if (!person) return res.status(404).send("Key person not found");
    await person.updateOne({
      $set: req.body,
    });
    return res.status(200).send("User Updated");
  } catch (error) {
    return res.status(500).send("Internal Server Error");
  }
};

const getAllKeyPersons = async (req, res) => {
  try {
    const persons = await KeyPerson.find({});
    if (!persons)
      return res.status(404).json({ persons: [], message: "No persons found" });
    return res.status(200).json({ persons });
  } catch (error) {
    return res.status(500).send("Internal Server Error");
  }
};
const getAllKeyPersonsForFuneral = async (req, res) => {
  const { funeralId } = req.query;
  try {
    const persons = await KeyPerson.find({ funeralId: funeralId }).sort({
      createdAt: -1,
    });
    if (!persons)
      return res.status(404).json({ persons: [], message: "No persons found" });
    return res.status(200).json({ persons });
  } catch (error) {
    return res.status(500).send("Internal Server Error");
  }
};

const getSingleKeyPerson = async (req, res) => {
  const { keyPersonId } = req.query;
  try {
    const person = await KeyPerson.findById(keyPersonId);
    if (!person)
      return res.status(404).json({ persons: [], message: "No persons found" });
    return res.status(200).json({ person });
  } catch (error) {
    return res.status(500).send("Internal Server Error");
  }
};
const deleteKeyPerson = async (req, res) => {
  const { keyPersonId } = req.query;
  try {
    const person = await KeyPerson.findByIdAndDelete(keyPersonId);
    if (!person) return res.status(404).send("No persons found");
    return res.status(200).send("Key Person deleted");
  } catch (error) {
    return res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  createKeyPerson,
  editKeyPerson,
  getAllKeyPersons,
  getAllKeyPersonsForFuneral,
  getSingleKeyPerson,
  deleteKeyPerson,
};
