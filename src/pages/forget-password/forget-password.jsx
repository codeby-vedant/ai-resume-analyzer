import { useState } from "react";
import ResumeIQLogo from "../../components/Logo/Logo";

export default function ForgetPassword() {
  const [email, setEmail] = useState("");
const [status, setStatus] = useState(null);
const [message, setMessage] = useState(null);
  const handleSubmit = async(e) => {
    e.preventDefault();
    
     try {
      const response = await fetch("/api/reset/resetpassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setStatus("success");
        setMessage(response.json.msg);
      } else {
        setStatus("error");
      }
    } catch (err) {
      console.error("Error sending reset link:", err);
      setStatus("error");
      setMessage(response.json.error);
    }
  };

  return (
    <>
    
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-50 via-purple-100 to-emerald-50">
       
      <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-md">
        

        <div className="text-center mb-6">
          <h2 className="mt-4 text-2xl font-bold text-gray-800">
            Forgot Password
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            Enter your email to receive a reset link
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email Address
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 shadow-sm focus:ring-2 focus:ring-indigo-400 focus:outline-none"
              placeholder="you@example.com"
            />
          </div>

          <button
            type="submit"
            className="w-full inline-flex items-center justify-center px-6 py-3 rounded-lg font-semibold text-white shadow-lg transform transition hover:-translate-y-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-300 bg-gradient-to-r from-indigo-500 to-emerald-400"
          >
            Send Reset Link
          </button>
          {status === "success" && (
          <p className="mt-4 text-green-600 text-center">
            ✅ Reset link sent! Check your email.
          </p>
        )}
        {status === "error" && (
          <p className="mt-4 text-red-600 text-center">
            {message}||❌ Something went wrong. Try again.
          </p>
        )}
        </form>

        {/* Back to login */}
        <p className="mt-6 text-center text-sm text-gray-500">
          Remember your password?{" "}
          <a
            href="/login"
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            Log in
          </a>
        </p>
      </div>
    </div>
    </>
  );
}
