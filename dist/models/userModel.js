"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dynamoose_1 = require("dynamoose");
const userSchema = new dynamoose_1.Schema({
    userId: {
        type: String,
        hashKey: true,
    },
    userName: {
        type: String,
        required: true,
    },
    userEmail: {
        type: String,
        required: true,
        index: {
            name: "EmailIndex",
            type: "global",
        },
    },
    role: {
        type: String,
        required: true,
        enum: ["applicant", "employer"],
    },
}, {
    saveUnknown: true,
    timestamps: true,
});
const User = (0, dynamoose_1.model)("User", userSchema);
exports.default = User;
