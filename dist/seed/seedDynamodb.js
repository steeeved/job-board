"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_dynamodb_1 = require("@aws-sdk/client-dynamodb");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const dynamoose_1 = __importDefault(require("dynamoose"));
const applicationModel_1 = __importDefault(require("../models/applicationModel"));
const jobModel_1 = __importDefault(require("../models/jobModel"));
const userModel_1 = __importDefault(require("../models/userModel"));
const resumeModel_1 = __importDefault(require("../models/resumeModel"));
const coverLetterModel_1 = __importDefault(require("../models/coverLetterModel"));
dynamoose_1.default.aws.ddb.local();
const client = new client_dynamodb_1.DynamoDBClient({
    endpoint: "http://localhost:8000",
    region: "us-west-2",
    credentials: {
        accessKeyId: "dummyKey123",
        secretAccessKey: "dummyKey123",
    },
});
function createTables() {
    return __awaiter(this, void 0, void 0, function* () {
        const models = [applicationModel_1.default, coverLetterModel_1.default, jobModel_1.default, resumeModel_1.default, userModel_1.default];
        for (const model of models) {
            const tableName = model.name;
            const table = new dynamoose_1.default.Table(tableName, [model], {
                create: true,
                update: true,
                waitForActive: true,
                throughput: { read: 5, write: 5 },
            });
            try {
                yield new Promise((resolve) => setTimeout(resolve, 1000));
                yield table.initialize();
                console.log(`Table created and initialized: ${tableName}`);
            }
            catch (error) {
                console.error(`Error creating table ${tableName}:`, error.message, error.stack);
            }
        }
    });
}
function seedData(tableName, filePath) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = JSON.parse(fs_1.default.readFileSync(filePath, "utf8"));
        const formattedTableName = tableName.charAt(0).toUpperCase() + tableName.slice(1, -1);
        console.log(`Seeding data to table: ${formattedTableName}`);
        for (const item of data) {
            try {
                yield dynamoose_1.default.model(formattedTableName).create(item);
                console.log(`Item successfully inserted in ${formattedTableName}:`, item);
            }
            catch (err) {
                console.error(`Unable to add item to ${formattedTableName}. Error:`, JSON.stringify(err, null, 2));
            }
        }
    });
}
function deleteTable(tableName) {
    return __awaiter(this, void 0, void 0, function* () {
        const deleteTableCommand = new client_dynamodb_1.DeleteTableCommand({
            TableName: tableName,
        });
        try {
            yield client.send(deleteTableCommand);
            console.log(`Table deleted: ${tableName}`);
        }
        catch (err) {
            if (err.name === "ResourceNotFoundException") {
                console.log(`Table does not exist: ${tableName}`);
            }
            else {
                console.error(`Error deleting table ${tableName}:`, err);
            }
        }
    });
}
function deleteAllTables() {
    return __awaiter(this, void 0, void 0, function* () {
        const listTablesCommand = new client_dynamodb_1.ListTablesCommand({});
        const { TableNames } = yield client.send(listTablesCommand);
        if (TableNames && TableNames.length > 0) {
            for (const tableName of TableNames) {
                yield deleteTable(tableName);
            }
        }
    });
}
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        yield deleteAllTables();
        yield createTables();
        const seedDataPath = path_1.default.join(__dirname, "./data");
        const files = fs_1.default
            .readdirSync(seedDataPath)
            .filter((file) => file.endsWith(".json"));
        for (const file of files) {
            const tableName = path_1.default.basename(file, ".json");
            const filePath = path_1.default.join(seedDataPath, file);
            yield seedData(tableName, filePath);
        }
    });
}
main().catch((e) => console.error("Error in main execution:", e));
