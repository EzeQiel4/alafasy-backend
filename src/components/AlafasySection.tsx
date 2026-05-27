import { useEffect, useState } from "react";
import { Play, Quote, Video, ExternalLink } from "lucide-react";

const quotes = [
  {
    text: "The best charity is that given when one is healthy, stingy, fearing poverty, and hoping to be rich.",
    source: "Sahih al-Bukhari",
  },
  {
    text: "When a person dies, his deeds come to an end except for three: ongoing charity (Sadaqah Jariyah), beneficial knowledge, and a righteous child who prays for him.",
    source: "Sahih Muslim",
  },
  {
    text: "Give charity without delay, for calamity descends swiftly.",
    source: "Prophet Muhammad (PBUH)",
  },
];

const videos = [
  {
    id: "L1ws0yy8ptE",
    title: "Surah Ar-Rahman",
    subtitle: "The Most Merciful",
    views: "98M views"
  },
  {
    id: "ekL7N4AWVC0",
    title: "Surah Ya-Sin",
    subtitle: "The Heart of the Quran",
    views: "45M views"
  },
  {
    id: "gzIIe-LOt_E",
    title: "Surah Al-Mulk",
    subtitle: "The Sovereignty",
    views: "32M views"
  },
  {
    id: "h5ojTqckwHo",
    title: "Surah Al-Kahf",
    subtitle: "The Cave",
    views: "28M views"
  },
  {
    id: "eULy-tljA4o",
    title: "Surah Al-Mulk",
    subtitle: "Complete Recitation",
    views: "25M views"
  },
  {
    id: "U3kmyX9jndk",
    title: "Surah Al-Inshirah",
    subtitle: "The Relief",
    views: "18M views"
  },
];

export default function AlafasySection() {
  const [visible, setVisible] = useState(false);
  const [activeQuote, setActiveQuote] = useState(0);
  const [hoveredVideo, setHoveredVideo] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.1 }
    );
    const el = document.getElementById("alafasy-section");
    if (el) observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveQuote((prev) => (prev + 1) % quotes.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="alafasy-section"
      className="relative py-24 sm:py-32 bg-gradient-to-b from-emerald-950 via-emerald-900 to-emerald-950 overflow-hidden"
    >
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section header */}
        <div
          className={`text-center mb-12 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
        >
          <div className="inline-flex items-center gap-2 text-amber-400 mb-4">
            <Video className="w-5 h-5" />
            <span className="text-sm font-medium tracking-widest uppercase">Watch & Listen</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            Featured <span className="text-amber-400">Recitations</span>
          </h2>
          <p className="text-emerald-200/70 max-w-2xl mx-auto text-lg">
            Experience the mesmerizing voice of Sheikh Mishary Rashid Alafasy through
            his most beloved recitations.
          </p>
        </div>

        {/* Quote carousel */}
        <div
          className={`mb-12 transition-all duration-700 delay-200 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
        >
          <div className="relative bg-gradient-to-br from-amber-900/20 to-amber-800/10 border border-amber-500/20 rounded-3xl p-8 max-w-3xl mx-auto">
            <Quote className="absolute top-6 left-6 w-8 h-8 text-amber-400/20" />
            <div className="relative min-h-[100px] flex flex-col justify-center">
              <p className="text-xl sm:text-2xl text-amber-100/90 font-medium leading-relaxed mb-4 italic text-center">
                "{quotes[activeQuote].text}"
              </p>
              <p className="text-amber-400/70 text-sm text-center">— {quotes[activeQuote].source}</p>
            </div>
            <div className="flex gap-2 mt-4 justify-center">
              {quotes.map((_, i) => (
                <div
                  key={i}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${i === activeQuote ? "bg-amber-400 w-6" : "bg-emerald-700"
                    }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Video grid with proper thumbnails */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video, index) => (
            <div
              key={video.id}
              className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
                }`}
              style={{ transitionDelay: `${index * 100 + 400}ms` }}
              onMouseEnter={() => setHoveredVideo(video.id)}
              onMouseLeave={() => setHoveredVideo(null)}
            >
              <a
                href={`https://www.youtube.com/watch?v=${video.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group block"
              >
                <div className="relative aspect-video rounded-2xl overflow-hidden border border-emerald-700/20 hover:border-amber-500/40 transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-amber-500/10">
                  {/* Thumbnail */}
                  <img
                    src={`https://img.youtube.com/vi/${video.id}/hqdefault.jpg`}
                    alt={video.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />

                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

                  {/* YouTube play button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className={`bg-red-600 p-4 rounded-full shadow-lg transition-all duration-300 ${hoveredVideo === video.id
                      ? "scale-110 shadow-red-600/50"
                      : "scale-100 opacity-90"
                      }`}>
                      <Play className="w-8 h-8 text-white ml-1" fill="white" />
                    </div>
                  </div>

                  {/* Duration badge */}
                  <div className="absolute bottom-14 right-3 bg-black/80 text-white text-xs px-2 py-1 rounded">
                    {video.views}
                  </div>

                  {/* Title */}
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <div className="flex items-center gap-2 mb-1">
                      <Video className="w-4 h-4 text-red-500" />
                      <span className="text-emerald-200/50 text-xs">YouTube</span>
                    </div>
                    <h4 className="text-white font-semibold group-hover:text-amber-400 transition-colors">
                      {video.title}
                    </h4>
                    <p className="text-emerald-200/50 text-sm">{video.subtitle}</p>
                  </div>
                </div>
              </a>
            </div>
          ))}
        </div>

        {/* View more button */}
        <div
          className={`mt-10 text-center transition-all duration-700 delay-800 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
        >
          <a
            href="https://www.youtube.com/@alafasy"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-red-500/25"
          >
            <Video className="w-5 h-5" />
            View All on YouTube
            <ExternalLink className="w-4 h-4" />
          </a>
          <p className="text-emerald-200/40 text-sm mt-3">11.6M+ subscribers</p>
        </div>
      </div>
    </section>
  );
}
