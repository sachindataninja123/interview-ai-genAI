import { useContext, useEffect } from "react";
import { InterviewContext } from "../interview.context";
import {
  generateInterviewReport,
  generateResumePdf,
  getAllInterviewReports,
  getInterviewReportById,
} from "../services/interview.api";
import { useParams } from "react-router-dom";

export const useInterview = () => {
  const context = useContext(InterviewContext);

  const { interviewId } = useParams();

  if (!context)
    throw new Error("UseInterview must be used within an interviewProvider");

  const { loading, setLoading, report, setReport, reports, setReports } =
    context;

  const generateReport = async ({
    jobDescription,
    selfDescription,
    resumeFile,
  }) => {
    setLoading(true);

    let res = null;

    try {
      res = await generateInterviewReport({
        jobDescription,
        selfDescription,
        resumeFile,
      });

      setReport(res.interviewReport);
    } catch (error) {
      console.log("generate interview error", error);
    } finally {
      setLoading(false);
    }

    return res?.interviewReport;
  };

  const getReportById = async (interviewId) => {
    setLoading(true);
    let res = null;
    try {
      res = await getInterviewReportById(interviewId);
      setReport(res.interviewReport);
    } catch (error) {
      console.log("get interview by id error", error);
    } finally {
      setLoading(false);
    }
    return res?.interviewReport;
  };

  const getReports = async () => {
    setLoading(true);

    let res = null;

    try {
      res = await getAllInterviewReports();

      setReports(res.interviewReports);
    } catch (error) {
      console.log("get all interview error", error);
    } finally {
      setLoading(false);
    }

    return res?.interviewReports;
  };

  const getResumePdf = async (interviewReportId) => {
    setLoading(true);
    let response = null;
    try {
      response = await generateResumePdf({ interviewReportId });
      const url = window.URL.createObjectURL(
        new Blob([response], { type: "application/pdf" }),
      );
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `resume_${interviewReportId}.pdf`);
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (interviewId) {
      getReportById(interviewId);
    } else {
      getReports();
    }
  }, [interviewId]);

  return {
    loading,
    report,
    reports,
    generateReport,
    getReportById,
    getReports,
    getResumePdf,
  };
};
