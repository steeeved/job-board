"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dynamoose_1 = require("dynamoose");
const coverLetterSchema = new dynamoose_1.Schema({
    coverLetterId: {
        type: String,
        hashKey: true,
    },
    userId: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
}, {
    saveUnknown: true,
    timestamps: true,
});
const CoverLetter = (0, dynamoose_1.model)("CoverLetter", coverLetterSchema);
exports.default = CoverLetter;
