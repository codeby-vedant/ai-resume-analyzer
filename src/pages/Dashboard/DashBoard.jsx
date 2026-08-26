return (
  <div className="min-h-screen bg-gradient-to-r from-purple-50 via-purple-100 to-purple-200 flex flex-col">
    {/* Analyzing Overlay */}
    {analyzing && (
      <div
        className="
          fixed inset-0
          flex flex-col items-center justify-center
          bg-gradient-to-r from-purple-100 via-purple-200 to-purple-300
          bg-opacity-90
          z-50
          px-6
        "
      >
        <div className="w-full max-w-xs bg-gray-200 rounded-full h-4 overflow-hidden">
          <div className="bg-gradient-to-r from-indigo-500 via-pink-500 to-emerald-500 h-4 animate-[progress_3s_linear_infinite]"></div>
        </div>

        <p className="mt-4 text-black font-semibold text-center animate-pulse">
          🔍 Analyzing your resume... Please wait
        </p>
      </div>
    )}

    <NavbarResumeIQFinal />

    {/* Main Dashboard */}
    <div className="flex flex-col lg:flex-row flex-1 pt-16">
      
      {/* LEFT SIDE - Welcome / History */}
      <aside className="w-full lg:w-1/3 p-5 sm:p-8 lg:p-12 flex flex-col">
        <div className="max-w-xl mx-auto lg:mx-0 w-full">

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 mb-3 sm:mb-4">
            Welcome back, {user || "Guest"}!
          </h1>

          <p className="text-base sm:text-lg lg:text-xl text-slate-700 mb-7 sm:mb-10">
            Ready to improve your resume today?
          </p>

          <h2 className="text-base sm:text-lg font-semibold text-slate-800 mb-3">
            Last few resumes analyzed:
          </h2>

          <ul className="space-y-3">
            {resumes.slice(-4).map((r, idx) => (
              <li
                key={idx}
                className="
                  p-4
                  rounded-lg
                  bg-white
                  shadow-lg
                  border border-gray-200
                  flex flex-col sm:flex-row
                  sm:justify-between
                  sm:items-center
                  gap-3
                "
              >
                <div className="min-w-0">
                  <p className="font-medium text-slate-900 truncate">
                    {r.filename}
                  </p>

                  <span className="text-sm text-slate-500">
                    Score: {r.analysis.score} •{" "}
                    {new Date(r.createdAt).toLocaleDateString()}
                  </span>
                </div>

                <button
                  onClick={() => viewAnalysis(r._id)}
                  className="
                    w-full sm:w-auto
                    px-3 py-2
                    text-sm
                    font-semibold
                    text-white
                    bg-gradient-to-r from-indigo-500 to-emerald-400
                    rounded-md
                    shadow
                    hover:scale-[1.02]
                    transition
                    cursor-pointer
                    whitespace-nowrap
                  "
                >
                  View Analysis
                </button>
              </li>
            ))}
          </ul>

        </div>
      </aside>

      {/* CENTER - Upload Resume */}
      <main className="flex-1 flex items-start justify-center p-5 sm:p-8 lg:p-12">
        <div className="max-w-xl w-full lg:mt-16">

          <div
            className="
              border-2
              border-dashed
              border-gray-300
              rounded-xl
              bg-white
              p-6 sm:p-10 lg:p-16
              flex flex-col
              items-center
              justify-center
              text-center
              shadow-xl
            "
          >
            {/* Upload Icon */}
            <svg
              className="w-14 h-14 sm:w-20 sm:h-20 text-gray-400 mb-5 sm:mb-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 4v16m8-8H4"
              />
            </svg>

            <p className="text-2xl sm:text-3xl font-semibold text-slate-700 mb-2 sm:mb-3">
              Upload your resume
            </p>

            <p className="text-sm sm:text-md text-slate-500 mb-6 sm:mb-8">
              Drag & drop or click below to upload
            </p>

            {/* Upload Progress */}
            {uploading && (
              <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                <div
                  className="bg-indigo-500 h-2 rounded-full transition-all duration-200"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            )}

            {/* Buttons */}
            <div className="w-full flex flex-col sm:flex-row gap-3 sm:gap-4">

              <label
                className="
                  w-full sm:w-auto
                  flex-1
                  px-6 sm:px-8
                  py-3 sm:py-4
                  rounded-lg
                  font-bold
                  text-white
                  bg-gradient-to-r from-indigo-500 to-emerald-400
                  shadow-md
                  hover:scale-[1.02]
                  transition
                  cursor-pointer
                  text-center
                "
              >
                Upload Resume

                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  hidden
                  onChange={handleUpload}
                  name="resume"
                />
              </label>

              <button
                onClick={() => {
                  if (newResumeId) {
                    handleAnalyze(newResumeId);
                  } else {
                    alert("No resume uploaded yet!");
                  }
                }}
                disabled={!newResumeId}
                className="
                  w-full sm:w-auto
                  flex-1
                  px-6 sm:px-8
                  py-3 sm:py-4
                  rounded-lg
                  font-bold
                  text-white
                  bg-gradient-to-r from-pink-500 to-amber-400
                  shadow-md
                  hover:scale-[1.02]
                  transition
                  disabled:opacity-50
                  disabled:cursor-not-allowed
                "
              >
                Analyze Resume
              </button>

            </div>

            {/* Selected File */}
            {selectedFile && (
              <p className="mt-4 text-sm text-slate-600 break-all">
                Selected: {selectedFile}
              </p>
            )}
          </div>

        </div>
      </main>
    </div>

    {/* JOB DESCRIPTION MATCHER */}
    <section className="px-5 sm:px-8 lg:px-10 py-6 sm:py-10">
      <div className="w-full p-5 sm:p-8 rounded-xl bg-white shadow-xl">

        <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4">
          Job Description Matcher
        </h3>

        <textarea
          value={description}
          placeholder="Paste job description here..."
          onChange={(e) => setDescription(e.target.value)}
          className="
            w-full
            h-36 sm:h-32
            p-4
            border
            border-gray-300
            rounded-lg
            mb-4
            focus:ring-2
            focus:ring-indigo-400
            focus:outline-none
            resize-y
          "
        />

        {/* Resume upload */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-4">

          <label
            className="
              w-full sm:w-auto
              px-6 py-3
              rounded-lg
              font-semibold
              text-white
              bg-gradient-to-r from-indigo-500 to-emerald-400
              shadow-md
              cursor-pointer
              text-center
            "
          >
            Upload Resume

            <input
              type="file"
              accept=".pdf,.doc,.docx"
              hidden
              onChange={handleMatchResumeUpload}
            />
          </label>

          {matchResumeFile && (
            <p className="text-sm text-slate-600 break-all">
              Selected: {matchResumeFile.name}
            </p>
          )}

        </div>

        {/* Match button */}
        <button
          onClick={handleMatchResume}
          disabled={matching}
          className={`
            w-full sm:w-auto
            px-6 py-3
            rounded-lg
            font-semibold
            text-white
            bg-gradient-to-r from-pink-500 to-amber-400
            shadow-md
            transition

            ${
              matching
                ? "opacity-70 cursor-not-allowed"
                : "hover:scale-[1.02] cursor-pointer"
            }
          `}
        >
          {matching ? (
            <span className="flex items-center justify-center gap-2">
              <svg
                className="w-5 h-5 animate-spin"
                viewBox="0 0 24 24"
                fill="none"
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

              Analyzing Resume...
            </span>
          ) : (
            "Match Resume"
          )}
        </button>

        {/* MATCH RESULT */}
        {matchResult && (
          <div className="mt-6 p-4 sm:p-6 rounded-lg bg-gray-50 border border-gray-200 shadow-sm">

            <p className="text-lg font-semibold text-slate-800 mb-4">
              Alignment Score:{" "}
              {matchResult.response.alignmentScore}%
            </p>

            {/* Matched Skills */}
            <p className="text-slate-700 mb-3 font-medium">
              Matched Skills:
            </p>

            <div className="flex flex-wrap gap-2 mb-5">
              {matchResult.response.matchedSkills.map((skill, idx) => (
                <span
                  key={idx}
                  className="
                    px-3 py-1
                    rounded-full
                    bg-green-100
                    text-green-700
                    text-sm
                    font-medium
                    break-all
                  "
                >
                  {skill}
                </span>
              ))}
            </div>

            {/* Missing Keywords */}
            <p className="text-slate-700 mb-3 font-medium">
              Missing Keywords:
            </p>

            <div className="flex flex-wrap gap-2 mb-5">
              {matchResult.response.missingKeywords.map((kw, idx) => (
                <span
                  key={idx}
                  className="
                    px-3 py-1
                    rounded-full
                    bg-red-100
                    text-red-700
                    text-sm
                    font-medium
                    break-all
                  "
                >
                  {kw}
                </span>
              ))}
            </div>

            {/* Missing Skills */}
            <p className="text-slate-700 mb-3 font-medium">
              Missing Skills:
            </p>

            <div className="flex flex-wrap gap-2 mb-5">
              {matchResult.response.missingSkills.map((skill, idx) => (
                <span
                  key={idx}
                  className="
                    px-3 py-1
                    rounded-full
                    bg-yellow-100
                    text-yellow-700
                    text-sm
                    font-medium
                    break-all
                  "
                >
                  {skill}
                </span>
              ))}
            </div>

            {/* Suggestions */}
            <p className="text-slate-700 mb-3 font-semibold">
              Suggestions:
            </p>

            <ul className="list-disc list-inside text-slate-700 space-y-2 mb-4 leading-relaxed">
              {matchResult.response.suggestions.map((s, idx) => (
                <li key={idx}>{s}</li>
              ))}
            </ul>

            {/* Summary */}
            <p className="text-slate-700 italic leading-relaxed">
              {matchResult.response.summary}
            </p>

          </div>
        )}
      </div>
    </section>

    {/* AI TIP */}
    <section className="px-5 sm:px-8 lg:px-10 pb-8 sm:pb-10 flex justify-center">
      <div
        className="
          max-w-3xl
          w-full
          p-6 sm:p-8
          rounded-xl
          bg-gradient-to-r from-indigo-700 via-pink-600 to-emerald-600
          text-white
          shadow-2xl
          text-center
        "
      >
        <h3 className="text-xl sm:text-2xl font-bold mb-4">
          AI Tip of the Day
        </h3>

        <div className="text-base sm:text-lg font-medium leading-relaxed">
          <ReactMarkdown>{tip}</ReactMarkdown>
        </div>
      </div>
    </section>

    <Footer />
  </div>
);