const express = require("express");
const { db } = require("../../services/db/db");
const { sendResponse, sendError } = require("../../services/response/response");
const { ScanCommand } = require("@aws-sdk/lib-dynamodb");
const dotenv = require("dotenv");
dotenv.config();

const loginUser = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return sendError(res, 400, "Username and Password are required");
  }

  try {
    const scanParams = {
      TableName: process.env.TABLE_NAME_LOGIN,
      FilterExpression: "#username = :username",
      ExpressionAttributeNames: {
        "#username": "username",
      },
      ExpressionAttributeValues: {
        ":username": username,
      },
    };

    const scanCommand = new ScanCommand(scanParams);
    const result = await db.send(scanCommand);

    if (!result.Items || result.Items.length === 0) {
      return sendError(res, 404, "User not found");
    }

    const user = result.Items[0];

    if (password !== user.password) {
      return sendError(res, 400, { error: "Invalid Password" });
    }

    return sendResponse(res, 200, {
      success: true,
      message: "Login successful",
      username: user.username,
    });
  } catch (error) {
    console.error("Problem with login:", error);
    return sendError(res, 500, {
      success: false,
      error: "Problem with login",
    });
  }
};

module.exports = {
  loginUser,
};
