import React from "react";

export default function Stats() {
  const stats = [
    { value: "92%", label: "Tasks Completed On Time" },
    { value: "4.8 ⭐️", label: "User Productivity Rating" },
    { value: "120+", label: "Tasks Automated Per Month" },
  ];

  return (
    <div className="bg-[#0A0F1C] relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-5 left-10">
        <div className="w-3 h-3 bg-blue-500 rotate-45" />
      </div>
      <div className="absolute top-20 right-20">
        <div className="w-3 h-3 bg-blue-500 rotate-45" />
      </div>
      <div className="absolute bottom-10 left-1/4">
        <div className="w-3 h-3 bg-blue-500 rotate-45" />
      </div>

      <div className="max-w-7xl mx-auto px-6 py-24 sm:py-32 lg:px-8">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="flex justify-center gap-2 mb-6">
            <div className="w-2 h-2 bg-blue-500 animate-pulse" />
            <div className="w-2 h-2 bg-blue-500 rotate-45 animate-pulse delay-100" />
            <div className="w-2 h-2 bg-blue-500 animate-pulse delay-200" />
            <div className="w-2 h-2 bg-blue-500 rotate-45 animate-pulse delay-300" />
            <div className="w-2 h-2 bg-blue-500 animate-pulse delay-400" />
          </div>

          <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Your Productivity, Made Visible
          </h2>

          <p className="mt-4 text-lg leading-8 text-gray-400">
            Track your progress, manage tasks efficiently, and stay on top of
            your goals
            <br /> — with real-time insights, smart automation, and clear
            metrics that actually matter.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 gap-y-16 gap-x-8 text-center lg:grid-cols-3">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 hover:bg-white/10 transition-colors"
            >
              <dt className="text-[72px] leading-none font-bold tracking-tight text-indigo-500">
                {stat.value}
              </dt>
              <dd className="mt-6 text-lg font-medium text-gray-400">
                {stat.label}
              </dd>
            </div>
          ))}
        </div>

        {/* Extra Decorative Elements */}
        <div className="relative mt-20">
          <div className="absolute -top-40 left-20">
            <div className="w-2 h-2 bg-yellow-400 rotate-45" />
          </div>
          <div className="absolute -top-20 right-40">
            <div className="w-2 h-2 bg-blue-400 rotate-45" />
          </div>
          <div className="absolute top-0 left-1/3">
            <div className="w-3 h-3 bg-blue-500 rotate-45" />
          </div>
        </div>
      </div>
    </div>
  );
}
