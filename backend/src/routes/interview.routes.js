const express = require("express");
const { isAuth } = require("../middlewares/isAuth.middleware");
const upload = require("../middlewares/file.middleware");
const {
  generateInterviewReportController,
} = require("../controllers/interview.controller");

const interviewRouter = express.Router();

interviewRouter.post(
  "/",
  isAuth,
  upload.single("resume"),
  generateInterviewReportController,
);

module.exports = interviewRouter;
