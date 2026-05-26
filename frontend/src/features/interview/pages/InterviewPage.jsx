import React, { useState } from "react";
import {
  BrainCircuit,
  CalendarDays,
  ChevronRight,
  CircleAlert,
  Code2,
  Search,
} from "lucide-react";

const report = {
  matchScore: 88,

  technicalQuestion: [
    {
      question:
        "Explain Event Loop in Node.js",
      intention:
        "Checks understanding of async architecture",
      answer:
        "Discuss call stack, callback queue and non-blocking execution.",
    },

    {
      question:
        "Difference between JWT and Session Authentication?",
      intention:
        "Evaluate authentication knowledge",
      answer:
        "JWT is stateless while sessions are stored on server.",
    },
  ],

  behavioralQuestion: [
    {
      question:
        "Tell me about a difficult project challenge.",
      intention:
        "Evaluate communication and teamwork",
      answer:
        "Explain problem, actions taken and measurable outcome.",
    },
  ],

  skillGap: [
    {
      skill: "Message Queues",
      severity: "high",
    },

    {
      skill: "Redis Caching",
      severity: "medium",
    },

    {
      skill: "System Design",
      severity: "medium",
    },
  ],

  preparationPlan: [
    {
      day: 1,
      focus: "Node.js Internals & Streams",

      tasks: [
        "Study Event Loop and streams",
        "Practice file handling APIs",
      ],
    },

    {
      day: 2,
      focus: "Advanced MongoDB",

      tasks: [
        "Aggregation pipelines",
        "Indexing and optimization",
      ],
    },

    {
      day: 3,
      focus: "Caching & Redis",

      tasks: [
        "Learn Redis basics",
        "Implement cache layer",
      ],
    },

    {
      day: 4,
      focus: "System Design",

      tasks: [
        "API Gateway concepts",
        "Microservices basics",
      ],
    },
  ],
};

const tabs = [
  {
    id: "technical",
    label: "Technical Questions",
    icon: Code2,
  },

  {
    id: "behavioral",
    label: "Behavioral Questions",
    icon: BrainCircuit,
  },

  {
    id: "roadmap",
    label: "Road Map",
    icon: CalendarDays,
  },
];

const InterviewDashboard = () => {
  const [activeTab, setActiveTab] =
    useState("roadmap");

  return (
    <div className="min-h-screen bg-[#050816] text-white flex overflow-hidden">
      
      {/* LEFT SIDEBAR */}
      <div className="w-55 bg-[#081120] border-r border-white/5 p-5 flex flex-col">
        
        <div className="mb-10">
          <h1 className="text-xl font-semibold tracking-wide">
            Interview<span className="text-pink-500">AI</span>
          </h1>
        </div>

        <div className="space-y-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;

            return (
              <button
                key={tab.id}
                onClick={() =>
                  setActiveTab(tab.id)
                }
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm transition-all duration-300 ${
                  activeTab === tab.id
                    ? "bg-pink-500/15 text-pink-400 border border-pink-500/20"
                    : "hover:bg-white/4 text-slate-400"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon size={16} />
                  {tab.label}
                </div>

                <ChevronRight size={15} />
              </button>
            );
          })}
        </div>
      </div>

      {/* CENTER CONTENT */}
      <div className="flex-1 bg-[#070B1A] overflow-y-auto px-10 py-8">
        
        {/* HEADER */}
        <div className="flex items-center justify-between mb-8">
          
          <div>
            <h1 className="text-2xl font-semibold">
              Preparation Road Map
            </h1>

            <p className="text-slate-500 text-sm mt-1">
              7-day interview preparation strategy
            </p>
          </div>

          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
              size={16}
            />

            <input
              type="text"
              placeholder="Search..."
              className="bg-[#0F172A] border border-white/5 rounded-xl pl-10 pr-4 py-2 text-sm outline-none focus:border-pink-500/30"
            />
          </div>
        </div>

        {/* ROADMAP TIMELINE */}
        {activeTab === "roadmap" && (
          <div className="relative ml-4 border-l border-pink-500/20 pl-10 space-y-10">
            
            {report.preparationPlan.map(
              (item, index) => (
                <div
                  key={index}
                  className="relative"
                >
                  
                  {/* DOT */}
                  <div className="absolute -left-11.5 top-1 w-4 h-4 rounded-full bg-pink-500 border-4 border-[#070B1A]"></div>

                  <div className="flex items-center gap-3 mb-3">
                    
                    <span className="text-pink-500 text-xs font-medium uppercase tracking-wider">
                      Day {item.day}
                    </span>

                    <div className="h-px flex-1 bg-white/5"></div>
                  </div>

                  <h2 className="text-lg font-medium mb-3">
                    {item.focus}
                  </h2>

                  <div className="space-y-2">
                    {item.tasks.map((task, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-3 text-sm text-slate-400"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-pink-500 mt-2"></div>

                        <p>{task}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )
            )}
          </div>
        )}

        {/* TECHNICAL */}
        {activeTab === "technical" && (
          <div className="space-y-5">
            {report.technicalQuestion.map(
              (item, index) => (
                <div
                  key={index}
                  className="bg-[#0B1120] border border-white/5 rounded-2xl p-5"
                >
                  <div className="flex items-center justify-between mb-4">
                    
                    <span className="text-pink-500 text-xs uppercase tracking-widest">
                      Technical Question
                    </span>

                    <Code2
                      size={18}
                      className="text-pink-500"
                    />
                  </div>

                  <h2 className="text-lg font-medium mb-5 leading-relaxed">
                    {item.question}
                  </h2>

                  <div className="grid md:grid-cols-2 gap-4">
                    
                    <div className="bg-white/2 rounded-xl p-4 border border-white/5">
                      <p className="text-cyan-400 text-sm mb-2">
                        Intention
                      </p>

                      <p className="text-sm text-slate-400 leading-relaxed">
                        {item.intention}
                      </p>
                    </div>

                    <div className="bg-white/2 rounded-xl p-4 border border-white/5">
                      <p className="text-green-400 text-sm mb-2">
                        Suggested Answer
                      </p>

                      <p className="text-sm text-slate-400 leading-relaxed">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
        )}

        {/* BEHAVIORAL */}
        {activeTab === "behavioral" && (
          <div className="space-y-5">
            {report.behavioralQuestion.map(
              (item, index) => (
                <div
                  key={index}
                  className="bg-[#0B1120] border border-white/5 rounded-2xl p-5"
                >
                  <div className="flex items-center justify-between mb-4">
                    
                    <span className="text-violet-400 text-xs uppercase tracking-widest">
                      Behavioral Question
                    </span>

                    <BrainCircuit
                      size={18}
                      className="text-violet-400"
                    />
                  </div>

                  <h2 className="text-lg font-medium mb-5 leading-relaxed">
                    {item.question}
                  </h2>

                  <div className="grid md:grid-cols-2 gap-4">
                    
                    <div className="bg-white/2 rounded-xl p-4 border border-white/5">
                      <p className="text-cyan-400 text-sm mb-2">
                        Intention
                      </p>

                      <p className="text-sm text-slate-400 leading-relaxed">
                        {item.intention}
                      </p>
                    </div>

                    <div className="bg-white/2 rounded-xl p-4 border border-white/5">
                      <p className="text-green-400 text-sm mb-2">
                        Suggested Answer
                      </p>

                      <p className="text-sm text-slate-400 leading-relaxed">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
        )}
      </div>

      {/* RIGHT SIDEBAR */}
      <div className="w-65 bg-[#081120] border-l border-white/5 p-5">
        
        {/* MATCH SCORE */}
        <div className="flex flex-col items-center mb-10">
          
          <p className="text-xs uppercase tracking-widest text-slate-500 mb-5">
            Match Score
          </p>

          <div className="w-28 h-28 rounded-full border-[6px] border-green-500 flex items-center justify-center relative">
            
            <div className="absolute inset-2 rounded-full border border-green-500/20"></div>

            <span className="text-3xl font-bold text-green-400">
              {report.matchScore}
            </span>
          </div>

          <p className="text-green-400 text-sm mt-4">
            Strong match for this role
          </p>
        </div>

        {/* SKILL GAPS */}
        <div>
          <p className="text-xs uppercase tracking-widest text-slate-500 mb-4">
            Skill Gaps
          </p>

          <div className="space-y-3">
            {report.skillGap.map(
              (item, index) => (
                <div
                  key={index}
                  className={`rounded-xl px-4 py-3 text-sm border ${
                    item.severity === "high"
                      ? "bg-red-500/10 border-red-500/20 text-red-400"
                      : item.severity === "medium"
                      ? "bg-yellow-500/10 border-yellow-500/20 text-yellow-400"
                      : "bg-green-500/10 border-green-500/20 text-green-400"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <CircleAlert size={15} />

                    <span>{item.skill}</span>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterviewDashboard;