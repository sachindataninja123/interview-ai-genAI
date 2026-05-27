import React from "react";
import {
  Upload,
  Briefcase,
  User,
  Sparkles,
  ShieldCheck,
  BrainCircuit,
} from "lucide-react";
import { useInterview } from "../hooks/useInterview";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/hooks/useAuth";

const Home = () => {
  const { loading, generateReport, reports } = useInterview();

  const { handleLogout } = useAuth();

  const [jobDescription, setJobDescription] = useState(null);
  const [selfDescription, setSelfDescription] = useState(null);

  const resumeInputRef = useRef();
  const navigate = useNavigate();

  const handleGenerateReport = async () => {
    const resumeFile = resumeInputRef.current.files[0];
    const data = await generateReport({
      jobDescription,
      selfDescription,
      resumeFile,
    });
    navigate(`/interview/${data._id}`);
  };

  if (loading) {
    return (
      <main className="text-gray-200 flex items-center justify-center h-screen">
        <h1 className="text-3xl">Loading your interview plan...</h1>
      </main>
    );
  }

  return (
    <div className="min-h-screen bg-[#020617] text-white overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-100 h-100 bg-pink-600/20 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-0 right-0 w-100 h-100 bg-violet-600/20 blur-[120px] rounded-full"></div>

      <div className="relative z-10 px-6 md:px-12 py-10">
        {/* Navbar */}
        <nav className="flex items-center justify-between mb-16">
          <h1 className="text-3xl font-bold tracking-wide">
            Hire<span className="text-pink-500">Mind AI</span>
          </h1>

          <button
            onClick={handleLogout}
            className="bg-pink-600 active:scale-95  hover:bg-white/20 border border-white/10 px-5 py-2 rounded-full transition-all duration-300 cursor-pointer"
          >
            Logout
          </button>
        </nav>

        {/* Hero */}
        <div className="max-w-4xl mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-pink-500/20 bg-pink-500/10 text-pink-400 text-sm mb-6">
            <Sparkles size={16} />
            AI Powered Career Assistant
          </div>

          <h1 className="text-5xl md:text-6xl font-bold leading-tight">
            Create Your
            <span className="text-pink-500"> AI Interview </span>
            Report
          </h1>

          <p className="text-slate-400 text-lg mt-6 leading-relaxed max-w-2xl">
            Upload your resume, add your professional summary and job
            description. Our AI will generate technical questions, behavioral
            rounds, skill gap analysis and preparation roadmap.
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* LEFT COLUMN */}
          <div className="bg-white/3 border border-white/10 backdrop-blur-xl rounded-3xl p-8 shadow-md">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-pink-500/20 p-3 rounded-2xl">
                <Briefcase className="text-pink-500" />
              </div>

              <div>
                <h2 className="text-xl font-semibold">Job Description</h2>
                
                <p className="text-slate-400 text-sm">
                  Paste the complete job role details
                </p>
              </div>
            </div>

            <textarea
              name={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              rows="20"
              placeholder="Paste the complete job description here..."
              className="w-full h-125 bg-[#0F172A]/80 border border-slate-800 focus:border-pink-500 rounded-3xl px-5 py-5 outline-none resize-none text-white placeholder:text-slate-500 transition-all duration-300"
            ></textarea>
          </div>

          {/* RIGHT COLUMN */}
          <div className="space-y-8">
            {/* Resume Upload */}
            <div className="bg-white/3 border border-white/10 backdrop-blur-xl rounded-3xl p-8 shadow-2xl">
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-violet-500/20 p-3 rounded-2xl">
                  <Upload className="text-violet-400" />
                </div>

                <div>
                  <h2 className="text-xl font-semibold">Upload Resume</h2>

                  <p className="text-slate-400 text-sm">
                    Upload your latest PDF resume
                  </p>
                </div>
              </div>

              <label className="border-2 border-dashed border-slate-700 hover:border-pink-500 transition-all duration-300 rounded-3xl h-42 flex flex-col items-center justify-center cursor-pointer bg-[#0F172A]/50">
                <Upload size={45} className="text-pink-500 mb-4" />

                <h3 className="text-md font-medium">Click to Upload Resume</h3>

                <p className="text-slate-400 text-sm mt-2">
                  PDF files only • Max size 5MB
                </p>

                <input
                  ref={resumeInputRef}
                  type="file"
                  accept=".pdf"
                  className="hidden"
                />
              </label>

              {/* Self Description */}
              <div className="mt-6">
                <div className="flex items-center gap-3">
                  <div className="bg-cyan-500/20 p-3 rounded-2xl">
                    <User className="text-cyan-400" />
                  </div>

                  <div className="">
                    <h2 className="text-2xl font-semibold">Self Description</h2>

                    <p className="text-slate-400 text-sm">
                      Tell us about yourself professionally
                    </p>
                  </div>
                </div>

                <textarea
                  name={selfDescription}
                  onChange={(e) => setSelfDescription(e.target.value)}
                  rows="6"
                  placeholder="Describe your skills, projects, strengths, experience and achievements..."
                  className="w-full bg-[#0F172A]/80 border mt-4 border-slate-800 focus:border-pink-500 rounded-3xl px-5 py-3 outline-none resize-none text-white placeholder:text-slate-500 transition-all duration-300"
                ></textarea>
              </div>
            </div>

            <div className=" border flex items-center bg-pink-600 hover:bg-pink-700 transition-all duration-300 cursor-pointer justify-center border-white/10 backdrop-blur-xl rounded-2xl py-4 shadow-2xl">
              <button
                onClick={handleGenerateReport}
                type="submit"
                className="cursor-pointer "
              >
                Generate Interview Report
              </button>
            </div>
          </div>
        </div>

        <div className="mb-14">
          {reports?.length > 0 && (
            <section>
              {/* Heading */}
              <div className="flex items-center justify-between mb-8 mt-7">
                <div>
                  <h2 className="text-3xl font-bold text-white">
                    My Recent Interviews
                  </h2>

                  <p className="text-slate-400 mt-2">
                    Track your generated AI interview reports
                  </p>
                </div>

                <div className="px-4 py-2 rounded-2xl bg-pink-500/10 border border-pink-500/20 text-pink-400 text-sm">
                  {reports.length} Reports
                </div>
              </div>

              {/* Cards */}
              <ul className="flex w-full whitespace-nowrap overflow-x-auto gap-3 py-3">
                {reports.map((report) => {
                  return (
                    <li
                      key={report._id}
                      onClick={() => navigate(`/interview/${report._id}`)}
                      className="group shrink-0 w-100 relative overflow-hidden cursor-pointer rounded-2xl border border-white/10 bg-white/3 backdrop-blur-xl p-6 transition-all duration-300 hover:-translate-y-2 hover:border-pink-500/40 hover:bg-white/5 hover:shadow-[0_0_40px_rgba(236,72,153,0.15)]"
                    >
                      {/* Glow Effect */}
                      <div className="absolute top-0 right-0 h-32 w-32 bg-pink-500/10 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500"></div>

                      {/* Top Section */}
                      <div className="relative z-10 flex items-start justify-between">
                        <div>
                          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-400 text-xs font-medium mb-4">
                            AI Interview
                          </div>

                          <h3 className="text-2xl font-semibold text-white leading-tight">
                            {report.title || "Untitled Position"}
                          </h3>

                          <p className="text-slate-400 text-sm mt-3">
                            Generated on{" "}
                            {new Date(report.createdAt).toLocaleDateString()}
                          </p>
                        </div>

                        {/* Match Score */}
                        <div className="flex flex-col items-center justify-center h-20 w-20 rounded-full bg-linear-to-br from-pink-500/20 to-violet-500/20 border border-white/10">
                          <span className="text-2xl font-bold text-white">
                            {report.matchScore}%
                          </span>

                          <span className="text-[10px] uppercase tracking-wider text-slate-400">
                            Match
                          </span>
                        </div>
                      </div>

                      {/* Divider */}
                      <div className="h-px w-full bg-linear-to-r from-transparent via-white/10 to-transparent mt-3"></div>
                    </li>
                  );
                })}
              </ul>
            </section>
          )}
        </div>

        {/* Bottom Features */}
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          <div className="bg-white/3 border border-white/10 rounded-3xl p-6">
            <BrainCircuit className="text-pink-500 mb-4" size={32} />

            <h3 className="text-xl font-semibold mb-2">AI Analysis</h3>

            <p className="text-slate-400">
              Get deep insights into your resume and job compatibility.
            </p>
          </div>

          <div className="bg-white/3 border border-white/10 rounded-3xl p-6">
            <ShieldCheck className="text-violet-400 mb-4" size={32} />

            <h3 className="text-xl font-semibold mb-2">Skill Gap Detection</h3>

            <p className="text-slate-400">
              Discover missing skills and improve your interview readiness.
            </p>
          </div>

          <div className="bg-white/3 border border-white/10 rounded-3xl p-6">
            <Sparkles className="text-cyan-400 mb-4" size={32} />

            <h3 className="text-xl font-semibold mb-2">Smart Preparation</h3>

            <p className="text-slate-400">
              Receive a customized preparation roadmap powered by AI.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
