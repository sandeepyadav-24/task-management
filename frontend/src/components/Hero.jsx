import { Link } from "react-router-dom";

const leftFeatures = [
  { id: 1, name: "ORGANIZE" },
  { id: 2, name: "TRACK" },
  { id: 3, name: "COMPLETE" },
  { id: 4, name: "SUCCEED" },
];

const rightFeatures = [
  { id: 1, name: "COLLABORATE" },
  { id: 2, name: "SYNC" },
  { id: 3, name: "AUTOMATE" },
  { id: 4, name: "DELIVER" },
];

export default function Hero() {
  return (
    <div className="relative py-10 overflow-hidden bg-gradient-to-br from-blue-50 to-white flex items-center">
      {/* Background Gradient Effects */}
      <div className="absolute top-0 -left-4 w-[600px] h-[600px] bg-blue-100/30 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-blue-100/20 rounded-full blur-[120px]" />

      <div className="relative w-full max-w-7xl mx-auto px-6 lg:px-8">
        {/* SVG Background */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{ zIndex: 0 }}
          viewBox="0 0 1200 800"
        >
          <defs>
            <linearGradient id="beamGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#60A5FA" />
              <stop offset="100%" stopColor="#2563EB" />
            </linearGradient>

            <radialGradient id="glowGradient" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
            </radialGradient>
          </defs>

          <circle
            cx="5"
            cy="25"
            r="30"
            className="animate-pulse-glow"
            fill="url(#glowGradient)"
          />
          <circle
            cx="50"
            cy="350"
            r="30"
            className="animate-pulse-glow"
            fill="url(#glowGradient)"
          />
          <circle
            cx="450"
            cy="650"
            r="30"
            className="animate-pulse-glow"
            fill="url(#glowGradient)"
          />
          <circle
            cx="1250"
            cy="250"
            r="30"
            className="animate-pulse-glow"
            fill="url(#glowGradient)"
          />
        </svg>

        {/* Left Side Features */}
        <div className="absolute hidden md:block left-10 top-1/2 -translate-y-1/2 space-y-6">
          {leftFeatures.map((feature, index) => (
            <div
              key={feature.id}
              className={`px-6 py-2 rounded-lg backdrop-blur-sm ${
                feature.name === "ORGANIZE" || feature.name === "COMPLETE"
                  ? "bg-blue-600 text-white"
                  : "bg-blue-50/80 text-blue-600"
              } font-medium text-sm flex items-center gap-2 hover:scale-105 transition-transform cursor-pointer animate-fade-in hover:shadow-lg hover:shadow-blue-100/50`}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <span className="w-1.5 h-1.5 bg-current rounded-full pulse" />
              {feature.name}
              <span className="w-1.5 h-1.5 bg-current rounded-full pulse" />
            </div>
          ))}
        </div>

        {/* Right Side Features */}
        <div className="absolute hidden md:block right-10 top-1/2 -translate-y-1/2 space-y-6">
          {rightFeatures.map((feature, index) => (
            <div
              key={feature.id}
              className={`px-6 py-2 rounded-lg backdrop-blur-sm ${
                feature.name === "COLLABORATE" || feature.name === "AUTOMATE"
                  ? "bg-blue-600 text-white"
                  : "bg-blue-50/80 text-blue-600"
              } font-medium text-sm flex items-center gap-2 hover:scale-105 transition-transform cursor-pointer animate-fade-in hover:shadow-lg hover:shadow-blue-100/50`}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <span className="w-1.5 h-1.5 bg-current rounded-full pulse" />
              {feature.name}
              <span className="w-1.5 h-1.5 bg-current rounded-full pulse" />
            </div>
          ))}
        </div>

        {/* Center Content */}
        <div className="mx-auto max-w-3xl text-center relative z-10">
          {/* Dots */}
          <div className="flex justify-center gap-2 mb-6">
            <div className="w-2 h-2 bg-blue-500 animate-pulse" />
            <div className="w-2 h-2 bg-blue-500 rotate-45 animate-pulse delay-100" />
            <div className="w-2 h-2 bg-blue-500 animate-pulse delay-200" />
            <div className="w-2 h-2 bg-blue-500 rotate-45 animate-pulse delay-300" />
            <div className="w-2 h-2 bg-blue-500 animate-pulse delay-400" />
          </div>

          <h1 className="text-[64px] leading-[1.1] my-10 font-bold tracking-tight text-[#1E293B]">
            Manage Your Tasks:
            <br />
            Manage Your <span className="text-blue-600">Productivity</span>
          </h1>

          <p className="mt-8 text-xl leading-8 text-gray-600 max-w-2xl mx-auto">
            Organize tasks effortlessly, collaborate with your team in
            real-time, and achieve your goals faster than ever before. Simple,
            powerful, and built for everyone.
          </p>

          {/* Buttons */}
          <div className="flex justify-center">
            <div className="mt-20 mx-2 relative">
              <Link
                to="/"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors group"
              >
                Explore Insights
                <svg
                  width="20"
                  height="20"
                  fill="none"
                  className="rotate-45 group-hover:rotate-[135deg] transition-transform"
                >
                  <path
                    d="M5 15L15 5M15 5H5M15 5V15"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
            </div>

            <div className="mt-20 mx-2 relative">
              <Link
                to="/"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors group"
              >
                Submit Your Data
                <svg
                  width="20"
                  height="20"
                  fill="none"
                  className="rotate-45 group-hover:rotate-[135deg] transition-transform"
                >
                  <path
                    d="M5 15L15 5M15 5H5M15 5V15"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
