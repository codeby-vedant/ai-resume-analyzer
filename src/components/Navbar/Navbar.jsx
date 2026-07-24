import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import ResumeIQLogo from "../Logo/Logo";

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
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser(decoded);
      } catch (err) {
        console.error("Invalid token", err);
        setUser(null);
      }
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

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
            <a href="#home" onClick={() => setActive("home")}>
              <ResumeIQLogo />
            </a>
          </div>

          {/* Center Links */}
          <div className="hidden lg:flex lg:flex-1 lg:justify-center">
            <ul className="flex items-center gap-8">
              <li><NavLink id="home" href="#home">Home</NavLink></li>
              <li><NavLink id="features" href="#features">Features</NavLink></li>
              <li><NavLink id="about" href="#about">About</NavLink></li>
              {user && <li><NavLink id="history" href="#history">History</NavLink></li>}
              {user && <li><NavLink id="profile" href="#profile">Profile</NavLink></li>}
            </ul>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {!user ? (
              <>
                <a
                  href="#signup"
                  className="px-4 py-2 rounded-md font-semibold text-white bg-gradient-to-r from-indigo-500 to-emerald-400 shadow-md hover:scale-[1.02] transition"
                >
                  Sign up
                </a>
                <a
                  href="#login"
                  className="px-4 py-2 rounded-md font-semibold text-indigo-600 bg-white shadow-md hover:bg-gray-100 transition"
                >
                  Log in
                </a>
              </>
            ) : (
              <div className="flex items-center gap-3">
                <img
                  src={user.photo || "https://via.placeholder.com/40"}
                  alt="Profile"
                  className="w-10 h-10 rounded-full border-2 border-white"
                />
                <span className="font-semibold">{user.name}</span>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 rounded-md bg-pink-500 text-white font-semibold shadow-md hover:bg-pink-600 transition"
                >
                  Log Out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
