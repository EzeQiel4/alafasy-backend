import { useEffect, useState } from "react";
import { BookOpen, Quote } from "lucide-react";

const verses = [
  {
    arabic: "مَّثَلُ ٱلَّذِينَ يُنفِقُونَ أَمْوَٰلَهُمْ فِى سَبِيلِ ٱللَّهِ كَمَثَلِ حَبَّةٍ أَنۢبَتَتْ سَبْعَ سَنَابِلَ فِى كُلِّ سُنۢبُلَةٍ مِّائَةُ حَبَّةٍ ۗ وَٱللَّهُ يُضَافِعُ لِمَن يَشَآءُ ۗ وَٱللَّهُ وََٰسِعٌ عَلِيمٌ",
    translation:
      "The example of those who spend their wealth in the way of Allah is like a seed [of grain] which grows seven spikes; in each spike is a hundred grains…",
    reference: "Surah Al-Baqarah (2:261)",
  },
  {
    arabic: "وَمَا تُنفِقُوا۟ مِن خَيْرٍ فَلِأَنفُسِكُمْ ۖ وَمَا تُنفِقُونَ إِلَّا ٱبْتِغَآءَ وَجهِ ٱللَّهِ ۚ وَمَا تُنفِقُوا۟ مِن خَيْرٍ يُوَفَّ إِلَيْكُمْ وَأَنتُمْ لَا تُظۡلَمُونَ",
    translation:
      "And whatever you spend of good – it will be fully repaid to you, and you will not be wronged.",
    reference: "Surah Al-Baqarah (2:272)",
  },
  {
    arabic: "مَّن ذَا ٱلَّذِى يُقْرِضُ ٱللَّهَ قَرْضًا حَسَنًا فَيُضَٰعِفَهُۥ لَهُۥٓ أَضۡعَافًا كَثِيرَةًۢ ۚ وَٱللَّهُ يَقۡضُرُ وَيَبۡسُطُۖ وَإِلَيْهِ تُرجَعُونَ",
    translation:
      "Those who give charity, men and women, and loan Allah a goodly loan — it will be multiplied for them…",
    reference: "Surah Al-Hadid (57:18)",
  },
];

export default function QuranSection() {
  const [visible, setVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.2 }
    );
    const el = document.getElementById("quran-section");
    if (el) observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % verses.length);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="quran-section"
      className="relative py-24 sm:py-32 bg-gradient-to-b from-emerald-950 via-emerald-900 to-emerald-950 overflow-hidden"
    >
      {/* Subtle background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-amber-400 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-emerald-400 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6">
        {/* Section header */}
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="inline-flex items-center gap-2 text-amber-400 mb-4">
            <BookOpen className="w-5 h-5" />
            <span className="text-sm font-medium tracking-widest uppercase">From the Holy Qur'an</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            Words of <span className="text-amber-400">Mercy</span> & Reward
          </h2>
          <p className="text-emerald-200/70 max-w-xl mx-auto">
            Let these divine words guide your heart toward giving and strengthen your intention.
          </p>
        </div>

        {/* Active verse card */}
        <div
          className={`transition-all duration-700 delay-300 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="relative bg-gradient-to-br from-emerald-800/50 to-emerald-900/50 border border-amber-500/20 rounded-3xl p-8 sm:p-12 mb-8 backdrop-blur-sm">
            <Quote className="absolute top-6 left-6 w-8 h-8 text-amber-400/20" />
            <Quote className="absolute bottom-6 right-6 w-8 h-8 text-amber-400/20 rotate-180" />

            {/* Arabic text */}
            <div className="text-right mb-8">
              <p className="text-2xl sm:text-3xl text-amber-200/90 leading-relaxed font-arabic" dir="rtl" lang="ar">
                {verses[activeIndex].arabic}
              </p>
            </div>

            {/* Divider */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />
              <div className="w-2 h-2 bg-amber-400/50 rounded-full" />
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />
            </div>

            {/* Translation */}
            <blockquote className="text-lg sm:text-xl text-emerald-100/90 leading-relaxed italic mb-4">
              "{verses[activeIndex].translation}"
            </blockquote>
            <p className="text-amber-400/80 font-medium text-sm">{verses[activeIndex].reference}</p>
          </div>

          {/* Verse indicators */}
          <div className="flex justify-center gap-3">
            {verses.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  i === activeIndex
                    ? "bg-amber-400 scale-125"
                    : "bg-emerald-700 hover:bg-emerald-600"
                }`}
                aria-label={`Verse ${i + 1}`}
              />
            ))}
          </div>
        </div>

        {/* All verses grid for mobile */}
        <div className="mt-12 grid gap-6 sm:hidden">
          {verses.map((verse, i) => (
            <div
              key={i}
              className="bg-emerald-800/30 border border-emerald-700/30 rounded-2xl p-6"
            >
              <p className="text-lg text-amber-200/80 mb-4" dir="rtl" lang="ar">
                {verse.arabic}
              </p>
              <p className="text-emerald-100/70 text-sm italic mb-2">"{verse.translation}"</p>
              <p className="text-amber-400/60 text-xs">{verse.reference}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
