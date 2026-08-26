import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-gray-300">
      <div className="container mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">

        <div>
          <h2 className="text-2xl font-bold mb-4 text-white">
            ResumeIQ
          </h2>

          <p className="text-sm leading-relaxed">
            AI-powered resume analyzer that helps you optimize your CV
            for ATS systems, highlight strengths, and land interviews
            faster.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4 text-white">
            Quick Links
          </h3>

          <ul className="space-y-2 text-sm">
            <li>
              <Link
                to="/"
                className="hover:text-indigo-400"
              >
                Home
              </Link>
            </li>

            <li>
              <Link
                to="/dashboard"
                className="hover:text-indigo-400"
              >
                Dashboard
              </Link>
            </li>

            <li>
              <Link
                to="/profile"
                className="hover:text-indigo-400"
              >
                Profile
              </Link>
            </li>

            <li>
              <Link
                to="/history"
                className="hover:text-indigo-400"
              >
                History
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4 text-white">
            Contact
          </h3>

          <ul className="space-y-2 text-sm">
            <li>
              Email:{" "}
              <a
                href="mailto:support@resumeiq.com"
                className="hover:text-indigo-400"
              >
                support@resumeiq.com
              </a>
            </li>

            <li>
              Phone:{" "}
              <span className="hover:text-indigo-400">
                +91 9450257206
              </span>
            </li>

            <li>
              Location: Ghaziabad, Uttar Pradesh, India
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-8 py-6 text-center text-sm">
        <p>
          © {new Date().getFullYear()} ResumeIQ. All rights reserved.
        </p>

        <div className="flex justify-center gap-6 mt-3">
          <Link
            to="/privacy"
            className="hover:text-indigo-400"
          >
            Privacy Policy
          </Link>

          <Link
            to="/terms"
            className="hover:text-indigo-400"
          >
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  );
}