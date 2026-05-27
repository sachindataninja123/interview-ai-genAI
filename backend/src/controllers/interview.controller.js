const pdfparse = require("pdf-parse");
const {
  generateInterviewReport,
  generateResumePdf,
  generatePdfFromHtml,
} = require("../services/ai.service");
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

const getInterviewReportById = async (req, res) => {
  try {
    const { interviewId } = req.params;

    const interviewReport = await interviewReportModel.findById({
      _id: interviewId,
      user: req.user.id,
    });

    if (!interviewReport) {
      return res.status(400).json({
        message: "Interview report not found",
      });
    }

    return res.status(200).json({
      message: "Interview report fetched successfully",
      success: true,
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

const getAllInterviewReports = async (req, res) => {
  try {
    const interviewReports = await interviewReportModel
      .find({
        user: req.user.id,
      })
      .sort({ createdAt: -1 })
      .select(
        "-resume -selfDescription -jobDescription -__v -technicalQuestions -behavioralQuestions -skillGaps -preparationPlan",
      );

    if (!interviewReports.length) {
      return res.status(400).json({
        message: "Interview report not found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Interview report fetched successfully",
      success: true,
      interviewReports,
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

async function generateResumePdfController(req, res) {
  try {
    const { interviewReportId } = req.params;

    const interviewReport =
      await interviewReportModel.findById(interviewReportId);

    if (!interviewReport) {
      return res.status(404).json({
        message: "Interview report not found.",
      });
    }

    const { resume, jobDescription, selfDescription } = interviewReport;

    // STEP 1 → Generate HTML
    const result = await generateResumePdf({
      resume,
      jobDescription,
      selfDescription,
    });

    // STEP 2 → Convert HTML to PDF
    const pdfBuffer = await generatePdfFromHtml(result.html);

    // STEP 3 → Send PDF
    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename=resume_${interviewReportId}.pdf`,
    });

    res.send(pdfBuffer);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Failed to generate resume PDF",
    });
  }
}
module.exports = {
  generateInterviewReportController,
  getInterviewReportById,
  getAllInterviewReports,
  generateResumePdfController,
};
