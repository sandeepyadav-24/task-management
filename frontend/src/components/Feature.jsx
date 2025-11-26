import React, { useEffect, useState } from "react";
import {
  LockClosedIcon,
  UserGroupIcon,
  ChartBarIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline";

export default function Feature() {
  const floatingElements = [
    {
      size: "w-64 h-64",
      color:
        "bg-gradient-to-br from-red-400/30 via-orange-500/25 to-yellow-500/20",
      animation: "animate-float-slow",
      shape: "rounded-[60%_40%_50%_50%/40%_50%_60%_50%]",
      opacity: "opacity-80",
      blur: "blur-2xl",
      zIndex: -1,
    },
    {
      size: "w-32 h-32",
      color: "bg-transparent border-[3px] border-dashed border-red-400/40",
      animation: "animate-spin-slow",
      shape: "rounded-full",
      opacity: "opacity-80",
      zIndex: -1,
    },
    ...Array(6)
      .fill(null)
      .map(() => ({
        size: "w-3 h-3",
        color: "bg-red-500/50",
        animation: "animate-pulse-glow",
        shape: "rounded-full",
        opacity: "opacity-80",
        blur: "blur-sm",
        zIndex: -1,
      })),
  ];

  const [elements, setElements] = useState([]);

  useEffect(() => {
    const generateElements = () => {
      return floatingElements.map((base, i) => ({
        ...base,
        id: i,
        left: `${Math.random() * 90 + 5}%`,
        top: `${Math.random() * 90 + 5}%`,
        delay: `${Math.random() * 5}s`,
        scale: Math.random() * 0.3 + 0.7,
      }));
    };

    setElements(generateElements());

    const interval = setInterval(() => {
      setElements(generateElements());
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      name: "Enterprise Security",
      description:
        "Your data is protected with enterprise-grade encryption and compliance.",
      icon: LockClosedIcon,
    },
    {
      name: "Smart Organization",
      description:
        "Organize tasks by projects, priority, and deadlines with intuitive categorization.",
      icon: UserGroupIcon,
    },
    {
      name: "Advanced Analytics",
      description:
        "Track progress with detailed reports and productivity insights.",
      icon: ChartBarIcon,
    },
    {
      name: "Real-time Collaboration",
      description:
        "Work together seamlessly with live updates and instant notifications.",
      icon: ShieldCheckIcon,
    },
  ];

  return (
    <div className="relative bg-white py-24 sm:py-32 overflow-hidden">
      {/* Floating Background Elements */}
      <div className="absolute z-10 inset-0 pointer-events-none overflow-hidden">
        {elements.map((element) => (
          <div
            key={element.id}
            className={`absolute ${element.animation}`}
            style={{
              left: element.left,
              top: element.top,
              animationDelay: element.delay,
              transform: `scale(${element.scale})`,
              zIndex: element.zIndex || -1,
            }}
          >
            <div
              className={`
                ${element.size}
                ${element.color}
                ${element.shape || ""}
                ${element.opacity || "opacity-80"}
                ${element.blur || ""}
                transition-all duration-300
                backdrop-blur-sm
              `}
            />
          </div>
        ))}
      </div>

      {/* Gradient Backgrounds */}
      <div className="absolute top-0 -left-4 w-[800px] h-[800px] bg-gradient-to-br from-red-100/40 via-orange-100/30 to-transparent rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-gradient-to-tl from-yellow-100/40 via-red-100/30 to-transparent rounded-full blur-[120px] -z-10" />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-gradient-to-r from-red-50/20 via-orange-50/20 to-yellow-50/20 rounded-full blur-[150px] -z-20" />

      {/* Main Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center mb-20">
          <div className="flex justify-center gap-2 mb-6">
            <div className="w-2 h-2 bg-red-500 animate-pulse" />
            <div className="w-2 h-2 bg-red-500 rotate-45 animate-pulse delay-100" />
            <div className="w-2 h-2 bg-red-500 animate-pulse delay-200" />
            <div className="w-2 h-2 bg-red-500 rotate-45 animate-pulse delay-300" />
            <div className="w-2 h-2 bg-red-500 animate-pulse delay-400" />
          </div>

          <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Platform Features <br />
            <span className="text-red-600">Built for Teams</span>
          </h2>

          <p className="mt-6 text-lg leading-8 text-gray-600 max-w-2xl mx-auto">
            A comprehensive platform designed to provide transparent way to
            organize, track, and complete your tasks efficiently.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => (
            <div
              key={feature.name}
              className="group relative bg-white rounded-2xl p-8
                        shadow-[0_8px_30px_rgb(0,0,0,0.04)]
                        hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)]
                        transition-all duration-500 transform hover:-translate-y-2
                        border border-gray-100 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-red-50 to-orange-50 opacity-0 group-hover:opacity-50 transition-opacity duration-500" />
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-red-100 to-orange-50 rounded-full opacity-20 group-hover:opacity-30 transition-opacity duration-500" />

              <div className="relative z-10">
                <div className="bg-gradient-to-br from-red-100 via-red-50 to-orange-50 rounded-xl w-16 h-16 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 shadow-[0_4px_15px_rgb(0,0,0,0.05)]">
                  <feature.icon className="h-8 w-8 text-red-600 transform group-hover:rotate-12 transition-transform duration-500" />
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-red-600 transition-colors duration-300">
                  {feature.name}
                </h3>

                <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300 leading-relaxed">
                  {feature.description}
                </p>

                <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-red-500 to-orange-500 w-0 group-hover:w-full transition-all duration-500" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
