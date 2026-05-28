import { useEffect, useState } from "react";
import { TrendingUp, Users, MapPin, Heart } from "lucide-react";

const statsData = [
  { icon: Heart, label: "Total Donations", value: 1247, suffix: "", color: "text-rose-400" },
  { icon: TrendingUp, label: "Total Raised", value: 149, suffix: "K", color: "text-emerald-400" },
  { icon: Users, label: "Lives Impacted", value: 20, suffix: "K+", color: "text-amber-400" },
  { icon: MapPin, label: "Regions Served", value: 3, suffix: "", color: "text-blue-400" },
];

function AnimatedCounter({ target, suffix, duration = 2000 }: { target: number; suffix: string; duration?: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const startTime = Date.now();
    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress >= 1) clearInterval(timer);
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration]);

  return <span>{count}{suffix}</span>;
}

export default function StatsSection() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.3 }
    );
    const el = document.getElementById("stats-section");
    if (el) observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="stats-section"
      className="relative py-16 sm:py-20 bg-gradient-to-r from-emerald-900/50 via-slate-900/50 to-emerald-900/50 border-y border-emerald-800/20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {statsData.map((stat, index) => (
            <div
              key={stat.label}
              className={`text-center transition-all duration-700 ${
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className={`inline-flex items-center justify-center p-3 rounded-xl bg-emerald-800/30 mb-3 ${stat.color}`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <div className="text-3xl sm:text-4xl font-bold text-white mb-1">
                {visible ? <AnimatedCounter target={stat.value} suffix={stat.suffix} /> : "0"}
              </div>
              <p className="text-emerald-200/50 text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
