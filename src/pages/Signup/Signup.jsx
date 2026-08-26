import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ResumeIQLogo from "../../components/Logo/Logo";
import { API_URL } from "../../utils/api";

export default function SignUp() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    terms: false,
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.fullName.trim()) {
      alert("Please enter your full name.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    if (formData.password.length < 6) {
      alert("Password must be at least 6 characters.");
      return;
    }

    if (!formData.terms) {
      alert("Please agree to the terms and conditions.");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(`${API_URL}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          name: formData.fullName,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Account created successfully!");
        navigate("/login");
      } else {
        alert(data.error || "Registration failed.");
      }
    } catch (err) {
      console.error("Registration error:", err);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-100 px-4 py-8 sm:px-6 sm:py-12">
      <div className="mx-auto w-full max-w-6xl">

        {/* Main container */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-14 items-center">

          {/* ================= LEFT SIDE ================= */}
          <div className="hidden md:flex flex-col justify-center px-4 lg:px-8">

            <ResumeIQLogo />

            <p className="text-base lg:text-lg text-gray-600 mt-3">
              AI Resume Analyzer
            </p>

            <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-800 mt-8 lg:mt-10 leading-tight">
              Get hired faster
              <span className="block text-indigo-600">
                with AI
              </span>
            </h1>

            <p className="text-gray-600 mt-5 max-w-md leading-relaxed">
              Analyze your resume, improve your ATS score, and get
              personalized suggestions to make your resume stand out.
            </p>

            {/* Benefits */}
            <ul className="space-y-5 mt-8 text-base lg:text-lg text-gray-700">

              <li className="flex items-center">
                <span className="flex-shrink-0 flex items-center justify-center h-9 w-9 rounded-full bg-indigo-100 text-indigo-600 mr-3">
                  ✓
                </span>
                Instant ATS scoring
              </li>

              <li className="flex items-center">
                <span className="flex-shrink-0 flex items-center justify-center h-9 w-9 rounded-full bg-pink-100 text-pink-600 mr-3">
                  ✓
                </span>
                Smart keyword suggestions
              </li>

              <li className="flex items-center">
                <span className="flex-shrink-0 flex items-center justify-center h-9 w-9 rounded-full bg-yellow-100 text-yellow-600 mr-3">
                  ✓
                </span>
                Tailored bullet rewrites
              </li>

              <li className="flex items-center">
                <span className="flex-shrink-0 flex items-center justify-center h-9 w-9 rounded-full bg-emerald-100 text-emerald-600 mr-3">
                  ✓
                </span>
                Faster interview readiness
              </li>

            </ul>
          </div>

          {/* ================= FORM ================= */}
          <div className="w-full">

            {/* Mobile logo */}
            <div className="flex md:hidden justify-center mb-6">
              <ResumeIQLogo />
            </div>

            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 sm:p-8 md:p-10">

              {/* Heading */}
              <div className="text-center md:text-left mb-7">

                <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
                  Create Your Account
                </h2>

                <p className="text-gray-500 mt-2 text-sm sm:text-base">
                  Join ResumeIQ and start improving your resume
                </p>

              </div>

              <form
                className="space-y-4 sm:space-y-5"
                onSubmit={handleSubmit}
              >

                {/* Full Name */}
                <div>
                  <label
                    htmlFor="fullName"
                    className="block text-sm font-medium text-gray-700 mb-1.5"
                  >
                    Full Name
                  </label>

                  <input
                    id="fullName"
                    type="text"
                    name="fullName"
                    placeholder="Enter your full name"
                    value={formData.fullName}
                    onChange={handleChange}
                    autoComplete="name"
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                  />
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1.5"
                  >
                    Email Address
                  </label>

                  <input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    autoComplete="email"
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                  />
                </div>

                {/* Password */}
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700 mb-1.5"
                  >
                    Password
                  </label>

                  <input
                    id="password"
                    type="password"
                    name="password"
                    placeholder="Create a password"
                    value={formData.password}
                    onChange={handleChange}
                    autoComplete="new-password"
                    required
                    minLength={6}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                  />
                </div>

                {/* Confirm Password */}
                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-medium text-gray-700 mb-1.5"
                  >
                    Confirm Password
                  </label>

                  <input
                    id="confirmPassword"
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    autoComplete="new-password"
                    required
                    minLength={6}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                  />
                </div>

                {/* Terms */}
                <div className="flex items-start gap-2 pt-1">

                  <input
                    type="checkbox"
                    name="terms"
                    id="terms"
                    checked={formData.terms}
                    onChange={handleChange}
                    required
                    className="mt-1 h-4 w-4 flex-shrink-0 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                  />

                  <label
                    htmlFor="terms"
                    className="text-sm text-gray-600 leading-5"
                  >
                    I agree to the{" "}
                    <span className="text-indigo-600 font-medium">
                      terms and conditions
                    </span>
                  </label>

                </div>

                {/* Create Account */}
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full py-3.5 rounded-lg text-white font-semibold shadow-md transition ${
                    loading
                      ? "opacity-70 cursor-not-allowed"
                      : "hover:-translate-y-0.5 hover:shadow-lg"
                  } bg-gradient-to-r from-indigo-500 to-emerald-400`}
                >
                  {loading ? "Creating Account..." : "Create Account"}
                </button>

                {/* Divider */}
                <div className="flex items-center gap-3 py-1">

                  <div className="h-px bg-gray-200 flex-1"></div>

                  <span className="text-xs text-gray-400">
                    OR
                  </span>

                  <div className="h-px bg-gray-200 flex-1"></div>

                </div>

                {/* Google */}
                <button
                  type="button"
                  onClick={() => {
                    window.location.href = `${API_URL}/api/google`;
                  }}
                  className="w-full flex items-center justify-center py-3 rounded-lg border border-gray-300 text-gray-700 font-medium shadow-sm hover:bg-gray-50 transition"
                >

                  <svg
                    className="h-5 w-5 mr-2 flex-shrink-0"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="#EA4335"
                      d="M12 11.8v2.4h6.8c-.3 1.7-2 5-6.8 5-4.1 0-7.5-3.4-7.5-7.5s3.4-7.5 7.5-7.5c2.3 0 3.9.9 4.8 1.7l1.6-1.6C17.1 3.9 14.8 3 12 3 6.5 3 2 7.5 2 13s4.5 10 10 10c5.8 0 9.7-4.1 9.7-9.9 0-.7-.1-1.2-.2-1.7H12z"
                    />
                  </svg>

                  Continue with Google

                </button>

              </form>

              {/* Login */}
              <p className="mt-7 text-center text-sm text-gray-600">

                Already have an account?{" "}

                <button
                  type="button"
                  onClick={() => navigate("/login")}
                  className="text-indigo-600 font-semibold hover:underline"
                >
                  Log in
                </button>

              </p>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}