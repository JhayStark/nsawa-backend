const router = require("express").Router;
const {
  createFuneral,
  editFuneral,
  getAllFunerals,
  getSingleFuneral,
  deleteFuneral,
  getFuneralIds,
} = require("./funeral.controller");

const funeralRouter = router();

funeralRouter.post("/create", createFuneral);
funeralRouter.patch("/edit", editFuneral);
funeralRouter.get("/all-funerals", getAllFunerals);
funeralRouter.get("/all-ids", getFuneralIds);
funeralRouter.get("/singleFuneral", getSingleFuneral);
funeralRouter.delete("/delete", deleteFuneral);

module.exports = {
  funeralRouter,
};
