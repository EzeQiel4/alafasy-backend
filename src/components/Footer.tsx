import { Heart, Moon, BookOpen, Globe } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-b from-emerald-950 to-black border-t border-emerald-800/30">
      {/* Footer content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <Moon className="w-6 h-6 text-amber-400" />
              <span className="text-white font-bold text-lg">
                Alafasy <span className="text-amber-400 font-light">Sadaqah</span>
              </span>
            </div>
            <p className="text-emerald-200/50 text-sm leading-relaxed">
              A simple and sincere way to give Sadaqah — guided by Qur'an, inspired by faith, and directed toward 
              those in urgent need.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-amber-400/60" />
              Learn
            </h4>
            <ul className="space-y-2.5">
              {["Why Give Sadaqah?", "Qur'anic Verses", "Benefits of Charity", "Zakat vs Sadaqah"].map((item) => (
                <li key={item}>
                  <a href="#" className="text-emerald-200/50 hover:text-amber-400/80 text-sm transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Causes */}
          <div>
            <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
              <Globe className="w-4 h-4 text-amber-400/60" />
              Causes
            </h4>
            <ul className="space-y-2.5">
              {["🇮🇷 Iran Relief", "🇵🇰 Pakistan Relief", "🇵🇸 Gaza Emergency"].map((item) => (
                <li key={item}>
                  <a href="#" className="text-emerald-200/50 hover:text-amber-400/80 text-sm transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
              <Heart className="w-4 h-4 text-amber-400/60" />
              Support
            </h4>
            <ul className="space-y-2.5">
              {["Contact Us", "FAQ", "Privacy Policy", "Terms of Service"].map((item) => (
                <li key={item}>
                  <a href="#" className="text-emerald-200/50 hover:text-amber-400/80 text-sm transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-emerald-800/30 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-emerald-200/30 text-xs">
            © 2025 Alafasy Sadaqah Platform. Built with ❤️ for humanity.
          </p>
          <p className="text-emerald-200/30 text-xs italic">
            "The best of people are those that bring most benefit to the rest of humanity."
          </p>
        </div>
      </div>
    </footer>
  );
}
