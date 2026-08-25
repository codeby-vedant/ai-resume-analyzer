import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { generateReportPDF } from "../../utils/downloadReport";
import NavbarResumeIQFinal from "../../components/Navbar/Navbar";
import {} from "../../utils/api";
export default function ViewAnalysisPage() {
  const { resumeId } = useParams(); 
  const [analysis, setAnalysis] = useState(null);
 
  useEffect(() => {
    const fetchAnalysis = async () => {
      try {
        const res = await fetch(`${API_URL}/api/getAnalysis/${resumeId}/resume`, {
          method: "GET",
          credentials: "include",
        });

        console.log("Response status:", res);
        const data = await res.json();
        console.log("Response status:", data);
        setAnalysis(data.analysis);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAnalysis();
  }, [resumeId]);

 

  if (!analysis) {
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
        <NavbarResumeIQFinal />
        <div className="flex flex-col items-center mt-20">
          <svg
            className="animate-spin h-10 w-10 text-indigo-600 mb-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v8H4z"
            ></path>
          </svg>
          <p className="text-slate-700">Opening your resume...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      {/* Header */}
      <NavbarResumeIQFinal />
      <div className="flex justify-between items-center mb-8 mt-5">
        <h1 className="text-3xl font-extrabold text-slate-900">
          Resume Analysis Results
        </h1>
        <button
          onClick={() => generateReportPDF(analysis)}
          className="px-6 py-2 rounded-lg font-semibold text-white bg-gradient-to-r from-indigo-500 to-emerald-400 shadow-md hover:scale-[1.02] transition"
        >
          Download Report
        </button>
      </div>

      {/* ATS Score */}
      <div className="max-w-2xl mx-auto mb-10">
        <div className="p-10 rounded-xl bg-gradient-to-r from-indigo-500 via-pink-400 to-emerald-400 text-white shadow-xl text-center">
          <h2 className="text-2xl font-bold mb-2">ATS Score</h2>
          <p className="text-6xl font-extrabold">{analysis.score}</p>
          <p className="text-lg mt-2">Your resume is moderately optimized</p>
        </div>
      </div>

      {/* Strengths & Weaknesses */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h3 className="text-xl font-bold text-slate-900 mb-3">Strengths</h3>
          <ul className="list-disc list-inside text-slate-700 space-y-2">
            {analysis.strengths.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h3 className="text-xl font-bold text-slate-900 mb-3">Weaknesses</h3>
          <ul className="list-disc list-inside text-slate-700 space-y-2">
            {analysis.weaknesses.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Missing Keywords & AI Suggestions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h3 className="text-xl font-bold text-slate-900 mb-3">
            Missing Keywords
          </h3>
          <p className="text-slate-700 mb-2">Consider adding:</p>
          <div className="flex flex-wrap gap-2">
            {analysis.missingKeywords.map((kw, idx) => (
              <span
                key={idx}
                className="px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-sm font-medium"
              >
                {kw}
              </span>
            ))}
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h3 className="text-xl font-bold text-slate-900 mb-3">
            AI Suggestions
          </h3>
          <ul className="list-disc list-inside text-slate-700 space-y-2">
            {analysis.suggestions.map((s, idx) => (
              <li key={idx}>{s}</li>
            ))}
          </ul>
        </div>
      </div>

      
    </div>
  );
}
