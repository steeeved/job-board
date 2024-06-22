"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dynamoose_1 = require("dynamoose");
const resumeSchema = new dynamoose_1.Schema({
    resumeId: {
        type: String,
        hashKey: true,
    },
    userId: {
        type: String,
        required: true,
    },
    resumeUrl: {
        type: String,
        required: true,
    },
    fileName: {
        type: String,
        required: true,
    },
}, {
    saveUnknown: true,
    timestamps: true,
});
const Resume = (0, dynamoose_1.model)("Resume", resumeSchema);
exports.default = Resume;
