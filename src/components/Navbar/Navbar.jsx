import React, { useState, useEffect } from "react";

import ResumeIQLogo from "../Logo/Logo";
import {API_URL} from "../../utils/api";
export default function NavbarResumeIQFinal() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");
  const [user, setUser] = useState(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const update = () => {
      const h = (window.location.hash || "#home").replace("#", "");
      setActive(h || "home");
    };
    update();
    window.addEventListener("hashchange", update);
    return () => window.removeEventListener("hashchange", update);
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`${API_URL}/api/info/me`, {
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

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const NavLink = ({ id, href, children }) => {
    const isActive = active === id;
    return (
      <a
        href={href}
        onClick={() => setOpen(false)}
        aria-current={isActive ? "page" : undefined}
        className="relative inline-flex items-center text-sm font-medium px-2 py-1 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-200"
        style={{ color: "var(--nav-text, #0f172a)" }}
      >
        <span className="z-10">{children}</span>
        <span
          aria-hidden
          className="absolute inset-x-0 -bottom-1 h-1 rounded-full transition-all"
          style={{
            transformOrigin: "left center",
            transform: isActive ? "scaleX(1)" : "scaleX(0)",
            background: isActive
              ? "linear-gradient(90deg,var(--accent-1),var(--accent-2),var(--accent-4))"
              : "transparent",
            opacity: isActive ? 1 : 0,
          }}
        />
      </a>
    );
  };

  return (
    <nav
      className={`w-full fixed top-0 left-0 z-50 transition-colors duration-300 ${
        scrolled ? "bg-white shadow-md" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <a href="/" onClick={() => setActive("home")}>
              <ResumeIQLogo />
            </a>
          </div>

          {/* Center Links */}
          <div className="hidden lg:flex lg:flex-1 lg:justify-center">
            <ul className="flex items-center gap-8">
              <li>
                <NavLink
                  id={user ? "dashboard" : "home"}
                  href={user ? "/dashboard" : "/"}
                >
                  {user ? "Dashboard" : "Home"}
                </NavLink>
              </li>
              <li className="relative group">
                <NavLink id="features" href="#features">
                  Features
                </NavLink>
                <div
                  className="absolute left-0 mt-2 w-64 rounded-lg shadow-lg 
                  opacity-0 translate-y-2 transition-all duration-300 ease-out 
                  group-hover:opacity-100 group-hover:translate-y-0 
                  pointer-events-none group-hover:pointer-events-auto 
                  bg-gradient-to-br from-indigo-50 via-purple-50 to-emerald-50"
                >
                  <ul className="p-4 space-y-3 text-slate-700">
                    <li className="flex items-center gap-2 px-3 py-2 rounded-md bg-indigo-100 hover:bg-indigo-200 cursor-pointer">
                      📄{" "}
                      <span className="font-medium text-indigo-700">
                        AI Resume Analysis
                      </span>
                    </li>
                    <li className="flex items-center gap-2 px-3 py-2 rounded-md bg-pink-100 hover:bg-pink-200 cursor-pointer">
                      🎯{" "}
                      <span className="font-medium text-pink-700">
                        ATS Score
                      </span>
                    </li>
                    <li className="flex items-center gap-2 px-3 py-2 rounded-md bg-amber-100 hover:bg-amber-200 cursor-pointer">
                      🔑{" "}
                      <span className="font-medium text-amber-700">
                        Missing Keywords
                      </span>
                    </li>
                    <li className="flex items-center gap-2 px-3 py-2 rounded-md bg-emerald-100 hover:bg-emerald-200 cursor-pointer">
                      💼{" "}
                      <span className="font-medium text-emerald-700">
                        Job Description Matcher
                      </span>
                    </li>
                    <li className="flex items-center gap-2 px-3 py-2 rounded-md bg-purple-100 hover:bg-purple-200 cursor-pointer">
                      📊{" "}
                      <span className="font-medium text-purple-700">
                        Resume Analysis History
                      </span>
                    </li>
                    <li className="flex items-center gap-2 px-3 py-2 rounded-md bg-blue-100 hover:bg-blue-200 cursor-pointer">
                      👤{" "}
                      <span className="font-medium text-blue-700">
                        Profile Management
                      </span>
                    </li>
                  </ul>
                </div>
              </li>
              {/* About dropdown */}
              <li className="relative group">
                <NavLink id="about" href="#about">
                  About
                </NavLink>
                <div
                  className="absolute left-0 mt-2 w-64 rounded-lg shadow-lg 
                  opacity-0 translate-y-2 transition-all duration-300 ease-out 
                  group-hover:opacity-100 group-hover:translate-y-0 
                  pointer-events-none group-hover:pointer-events-auto 
                  bg-gradient-to-br from-gray-50 via-indigo-50 to-purple-50"
                >
                  <ul className="p-4 space-y-3 text-slate-700">
                    <li className="flex items-center gap-2 px-3 py-2 rounded-md bg-green-100 hover:bg-green-200 cursor-pointer">
                      🌱{" "}
                      <span className="font-medium text-green-700">
                        Our Mission
                      </span>
                    </li>
                    <li className="flex items-center gap-2 px-3 py-2 rounded-md bg-blue-100 hover:bg-blue-200 cursor-pointer">
                      👥 <span className="font-medium text-blue-700">Team</span>
                    </li>
                    <li className="flex items-center gap-2 px-3 py-2 rounded-md bg-amber-100 hover:bg-amber-200 cursor-pointer">
                      📞{" "}
                      <span className="font-medium text-amber-700">
                        Contact
                      </span>
                    </li>
                  </ul>
                </div>
              </li>
              {user && (
                <li>
                  <NavLink id="history" href="/history">
                    History
                  </NavLink>
                </li>
              )}
              {user && (
                <li>
                  <NavLink id="profile" href="/profile">
                    Profile
                  </NavLink>
                </li>
              )}
            </ul>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {!user ? (
              <>
                <a
                  href="/signup"
                  className="px-4 py-2 rounded-md font-semibold text-white bg-gradient-to-r from-indigo-500 to-emerald-400 shadow-md hover:scale-[1.02] transition"
                >
                  Sign up
                </a>
                <a
                  href="/login"
                  className="px-4 py-2 rounded-md font-semibold text-indigo-600 bg-white shadow-md hover:bg-gray-100 transition"
                >
                  Log in
                </a>
              </>
            ) : (
              <div className="flex items-center gap-3">
                <img
                  src={
                    user.profilePhoto?.url || "https://via.placeholder.com/120"
                  }
                  alt="Profile"
                  className="w-10 h-10 rounded-full border-2 border-white"
                />
                <span className="font-semibold">{user.name.split(" ")[0]}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
