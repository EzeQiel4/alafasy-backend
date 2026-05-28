import { useEffect, useState } from "react";
import { Moon, Sparkles, ArrowDown } from "lucide-react";
import GeometricPattern from "./GeometricPattern";

export default function Hero({ onScrollToCauses }: { onScrollToCauses: () => void }) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-emerald-950 via-emerald-900 to-emerald-950">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-30">
        <GeometricPattern className="w-full h-full text-amber-400" />
      </div>

      {/* Ambient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        {/* Crescent moon icon */}
        <div
          className={`transition-all duration-1000 delay-200 ${
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="inline-flex items-center justify-center mb-8">
            <div className="relative">
              <div className="absolute inset-0 bg-amber-400/20 rounded-full blur-xl animate-pulse" />
              <div className="relative bg-gradient-to-br from-amber-300 to-amber-500 p-5 rounded-full shadow-lg shadow-amber-500/30">
                <Moon className="w-10 h-10 text-emerald-900" />
              </div>
            </div>
          </div>
        </div>

        {/* Bismillah */}
        <p
          className={`text-2xl sm:text-3xl text-amber-300/90 font-light mb-4 transition-all duration-1000 delay-300 ${
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          dir="rtl"
          lang="ar"
        >
          بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ
        </p>

        {/* Main heading */}
        <h1
          className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight transition-all duration-1000 delay-500 ${
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          Give <span className="text-amber-400">Sadaqah</span>
          <br />
          <span className="text-3xl sm:text-4xl md:text-5xl font-light text-emerald-100">
            with Faith & Sincerity
          </span>
        </h1>

        {/* Subtitle */}
        <p
          className={`text-lg sm:text-xl text-emerald-200/80 max-w-2xl mx-auto mb-10 leading-relaxed transition-all duration-1000 delay-700 ${
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          A simple and sincere way to give charity — guided by Qur'an, inspired by faith,
          and directed toward those in urgent need.
        </p>

        {/* CTA */}
        <div
          className={`transition-all duration-1000 delay-900 ${
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <button
            onClick={onScrollToCauses}
            className="group inline-flex items-center gap-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-emerald-950 font-semibold px-8 py-4 rounded-full text-lg transition-all duration-300 shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 hover:scale-105"
          >
            <Sparkles className="w-5 h-5" />
            Begin Your Journey
            <ArrowDown className="w-5 h-5 group-hover:translate-y-0.5 transition-transform" />
          </button>
        </div>

        {/* Floating sparkles */}
        <div className="absolute top-20 left-10 text-amber-400/30 animate-bounce" style={{ animationDelay: "0s" }}>
          <Sparkles className="w-4 h-4" />
        </div>
        <div className="absolute top-40 right-20 text-amber-400/20 animate-bounce" style={{ animationDelay: "1s" }}>
          <Sparkles className="w-3 h-3" />
        </div>
        <div className="absolute bottom-40 left-20 text-amber-400/20 animate-bounce" style={{ animationDelay: "2s" }}>
          <Sparkles className="w-3 h-3" />
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-emerald-950 to-transparent" />
    </section>
  );
}
