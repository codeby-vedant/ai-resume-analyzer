import React, { useState } from "react";
import ResumeIQLogo from "../../components/Logo/Logo";
import Footer from "../../components/Footer/Footer";
import Alert from "../../components/ErrorHandler/Alert";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("error");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        console.log(data); //debug
        setMessage(data.msg||data.error || "Login failed");
        setMessageType("error");
        return;
      }

      console.log("Login successful:", data); //debug

      // Redirect to dashboard
      setMessage("Login successful! Redirecting...");
      setMessageType("success");
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 3000);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-50 via-purple-100 to-purple-200">
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 p-10">
        {/* Left side branding */}
        <div className="flex flex-col justify-center px-6">
          <ResumeIQLogo />
          <p className="text-lg text-gray-600 mt-2">AI Resume Analyzer</p>

          <p className="text-4xl font-extrabold text-gray-800 mt-10 mb-8 leading-snug">
            Welcome back to ResumeIQ
          </p>

          <ul className="space-y-6 text-lg text-gray-700">
            <li className="flex items-center">
              <svg
                className="h-6 w-6 text-indigo-500 mr-3"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M2 10a8 8 0 1116 0A8 8 0 012 10zm9-3H9v4h2V7z" />
              </svg>
              Access your ATS scores
            </li>
            <li className="flex items-center">
              <svg
                className="h-6 w-6 text-pink-500 mr-3"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M4 3h12v2H4V3zm0 4h12v2H4V7zm0 4h8v2H4v-2z" />
              </svg>
              Review keyword suggestions
            </li>
            <li className="flex items-center">
              <svg
                className="h-6 w-6 text-yellow-500 mr-3"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M3 4h14v2H3V4zm0 4h14v2H3V8zm0 4h14v2H3v-2z" />
              </svg>
              Improve bullet rewrites
            </li>
            <li className="flex items-center">
              <svg
                className="h-6 w-6 text-emerald-500 mr-3"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm1 11H9V9h2v4z" />
              </svg>
              Continue building interview readiness
            </li>
          </ul>
        </div>

        {/* Right side form card */}
        <div className="bg-white rounded-2xl shadow-2xl p-12 flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-3">
            Log In to Your Account
          </h2>
          <p className="text-gray-600 mb-10 text-lg">
            Access your personalized resume insights
          </p>
          {message && <Alert message={message} type={messageType} />}
          <form onSubmit={handleLogin} className="space-y-7">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />

            {/* Forgot password link */}
            <div className="flex justify-end">
              <a
                href="/forgetPassword"
                className="text-sm text-indigo-600 hover:underline"
              >
                Forgot Password?
              </a>
            </div>

            {/* Gradient login button */}
            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-emerald-400 text-white font-semibold shadow-md hover:-translate-y-0.5 transition transform focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-300 w-full justify-center cursor-pointer"
            >
              Log In
            </button>

            {/* Continue with Google */}
            <button
              type="button"
              onClick={() => {
                window.location.href = "/api/google";
              }}
              className="inline-flex items-center px-4 py-2 rounded-lg border border-gray-300 text-gray-700 font-medium shadow-sm hover:bg-gray-50 transition w-full justify-center cursor-pointer"
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
            Don’t have an account?{" "}
            <a
              href="/signup"
              className="text-indigo-600 font-semibold hover:underline"
            >
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
