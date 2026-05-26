import { useContext } from "react";
import { InterviewContext } from "../interview.context";
import {
  generateInterviewReport,
  getAllInterviewReports,
  getInterviewReportById,
} from "../services/interview.api";

export const useInterview = () => {
  const context = useContext(InterviewContext);

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
    setLoading(false);
    let res = null;
    try {
      res = await getAllInterviewReports();
      setReports(res.interviewReport);
    } catch (error) {
      console.log("get all interview error", error);
    } finally {
      setLoading(false);
    }
    return res?.interviewReport;
  };

  return {
    loading,
    report,
    reports,
    generateReport,
    getReportById,
    getReports,
  };
};
