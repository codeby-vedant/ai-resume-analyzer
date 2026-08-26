import React, { useState, useEffect } from "react";
import ResumeIQLogo from "../Logo/Logo";
import { API_URL } from "../../utils/api";

export default function NavbarResumeIQFinal() {
  const [open, setOpen] = useState(false);
  const [mobileFeatures, setMobileFeatures] = useState(false);
  const [mobileAbout, setMobileAbout] = useState(false);
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
          setUser(data);
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

  const closeMobileMenu = () => {
    setOpen(false);
    setMobileFeatures(false);
    setMobileAbout(false);
  };

  const NavLink = ({ id, href, children }) => {
    const isActive = active === id;

    return (
      <a
        href={href}
        onClick={closeMobileMenu}
        aria-current={isActive ? "page" : undefined}
        className="relative inline-flex items-center text-sm font-medium px-2 py-1 transition-colors focus:outline-none"
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
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-md"
          : "bg-white/80 backdrop-blur-sm lg:bg-transparent lg:backdrop-blur-0"
      }`}
    >
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center min-w-0">
            <a
              href="/"
              onClick={() => {
                setActive("home");
                closeMobileMenu();
              }}
              className="shrink-0"
            >
              <ResumeIQLogo />
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex lg:flex-1 lg:justify-center">
            <ul className="flex items-center gap-6 xl:gap-8">
              <li>
                <NavLink
                  id={user ? "dashboard" : "home"}
                  href={user ? "/dashboard" : "/"}
                >
                  {user ? "Dashboard" : "Home"}
                </NavLink>
              </li>

              {/* Features */}
              <li className="relative group">
                <NavLink id="features" href="#features">
                  Features
                </NavLink>

                <div
                  className="
                    absolute left-0 mt-2 w-64 rounded-lg shadow-lg
                    opacity-0 translate-y-2 transition-all duration-300 ease-out
                    group-hover:opacity-100 group-hover:translate-y-0
                    pointer-events-none group-hover:pointer-events-auto
                    bg-gradient-to-br from-indigo-50 via-purple-50 to-emerald-50
                  "
                >
                  <ul className="p-4 space-y-3 text-slate-700">
                    <li className="flex items-center gap-2 px-3 py-2 rounded-md bg-indigo-100 hover:bg-indigo-200">
                      📄
                      <span className="font-medium text-indigo-700">
                        AI Resume Analysis
                      </span>
                    </li>

                    <li className="flex items-center gap-2 px-3 py-2 rounded-md bg-pink-100 hover:bg-pink-200">
                      🎯
                      <span className="font-medium text-pink-700">
                        ATS Score
                      </span>
                    </li>

                    <li className="flex items-center gap-2 px-3 py-2 rounded-md bg-amber-100 hover:bg-amber-200">
                      🔑
                      <span className="font-medium text-amber-700">
                        Missing Keywords
                      </span>
                    </li>

                    <li className="flex items-center gap-2 px-3 py-2 rounded-md bg-emerald-100 hover:bg-emerald-200">
                      💼
                      <span className="font-medium text-emerald-700">
                        Job Description Matcher
                      </span>
                    </li>

                    <li className="flex items-center gap-2 px-3 py-2 rounded-md bg-purple-100 hover:bg-purple-200">
                      📊
                      <span className="font-medium text-purple-700">
                        Resume Analysis History
                      </span>
                    </li>

                    <li className="flex items-center gap-2 px-3 py-2 rounded-md bg-blue-100 hover:bg-blue-200">
                      👤
                      <span className="font-medium text-blue-700">
                        Profile Management
                      </span>
                    </li>
                  </ul>
                </div>
              </li>

              {/* About */}
              <li className="relative group">
                <NavLink id="about" href="#about">
                  About
                </NavLink>

                <div
                  className="
                    absolute left-0 mt-2 w-64 rounded-lg shadow-lg
                    opacity-0 translate-y-2 transition-all duration-300 ease-out
                    group-hover:opacity-100 group-hover:translate-y-0
                    pointer-events-none group-hover:pointer-events-auto
                    bg-gradient-to-br from-gray-50 via-indigo-50 to-purple-50
                  "
                >
                  <ul className="p-4 space-y-3 text-slate-700">
                    <li className="flex items-center gap-2 px-3 py-2 rounded-md bg-green-100 hover:bg-green-200">
                      🌱
                      <span className="font-medium text-green-700">
                        Our Mission
                      </span>
                    </li>

                    <li className="flex items-center gap-2 px-3 py-2 rounded-md bg-blue-100 hover:bg-blue-200">
                      👥
                      <span className="font-medium text-blue-700">
                        Team
                      </span>
                    </li>

                    <li className="flex items-center gap-2 px-3 py-2 rounded-md bg-amber-100 hover:bg-amber-200">
                      📞
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

          {/* Desktop Right Side */}
          <div className="hidden lg:flex items-center gap-3">
            {!user ? (
              <>
                <a
                  href="/signup"
                  className="
                    px-4 py-2 rounded-md font-semibold text-white
                    bg-gradient-to-r from-indigo-500 to-emerald-400
                    shadow-md hover:scale-[1.02] transition
                  "
                >
                  Sign up
                </a>

                <a
                  href="/login"
                  className="
                    px-4 py-2 rounded-md font-semibold text-indigo-600
                    bg-white shadow-md hover:bg-gray-100 transition
                  "
                >
                  Log in
                </a>
              </>
            ) : (
              <div className="flex items-center gap-3">
                <img
                  src={
                    user.profilePhoto?.url ||
                    "https://via.placeholder.com/120"
                  }
                  alt="Profile"
                  className="w-10 h-10 rounded-full border-2 border-white object-cover"
                />

                <span className="font-semibold whitespace-nowrap">
                  {user.name?.split(" ")[0]}
                </span>
              </div>
            )}
          </div>

          {/* Mobile Right Side */}
          <div className="flex lg:hidden items-center gap-2">
            {user && (
              <img
                src={
                  user.profilePhoto?.url ||
                  "https://via.placeholder.com/120"
                }
                alt="Profile"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border-2 border-white object-cover"
              />
            )}

            <button
              type="button"
              onClick={() => setOpen(!open)}
              className="
                p-2 rounded-lg text-gray-700
                hover:bg-gray-100
                focus:outline-none
                focus:ring-2 focus:ring-indigo-300
              "
              aria-label="Toggle navigation menu"
              aria-expanded={open}
            >
              {open ? (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {open && (
          <div className="lg:hidden border-t border-gray-200 bg-white shadow-lg">
            <div className="py-4 space-y-1">
              {/* Home / Dashboard */}
              <a
                href={user ? "/dashboard" : "/"}
                onClick={closeMobileMenu}
                className="block px-4 py-3 rounded-lg font-medium text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
              >
                {user ? "Dashboard" : "Home"}
              </a>

              {/* Features */}
              <div>
                <button
                  type="button"
                  onClick={() => setMobileFeatures(!mobileFeatures)}
                  className="w-full flex items-center justify-between px-4 py-3 rounded-lg font-medium text-gray-700 hover:bg-indigo-50"
                >
                  <span>Features</span>

                  <span
                    className={`transition-transform ${
                      mobileFeatures ? "rotate-180" : ""
                    }`}
                  >
                    ▼
                  </span>
                </button>

                {mobileFeatures && (
                  <div className="mx-4 mt-1 rounded-lg bg-gradient-to-br from-indigo-50 via-purple-50 to-emerald-50 p-3 space-y-2">
                    <div className="px-3 py-2 rounded-md bg-indigo-100 text-indigo-700 text-sm">
                      📄 AI Resume Analysis
                    </div>

                    <div className="px-3 py-2 rounded-md bg-pink-100 text-pink-700 text-sm">
                      🎯 ATS Score
                    </div>

                    <div className="px-3 py-2 rounded-md bg-amber-100 text-amber-700 text-sm">
                      🔑 Missing Keywords
                    </div>

                    <div className="px-3 py-2 rounded-md bg-emerald-100 text-emerald-700 text-sm">
                      💼 Job Description Matcher
                    </div>

                    <div className="px-3 py-2 rounded-md bg-purple-100 text-purple-700 text-sm">
                      📊 Resume Analysis History
                    </div>

                    <div className="px-3 py-2 rounded-md bg-blue-100 text-blue-700 text-sm">
                      👤 Profile Management
                    </div>
                  </div>
                )}
              </div>

              {/* About */}
              <div>
                <button
                  type="button"
                  onClick={() => setMobileAbout(!mobileAbout)}
                  className="w-full flex items-center justify-between px-4 py-3 rounded-lg font-medium text-gray-700 hover:bg-indigo-50"
                >
                  <span>About</span>

                  <span
                    className={`transition-transform ${
                      mobileAbout ? "rotate-180" : ""
                    }`}
                  >
                    ▼
                  </span>
                </button>

                {mobileAbout && (
                  <div className="mx-4 mt-1 rounded-lg bg-gradient-to-br from-gray-50 via-indigo-50 to-purple-50 p-3 space-y-2">
                    <div className="px-3 py-2 rounded-md bg-green-100 text-green-700 text-sm">
                      🌱 Our Mission
                    </div>

                    <div className="px-3 py-2 rounded-md bg-blue-100 text-blue-700 text-sm">
                      👥 Team
                    </div>

                    <div className="px-3 py-2 rounded-md bg-amber-100 text-amber-700 text-sm">
                      📞 Contact
                    </div>
                  </div>
                )}
              </div>

              {/* Logged in links */}
              {user && (
                <>
                  <a
                    href="/history"
                    onClick={closeMobileMenu}
                    className="block px-4 py-3 rounded-lg font-medium text-gray-700 hover:bg-purple-50 hover:text-purple-600"
                  >
                    History
                  </a>

                  <a
                    href="/profile"
                    onClick={closeMobileMenu}
                    className="block px-4 py-3 rounded-lg font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                  >
                    Profile
                  </a>
                </>
              )}

              {/* Mobile auth */}
              {!user && (
                <div className="flex flex-col gap-2 pt-3 px-4 border-t border-gray-100 mt-2">
                  <a
                    href="/signup"
                    onClick={closeMobileMenu}
                    className="w-full text-center px-4 py-3 rounded-lg font-semibold text-white bg-gradient-to-r from-indigo-500 to-emerald-400 shadow-md"
                  >
                    Sign up
                  </a>

                  <a
                    href="/login"
                    onClick={closeMobileMenu}
                    className="w-full text-center px-4 py-3 rounded-lg font-semibold text-indigo-600 bg-gray-50 border border-indigo-100"
                  >
                    Log in
                  </a>
                </div>
              )}

              {/* Mobile user */}
              {user && (
                <div className="flex items-center gap-3 px-4 pt-4 mt-2 border-t border-gray-100">
                  <img
                    src={
                      user.profilePhoto?.url ||
                      "https://via.placeholder.com/120"
                    }
                    alt="Profile"
                    className="w-10 h-10 rounded-full object-cover"
                  />

                  <div>
                    <p className="font-semibold text-gray-800">
                      {user.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      Logged in
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}