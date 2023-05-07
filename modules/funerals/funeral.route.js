const router = require("express").Router;
const {
  createFuneral,
  editFuneral,
  getAllFunerals,
  getSingleFuneral,
  deleteFuneral,
  getFuneralIds,
  sendMessages,
} = require("./funeral.controller");

const funeralRouter = router();

funeralRouter.post("/create", createFuneral);
funeralRouter.patch("/edit", editFuneral);
funeralRouter.get("/all-funerals", getAllFunerals);
funeralRouter.get("/all-ids", getFuneralIds);
funeralRouter.get("/singleFuneral", getSingleFuneral);
funeralRouter.delete("/delete", deleteFuneral);
funeralRouter.post("/send-message", sendMessages);

module.exports = {
  funeralRouter,
};
