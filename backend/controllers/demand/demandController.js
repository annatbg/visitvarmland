const { v4: uuidv4 } = require("uuid");
const db = require("../../services/db/db"); // Import the DynamoDB connection
const { PutCommand } = require("@aws-sdk/lib-dynamodb");

const DEMANDS_TABLE = process.env.DB_TABLE_DEMANDS;

/**
 * Create a new demand
 */
exports.createDemand = async (req, res) => {
  try {
    const { demand, author, createdAt } = req.body;

    // Validate request data
    if (!demand || !author || !createdAt) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    // Create a new demand object
    const newDemand = {
      demandId: uuidv4(),
      demand,
      author,
      createdAt,
    };

    // Push the new demand to DynamoDB
    const params = {
      TableName: DEMANDS_TABLE,
      Item: newDemand,
    };

    await db.send(new PutCommand(params));

    // Respond with success
    res.status(201).json({
      message: "Demand created successfully!",
      data: newDemand,
    });
  } catch (error) {
    console.error("Error creating demand:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
