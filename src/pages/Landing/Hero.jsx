
import React, { useEffect, useRef } from "react";

/**
 * HeroColorfulV3.jsx
 * - Strong colorful base (no large white islands)
 * - Conic wash + blobs tuned to navbar accents
 * - Darker microcopy for contrast
 * - Mobile-friendly: large blobs hidden on small screens
 * - Reduced-motion respected
 */

export default function HeroColorfulV3() {
  const rootRef = useRef(null);
  const parallaxRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    const parallax = parallaxRef.current;
    if (!root || !parallax) return;

    let supportsMotion = true;
    try {
      supportsMotion = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    } catch {
      supportsMotion = true;
    }
    if (!supportsMotion) return;

    const handleMove = (e) => {
      const rect = root.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      parallax.style.transform = `translate3d(${x * 14}px, ${y * 10}px, 0)`;
    };

    root.addEventListener("pointermove", handleMove);
    root.addEventListener("pointerleave", () => (parallax.style.transform = ""));
    return () => {
      root.removeEventListener("pointermove", handleMove);
      root.removeEventListener("pointerleave", () => (parallax.style.transform = ""));
    };
  }, []);

  return (
    <>
      <style>{`
        :root{
          --bg-top: #eaf6ff; /* stronger colored base */
          --bg-mid: #fff3f6;
          --accent-1: #3b82f6;
          --accent-2: #fb7185;
          --accent-3: #f59e0b;
          --accent-4: #10b981;
          --muted-dark: #334155; /* darker microcopy */
        }

        .hero-base {
          background: radial-gradient(700px 320px at 8% 12%, rgba(59,130,246,0.14), transparent 12%),
                      radial-gradient(600px 300px at 92% 78%, rgba(251,113,133,0.10), transparent 12%),
                      linear-gradient(180deg, var(--bg-top), var(--bg-mid));
        }

        .conic-wash {
          position: absolute;
          inset: -18%;
          pointer-events: none;
          background: conic-gradient(from 120deg, rgba(59,130,246,0.12), rgba(251,113,133,0.10), rgba(245,158,11,0.08), rgba(16,185,129,0.06));
          filter: blur(36px);
          transform: rotate(6deg);
          opacity: 0.95;
        }
        @keyframes wash {
          0% { transform: translate3d(-4%, -3%, 0) rotate(0deg); }
          50% { transform: translate3d(4%, 3%, 0) rotate(6deg); }
          100% { transform: translate3d(-4%, -3%, 0) rotate(0deg); }
        }
        .animate-wash { animation: wash 20s ease-in-out infinite; }

        .blob {
          position: absolute;
          border-radius: 999px;
          filter: blur(28px);
          opacity: 0.95;
          pointer-events: none;
          transform: translateZ(0);
        }
        .blob-blue { background: radial-gradient(circle at 30% 30%, rgba(59,130,246,0.30), rgba(99,102,241,0.06)); }
        .blob-pink { background: radial-gradient(circle at 30% 30%, rgba(251,113,133,0.28), rgba(244,114,182,0.06)); }
        .blob-amber { background: radial-gradient(circle at 30% 30%, rgba(245,158,11,0.22), rgba(250,204,21,0.04)); }
        .blob-green { background: radial-gradient(circle at 30% 30%, rgba(16,185,129,0.20), rgba(34,197,94,0.04)); }

        @keyframes floatY {
          0% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
          100% { transform: translateY(0); }
        }
        .animate-float { animation: floatY 7s ease-in-out infinite; }
        .animate-float-slow { animation: floatY 11s ease-in-out infinite; }

        .svg-wave { opacity: 0.8; pointer-events: none; }
        @keyframes waveX {
          0% { transform: translateX(0); }
          50% { transform: translateX(-5%); }
          100% { transform: translateX(0); }
        }
        .animate-wave { animation: waveX 18s ease-in-out infinite; }

        .texture {
          background-image: linear-gradient(135deg, rgba(255,255,255,0.06) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.06) 50%, rgba(255,255,255,0.06) 75%, transparent 75%, transparent);
          background-size: 24px 24px;
          mix-blend-mode: overlay;
          opacity: 0.6;
          pointer-events: none;
        }

        .glass {
          background: linear-gradient(180deg, rgba(255,255,255,0.92), rgba(255,255,255,0.78));
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
        }

        /* mobile: hide large decorative blobs for clarity and perf */
        @media (max-width: 768px) {
          .blob-large { display: none; }
          .conic-wash { opacity: 0.7; filter: blur(20px); }
        }

        @media (prefers-reduced-motion: reduce) {
          .animate-wash, .animate-float, .animate-float-slow, .animate-wave { animation: none !important; }
        }
      `}</style>

      <header ref={rootRef} className="hero-base w-full min-h-screen flex items-center relative overflow-hidden" aria-label="Hero">
        <div className="conic-wash animate-wash" aria-hidden />

        <div className="blob blob-blue animate-float blob-large" style={{ width: 420, height: 420, left: "-10%", top: "-14%", zIndex: 0 }} aria-hidden />
        <div className="blob blob-pink animate-float-slow blob-large" style={{ width: 360, height: 360, right: "-8%", top: "6%", zIndex: 0 }} aria-hidden />
        <div className="blob blob-amber animate-float" style={{ width: 300, height: 300, left: "6%", bottom: "-10%", zIndex: 0 }} aria-hidden />
        <div className="blob blob-green animate-float-slow" style={{ width: 260, height: 260, right: "2%", bottom: "-6%", zIndex: 0 }} aria-hidden />

        <svg className="absolute left-0 right-0 top-0 w-full h-44 svg-wave animate-wave" viewBox="0 0 1440 120" preserveAspectRatio="none" aria-hidden>
          <defs>
            <linearGradient id="waveGrad3" x1="0" x2="1">
              <stop offset="0" stopColor="#3b82f6" stopOpacity="0.14" />
              <stop offset="0.5" stopColor="#fb7185" stopOpacity="0.10" />
              <stop offset="1" stopColor="#10b981" stopOpacity="0.08" />
            </linearGradient>
          </defs>
          <path d="M0,48 C240,120 480,0 720,48 C960,96 1200,12 1440,48 L1440,0 L0,0 Z" fill="url(#waveGrad3)" />
        </svg>

        <div className="absolute inset-0 texture" aria-hidden />

        <div className="container mx-auto px-6 lg:px-12 py-20 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
          {/* Left content */}
          <div className="lg:col-span-6">
            <div className="max-w-2xl">
              <span className="inline-flex items-center text-sm font-medium text-white bg-gradient-to-r from-indigo-500 to-pink-400 px-3 py-1 rounded-full mb-4 shadow-sm">
                <svg className="w-3 h-3 mr-2" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.6)" strokeWidth="1.2" />
                </svg>
                ResumeIQ
              </span>

              <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight text-slate-900 mb-4">
                Turn your resume into interview-ready results faster
              </h1>

              <p className="text-lg mb-6" style={{ color: "var(--muted-dark)" }}>
                Upload your resume for instant ATS scoring, keyword suggestions, and tailored bullet rewrites that highlight your impact.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6">
                <button
                  className="inline-flex items-center justify-center px-6 py-3 rounded-lg font-semibold text-white shadow-lg transform transition hover:-translate-y-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-300"
                  style={{ background: "linear-gradient(90deg,var(--accent-1),var(--accent-4))" }}
                >
                  Upload resume
                </button>

                <a
                  href="#demo"
                  className="inline-flex items-center justify-center px-5 py-3 rounded-lg font-medium text-slate-700 bg-white border border-slate-200 shadow-sm hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-200"
                >
                  See demo analysis
                </a>
              </div>

              <div className="flex flex-wrap gap-4 text-sm">
                <div className="inline-flex items-center" style={{ color: "var(--muted-dark)" }}>
                  <span className="w-2 h-2 rounded-full mr-2" style={{ background: "var(--accent-1)" }} />
                  ATS score
                </div>
                <div className="inline-flex items-center" style={{ color: "var(--muted-dark)" }}>
                  <span className="w-2 h-2 rounded-full mr-2" style={{ background: "var(--accent-2)" }} />
                  Keyword suggestions
                </div>
                <div className="inline-flex items-center" style={{ color: "var(--muted-dark)" }}>
                  <span className="w-2 h-2 rounded-full mr-2" style={{ background: "var(--accent-3)" }} />
                  Bullet rewrites
                </div>
              </div>
            </div>
          </div>

          {/* Right visual */}
          <div className="lg:col-span-6 relative flex justify-center lg:justify-end">
            <div ref={parallaxRef} className="relative w-full max-w-md lg:max-w-lg will-change-transform transition-transform">
              <div className="glass rounded-3xl p-6 shadow-2xl border border-white/40 relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900">Sample analysis</h3>
                    <p className="text-sm text-slate-600">Instant insights and suggested edits</p>
                  </div>

                  <div className="w-12 h-12 rounded-lg bg-white/70 flex items-center justify-center shadow-sm">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden>
                      <path d="M4 6h16" stroke="#3b82f6" strokeWidth="1.5" strokeLinecap="round" />
                      <path d="M4 12h10" stroke="#fb7185" strokeWidth="1.5" strokeLinecap="round" />
                      <path d="M4 18h6" stroke="#f59e0b" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </div>
                </div>

                <div className="rounded-xl overflow-hidden bg-gradient-to-br from-white to-slate-50 p-4 mb-3">
                  <svg viewBox="0 0 460 260" className="w-full h-48" preserveAspectRatio="xMidYMid slice" aria-hidden>
                    <defs>
                      <linearGradient id="g1v3" x1="0" x2="1">
                        <stop offset="0" stopColor="#60a5fa" stopOpacity="0.16" />
                        <stop offset="0.6" stopColor="#fb7185" stopOpacity="0.12" />
                        <stop offset="1" stopColor="#10b981" stopOpacity="0.08" />
                      </linearGradient>
                    </defs>

                    <rect x="0" y="0" width="460" height="260" rx="16" fill="url(#g1v3)" />
                    <g transform="translate(24,22)" className="animate-float">
                      <rect x="0" y="0" width="300" height="18" rx="8" fill="#fff" opacity="0.98" />
                      <rect x="0" y="36" width="220" height="12" rx="6" fill="#fff" opacity="0.92" />
                      <rect x="0" y="64" width="340" height="12" rx="6" fill="#fff" opacity="0.92" />
                      <rect x="0" y="92" width="160" height="12" rx="6" fill="#fff" opacity="0.92" />
                      <circle cx="380" cy="60" r="30" fill="#fff" opacity="0.98" />
                      <text x="380" y="66" fontSize="12" fill="#3b82f6" textAnchor="middle" dominantBaseline="middle">ATS</text>
                    </g>
                  </svg>
                </div>

                <div className="mt-2 flex items-center justify-between">
                  <div className="text-sm text-slate-600">Score <span className="font-semibold text-slate-800">78</span></div>
                  <div className="text-sm font-medium text-slate-800">Role fit Product Manager</div>
                </div>

                <div className="mt-4 flex gap-3">
                  <button className="flex-1 inline-flex items-center justify-center px-4 py-2 rounded-lg bg-white text-slate-800 border border-slate-200 shadow-sm hover:scale-[1.01] transition transform focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-200">
                    View suggestions
                  </button>

                  <button className="inline-flex items-center px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-emerald-400 text-white font-semibold shadow-md hover:-translate-y-0.5 transition transform focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-300">
                    Improve now
                  </button>
                </div>
              </div>

              <div className="absolute -inset-6 rounded-3xl opacity-28 animate-float-slow" style={{ background: "conic-gradient(from 120deg, rgba(59,130,246,0.12), rgba(251,113,133,0.10), rgba(16,185,129,0.08))", zIndex: -1, filter: "blur(28px)" }} aria-hidden />
            </div>
          </div>
        </div>
      </header>
    </>
  );
}


