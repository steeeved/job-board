import {
  DynamoDBClient,
  DeleteTableCommand,
  ListTablesCommand,
} from "@aws-sdk/client-dynamodb";
import fs from "fs";
import path from "path";
import dynamoose from "dynamoose";
import Application from "../models/applicationModel";
import Job from "../models/jobModel";
import User from "../models/userModel";
import Resume from "../models/resumeModel";
import CoverLetter from "../models/coverLetterModel";

dynamoose.aws.ddb.local();
const client = new DynamoDBClient({
  endpoint: "http://localhost:8000",
  region: "us-west-2",
  credentials: {
    accessKeyId: "dummyKey123",
    secretAccessKey: "dummyKey123",
  },
});

async function createTables() {
  const models = [Application, CoverLetter, Job, Resume, User];

  for (const model of models) {
    const tableName = model.name;
    const table = new dynamoose.Table(tableName, [model], {
      create: true,
      update: true,
      waitForActive: true,
      throughput: { read: 5, write: 5 },
    });

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      await table.initialize();
      console.log(`Table created and initialized: ${tableName}`);
    } catch (error: any) {
      console.error(
        `Error creating table ${tableName}:`,
        error.message,
        error.stack
      );
    }
  }
}

async function seedData(tableName: string, filePath: string) {
  const data: { [key: string]: any }[] = JSON.parse(
    fs.readFileSync(filePath, "utf8")
  );
  const formattedTableName =
    tableName.charAt(0).toUpperCase() + tableName.slice(1, -1);
  console.log(`Seeding data to table: ${formattedTableName}`);

  for (const item of data) {
    try {
      await dynamoose.model(formattedTableName).create(item);
      console.log(`Item successfully inserted in ${formattedTableName}:`, item);
    } catch (err) {
      console.error(
        `Unable to add item to ${formattedTableName}. Error:`,
        JSON.stringify(err, null, 2)
      );
    }
  }
}

async function deleteTable(tableName: string) {
  const deleteTableCommand = new DeleteTableCommand({
    TableName: tableName,
  });

  try {
    await client.send(deleteTableCommand);
    console.log(`Table deleted: ${tableName}`);
  } catch (err: any) {
    if (err.name === "ResourceNotFoundException") {
      console.log(`Table does not exist: ${tableName}`);
    } else {
      console.error(`Error deleting table ${tableName}:`, err);
    }
  }
}

async function deleteAllTables() {
  const listTablesCommand = new ListTablesCommand({});
  const { TableNames } = await client.send(listTablesCommand);

  if (TableNames && TableNames.length > 0) {
    for (const tableName of TableNames) {
      await deleteTable(tableName);
    }
  }
}

async function main() {
  await deleteAllTables();
  await createTables();

  const seedDataPath = path.join(__dirname, "./data");
  const files = fs
    .readdirSync(seedDataPath)
    .filter((file) => file.endsWith(".json"));

  for (const file of files) {
    const tableName = path.basename(file, ".json");
    const filePath = path.join(seedDataPath, file);
    await seedData(tableName, filePath);
  }
}

main().catch((e) => console.error("Error in main execution:", e));
