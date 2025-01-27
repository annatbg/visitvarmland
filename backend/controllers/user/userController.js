const { createUser, userExists } = require("../../services/user/userServices");
const { comparePassword } = require("../../services/utils/bcrypt");
const { generateToken } = require("../../services/utils/jwt");

const signupUser = async (req, res) => {
  const { email, password, organisation, firstName, lastName } = req.body;
  console.log("Received signup request with email:", email);

  try {
    const existingUser = await userExists(email);
    if (existingUser) {
      console.log(`User ${email} already exists.`);
      return res.status(400).json({ message: "User already exists" });
    }

    if (!email || !password || !organisation || !firstName || !lastName) {
      console.log("Missing required fields in signup request.");
      return res.status(400).json({ message: "Missing required fields" });
    }

    await createUser(email, password, organisation, firstName, lastName);

    console.log(`User ${email} created successfully.`);
    return res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    console.error("Error in signup:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userExists(email);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = generateToken(user.email);

    return res.status(200).json({ message: "Login successful", token, email });
  } catch (err) {
    console.error("Error in login:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { signupUser, loginUser };
