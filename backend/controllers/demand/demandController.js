const { v4: uuidv4 } = require("uuid");
const db = require("../../services/db/db");
const { PutCommand } = require("@aws-sdk/lib-dynamodb");
const DEMANDS_TABLE = process.env.DB_TABLE_DEMANDS;

const createDemand = async (req, res) => {
  try {
    const { author, title, demand, category } = req.body;

    if (!author || !title || !demand || !category) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    const newDemand = {
      demandId: uuidv4(),
      author,
      title,
      demand,
      category,
      createdAt: new Date().toISOString(),
    };

    const params = {
      TableName: DEMANDS_TABLE,
      Item: newDemand,
    };

    await db.send(new PutCommand(params));

    res.status(201).json({
      message: "Demand created successfully!",
      data: newDemand,
    });
  } catch (error) {
    console.error("Error creating demand:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { createDemand };
