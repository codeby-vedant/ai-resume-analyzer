import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import NavbarResumeIQFinal from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { API_URL } from "../../utils/api";

export default function HistoryPage() {
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const viewAnalysis = (resumeId) => {
    navigate(`/viewAnalysis/${resumeId}`);
  };

  useEffect(() => {
    const fetchResumes = async () => {
      try {
        const res = await fetch(
          `${API_URL}/api/dashboard/resumes`,
          {
            method: "GET",
            credentials: "include",
          }
        );

        const data = await res.json();

        if (!res.ok) {
          throw new Error(
            data.message || data.error || "Failed to fetch resume history"
          );
        }

        setResumes(data.resumes || []);
      } catch (err) {
        console.error("Failed to fetch resumes:", err);
        setError(err.message || "Something went wrong.");
      } finally {
        setLoading(false);
      }
    };

    fetchResumes();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">

      <NavbarResumeIQFinal />

      <main className="flex-1 p-10">

        {/* Header */}
        <div className="mb-8 mt-5">
          <h1 className="text-3xl font-extrabold text-slate-900">
            Resume History
          </h1>

          <p className="text-slate-600 mt-2">
            Your previously analyzed resumes with scores and dates
          </p>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <div className="flex flex-col items-center">

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

              <p className="text-slate-600">
                Loading your resume history...
              </p>

            </div>
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <h2 className="text-xl font-bold text-red-600 mb-2">
              Unable to load resume history
            </h2>

            <p className="text-slate-600">
              {error}
            </p>
          </div>
        )}

        {/* Empty state */}
        {!loading && !error && resumes.length === 0 && (
          <div className="bg-white rounded-xl shadow-lg p-10 text-center">
            <h2 className="text-xl font-bold text-slate-800 mb-2">
              No resumes yet
            </h2>

            <p className="text-slate-600 mb-5">
              Upload and analyze your first resume to see it here.
            </p>

            <button
              onClick={() => navigate("/dashboard")}
              className="px-5 py-2 rounded-lg font-semibold text-white
                bg-gradient-to-r from-indigo-500 to-emerald-400
                shadow-md hover:scale-[1.02] transition cursor-pointer"
            >
              Analyze Resume
            </button>
          </div>
        )}

        {/* Resume Cards */}
        {!loading && !error && resumes.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {resumes.map((resume) => (
              <div
                key={resume._id}
                className="bg-white p-6 rounded-xl shadow-lg
                  flex justify-between items-center gap-4"
              >

                <div className="min-w-0">

                  <h2 className="text-lg font-bold text-slate-900 truncate">
                    {resume.originalName || "Untitled Resume"}
                  </h2>

                  <p className="text-sm text-slate-600 mt-1">
                    Score:{" "}
                    <span className="font-semibold">
                      {resume.analysis?.score ?? "N/A"}
                    </span>

                    {" • "}

                    {resume.createdAt
                      ? new Date(resume.createdAt).toLocaleDateString()
                      : "Unknown date"}
                  </p>

                </div>

                <button
                  onClick={() => viewAnalysis(resume._id)}
                  disabled={!resume.analysis}
                  className={`px-4 py-2 rounded-md font-semibold text-white
                    bg-gradient-to-r from-indigo-500 to-emerald-400
                    shadow-md transition
                    ${
                      resume.analysis
                        ? "hover:scale-[1.02] cursor-pointer"
                        : "opacity-50 cursor-not-allowed"
                    }`}
                >
                  View Analysis
                </button>

              </div>
            ))}

          </div>
        )}

      </main>

      <Footer />

    </div>
  );
}