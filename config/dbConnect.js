const { connect } = require("mongoose");

async function dbConnect() {
  try {
    await connect(process.env.MONGODB_LOCAL);
    console.log("Database Connected");
  } catch (error) {
    console.error(error);
    throw new Error(
      "Failed to connect to database, check your connection or settings and try again"
    );
    process.exit(1);
  }
}

module.exports = dbConnect;
