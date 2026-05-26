const pdfparse = require("pdf-parse");
const generateInterviewReport = require("../services/ai.service");
const interviewReportModel = require("../models/interviewReport.model");

const generateInterviewReportController = async (req, res) => {
  try {
    const resumeContent = await new pdfparse.PDFParse(
      Uint8Array.from(req.file.buffer),
    ).getText();
    const { selfDescription, jobDescription } = req.body;

    const interviewReportByAI = await generateInterviewReport({
      resume: resumeContent.text,
      selfDescription,
      jobDescription,
    });

    const interviewReport = await interviewReportModel.create({
      user: req.user.id,
      resume: resumeContent.text,
      selfDescription,
      jobDescription,
      matchScore: interviewReportByAI.matchScore,
      title: interviewReportByAI.title,
      technicalQuestion: interviewReportByAI.technicalQuestions, // remap
      behavioralQuestion: interviewReportByAI.behavioralQuestions, // remap
      skillGap: interviewReportByAI.skillGaps, // remap
      preparationPlan: interviewReportByAI.preparationPlan,
    });
    
    return res.status(200).json({
      message: "Interview generated successfully",
      interviewReport,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal Server Error",
      success: false,
      error: error.message,
    });
  }
};

module.exports = { generateInterviewReportController };
