import NavbarResumeIQFinal from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import React,{useState,useEffect} from "react";
import { useNavigate } from "react-router-dom";
import {API_URL} from "../../utils/api"
export default function HistoryPage() {
  const [resumes, setResumes] = useState([]);
  const navigate = useNavigate();
  const viewAnalysis = (resumeId) => {
    navigate(`/viewAnalysis/${resumeId}`);
  };

  useEffect(() => {
    const fetchResumes = async () => {
      try {
        const res = await fetch(`${API_URL}/api/dashboard/resumes`, { credentials: "include" });
        if (res.ok) {
          const data = await res.json();
          setResumes(data.resumes||[]);
        }
      } catch (err) {
        console.error("Failed to fetch resumes", err);
      }
    };
    fetchResumes();
  }, []);

  return (
    <>
    <div className="min-h-screen bg-gray-100 p-10">
      {/* Header */}
      <NavbarResumeIQFinal />
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
            key={resume._id}
            className="bg-white p-6 rounded-xl shadow-lg flex justify-between items-center"
          >
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                {resume.originalName}
              </h2>
              <p className="text-sm text-slate-600">
                Score: {resume.analysis.score} • {" "}
                {new Date(resume.createdAt).toLocaleDateString()}
              </p>
            </div>
            <button 
            onClick={() => viewAnalysis(resume._id)}
            className="px-4 py-2 rounded-md font-semibold text-white bg-gradient-to-r from-indigo-500 to-emerald-400 shadow-md hover:scale-[1.02] transition">
              View Analysis
            </button>
          </div>
        ))}
      </div>
     
    </div>
    < Footer/>
    </>
  );
}
