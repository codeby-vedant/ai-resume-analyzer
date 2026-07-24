// src/components/HistoryPage.jsx
import React from "react";

export default function HistoryPage() {
  const resumes = [
    { name: "resume_july.pdf", score: 78, date: "Jul 20, 2026" },
    { name: "resume_june.pdf", score: 82, date: "Jun 15, 2026" },
    { name: "resume_may.pdf", score: 75, date: "May 28, 2026" },
    { name: "resume_april.pdf", score: 80, date: "Apr 10, 2026" },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      {/* Header */}
      <div className="mb-8 mt-10">
        <h1 className="text-3xl font-extrabold text-slate-900">
          Resume History
        </h1>
        <p className="text-slate-600 mt-2">
          Your previously analyzed resumes with scores and dates
        </p>
      </div>

      {/* Resume Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {resumes.map((resume, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-xl shadow-lg flex justify-between items-center"
          >
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                {resume.name}
              </h2>
              <p className="text-sm text-slate-600">
                Score: {resume.score} • {resume.date}
              </p>
            </div>
            <button className="px-4 py-2 rounded-md font-semibold text-white bg-gradient-to-r from-indigo-500 to-emerald-400 shadow-md hover:scale-[1.02] transition">
              View Analysis
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
