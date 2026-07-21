export default function ResumeIQLogo() {
  return (
    <div className="flex items-center space-x-3">
      {/* Gradient square icon */}
      <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center shadow-md">
        {/* Document-like symbol */}
        <div className="bg-white rounded-md p-1 w-8 h-8 flex flex-col justify-center">
          <div className="h-1 w-full bg-indigo-400 rounded mb-1"></div>
          <div className="h-1 w-3/4 bg-emerald-400 rounded mb-1"></div>
          <div className="h-1 w-2/3 bg-yellow-400 rounded"></div>
        </div>
      </div>

      {/* Text */}
      <span className="text-2xl font-extrabold tracking-tight">
        <span className="text-indigo-600">Resume</span>
        <span className="text-emerald-500">IQ</span>
      </span>
    </div>
  );
}