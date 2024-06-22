"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const applicationController_1 = require("../controllers/applicationController");
const router = (0, express_1.Router)();
router.post('/', applicationController_1.submitApplication);
exports.default = router;
