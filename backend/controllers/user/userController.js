const { createUser, userExists } = require("../../services/user/userServices");
const { comparePassword } = require("../../services/utils/bcrypt");
const { generateToken } = require("../../services/utils/jwt");

const signupUser = async (req, res) => {
  const { username, password } = req.body;
  console.log("Received signup request with username:", username);

  try {
    const existingUser = await userExists(username);
    if (existingUser) {
      console.log(`User ${username} already exists.`);
      return res.status(400).json({ message: "User already exists" });
    }

    await createUser(username, password);

    console.log(`User ${username} created successfully.`);
    return res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    console.error("Error in signup:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await userExists(username);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = generateToken(user.username);

    return res
      .status(200)
      .json({ message: "Login successful", token, username });
  } catch (err) {
    console.error("Error in login:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { signupUser, loginUser };
