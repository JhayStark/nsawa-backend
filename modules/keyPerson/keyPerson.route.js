const router = require("express").Router;
const {
  createKeyPerson,
  editKeyPerson,
  getAllKeyPersons,
  getAllKeyPersonsForFuneral,
  getSingleKeyPerson,
  deleteKeyPerson,
} = require("./keyPerson.controller");

const keyPersonRouter = router();

keyPersonRouter.post("/create", createKeyPerson);
keyPersonRouter.patch("/edit", editKeyPerson);
keyPersonRouter.get("/all", getAllKeyPersons);
keyPersonRouter.get("/funeral", getAllKeyPersonsForFuneral);
keyPersonRouter.get("/person", getSingleKeyPerson);
keyPersonRouter.delete("/delete", deleteKeyPerson);

module.exports = { keyPersonRouter };
