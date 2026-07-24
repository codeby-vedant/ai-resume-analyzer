
import React from "react";
import NavbarResumeIQFinal from "../../components/Navbar/Navbar";
export default function AnalysisPage() {
  return (
    <div className="min-h-screen bg-gray-100 p-10">
      {/* Header */}
      <NavbarResumeIQFinal/>
      <div className="flex justify-between items-center mb-8 mt-5">
        <h1 className="text-3xl font-extrabold text-slate-900">
          Resume Analysis Results
        </h1>
        <button className="px-6 py-2 rounded-lg font-semibold text-white bg-gradient-to-r from-indigo-500 to-emerald-400 shadow-md hover:scale-[1.02] transition">
          Download Report
        </button>
      </div>

      {/* ATS Score */}
      <div className="max-w-2xl mx-auto mb-10">
        <div className="p-10 rounded-xl bg-gradient-to-r from-indigo-500 via-pink-400 to-emerald-400 text-white shadow-xl text-center">
          <h2 className="text-2xl font-bold mb-2">ATS Score</h2>
          <p className="text-6xl font-extrabold">78</p>
          <p className="text-lg mt-2">Your resume is moderately optimized</p>
        </div>
      </div>

      {/* Strengths & Weaknesses */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h3 className="text-xl font-bold text-slate-900 mb-3">Strengths</h3>
          <ul className="list-disc list-inside text-slate-700 space-y-2">
            <li>Strong leadership experience highlighted</li>
            <li>Clear quantifiable achievements</li>
            <li>Well-structured formatting</li>
          </ul>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h3 className="text-xl font-bold text-slate-900 mb-3">Weaknesses</h3>
          <ul className="list-disc list-inside text-slate-700 space-y-2">
            <li>Missing industry-specific keywords</li>
            <li>Some bullet points lack action verbs</li>
            <li>Education section could be more detailed</li>
          </ul>
        </div>
      </div>

      {/* Missing Keywords & AI Suggestions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h3 className="text-xl font-bold text-slate-900 mb-3">Missing Keywords</h3>
          <p className="text-slate-700 mb-2">Consider adding:</p>
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-sm font-medium">Agile</span>
            <span className="px-3 py-1 rounded-full bg-pink-100 text-pink-700 text-sm font-medium">Stakeholder Management</span>
            <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-700 text-sm font-medium">Budgeting</span>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h3 className="text-xl font-bold text-slate-900 mb-3">AI Suggestions</h3>
          <ul className="list-disc list-inside text-slate-700 space-y-2">
            <li>Use stronger action verbs like “Led” or “Implemented.”</li>
            <li>Tailor resume to each job description.</li>
            <li>Highlight measurable outcomes in every role.</li>
          </ul>
        </div>
      </div>

      {/* Job Description Matcher */}
      <div className="bg-white p-8 rounded-xl shadow-xl">
        <h3 className="text-2xl font-bold text-slate-900 mb-4">
          Job Description Matcher
        </h3>
        <textarea
          placeholder="Paste job description here..."
          className="w-full h-32 p-4 border border-gray-300 rounded-lg mb-4 focus:ring-2 focus:ring-indigo-400"
        ></textarea>
        <button className="px-6 py-3 rounded-lg font-semibold text-white bg-gradient-to-r from-pink-500 to-amber-400 shadow-md hover:scale-[1.02] transition">
          Match Resume
        </button>

        {/* Example output */}
        <div className="mt-6 p-6 rounded-lg bg-gray-50 border border-gray-200 shadow-sm">
          <p className="text-lg font-semibold text-slate-800 mb-2">
            Alignment Score: 72%
          </p>
          <p className="text-slate-700 mb-3">
            Your resume aligns well with the job description, but consider adding
            these missing keywords:
          </p>
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-sm font-medium">Scrum</span>
            <span className="px-3 py-1 rounded-full bg-pink-100 text-pink-700 text-sm font-medium">Cross-functional Teams</span>
          </div>
        </div>
      </div>
    </div>
  );
}
