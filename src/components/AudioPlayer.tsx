import { useEffect, useState, useRef } from "react";
import { Play, Pause, SkipForward, SkipBack, Volume2, VolumeX, Music2, ChevronDown, ChevronUp } from "lucide-react";

interface AudioTrack {
  id: number;
  title: string;
  arabic: string;
  surah: string;
  url: string;
  clipDuration: number; // seconds — when to stop and skip to next
  displayDuration: string;
  note: string;
}

const CDN = "https://cdn.islamic.network/quran/audio-surah/128/ar.alafasy";

const recitations: AudioTrack[] = [
  {
    id: 1,
    title: "Ar-Rahman Opening",
    arabic: "سورة الرحمن",
    surah: "Surah 55",
    url: `${CDN}/55.mp3`,
    clipDuration: 58,
    displayDuration: "0:58",
    note: "A longer reflective opening clip",
  },
  {
    id: 2,
    title: "Ya-Sin Opening",
    arabic: "سورة يس",
    surah: "Surah 36",
    url: `${CDN}/36.mp3`,
    clipDuration: 62,
    displayDuration: "1:02",
    note: "A calm one-minute recitation moment",
  },
  {
    id: 3,
    title: "Al-Mulk Reflection",
    arabic: "سورة الملك",
    surah: "Surah 67",
    url: `${CDN}/67.mp3`,
    clipDuration: 52,
    displayDuration: "0:52",
    note: "A powerful opening section",
  },
  {
    id: 4,
    title: "Al-Kahf Beginning",
    arabic: "سورة الكهف",
    surah: "Surah 18",
    url: `${CDN}/18.mp3`,
    clipDuration: 64,
    displayDuration: "1:04",
    note: "A longer featured clip for reflection",
  },
  {
    id: 5,
    title: "Al-Waqi'ah Opening",
    arabic: "سورة الواقعة",
    surah: "Surah 56",
    url: `${CDN}/56.mp3`,
    clipDuration: 57,
    displayDuration: "0:57",
    note: "A beautiful featured excerpt",
  },
  {
    id: 6,
    title: "Al-Fatiha (Full)",
    arabic: "سورة الفاتحة",
    surah: "Surah 1",
    url: `${CDN}/1.mp3`,
    clipDuration: 90,
    displayDuration: "1:30",
    note: "The full opening chapter",
  },
];

function formatTime(sec: number) {
  if (!sec || Number.isNaN(sec) || !Number.isFinite(sec)) return "0:00";
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export default function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.75);
  const [showPlaylist, setShowPlaylist] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const currentTrackRef = useRef(currentTrack);
  currentTrackRef.current = currentTrack;

  const track = recitations[currentTrack];
  const clipDuration = track.clipDuration;
  const progress = Math.min(100, (currentTime / clipDuration) * 100);

  // Initialize audio element ONCE
  useEffect(() => {
    const audio = new Audio();
    audio.volume = 0.75;
    audio.preload = "auto";
    audioRef.current = audio;

    const onTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
      const t = recitations[currentTrackRef.current];
      if (audio.currentTime >= t.clipDuration) {
        // Auto-advance to next track
        const next = (currentTrackRef.current + 1) % recitations.length;
        setCurrentTrack(next);
      }
    };

    const onWaiting = () => setLoading(true);
    const onPlaying = () => { setLoading(false); setErrorMsg(null); };
    const onError = () => {
      setLoading(false);
      setIsPlaying(false);
      setErrorMsg("Could not load this recitation. Try another track.");
    };
    const onEnded = () => {
      const next = (currentTrackRef.current + 1) % recitations.length;
      setCurrentTrack(next);
    };

    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("waiting", onWaiting);
    audio.addEventListener("playing", onPlaying);
    audio.addEventListener("canplay", onPlaying);
    audio.addEventListener("error", onError);
    audio.addEventListener("ended", onEnded);

    return () => {
      audio.pause();
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("waiting", onWaiting);
      audio.removeEventListener("playing", onPlaying);
      audio.removeEventListener("canplay", onPlaying);
      audio.removeEventListener("error", onError);
      audio.removeEventListener("ended", onEnded);
    };
  }, []);

  // When track changes — load new src and play if isPlaying is true
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const t = recitations[currentTrack];
    setLoading(true);
    setCurrentTime(0);
    setErrorMsg(null);

    audio.src = t.url;
    audio.load();

    if (isPlaying) {
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.warn("Play failed:", err);
          setIsPlaying(false);
          setLoading(false);
        });
      }
    } else {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentTrack]);

  // Try autoplay once after first user interaction
  useEffect(() => {
    let started = false;
    const tryStart = () => {
      if (started) return;
      const audio = audioRef.current;
      if (!audio) return;
      started = true;
      audio.src = recitations[0].url;
      audio.load();
      audio.play()
        .then(() => setIsPlaying(true))
        .catch(() => { /* user must click play */ });
      window.removeEventListener("click", tryStart);
      window.removeEventListener("scroll", tryStart);
      window.removeEventListener("touchstart", tryStart);
    };
    window.addEventListener("click", tryStart);
    window.addEventListener("scroll", tryStart);
    window.addEventListener("touchstart", tryStart);
    return () => {
      window.removeEventListener("click", tryStart);
      window.removeEventListener("scroll", tryStart);
      window.removeEventListener("touchstart", tryStart);
    };
  }, []);

  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
      return;
    }

    if (!audio.src) {
      audio.src = recitations[currentTrack].url;
      audio.load();
    }

    try {
      setLoading(true);
      await audio.play();
      setIsPlaying(true);
      setLoading(false);
      setErrorMsg(null);
    } catch (err) {
      console.error("Play error:", err);
      setIsPlaying(false);
      setLoading(false);
      setErrorMsg("Playback blocked. Please tap play again.");
    }
  };

  const nextTrack = () => {
    setCurrentTrack((p) => (p + 1) % recitations.length);
    setIsPlaying(true);
  };

  const prevTrack = () => {
    setCurrentTrack((p) => (p - 1 + recitations.length) % recitations.length);
    setIsPlaying(true);
  };

  const selectTrack = (idx: number) => {
    setCurrentTrack(idx);
    setIsPlaying(true);
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const onVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = Number(e.target.value);
    setVolume(v);
    if (audioRef.current) audioRef.current.volume = v;
  };

  const seek = (e: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current;
    if (!audio) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    audio.currentTime = ratio * clipDuration;
  };

  return (
    <section className="relative bg-gradient-to-b from-emerald-950 to-slate-950 py-16 sm:py-20 border-b border-emerald-800/20">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-48 bg-amber-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 text-amber-400 mb-3">
            <Music2 className="w-4 h-4" />
            <span className="text-xs font-medium tracking-widest uppercase">Featured Recitations</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white">
            Qur'an by <span className="text-amber-400">Sheikh Alafasy</span>
          </h2>
          <p className="text-emerald-200/50 text-sm mt-2">
            Now playing 50–90 second featured clips for a more immersive listen.
          </p>
        </div>

        <div className="bg-gradient-to-br from-emerald-900/60 to-slate-900/70 border border-amber-500/20 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-sm">
          <div className="text-center mb-6">
            <div className="flex justify-center items-end gap-1 h-8 mb-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className={`w-1.5 rounded-full bg-amber-400 transition-all duration-300 ${isPlaying ? "animate-pulse" : ""}`}
                  style={{
                    height: isPlaying ? `${12 + (i % 3) * 8}px` : "6px",
                    animationDelay: `${i * 0.1}s`,
                    opacity: isPlaying ? 0.9 : 0.3,
                  }}
                />
              ))}
            </div>

            <h3 className="text-xl font-bold text-white mb-0.5">{track.title}</h3>
            <p className="text-amber-300/80 text-base mb-0.5" dir="rtl" lang="ar">{track.arabic}</p>
            <p className="text-emerald-200/40 text-xs">{track.surah} • {track.displayDuration}</p>
            <p className="text-emerald-200/40 text-xs mt-1">{track.note}</p>

            {loading && (
              <div className="mt-2 inline-flex items-center gap-1.5 text-xs text-amber-400/70">
                <div className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-bounce" style={{ animationDelay: "0s" }} />
                <div className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-bounce" style={{ animationDelay: "0.15s" }} />
                <div className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-bounce" style={{ animationDelay: "0.3s" }} />
                <span>Loading audio…</span>
              </div>
            )}

            {errorMsg && (
              <p className="mt-2 text-xs text-red-300/80">{errorMsg}</p>
            )}
          </div>

          <div className="group relative h-2 bg-emerald-800/60 rounded-full mb-2 cursor-pointer" onClick={seek}>
            <div
              className="h-full bg-gradient-to-r from-amber-500 to-amber-400 rounded-full transition-all duration-200 relative"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3.5 h-3.5 bg-white rounded-full shadow opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </div>
          <div className="flex justify-between text-xs text-emerald-200/40 mb-6">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(clipDuration)}</span>
          </div>

          <div className="flex items-center justify-center gap-5 mb-6">
            <button onClick={prevTrack} className="text-emerald-300/60 hover:text-amber-400 transition-colors">
              <SkipBack className="w-6 h-6" />
            </button>

            <button onClick={togglePlay} className="relative group">
              <div className="absolute inset-0 bg-amber-500/30 rounded-full blur-xl group-hover:bg-amber-500/50 transition-all" />
              <div className="relative w-16 h-16 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center shadow-xl shadow-amber-500/30 group-hover:scale-105 transition-transform">
                {isPlaying ? (
                  <Pause className="w-7 h-7 text-emerald-950 fill-emerald-950" />
                ) : (
                  <Play className="w-7 h-7 text-emerald-950 fill-emerald-950 ml-0.5" />
                )}
              </div>
            </button>

            <button onClick={nextTrack} className="text-emerald-300/60 hover:text-amber-400 transition-colors">
              <SkipForward className="w-6 h-6" />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button onClick={toggleMute} className="text-emerald-300/50 hover:text-amber-400 transition-colors">
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={isMuted ? 0 : volume}
                onChange={onVolumeChange}
                className="w-20 h-1 accent-amber-400 cursor-pointer"
              />
            </div>

            <button
              onClick={() => setShowPlaylist(!showPlaylist)}
              className="flex items-center gap-1.5 text-xs text-emerald-300/60 hover:text-amber-400 transition-colors"
            >
              <span>Playlist ({recitations.length})</span>
              {showPlaylist ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
          </div>

          {showPlaylist && (
            <div className="mt-5 pt-5 border-t border-emerald-800/30 space-y-1">
              {recitations.map((t, idx) => (
                <button
                  key={t.id}
                  onClick={() => selectTrack(idx)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all duration-200 ${
                    idx === currentTrack
                      ? "bg-amber-500/15 border border-amber-500/30"
                      : "hover:bg-emerald-800/30 border border-transparent"
                  }`}
                >
                  <div className="w-8 h-8 flex-shrink-0 rounded-lg flex items-center justify-center bg-emerald-800/50">
                    {idx === currentTrack && isPlaying ? (
                      <div className="flex gap-0.5 items-end h-4">
                        <div className="w-0.5 h-2 bg-amber-400 animate-pulse" style={{ animationDelay: "0s" }} />
                        <div className="w-0.5 h-4 bg-amber-400 animate-pulse" style={{ animationDelay: "0.1s" }} />
                        <div className="w-0.5 h-3 bg-amber-400 animate-pulse" style={{ animationDelay: "0.2s" }} />
                      </div>
                    ) : (
                      <span className="text-xs text-emerald-300/50">{idx + 1}</span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-medium truncate ${idx === currentTrack ? "text-amber-300" : "text-white/80"}`}>
                      {t.title}
                    </p>
                    <p className="text-xs text-emerald-200/40 truncate">{t.arabic} • {t.displayDuration}</p>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        <p className="text-center text-emerald-200/30 text-xs mt-4">
          If autoplay is blocked by your browser, tap ▶ to begin.
        </p>
      </div>
    </section>
  );
}
