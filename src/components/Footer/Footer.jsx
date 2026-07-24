// src/components/Footer.jsx
import React from "react";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-gray-300">
      <div className="container mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Column 1: Logo + About */}
        <div>
          <h2 className="text-2xl font-bold mb-4 text-white">ResumeIQ</h2>
          <p className="text-sm leading-relaxed">
            AI-powered resume analyzer that helps you optimize your CV for ATS
            systems, highlight strengths, and land interviews faster.
          </p>
        </div>

        {/* Column 2: Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-white">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#features" className="hover:text-indigo-400">Features</a></li>
            <li><a href="#demo" className="hover:text-indigo-400">Demo</a></li>
            <li><a href="#profile" className="hover:text-indigo-400">Profile</a></li>
            <li><a href="#history" className="hover:text-indigo-400">History</a></li>
          </ul>
        </div>

        {/* Column 3: Contact */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-white">Contact</h3>
          <ul className="space-y-2 text-sm">
            <li>Email: <a href="mailto:support@resumeiq.com" className="hover:text-indigo-400">support@resumeiq.com</a></li>
            <li>Phone: <span className="hover:text-indigo-400">+91 98765 43210</span></li>
            <li>Location: Gola, Uttar Pradesh, India</li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-700 mt-8 py-6 text-center text-sm">
        <p>© {new Date().getFullYear()} ResumeIQ. All rights reserved.</p>
        <div className="flex justify-center gap-6 mt-3">
          <a href="#privacy" className="hover:text-indigo-400">Privacy Policy</a>
          <a href="#terms" className="hover:text-indigo-400">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}
