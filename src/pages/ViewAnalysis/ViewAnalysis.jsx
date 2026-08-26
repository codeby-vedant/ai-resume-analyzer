import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { generateReportPDF } from "../../utils/downloadReport";
import NavbarResumeIQFinal from "../../components/Navbar/Navbar";
import { API_URL } from "../../utils/api";

export default function ViewAnalysisPage() {
  const { resumeId } = useParams();
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAnalysis = async () => {
      try {
        setLoading(true);

        const res = await fetch(
          `${API_URL}/api/getAnalysis/${resumeId}/resume`,
          {
            method: "GET",
            credentials: "include",
          }
        );

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || data.msg || "Failed to fetch analysis");
        }

        setAnalysis(data.analysis);
      } catch (err) {
        console.error("Failed to fetch analysis:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalysis();
  }, [resumeId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100">
        <NavbarResumeIQFinal />

        <div className="flex flex-col items-center justify-center pt-40">
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
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v8H4z"
            />
          </svg>

          <p className="text-slate-700">Opening your resume...</p>
        </div>
      </div>
    );
  }

  if (error || !analysis) {
    return (
      <div className="min-h-screen bg-gray-100">
        <NavbarResumeIQFinal />

        <div className="flex flex-col items-center justify-center pt-40">
          <h2 className="text-2xl font-bold text-red-600">
            Unable to load analysis
          </h2>

          <p className="text-slate-600 mt-2">
            {error || "Analysis not found."}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <NavbarResumeIQFinal />

      <main className="p-6 md:p-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900">
              Resume Analysis Results
            </h1>

            <p className="text-slate-600 mt-2">
              AI-powered insights for your resume
            </p>
          </div>

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

            <p className="text-6xl font-extrabold">
              {analysis.score}
            </p>

            <p className="text-lg mt-2">
              Your resume is being evaluated for ATS compatibility
            </p>
          </div>
        </div>

        {/* Strengths & Weaknesses */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h3 className="text-xl font-bold text-slate-900 mb-3">
              Strengths
            </h3>

            <ul className="list-disc list-inside text-slate-700 space-y-2">
              {(analysis.strengths || []).map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h3 className="text-xl font-bold text-slate-900 mb-3">
              Weaknesses
            </h3>

            <ul className="list-disc list-inside text-slate-700 space-y-2">
              {(analysis.weaknesses || []).map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Missing Keywords & Suggestions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h3 className="text-xl font-bold text-slate-900 mb-3">
              Missing Keywords
            </h3>

            <p className="text-slate-700 mb-2">
              Consider adding:
            </p>

            <div className="flex flex-wrap gap-2">
              {(analysis.missingKeywords || []).map((kw, idx) => (
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
              {(analysis.suggestions || []).map((suggestion, idx) => (
                <li key={idx}>{suggestion}</li>
              ))}
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}