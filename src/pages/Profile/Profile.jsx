// src/components/ProfilePage.jsx
import React, { useState, useEffect } from "react";
import NavbarResumeIQFinal from "../../components/Navbar/Navbar";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
export default function ProfilePage() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    email: "",
    phoneNo: "",
    location: "",
    Role: "",
    joined: "",
    photo: "",
  });

  const handlePhotoChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("profilePic", file);

    try {
      const res = await fetch("/api/profile/photo/update", {
        method: "PATCH",
        credentials: "include",
        body: formData, // send file as multipart/form-data
      });

      if (res.ok) {
        const data = await res.json();
        setUser((prev) => ({
          ...prev,
          photo: data.profilePhoto.url, // backend returns updated photo
        }));
        alert("Profile photo updated!");
      } else {
        alert("Failed to update photo");
      }
    } catch (err) {
      console.error("Photo upload failed:", err);
      alert("Error uploading photo");
    }
  };

  const handleSave = async () => {
    try {
      const res = await fetch("/api/profile/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // keep session cookies
        body: JSON.stringify({
          name: user.name,
          location: user.location,
          Role: user.Role,
          phoneNo: user.phoneNo,
        }),
      });

      if (res.ok) {
        const updated = await res.json();
        setUser((prev) => ({
          ...prev,
          ...updated, // backend response should include updated fields
        }));
        alert("Profile saved successfully!");
      } else {
        alert("Failed to save profile");
      }
    } catch (err) {
      console.error("Save failed:", err);
      alert("Error saving profile");
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/info/me", {
          method: "GET",
          credentials: "include",
        });
        if (res.ok) {
          const data = await res.json();
          setUser(data); // backend already excludes password
        } else {
          setUser(null);
        }
      } catch (err) {
        console.error("Failed to fetch user", err);
        setUser(null);
      }
    };

    fetchUser();
  }, []);
  const handleLogout = async () => {
    try {
      const res = await fetch("/api/logout", {
        method: "POST",
        credentials: "include",
      });
      if (res.ok) {
        navigate("/login");
      }
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <>
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-indigo-50 to-emerald-50 p-10 flex justify-center">
      <NavbarResumeIQFinal />
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-2xl p-10 mt-12 border border-gray-200 hover:shadow-3xl transition">
        {/* Profile Photo */}
        <div className="flex flex-col items-center mb-8">
          <img
            src={user.profilePhoto?.url || "https://via.placeholder.com/120"}
            alt="Profile"
            className="w-32 h-32 rounded-full shadow-md mb-4 object-cover ring-4 ring-indigo-100 hover:scale-105 transition"
          />
          <label className="cursor-pointer text-sm font-semibold text-indigo-600 hover:underline">
            Change Photo
            <input
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
              className="hidden"
            />
          </label>
        </div>

        {/* Editable Profile Details */}
        <div className="space-y-6">
          <div className="bg-gray-50 p-6 rounded-lg shadow-md">
            <h2 className="text-sm font-semibold text-slate-500">Name</h2>
            <input
              onChange={(e) =>
                setUser((prev) => ({
                  ...prev,
                  name: e.target.value,
                }))
              }
              type="text"
              value={user.name}
              className="w-full mt-2 p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="bg-gray-50 p-6 rounded-lg shadow-md">
            <h2 className="text-sm font-semibold text-slate-500">Email</h2>
            <input
              type="email"
              disabled
              value={user.email}
              className="w-full mt-2 p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="bg-gray-50 p-6 rounded-lg shadow-md">
            <h2 className="text-sm font-semibold text-slate-500">Phone</h2>
            <input
              type="text"
              onChange={(e) =>
                setUser((prev) => ({ ...prev, phoneNo: e.target.value }))
              }
              value={user.phoneNo}
              className="w-full mt-2 p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="bg-gray-50 p-6 rounded-lg shadow-md">
            <h2 className="text-sm font-semibold text-slate-500">Location</h2>
            <input
              type="text"
              onChange={(e) =>
                setUser((prev) => ({ ...prev, location: e.target.value }))
              }
              value={user.location}
              className="w-full mt-2 p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="bg-gray-50 p-6 rounded-lg shadow-md">
            <h2 className="text-sm font-semibold text-slate-500">Role</h2>
            <input
              type="text"
              onChange={(e) =>
                setUser((prev) => ({ ...prev, Role: e.target.value }))
              }
              value={user.Role}
              className="w-full mt-2 p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="bg-gray-50 p-6 rounded-lg shadow-md">
            <h2 className="text-sm font-semibold text-slate-500">Joined</h2>
            <input
              type="text"
              disabled
              value={
                user.createdAt
                  ? new Date(user.createdAt).toLocaleDateString()
                  : ""
              }
              className="w-full mt-2 p-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>

        {/* Save + Logout */}
        <div className="mt-10 flex flex-col items-center gap-4">
          <button
            onClick={handleSave}
            className="px-8 py-3 rounded-lg font-bold text-white bg-gradient-to-r from-indigo-500 to-emerald-400 shadow-lg hover:scale-[1.02] transition cursor-pointer"
          >
            Save Profile
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
    <Footer/>
    </>
  );
}
