import { useEffect, useState, useRef } from "react";
import {
  Play,
  Pause,
  SkipForward,
  SkipBack,
  BookOpen,
  Heart,
  RefreshCw,
  Volume2,
} from "lucide-react";

interface Prayer {
  id: number;
  title: string;
  arabic: string;
  translation: string;
  when: string;
  audio: string;
  audioLabel: string;
}

const prayers: Prayer[] = [
  {
    id: 1,
    title: "Surah Ar-Rahman",
    arabic: "فَبِأَيِّ آلَاءِ رَبِّكُمَا تُكَذِّبَانِ",
    translation:
      "Which of the favors of your Lord will you deny?",
    when: "For gratitude & reflection",
    audio:
      "https://download.quranicaudio.com/quran/mishaari_raashid_al_3afaasee/055.mp3",
    audioLabel: "Sheikh Alafasy — Surah Ar-Rahman",
  },

  {
    id: 2,
    title: "Surah Yasin",
    arabic: "سَلَامٌ قَوْلًا مِن رَّبٍّ رَّحِيمٍ",
    translation:
      "Peace — a word from a Merciful Lord.",
    when: "For peace & mercy",
    audio:
      "https://download.quranicaudio.com/quran/mishaari_raashid_al_3afaasee/036.mp3",
    audioLabel: "Sheikh Alafasy — Surah Yasin",
  },

  {
    id: 3,
    title: "Surah Al-Mulk",
    arabic: "تَبَارَكَ الَّذِي بِيَدِهِ الْمُلْكُ",
    translation:
      "Blessed is He in whose hand is dominion.",
    when: "For protection",
    audio:
      "https://download.quranicaudio.com/quran/mishaari_raashid_al_3afaasee/067.mp3",
    audioLabel: "Sheikh Alafasy — Surah Al-Mulk",
  },

  {
    id: 4,
    title: "Surah Al-Kahf",
    arabic:
      "إِنَّا جَعَلْنَا مَا عَلَى الْأَرْضِ زِينَةً لَّهَا",
    translation:
      "We made what is upon the earth an adornment for it.",
    when: "For Friday reflection",
    audio:
      "https://download.quranicaudio.com/quran/mishaari_raashid_al_3afaasee/018.mp3",
    audioLabel: "Sheikh Alafasy — Surah Al-Kahf",
  },

  {
    id: 5,
    title: "Surah Maryam",
    arabic: "وَاذْكُرْ فِي الْكِتَابِ مَرْيَمَ",
    translation:
      "And mention in the Book, Mary.",
    when: "For mercy & inspiration",
    audio:
      "https://download.quranicaudio.com/quran/mishaari_raashid_al_3afaasee/019.mp3",
    audioLabel: "Sheikh Alafasy — Surah Maryam",
  },
];

export default function PrayerSection() {
  const [visible, setVisible] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentPrayer, setCurrentPrayer] = useState(0);
  const [loadingAudio, setLoadingAudio] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const el = document.getElementById("prayer-section");

    if (el) observer.observe(el);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const audio = new Audio(prayers[0].audio);

    audio.volume = 0.45;
    audio.preload = "auto";
    audio.crossOrigin = "anonymous";

    const onWaiting = () => {
      setLoadingAudio(true);
    };

    const onCanPlay = () => {
      setLoadingAudio(false);
    };

    const onEnded = () => {
      setCurrentPrayer((prev) => (prev + 1) % prayers.length);
    };

    const onError = (e: Event) => {
      console.error("Audio failed:", e);

      setLoadingAudio(false);
      setIsPlaying(false);
    };

    audio.addEventListener("waiting", onWaiting);
    audio.addEventListener("canplay", onCanPlay);
    audio.addEventListener("ended", onEnded);
    audio.addEventListener("error", onError);

    audioRef.current = audio;

    return () => {
      audio.pause();

      audio.removeEventListener("waiting", onWaiting);
      audio.removeEventListener("canplay", onCanPlay);
      audio.removeEventListener("ended", onEnded);
      audio.removeEventListener("error", onError);
    };
  }, []);

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) return;

    audio.pause();

    setLoadingAudio(true);

    audio.src =
      prayers[currentPrayer].audio +
      "?t=" +
      Date.now();

    audio.load();

    if (isPlaying) {
      audio
        .play()
        .then(() => {
          setLoadingAudio(false);
        })
        .catch((error) => {
          console.error("Play failed:", error);

          setIsPlaying(false);
          setLoadingAudio(false);
        });
    }
  }, [currentPrayer]);

  const togglePlayPause = async () => {
    const audio = audioRef.current;

    if (!audio) return;

    try {
      if (isPlaying) {
        audio.pause();

        setIsPlaying(false);
      } else {
        setLoadingAudio(true);

        audio.load();

        await audio.play();

        setIsPlaying(true);
        setLoadingAudio(false);
      }
    } catch (error) {
      console.error(
        "Prayer audio error:",
        error
      );

      setIsPlaying(false);
      setLoadingAudio(false);
    }
  };

  const handleNext = () => {
    setCurrentPrayer(
      (prev) => (prev + 1) % prayers.length
    );
  };

  const handlePrev = () => {
    setCurrentPrayer(
      (prev) =>
        (prev - 1 + prayers.length) %
        prayers.length
    );
  };

  const selectPrayer = (index: number) => {
    setCurrentPrayer(index);
  };

  const prayer = prayers[currentPrayer];

  return (
    <section
      id="prayer-section"
      className="relative py-24 sm:py-32 bg-gradient-to-b from-emerald-950 via-emerald-900 to-emerald-950 overflow-hidden"
    >
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('/images/alafasy-hero.jpg')] bg-cover bg-center opacity-5" />

        <div className="absolute inset-0 bg-gradient-to-b from-emerald-950/95 to-emerald-900/95" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6">
        <div
          className={`text-center mb-12 transition-all duration-700 ${visible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-8"
            }`}
        >
          <div className="inline-flex items-center gap-2 text-amber-400 mb-4">
            <BookOpen className="w-5 h-5" />

            <span className="text-sm font-medium tracking-widest uppercase">
              Prayers & Duas
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            Prayers for{" "}
            <span className="text-amber-400">
              Giving & Receiving
            </span>
          </h2>

          <p className="text-emerald-200/70 max-w-xl mx-auto">
            Reflect on these blessed duas while
            listening to selected recitations by
            Sheikh Alafasy.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          <div
            className={`transition-all duration-700 delay-200 ${visible
              ? "opacity-100 translate-x-0"
              : "opacity-0 -translate-x-12"
              }`}
          >
            <div className="bg-gradient-to-br from-emerald-800/50 to-slate-900/50 border border-emerald-700/30 rounded-3xl p-8 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-6">
                <span className="text-amber-400/70 text-sm font-medium">
                  {prayer.when}
                </span>

                <span className="bg-emerald-800/50 text-emerald-200/60 text-xs px-3 py-1 rounded-full">
                  {currentPrayer + 1} /{" "}
                  {prayers.length}
                </span>
              </div>

              <h3 className="text-xl font-bold text-white mb-6 text-center">
                {prayer.title}
              </h3>

              <div className="bg-emerald-900/50 rounded-2xl p-6 mb-6 text-center">
                <p
                  className="text-2xl sm:text-3xl text-amber-200/90 leading-relaxed"
                  dir="rtl"
                  lang="ar"
                >
                  {prayer.arabic}
                </p>
              </div>

              <div className="flex items-center gap-4 mb-6">
                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />

                <Heart className="w-3 h-3 text-amber-400/40" />

                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />
              </div>

              <blockquote className="text-lg text-emerald-100/80 italic text-center leading-relaxed mb-6">
                "{prayer.translation}"
              </blockquote>

              <div className="mb-5 rounded-2xl border border-amber-500/20 bg-amber-500/5 p-4 text-center">
                <div className="inline-flex items-center gap-2 text-amber-400/80 text-sm font-medium mb-1">
                  <Volume2 className="w-4 h-4" />

                  Listening track
                </div>

                <p className="text-white text-sm">
                  {prayer.audioLabel}
                </p>

                <p className="text-emerald-200/40 text-xs mt-1">
                  Each prayer card now loads its
                  own working Alafasy recitation.
                </p>
              </div>

              <div className="flex items-center justify-center gap-4">
                <button
                  onClick={handlePrev}
                  className="p-3 bg-emerald-800/50 hover:bg-emerald-700/50 text-emerald-200/60 hover:text-white rounded-xl transition-all duration-300"
                >
                  <SkipBack className="w-5 h-5" />
                </button>

                <button
                  onClick={togglePlayPause}
                  className="p-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-emerald-950 rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/25 hover:scale-105"
                >
                  {isPlaying ? (
                    <Pause className="w-6 h-6" />
                  ) : (
                    <Play className="w-6 h-6 ml-0.5" />
                  )}
                </button>

                <button
                  onClick={handleNext}
                  className="p-3 bg-emerald-800/50 hover:bg-emerald-700/50 text-emerald-200/60 hover:text-white rounded-xl transition-all duration-300"
                >
                  <SkipForward className="w-5 h-5" />
                </button>
              </div>

              <p className="text-emerald-200/40 text-xs text-center mt-4">
                {loadingAudio
                  ? "Loading recitation..."
                  : isPlaying
                    ? "Playing recitation for reflection..."
                    : "Tap play to listen"}
              </p>
            </div>
          </div>

          <div
            className={`transition-all duration-700 delay-400 ${visible
              ? "opacity-100 translate-x-0"
              : "opacity-0 translate-x-12"
              }`}
          >
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-amber-400" />

              Complete Prayer Collection
            </h3>

            <div className="space-y-3">
              {prayers.map((p, index) => (
                <button
                  key={p.id}
                  onClick={() =>
                    selectPrayer(index)
                  }
                  className={`w-full text-left p-4 rounded-xl transition-all duration-300 ${index === currentPrayer
                    ? "bg-amber-500/20 border border-amber-500/30"
                    : "bg-emerald-900/30 border border-emerald-700/20 hover:border-emerald-600/30"
                    }`}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${index === currentPrayer
                        ? "bg-amber-500 text-emerald-950"
                        : "bg-emerald-800/50 text-emerald-200/50"
                        }`}
                    >
                      {index === currentPrayer &&
                        isPlaying ? (
                        <div className="flex gap-0.5 items-end h-4">
                          <div
                            className="w-1 bg-emerald-950 animate-bounce"
                            style={{
                              height: "60%",
                              animationDelay: "0s",
                            }}
                          />

                          <div
                            className="w-1 bg-emerald-950 animate-bounce"
                            style={{
                              height: "100%",
                              animationDelay:
                                "0.1s",
                            }}
                          />

                          <div
                            className="w-1 bg-emerald-950 animate-bounce"
                            style={{
                              height: "40%",
                              animationDelay:
                                "0.2s",
                            }}
                          />
                        </div>
                      ) : (
                        <span className="text-sm font-medium">
                          {index + 1}
                        </span>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <h4 className="text-white font-medium text-sm">
                        {p.title}
                      </h4>

                      <p className="text-emerald-200/50 text-xs">
                        {p.when}
                      </p>

                      <p className="text-amber-400/60 text-xs mt-1">
                        {p.audioLabel}
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            <div className="mt-6 bg-amber-500/10 border border-amber-500/20 rounded-xl p-4">
              <h4 className="text-amber-400 font-medium text-sm mb-2 flex items-center gap-2">
                <RefreshCw className="w-4 h-4" />

                Tips for Sincere Giving
              </h4>

              <ul className="text-emerald-200/60 text-xs space-y-1.5">
                <li>
                  • Say "Bismillah" before giving
                </li>

                <li>
                  • Give with a pure heart,
                  seeking only Allah's reward
                </li>

                <li>
                  • Do not remind people of your
                  charity
                </li>

                <li>
                  • Give from what you love, not
                  what you dislike
                </li>

                <li>
                  • Make dua for those who will
                  receive your charity
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}