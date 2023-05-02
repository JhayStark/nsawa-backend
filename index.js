const express = require("express");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const dbConnect = require("./config/dbConnect");
const cors = require("cors");
const { authRouter } = require("./modules/auth/auth.routes");
const { funeralRouter } = require("./modules/funerals/funeral.route");
const { verifyToken } = require("./config/JWT");
const { keyPersonRouter } = require("./modules/keyPerson/keyPerson.route");
const { donationRouter } = require("./modules/donations/donations.route");
const  sendSms  = require("./modules/sendSms");

dotenv.config();
const app = express();

app.use(express.json());
app.use(helmet());
app.use(morgan("common"));
app.use(cors());

const port = process.env.PORT;

async function start() {
  try {
    await dbConnect();
    app.listen(port, () => {
      console.log(`Server is running on Port:${port}`);
    });
  } catch (error) {
    throw error;
  }
}

app.use("/auth", authRouter);
app.use("/funeral", verifyToken, funeralRouter);
app.use("/key-person", verifyToken, keyPersonRouter);
app.use("/donation", verifyToken, donationRouter);
app.use("/sms",sendSms);

start();
