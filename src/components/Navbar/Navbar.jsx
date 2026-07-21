
import React, { useState, useEffect } from "react";

/**
 * NavbarResumeIQFinal.jsx
 * - Seamless with hero: transparent nav so there's no visible boundary
 * - Uses the same CSS variables/palette as the hero (keep them in sync)
 * - Removes "active = white text" behavior — active item keeps normal text color
 * - Active indicator is a subtle colored pill/underline (text color unchanged)
 * - Mobile menu included; no border or heavy overlay so nav blends into hero
 *
 * Integration notes:
 * - Place this component above the hero in your page markup.
 * - Ensure the hero uses the same --bg-top / --bg-mid / --accent-* variables.
 * - If you want the nav to remain readable on scroll, add a small scroll handler
 *   to increase a translucent overlay opacity (optional).
 */

export default function NavbarResumeIQFinal() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");

  useEffect(() => {
    const update = () => {
      const h = (window.location.hash || "#home").replace("#", "");
      setActive(h || "home");
    };
    update();
    window.addEventListener("hashchange", update);
    return () => window.removeEventListener("hashchange", update);
  }, []);

  const NavLink = ({ id, href, children }) => {
    const isActive = active === id;
    return (
      <a
        href={href}
        onClick={() => setOpen(false)}
        aria-current={isActive ? "page" : undefined}
        className="relative inline-flex items-center text-sm font-medium px-2 py-1 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-200"
        style={{ color: "var(--nav-text, #0f172a)" }} // keep text color consistent
      >
        <span className="z-10">{children}</span>

        {/* Active indicator: colored pill/underline; text color stays the same */}
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
    <>
      <style>{`
        :root{
          /* keep these in sync with your hero */
          --bg-top: #eaf6ff;
          --bg-mid: #fff3f;
          --accent-1: #3b82f6;
          --accent-2: #fb7185;
          --accent-3: #f59e0b;
          --accent-4: #10b981;
          --nav-text: #0f172a; /* dark text for nav items */
        }

        /* hero-like base (for reference) */
        .hero-base-sample {
          background:
            radial-gradient(700px 320px at 8% 12%, rgba(59,130,246,0.14), transparent 12%),
            radial-gradient(600px 300px at 92% 78%, rgba(251,113,133,0.10), transparent 12%),
            linear-gradient(180deg, var(--bg-top), var(--bg-mid));
        }

        /* NAV: transparent so it visually blends with hero underneath */
        .nav-seamless {
          background: transparent;
          border-bottom: none;
          backdrop-filter: none;
        }

        /* keep nav content readable while preserving seamless look */
        .nav-inner {
          padding-top: 10px;
          padding-bottom: 10px;
        }

        /* subtle focus ring */
        .focus-ring:focus-visible { outline: 3px solid rgba(99,102,241,0.12); outline-offset: 3px; border-radius: 0.5rem; }

        /* mobile menu animation */
        @keyframes slideDown {
          from { transform: translateY(-8px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-slide-down { animation: slideDown 220ms cubic-bezier(.2,.9,.2,1) both; }
        @media (prefers-reduced-motion: reduce) {
          .animate-slide-down { animation: none !important; }
        }

        /* CTA style */
        .cta-primary {
          background: linear-gradient(90deg,var(--accent-1),var(--accent-4));
          color: white;
        }
        .cta-secondary {
          background: rgba(255,255,255,0.9);
          color: #0f172a;
          border: 1px solid rgba(15,23,42,0.06);
        }

        /* small helper to ensure no visible seam on high-DPI */
        .nav-seamless::after {
          content: "";
          display: block;
          height: 0;
          pointer-events: none;
        }
      `}</style>

      {/* nav is transparent so hero shows through; place this above the hero */}
      <nav className="nav-seamless w-full fixed top-0 left-0 z-50">
        <div className="nav-inner container mx-auto px-4 sm:px-6 lg:px-12">
          <div className="flex items-center justify-between h-16">
            {/* Left: Logo (unchanged) */}
            <div className="flex items-center gap-3">
              <a
                href="#home"
                className="inline-flex items-center gap-3 no-underline focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-300 rounded-md"
                aria-label="ResumeIQ home"
                onClick={() => setActive("home")}
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{ background: "linear-gradient(135deg,var(--accent-1),var(--accent-2))", boxShadow: "0 8px 20px rgba(59,130,246,0.08)" }}
                >
                  {/* keep your logo SVG exactly as you had it */}
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <rect x="3" y="5" width="18" height="14" rx="2" fill="white" opacity="0.98" />
                    <path d="M7 9h6" stroke="#3b82f6" strokeWidth="1.4" strokeLinecap="round" />
                    <path d="M7 13h4" stroke="#fb7185" strokeWidth="1.4" strokeLinecap="round" />
                  </svg>
                </div>

                <div className="flex flex-col leading-none">
                  <span className="text-lg font-bold tracking-tight" style={{ color: "var(--nav-text)" }}>ResumeIQ</span>
                  <span className="text-xs" style={{ color: "rgba(15,23,42,0.6)", marginTop: -2 }}>AI Resume Analyzer</span>
                </div>
              </a>
            </div>

            {/* Center: Links (desktop) */}
            <div className="hidden lg:flex lg:flex-1 lg:justify-center">
              <ul className="flex items-center gap-8">
                <li><NavLink id="home" href="#home">Home</NavLink></li>
                <li><NavLink id="features" href="#features">Features</NavLink></li>
                <li><NavLink id="profile" href="#profile">Profile</NavLink></li>
              </ul>
            </div>

            {/* Right: Auth + mobile toggle */}
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-3">
                <a href="#signup" className="px-4 py-2 rounded-md font-semibold cta-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-300">Sign up</a>
                <a href="#login" className="px-4 py-2 rounded-md font-medium cta-secondary focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-200">Log in</a>
              </div>

              <button
                onClick={() => setOpen((s) => !s)}
                aria-expanded={open}
                aria-controls="mobile-menu"
                className="inline-flex items-center justify-center p-2 rounded-md text-slate-700 hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-200 lg:hidden"
              >
                <span className="sr-only">Open main menu</span>
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" aria-hidden>
                  {open ? (
                    <path d="M6 6l12 12M6 18L18 6" stroke="#374151" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  ) : (
                    <path d="M4 7h16M4 12h16M4 17h16" stroke="#374151" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <div id="mobile-menu" className={`lg:hidden ${open ? "block animate-slide-down" : "hidden"}`} role="region" aria-label="Mobile menu">
          <div className="px-4 pt-4 pb-6 space-y-4" style={{ backdropFilter: "blur(6px)" }}>
            <ul className="flex flex-col gap-2">
              <li><a href="#home" className="block px-3 py-2 rounded-md text-base font-medium" onClick={() => { setActive("home"); setOpen(false); }}>Home</a></li>
              <li><a href="#features" className="block px-3 py-2 rounded-md text-base font-medium" onClick={() => { setActive("features"); setOpen(false); }}>Features</a></li>
              <li><a href="#profile" className="block px-3 py-2 rounded-md text-base font-medium" onClick={() => { setActive("profile"); setOpen(false); }}>Profile</a></li>
            </ul>

            <div className="pt-2 border-t border-white/10 flex flex-col gap-2">
              <a href="#signup" className="w-full text-center px-4 py-2 rounded-md font-semibold cta-primary" onClick={() => setOpen(false)}>Sign up</a>
              <a href="#login" className="w-full text-center px-4 py-2 rounded-md font-medium cta-secondary" onClick={() => setOpen(false)}>Log in</a>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}




