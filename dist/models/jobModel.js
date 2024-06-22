"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dynamoose_1 = require("dynamoose");
const jobSchema = new dynamoose_1.Schema({
    jobId: {
        type: String,
        hashKey: true,
    },
    title: String,
    company: String,
    companyLogo: String,
    description: String,
    longDescription: String,
    location: String,
    employmentType: {
        type: String,
        enum: ["Full-Time", "Part-Time", "Contract"],
        required: true,
    },
    salaryRange: String,
    postedDate: String,
    postedByUserId: {
        type: String,
        required: true,
    },
    applicationCount: Number,
    specialties: {
        type: Array,
        schema: [String],
    },
    availability: {
        type: String,
        enum: ["Remote", "On-Site", "Hybrid", "Slave-Labor"],
        required: true,
    },
}, {
    saveUnknown: true,
    timestamps: true,
});
const Job = (0, dynamoose_1.model)("Job", jobSchema);
exports.default = Job;
