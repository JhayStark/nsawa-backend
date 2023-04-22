const User = require("../user/user.model");
const bcrypt = require("bcrypt");
let saltRounds = 10;
const { createToken } = require("../../config/JWT");

const register = async (req, res) => {
  const { fullName, email, password } = req.body;
  try {
    const userExists = await User.findOne({ email });
    if (userExists)
      return res.status(409).json({ message: "User already Exists " });

    const hashedPassword = await bcrypt.hash(password, saltRounds);
    if (hashedPassword) {
      const newUser = await User.create({
        fullName,
        email,
        password: hashedPassword,
      });
      return res.status(200).json({ newUser });
    }
  } catch (error) {
    return res.status(500).json({ message: "User registration failed " });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const userId = user._id.toString();
    const userName = user.fullName;

    const token = createToken(userId);

    return res.status(200).json({ token, userName });
  } catch (error) {
    throw error;
  }
};

module.exports = {
  login,
  register,
};
