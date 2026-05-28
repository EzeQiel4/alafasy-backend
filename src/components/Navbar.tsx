import { useState } from "react";
import { Moon, Heart, Menu, X, Ticket, BookOpen, Headphones } from "lucide-react";

const navLinks = [
  { label: "Biography", href: "#alafasy-bio-section", icon: BookOpen },
  { label: "Recitations", href: "#audio-section", icon: Headphones },
  { label: "Tickets", href: "#tickets-section", icon: Ticket },
  { label: "Prayers", href: "#prayer-section", icon: BookOpen },
  { label: "Donate", href: "#campaigns-section", icon: Heart },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setMobileMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-emerald-950/95 backdrop-blur-md border-b border-amber-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <Moon className="w-7 h-7 text-amber-400" />
              <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 rounded-full animate-pulse" />
            </div>
            <div>
              <span className="text-white font-bold text-lg tracking-wide">Alafasy</span>
              <span className="text-amber-400 font-light text-lg ml-1">Sadaqah</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => scrollToSection(link.href)}
                className="flex items-center gap-2 px-4 py-2 text-emerald-200/70 hover:text-amber-400 text-sm font-medium rounded-lg hover:bg-emerald-800/30 transition-all duration-300"
              >
                <link.icon className="w-4 h-4" />
                {link.label}
              </button>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-2">
            <button
              onClick={() => scrollToSection("#tickets-section")}
              className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-emerald-950 font-semibold px-4 py-2 rounded-lg text-sm transition-all duration-300 flex items-center gap-2"
            >
              <Ticket className="w-4 h-4" />
              Get Tickets
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-emerald-200/70 hover:text-white transition-colors"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          mobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-4 pb-4 space-y-1 border-t border-emerald-800/30">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => scrollToSection(link.href)}
              className="w-full flex items-center gap-3 px-4 py-3 text-emerald-200/70 hover:text-amber-400 hover:bg-emerald-800/30 rounded-lg transition-all duration-300"
            >
              <link.icon className="w-5 h-5" />
              <span className="font-medium">{link.label}</span>
            </button>
          ))}
          <button
            onClick={() => scrollToSection("#tickets-section")}
            className="w-full mt-2 bg-gradient-to-r from-amber-500 to-amber-600 text-emerald-950 font-semibold px-4 py-3 rounded-lg transition-all duration-300 flex items-center justify-center gap-2"
          >
            <Ticket className="w-5 h-5" />
            Get Tickets
          </button>
        </div>
      </div>
    </nav>
  );
}
