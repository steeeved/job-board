"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const coverLetterController_1 = require("../controllers/coverLetterController");
const router = (0, express_1.Router)();
router.get("/:userId", coverLetterController_1.getCoverLetters);
exports.default = router;
