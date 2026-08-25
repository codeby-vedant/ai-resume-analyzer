import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ResumeIQLogo from "../../components/Logo/Logo";
import Footer from "../../components/Footer/Footer";

export default function SignUp() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    terms: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  
    const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", //  allows cookies to be sent/received
        body: JSON.stringify({
          name: formData.fullName,
          email: formData.email,
          password: formData.password,
        }),
      });

      if (res.ok) {
        alert("Account created successfully!");
        navigate("/login");
      } else {
        const error = await res.json();
        alert(error.error);
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-50 via-purple-100 to-purple-200">
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 p-10">
        {/* Left side branding */}
        <div className="flex flex-col justify-center px-6">
          <ResumeIQLogo />

          {/* Subtext below logo */}
          <p className="text-lg text-gray-600 mt-2">AI Resume Analyzer</p>

          {/* Bigger tagline */}
          <p className="text-4xl font-extrabold text-gray-800 mt-10 mb-8 leading-snug">
            Get hired faster with AI
          </p>

          {/* Benefits with icons */}
          <ul className="space-y-6 text-lg text-gray-700">
            <li className="flex items-center">
              <svg
                className="h-6 w-6 text-indigo-500 mr-3"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M2 10a8 8 0 1116 0A8 8 0 012 10zm9-3H9v4h2V7z" />
              </svg>
              Instant ATS scoring
            </li>
            <li className="flex items-center">
              <svg
                className="h-6 w-6 text-pink-500 mr-3"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M4 3h12v2H4V3zm0 4h12v2H4V7zm0 4h8v2H4v-2z" />
              </svg>
              Smart keyword suggestions
            </li>
            <li className="flex items-center">
              <svg
                className="h-6 w-6 text-yellow-500 mr-3"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M3 4h14v2H3V4zm0 4h14v2H3V8zm0 4h14v2H3v-2z" />
              </svg>
              Tailored bullet rewrites
            </li>
            <li className="flex items-center">
              <svg
                className="h-6 w-6 text-emerald-500 mr-3"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm1 11H9V9h2v4z" />
              </svg>
              Faster interview readiness
            </li>
          </ul>
        </div>

        {/* Right side form card */}
        <div className="bg-white rounded-2xl shadow-2xl p-12 flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-3">
            Create Your Account
          </h2>
          <p className="text-gray-600 mb-10 text-lg">
            Join ResumeIQ and start improving your resume
          </p>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />

            <div className="flex items-center">
              <input
                type="checkbox"
                name="terms"
                id="terms"
                checked={formData.terms}
                onChange={handleChange}
                className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
              />
              <label htmlFor="terms" className="ml-2 text-gray-600">
                I agree to the terms and conditions
              </label>
            </div>

            {/* Gradient button style */}
            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-emerald-400 text-white font-semibold shadow-md hover:-translate-y-0.5 transition transform focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-300 w-full justify-center"
            >
              Create Account
            </button>

            {/* Continue with Google */}
            <button
              type="button"
              onClick={() => {
                window.location.href = "/api/google";
              }}
              className="inline-flex items-center px-4 py-2 rounded-lg border border-gray-300 text-gray-700 font-medium shadow-sm hover:bg-gray-50 transition w-full justify-center"
            >
              <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
                <path
                  fill="#EA4335"
                  d="M12 11.8v2.4h6.8c-.3 1.7-2 5-6.8 5-4.1 0-7.5-3.4-7.5-7.5s3.4-7.5 7.5-7.5c2.3 0 3.9.9 4.8 1.7l1.6-1.6C17.1 3.9 14.8 3 12 3 6.5 3 2 7.5 2 13s4.5 10 10 10c5.8 0 9.7-4.1 9.7-9.9 0-.7-.1-1.2-.2-1.7H12z"
                />
              </svg>
              Continue with Google
            </button>
          </form>

          <p className="mt-10 text-center text-gray-600 text-lg">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-indigo-600 font-semibold hover:underline"
            >
              Log in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
