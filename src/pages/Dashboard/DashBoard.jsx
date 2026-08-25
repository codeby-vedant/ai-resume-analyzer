import React, { useState, useEffect } from "react";
import NavbarResumeIQFinal from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import ReactMarkdown from "react-markdown";
import { API_URL } from "../../utils/api";

import { useNavigate } from "react-router-dom";
export default function Dashboard() {
  const [newResumeId, setNewResumeId] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [description, setDescription] = useState("");
  const [matchResult, setMatchResult] = useState(null);
  const [matchResumeFile, setMatchResumeFile] = useState(null);
  const [tip, setTip] = useState(null);
  const [loading, setLoading] = useState(false);
  const [matching, setMatching] = useState(false);

  const navigate = useNavigate();

  // Navigate to analysis page
  const handleAnalyze = async (resumeId) => {
    setLoading(true);
    try {
      const response = await fetch(
        `${API_URL}/api/analyze/${resumeId}/resume`,
        {
          method: "POST",
          credentials: "include",
        },
      );

      const data = await response.json();

      if (response.ok) {
        navigate(`/analysis/${resumeId}`);
      }
    } catch (err) {
      console.log(err + "Failed to fetch"); //debug
    }
  };
  //navigate to viewAnalysis page
  const viewAnalysis = (resumeId) => {
    navigate(`/viewAnalysis/${resumeId}`);
  };

  // job description matcher

  const handleMatchResumeUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setMatchResumeFile(file); // store the actual File object
      alert(`File "${file.name}" uploaded successfully!`);
    }
  };

  /// to generate tip of the day

  useEffect(() => {
    const fetchTip = async () => {
      const res = await fetch(`${API_URL}/api/today/tip`, {
        credentials: "include",
      });
      if (!res.ok) {
        throw new Error(`OpenAI API error: ${res.status}`);
      }
      const data = await res.json();
      setTip(data.tip);
    };
    fetchTip();
  }, []);

  const handleMatchResume = async () => {
    try {
      if (!matchResumeFile || !description) {
        alert("Please upload a resume and paste a job description.");
        return;
      }

      setMatching(true);
      setMatchResult(null);

      const formData = new FormData();
      formData.append("matcherResume", matchResumeFile);
      formData.append("description", description);

      const res = await fetch(`${API_URL}/api/compare/match`, {
        method: "POST",
        credentials: "include",
        body: formData,
      });

      if (!res.ok) {
        throw new Error(`Failed to match resume: ${res.status}`);
      }

      const data = await res.json();

      setMatchResult(data);
    } catch (err) {
      console.error("Error matching resume:", err);
      alert("Something went wrong while matching your resume.");
    } finally {
      setMatching(false);
    }
  };

  // to get the upload resume functional
  const [selectedFile, setSelectedFile] = useState(null);
  const handleUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    setSelectedFile(file.name); //  show filename
    setUploading(true);

    const formData = new FormData();
    formData.append("resume", file);

    try {
      const response = await fetch(`${API_URL}/api/upload/resume`, {
        method: "POST",
        credentials: "include", // send JWT cookie
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Upload failed: ${response.status}`);
      }

      const data = await response.json();

      if (data.resume?._id) {
        setNewResumeId(data.resume._id);
      }

      // Refresh resumes list immediately
      const refresh = await fetch(`${API_URL}/api/dashboard/resumes`, {
        credentials: "include",
      });
      const updated = await refresh.json();
      setResumes(updated.resumes || []);
      setUser(updated.user || null);
      let current = 0;
      const interval = setInterval(() => {
        current += 5; // increase by 5% every 250ms
        setProgress(current);
        if (current >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setUploading(false);
            setProgress(0); // reset for next upload
          }, 500); // small delay before hiding
        }
      }, 100);
    } catch (err) {
      console.error("Error uploading resume:", err);
    }
  };
  // to get resume History and user name
  const [resumes, setResumes] = useState([]);
  const [user, setUser] = useState(null);
  useEffect(() => {
    const fetchResumes = async () => {
      try {
        const response = await fetch(`${API_URL}/api/dashboard/resumes`, {
          method: "GET",
          credentials: "include", //  ensures cookies are sent
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setResumes(data.resumes || []);
        setUser(data.user || null);
      } catch (err) {
        console.error("Error fetching resumes:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchResumes();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-50 via-purple-100 to-purple-200 flex flex-col">
      {loading && (
        <div
          className="fixed inset-0 flex flex-col items-center justify-center 
                bg-gradient-to-r from-purple-100 via-purple-200 to-purple-300 
                bg-opacity-48 z-50"
        >
          <div className="w-64 bg-gray-200 rounded-full h-4 overflow-hidden">
            <div className="bg-gradient-to-r from-indigo-500 via-pink-500 to-emerald-500 h-4 animate-[progress_3s_linear_infinite]"></div>
          </div>
          <p className="mt-4 text-black font-semibold animate-pulse">
            🔍 Analyzing your resume... Please wait
          </p>
        </div>
      )}
      <NavbarResumeIQFinal />
      <div className="flex flex-1">
        {/* Left side welcome */}
        <aside className="w-1/3 p-12 flex flex-col mt-16">
          <h1 className="text-4xl font-extrabold text-slate-900 mb-4">
            Welcome back, {user ? user : "Guest"}!
          </h1>
          <p className="text-xl text-slate-700 mb-10">
            Ready to improve your resume today?
          </p>

          <h2 className="text-lg font-semibold text-slate-800 mb-3">
            Last few resumes analyzed:
          </h2>
          <ul className="space-y-3">
            {resumes.slice(-4).map((r, idx) => (
              <li
                key={idx}
                className="p-4 rounded-lg bg-white shadow-lg border border-gray-200 flex justify-between items-center"
              >
                <div>
                  <p className="font-medium text-slate-900">{r.filename}</p>
                  <span className="text-sm text-slate-500">
                    Score: {r.analysis.score} •{" "}
                    {new Date(r.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <button
                  onClick={() => viewAnalysis(r._id)}
                  className="px-3 py-1 text-sm font-semibold text-white bg-gradient-to-r from-indigo-500 to-emerald-400 rounded-md shadow hover:scale-[1.02] transition cursor-pointer"
                >
                  View Analysis
                </button>
              </li>
            ))}
          </ul>
        </aside>

        {/* Center upload panel */}
        <main className="flex-1 flex items-start justify-center p-12">
          <div className="max-w-xl w-full mt-16">
            {" "}
            {/* moved down with mt-16 */}
            <div className="border-2 border-dashed border-gray-300 rounded-xl bg-white p-20 flex flex-col items-center justify-center text-center shadow-xl">
              <svg
                className="w-20 h-20 text-gray-400 mb-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 4v16m8-8H4"
                />
              </svg>
              <p className="text-3xl font-semibold text-slate-700 mb-3">
                Upload your resume
              </p>
              <p className="text-md text-slate-500 mb-8">
                Drag & drop or click below to upload
              </p>
              {uploading && (
                <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                  <div
                    className="bg-indigo-500 h-2 rounded-full transition-all duration-200"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              )}

              <div className="flex gap-4">
                <label className="px-8 py-4 rounded-lg font-bold text-white bg-gradient-to-r from-indigo-500 to-emerald-400 shadow-md hover:scale-[1.02] transition cursor-pointer">
                  Upload Resume
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    hidden
                    onChange={handleUpload}
                    name="resume"
                  />
                </label>
                {selectedFile && (
                  <p className="mt-2 text-sm text-slate-600">
                    Selected: {selectedFile}
                  </p>
                )}
                <button
                  onClick={() => {
                    if (newResumeId) {
                      handleAnalyze(newResumeId); // analyze latest uploaded resume
                    } else {
                      alert("No resume uploaded yet!");
                    }
                  }}
                  disabled={!newResumeId}
                  className="px-8 py-4 rounded-lg font-bold text-white bg-gradient-to-r from-pink-500 to-amber-400 shadow-md hover:scale-[1.02] transition"
                >
                  Analyze Resume
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
      <footer className="p-10 flex flex-col items-center gap-8">
        {/* Job Matcher */}
        <div className=" w-full p-8 rounded-xl bg-white shadow-xl mx-auto">
          <h3 className="text-2xl font-bold text-slate-900 mb-4">
            Job Description Matcher
          </h3>
          <textarea
            value={description}
            placeholder="Paste job description here..."
            onChange={(e) => setDescription(e.target.value)}
            className="w-full h-32 p-4 border border-gray-300 rounded-lg mb-4 focus:ring-2 focus:ring-indigo-400"
          ></textarea>

          <div className="flex items-center gap-4 mb-4">
            <label className="px-6 py-3 rounded-lg font-semibold text-white bg-gradient-to-r from-indigo-500 to-emerald-400 shadow-md cursor-pointer">
              Upload Resume
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                hidden
                onChange={handleMatchResumeUpload}
              />
            </label>
            {matchResumeFile && (
              <p className="text-sm text-slate-600">
                Selected: {matchResumeFile.name}
              </p>
            )}
          </div>

          <button
            onClick={handleMatchResume}
            disabled={matching}
            className={`px-6 py-3 rounded-lg font-semibold text-white 
    bg-gradient-to-r from-pink-500 to-amber-400 
    shadow-md transition
    ${
      matching
        ? "opacity-70 cursor-not-allowed"
        : "hover:scale-[1.02] cursor-pointer"
    }`}
          >
            {matching ? (
              <span className="flex items-center gap-2">
                <svg
                  className="w-5 h-5 animate-spin"
                  viewBox="0 0 24 24"
                  fill="none"
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
                Analyzing Resume...
              </span>
            ) : (
              "Match Resume"
            )}
          </button>

          {matchResult && (
            <div className="mt-6 p-6 rounded-lg bg-gray-50 border border-gray-200 shadow-sm">
              <p className="text-lg font-semibold text-slate-800 mb-2">
                Alignment Score: {matchResult.response.alignmentScore}%
              </p>
              {/* Matched Skills */}
              <p className="text-slate-700 mb-3">Matched Skills:</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {matchResult.response.matchedSkills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
              {/* Missing Keywords */}
              <p className="text-slate-700 mb-3">Missing Keywords:</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {matchResult.response.missingKeywords.map((kw, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-full bg-red-100 text-red-700 text-sm font-medium"
                  >
                    {kw}
                  </span>
                ))}
              </div>
              {/* Missing Skills */}
              <p className="text-slate-700 mb-3">Missing Skills:</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {matchResult.response.missingSkills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 text-sm font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
              {/* Suggestions */}
              <p className="text-slate-700 mb-3 font-semibold">Suggestions:</p>
              <ul className="list-disc list-inside text-slate-700 space-y-2 mb-4">
                {matchResult.response.suggestions.map((s, idx) => (
                  <li key={idx}>{s}</li>
                ))}
              </ul>
              <p className="text-slate-700 italic">
                {matchResult.response.summary}
              </p>
            </div>
          )}
        </div>
      </footer>{" "}
      {/* ✅ Properly closed */}
      {/* Bottom center AI Tip */}
      <footer className="p-10 flex justify-center">
        <div className="max-w-3xl w-full p-8 rounded-xl bg-gradient-to-r from-indigo-700 via-pink-600 to-emerald-600 text-white shadow-2xl text-center">
          <h3 className="text-2xl font-bold mb-4">AI Tip of the Day</h3>
          <p className="text-lg font-medium">
            <ReactMarkdown>{tip}</ReactMarkdown>
          </p>
        </div>
      </footer>
      <Footer />
    </div>
  );
}
