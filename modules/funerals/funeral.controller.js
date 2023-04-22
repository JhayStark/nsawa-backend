const Funeral = require("./funeral.model");
const User = require("../user/user.model");

const createFuneral = async (req, res) => {
  const userId = req.userId;
  const {
    nameOfFuneral,
    nameOfDeceased,
    funeralLocation,
    startDate,
    endDate,
    ageOfDeceased,
    phoneNumber,
  } = req.body;

  try {
    const user = await User.findById(userId);
    const funeral = await Funeral.create({
      nameOfFuneral,
      nameOfDeceased,
      funeralLocation,
      startDate,
      endDate,
      ageOfDeceased,
      phoneNumber,
      userId,
    });
    if (funeral) {
      await user.updateOne({ $push: { funerals: funeral._id } });
      return res.status(200).send("Funeral created ");
    }
  } catch (error) {
    return res.status(500).send("Internal Server Error");
  }
};

const editFuneral = async (req, res) => {
  const userId = req.userId;
  const { funeralId } = req.query;
  console.log(funeralId);
  try {
    const funeral = await Funeral.findById(funeralId);
    if (!funeral) return res.status(409).send("Funeral not Found");
    if (funeral.userId !== userId) return res.status(409).send("Unauthorized");
    if (funeral) {
      await funeral.updateOne({
        $set: req.body,
      });
      return res.status(200).send("Funeral Edited Successfully");
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal Server Error");
  }
};

const getAllFunerals = async (req, res) => {
  const userId = req.userId;
  try {
    const funerals = await Funeral.find({ userId }).sort({ createdAt: -1 });
    if (!funerals)
      return res
        .status(404)
        .json({ funerals: [], message: "No funerals found" });
    return res.status(200).json({ funerals });
  } catch (error) {
    return res.status(500).send("Internal Server Error");
  }
};

const getFuneralIds = async (req, res) => {
  const userId = req.userId;
  try {
    const ids = await Funeral.find(
      { userId },
      { _id: 1, nameOfFuneral: 1 }
    ).sort({ createdAt: -1 });
    if (!ids) return res.status(404).json({ ids: [] });
    return res.status(200).json({ ids });
  } catch (error) {
    return res.status(500).send("Internal Server Error");
  }
};

const getSingleFuneral = async (req, res) => {
  const userId = req.userId;
  const { funeralId } = req.query;
  try {
    const user = await User.findById(userId);
    const funeral = await Funeral.findById(funeralId).populate([
      {
        path: "keyPersonalities",
      },
      {
        path: "donations",
      },
    ]);
    if (!funeral)
      return res
        .status(404)
        .json({ funeral: [], message: "Funeral not found" });
    if (funeral.userId !== userId)
      return res
        .status(404)
        .json({ funeral: [], message: "You cant view this funeral" });

    return res.status(200).json({ funeral });
  } catch (error) {
    return res.status(500).send("Internal Server Error");
  }
};

const deleteFuneral = async (req, res) => {
  const userId = req.userId;
  const { funeralId } = req.query;
  try {
    const user = User.findById(userId);
    const funeral = await Funeral.findById({ _id: funeralId });
    if (!funeral) return res.status(404).send("No funeral found");
    if (funeral.userId !== userId) return res.status(409).send("Unauthorized");
    await Funeral.findByIdAndDelete(funeralId);
    await user.updateOne({ $pull: { funerals: funeral._id } });
    return res.status(200).send("Funeral deleted");
  } catch (error) {
    return res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  createFuneral,
  editFuneral,
  getAllFunerals,
  getSingleFuneral,
  deleteFuneral,
  getFuneralIds,
};
