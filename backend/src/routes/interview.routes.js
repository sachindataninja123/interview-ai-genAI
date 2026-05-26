const express = require("express");
const { isAuth } = require("../middlewares/isAuth.middleware");
const upload = require("../middlewares/file.middleware");
const {
  generateInterviewReportController,
  getInterviewReportById,
  getAllInterviewReports,
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

module.exports = interviewRouter;
