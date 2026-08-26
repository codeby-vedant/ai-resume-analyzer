import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import NavbarResumeIQFinal from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { API_URL } from "../../utils/api";

export default function ProfilePage() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
    phoneNo: "",
    location: "",
    role: "",
    profilePhoto: {
      url: "",
      public_id: "",
    },
    createdAt: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);

  // =========================
  // Fetch logged-in user
  // =========================

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`${API_URL}/api/info/me`, {
          method: "GET",
          credentials: "include",
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(
            data.error || data.msg || "Failed to fetch user"
          );
        }

        setUser(data);
      } catch (err) {
        console.error("Failed to fetch user:", err);
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [navigate]);

  // =========================
  // Handle input changes
  // =========================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =========================
  // Upload profile photo
  // =========================

  const handlePhotoChange = async (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    // Optional frontend validation
    if (!file.type.startsWith("image/")) {
      alert("Please select an image file.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("Image must be smaller than 5MB.");
      return;
    }

    const formData = new FormData();

    formData.append("profilePic", file);

    try {
      setUploadingPhoto(true);

      const res = await fetch(
        `${API_URL}/api/profile/photo/update`,
        {
          method: "PATCH",
          credentials: "include",
          body: formData,
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data.error || data.msg || "Failed to update photo"
        );
      }

      setUser((prev) => ({
        ...prev,
        profilePhoto: data.profilePhoto,
      }));

      alert("Profile photo updated!");
    } catch (err) {
      console.error("Photo upload failed:", err);
      alert(err.message || "Error uploading photo");
    } finally {
      setUploadingPhoto(false);

      // Allows selecting the same image again
      e.target.value = "";
    }
  };

  // =========================
  // Save profile
  // =========================

  const handleSave = async () => {
    try {
      setSaving(true);

      const res = await fetch(`${API_URL}/api/profile/update`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          name: user.name,
          location: user.location,
          role: user.role,
          phoneNo: user.phoneNo,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data.error || data.msg || "Failed to save profile"
        );
      }

      setUser((prev) => ({
        ...prev,
        ...data,
      }));

      alert("Profile saved successfully!");
    } catch (err) {
      console.error("Save failed:", err);
      alert(err.message || "Error saving profile");
    } finally {
      setSaving(false);
    }
  };

  // =========================
  // Logout
  // =========================

  const handleLogout = async () => {
    try {
      const res = await fetch(`${API_URL}/api/logout`, {
        method: "POST",
        credentials: "include",
      });

      if (!res.ok) {
        throw new Error("Logout failed");
      }

      navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err);
      alert("Unable to logout. Please try again.");
    }
  };

  // =========================
  // Loading state
  // =========================

  if (loading) {
    return (
      <>
        <div className="min-h-screen bg-gray-100">
          <NavbarResumeIQFinal />

          <div className="flex items-center justify-center pt-40">
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
                Loading profile...
              </p>
            </div>
          </div>
        </div>

        <Footer />
      </>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-indigo-50 to-emerald-50 p-6 md:p-10">

        <NavbarResumeIQFinal />

        <div className="max-w-2xl w-full mx-auto bg-white rounded-2xl shadow-2xl p-6 md:p-10 mt-12 border border-gray-200">

          {/* =========================
              Profile Photo
          ========================= */}

          <div className="flex flex-col items-center mb-8">

            <img
              src={
                user.profilePhoto?.url ||
                "https://via.placeholder.com/120"
              }
              alt="Profile"
              className="w-32 h-32 rounded-full shadow-md mb-4 object-cover ring-4 ring-indigo-100 hover:scale-105 transition"
            />

            <label className="cursor-pointer text-sm font-semibold text-indigo-600 hover:underline">

              {uploadingPhoto
                ? "Uploading..."
                : "Change Photo"}

              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                disabled={uploadingPhoto}
                className="hidden"
              />
            </label>
          </div>

          {/* =========================
              Profile Details
          ========================= */}

          <div className="space-y-6">

            {/* Name */}
            <div className="bg-gray-50 p-6 rounded-lg shadow-md">
              <h2 className="text-sm font-semibold text-slate-500">
                Name
              </h2>

              <input
                type="text"
                name="name"
                value={user.name || ""}
                onChange={handleChange}
                className="w-full mt-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Email */}
            <div className="bg-gray-50 p-6 rounded-lg shadow-md">
              <h2 className="text-sm font-semibold text-slate-500">
                Email
              </h2>

              <input
                type="email"
                value={user.email || ""}
                disabled
                className="w-full mt-2 p-2 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed"
              />
            </div>

            {/* Phone */}
            <div className="bg-gray-50 p-6 rounded-lg shadow-md">
              <h2 className="text-sm font-semibold text-slate-500">
                Phone
              </h2>

              <input
                type="text"
                name="phoneNo"
                value={user.phoneNo || ""}
                onChange={handleChange}
                className="w-full mt-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Location */}
            <div className="bg-gray-50 p-6 rounded-lg shadow-md">
              <h2 className="text-sm font-semibold text-slate-500">
                Location
              </h2>

              <input
                type="text"
                name="location"
                value={user.location || ""}
                onChange={handleChange}
                className="w-full mt-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Role */}
            <div className="bg-gray-50 p-6 rounded-lg shadow-md">
              <h2 className="text-sm font-semibold text-slate-500">
                Role
              </h2>

              <input
                type="text"
                name="role"
                value={user.role || ""}
                onChange={handleChange}
                className="w-full mt-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Joined */}
            <div className="bg-gray-50 p-6 rounded-lg shadow-md">
              <h2 className="text-sm font-semibold text-slate-500">
                Joined
              </h2>

              <input
                type="text"
                disabled
                value={
                  user.createdAt
                    ? new Date(
                        user.createdAt
                      ).toLocaleDateString()
                    : ""
                }
                className="w-full mt-2 p-2 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed"
              />
            </div>
          </div>

          {/* =========================
              Buttons
          ========================= */}

          <div className="mt-10 flex flex-col items-center gap-4">

            <button
              onClick={handleSave}
              disabled={saving}
              className="px-8 py-3 rounded-lg font-bold text-white bg-gradient-to-r from-indigo-500 to-emerald-400 shadow-lg hover:scale-[1.02] transition cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {saving ? "Saving..." : "Save Profile"}
            </button>

            <button
              onClick={handleLogout}
              className="px-8 py-3 rounded-lg font-bold text-white bg-gradient-to-r from-pink-500 to-amber-400 shadow-lg hover:scale-[1.02] transition cursor-pointer"
            >
              Log Out
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}