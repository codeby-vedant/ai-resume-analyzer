// src/components/ProfilePage.jsx
import React, { useState } from "react";
import NavbarResumeIQFinal from "../../components/Navbar/Navbar";
export default function ProfilePage() {
  const [name, setName] = useState("Vedant");
  const [email, setEmail] = useState("vedant@example.com");
  const [phone, setPhone] = useState("+91 98765 43210");
  const [location, setLocation] = useState("Gola, Uttar Pradesh, India");
  const [role, setRole] = useState("ResumeIQ User");
  const [joined, setJoined] = useState("July 2026");
  const [photo, setPhoto] = useState("https://via.placeholder.com/120");

  const handlePhotoChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const fileURL = URL.createObjectURL(e.target.files[0]);
      setPhoto(fileURL);
    }
  };

  const handleSave = () => {
    alert("Profile saved successfully!");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-10 flex justify-center">
        <NavbarResumeIQFinal/>
      <div className="max-w-2xl w-full bg-white rounded-xl shadow-xl p-10 mt-12">
        {/* Profile Photo */}
        <div className="flex flex-col items-center mb-8">
          <img
            src={photo}
            alt="Profile"
            className="w-32 h-32 rounded-full shadow-md mb-4 object-cover"
          />
          <label className="cursor-pointer text-sm font-semibold text-indigo-600 hover:underline">
            Change Photo
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handlePhotoChange}
            />
          </label>
        </div>

        {/* Editable Profile Details */}
        <div className="space-y-6">
          <div className="bg-gray-50 p-6 rounded-lg shadow-md">
            <h2 className="text-sm font-semibold text-slate-500">Name</h2>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full mt-2 p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="bg-gray-50 p-6 rounded-lg shadow-md">
            <h2 className="text-sm font-semibold text-slate-500">Email</h2>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mt-2 p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="bg-gray-50 p-6 rounded-lg shadow-md">
            <h2 className="text-sm font-semibold text-slate-500">Phone</h2>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full mt-2 p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="bg-gray-50 p-6 rounded-lg shadow-md">
            <h2 className="text-sm font-semibold text-slate-500">Location</h2>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full mt-2 p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="bg-gray-50 p-6 rounded-lg shadow-md">
            <h2 className="text-sm font-semibold text-slate-500">Role</h2>
            <input
              type="text"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full mt-2 p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="bg-gray-50 p-6 rounded-lg shadow-md">
            <h2 className="text-sm font-semibold text-slate-500">Joined</h2>
            <input
              type="text"
              value={joined}
              onChange={(e) => setJoined(e.target.value)}
              className="w-full mt-2 p-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>

        {/* Save + Logout */}
        <div className="mt-10 flex flex-col items-center gap-4">
          <button
            onClick={handleSave}
            className="px-8 py-3 rounded-lg font-bold text-white bg-gradient-to-r from-indigo-500 to-emerald-400 shadow-lg hover:scale-[1.02] transition"
          >
            Save Profile
          </button>
          <button className="px-8 py-3 rounded-lg font-bold text-white bg-gradient-to-r from-pink-500 to-amber-400 shadow-lg hover:scale-[1.02] transition">
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
}
