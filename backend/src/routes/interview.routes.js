const express = require("express");
const { isAuth } = require("../middlewares/isAuth.middleware");
const upload = require("../middlewares/file.middleware");
const {
  generateInterviewReportController,
  getInterviewReportById,
  getAllInterviewReports,
  generateResumePdfController,
} = require("../controllers/interview.controller");

const interviewRouter = express.Router();

interviewRouter.post(
  "/",
  isAuth,
  upload.single("resume"),
  generateInterviewReportController,
);
interviewRouter.get("/report/all", isAuth, getAllInterviewReports);

interviewRouter.get("/report/:interviewId", isAuth, getInterviewReportById);

interviewRouter.post(
  "/resume/pdf/:interviewReportId",
  isAuth,
  generateResumePdfController,
);

module.exports = interviewRouter;
