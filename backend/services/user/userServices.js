require("dotenv").config();
const { GetCommand, PutCommand } = require("@aws-sdk/lib-dynamodb");
const db = require("../../services/db/db");
const bcrypt = require("bcryptjs");
const TABLE_NAME = process.env.DB_TABLE_USERS;

const userExists = async (username) => {
  const getParams = {
    TableName: TABLE_NAME,
    Key: { username },
  };

  try {
    const existingUser = await db.send(new GetCommand(getParams));
    console.log(`User ${username} exists:`, existingUser.Item);
    return existingUser.Item;
  } catch (err) {
    console.error("Error checking if user exists:", err);
    throw new Error("Error checking if user exists");
  }
};

const createUser = async (username, password) => {
  console.log(`Creating new user with username: ${username}`);
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log(`Password hashed for user ${username}`);

  const newUser = {
    username,
    password: hashedPassword,
  };

  const putParams = {
    TableName: TABLE_NAME,
    Item: newUser,
  };

  try {
    await db.send(new PutCommand(putParams));
    console.log(`User ${username} successfully created.`);
  } catch (err) {
    console.error("Error creating user:", err);
    throw new Error("Error creating user");
  }
};

module.exports = { userExists, createUser };
