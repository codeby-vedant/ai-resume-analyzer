import { useState } from "react";
import { useParams,useNavigate } from "react-router-dom";

export default function ResetPassword() {
  const { resetToken } = useParams(); // get token from URL
  const [newPassword, setNewPassword] = useState("");
  const [status, setStatus] = useState(null);
  const navigate=useNavigate();
  const handleSubmit = async (e) => {
    console.log(resetToken);
    
    e.preventDefault();
    try {
      const response = await fetch(`/api/reset/resetPassword/${resetToken}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ newPassword }),
      });

      if (response.ok) {
        setStatus("success");
        setTimeout(() => navigate("/login"), 2000);
      } else {
        setStatus("error");
      }
    } catch (err) {
      console.error("Error resetting password:", err);
      setStatus("error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-50 via-purple-100 to-emerald-50">
      <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
          Reset Password
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="newPassword"
              className="block text-sm font-medium text-gray-700"
            >
              New Password
            </label>
            <input
              id="newPassword"
              type="password"
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 shadow-sm focus:ring-2 focus:ring-indigo-400 focus:outline-none"
              placeholder="Enter new password"
            />
          </div>

          <button
            type="submit"
            className="w-full inline-flex items-center justify-center px-6 py-3 rounded-lg font-semibold text-white shadow-lg transform transition hover:-translate-y-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-300 bg-gradient-to-r from-indigo-500 to-emerald-400"
          >
            Reset Password
          </button>
        </form>

        {status === "success" && (
          <p className="mt-4 text-green-600 text-center">
            ✅ Password reset successful! You can now log in.
          </p>
        )}
        {status === "error" && (
          <p className="mt-4 text-red-600 text-center">
            ❌ Something went wrong. Try again.
          </p>
        )}
      </div>
    </div>
  );
}
