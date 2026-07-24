
import React from "react";
import NavbarResumeIQFinal from "../../components/Navbar/Navbar";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <NavbarResumeIQFinal/>
      <div className="flex flex-1">
        {/* Left side welcome */}
        <aside className="w-1/3 p-12 flex flex-col mt-16">
          <h1 className="text-4xl font-extrabold text-slate-900 mb-4">
            Welcome back, Vedant!
          </h1>
          <p className="text-xl text-slate-700 mb-10">
            Ready to improve your resume today?
          </p>

          <h2 className="text-lg font-semibold text-slate-800 mb-3">
            Last 3 resumes analyzed
          </h2>
          <ul className="space-y-3">
            <li className="p-4 rounded-lg bg-white shadow-lg border border-gray-200 flex justify-between items-center">
              <div>
                <p className="font-medium text-slate-900">resume_july.pdf</p>
                <span className="text-sm text-slate-500">Score: 78 • Jul 20</span>
              </div>
              <button className="px-3 py-1 text-sm font-semibold text-white bg-gradient-to-r from-indigo-500 to-emerald-400 rounded-md shadow hover:scale-[1.02] transition">
                View Analysis
              </button>
            </li>
            <li className="p-4 rounded-lg bg-white shadow-lg border border-gray-200 flex justify-between items-center">
              <div>
                <p className="font-medium text-slate-900">resume_june.pdf</p>
                <span className="text-sm text-slate-500">Score: 82 • Jun 15</span>
              </div>
              <button className="px-3 py-1 text-sm font-semibold text-white bg-gradient-to-r from-indigo-500 to-emerald-400 rounded-md shadow hover:scale-[1.02] transition">
                View Analysis
              </button>
            </li>
            <li className="p-4 rounded-lg bg-white shadow-lg border border-gray-200 flex justify-between items-center">
              <div>
                <p className="font-medium text-slate-900">resume_may.pdf</p>
                <span className="text-sm text-slate-500">Score: 75 • May 28</span>
              </div>
              <button className="px-3 py-1 text-sm font-semibold text-white bg-gradient-to-r from-indigo-500 to-emerald-400 rounded-md shadow hover:scale-[1.02] transition">
                View Analysis
              </button>
            </li>
          </ul>
        </aside>

        {/* Center upload panel */}
        <main className="flex-1 flex items-start justify-center p-12">
          <div className="max-w-xl w-full mt-16"> {/* moved down with mt-16 */}
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
              <div className="flex gap-4">
                <button className="px-8 py-4 rounded-lg font-bold text-white bg-gradient-to-r from-indigo-500 to-emerald-400 shadow-md hover:scale-[1.02] transition">
                  Upload Resume
                </button>
                <button className="px-8 py-4 rounded-lg font-bold text-white bg-gradient-to-r from-pink-500 to-amber-400 shadow-md hover:scale-[1.02] transition">
                  Analyze Resume
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Bottom center AI Tip */}
      <footer className="p-10 flex justify-center">
        <div className="max-w-3xl w-full p-8 rounded-xl bg-gradient-to-r from-indigo-700 via-pink-600 to-emerald-600 text-white shadow-2xl text-center">
          <h3 className="text-2xl font-bold mb-4">AI Tip of the Day</h3>
          <p className="text-lg font-medium">
            Quantify your achievements — use numbers, percentages, or metrics to
            show the impact of your work. For example: “Increased sales by 25% in
            Q2.”
          </p>
        </div>
      </footer>
    </div>
  );
}
