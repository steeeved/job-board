"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dynamoose_1 = require("dynamoose");
const applicationSchema = new dynamoose_1.Schema({
    applicationId: {
        type: String,
        hashKey: true,
    },
    jobId: {
        type: String,
        required: true,
    },
    applicantUserId: {
        type: String,
        required: true,
    },
    resumeId: {
        type: String,
        required: true,
    },
    coverLetter: {
        type: String,
        required: true,
    },
}, {
    saveUnknown: true,
    timestamps: true,
});
const Application = (0, dynamoose_1.model)("Application", applicationSchema);
exports.default = Application;
