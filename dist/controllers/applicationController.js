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
exports.submitApplication = void 0;
const applicationModel_1 = __importDefault(require("../models/applicationModel"));
const uuid_1 = require("uuid");
const submitApplication = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { jobId, applicantUserId, coverLetter, resumeId } = req.body;
    try {
        const newApplication = new applicationModel_1.default({
            applicationId: (0, uuid_1.v4)(),
            jobId,
            applicantUserId,
            coverLetter,
            resumeId,
        });
        yield newApplication.save();
        res
            .status(201)
            .json({ success: true, applicationId: newApplication.applicationId });
    }
    catch (error) {
        console.error("Error submitting application:", error);
        res.status(500).json({ message: "Error submitting application" });
    }
});
exports.submitApplication = submitApplication;
