import { useEffect, useState } from "react";
import { Award, Users, Globe, Music, Heart, Star, BookOpen } from "lucide-react";

const achievements = [
  { icon: Globe, label: "11.6M+", sublabel: "YouTube Subscribers", description: "Most followed Quran reciter online" },
  { icon: Award, label: "2008", sublabel: "Arab Creativity Oscar", description: "Awarded for promoting Islam & Quran" },
  { icon: Users, label: "60,000+", sublabel: "Led Prayers", description: "Congregations at Grand Mosque, Kuwait" },
  { icon: Music, label: "5+", sublabel: "Nasheed Albums", description: "Recorded in Arabic, English, Japanese & more" },
];

const timeline = [
  { year: "1976", event: "Born in Ardiya, Kuwait on September 5th" },
  { year: "1997", event: "Began career as Imam at Grand Mosque, Kuwait" },
  { year: "2008", event: "Awarded first Arab Creativity Oscar in Egypt" },
  { year: "2024", event: "Official Alafasy App launched worldwide" },
  { year: "2025", event: "Global charity tour with Al Mustafa Welfare Trust" },
];

const bioImages = [
  {
    // Wikipedia Commons — official public photo (red keffiyeh portrait)
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/%D0%9C%D0%B8%D1%88%D0%B0%D1%80%D0%B8_%D0%A0%D0%B0%D1%88%D0%B8%D0%B4.jpg/480px-%D0%9C%D0%B8%D1%88%D0%B0%D1%80%D0%B8_%D0%A0%D0%B0%D1%88%D0%B8%D0%B4.jpg",
    alt: "Sheikh Mishary Rashid Alafasy – official portrait",
    caption: "Iconic Portrait",
  },
  {
    // White Flame Australian tour — Sheikh smiling in white thobe
    src: "https://www.whiteflame.com.au/wp-content/uploads/2025/08/new-website-2-Large.jpeg",
    alt: "Sheikh Mishary Rashid Alafasy – Australian Tour 2025",
    caption: "The Beloved Reciter",
  },
  {
    // White Flame Ramadan & Eid tour
    src: "https://www.whiteflame.com/wp-content/uploads/2025/03/MainPosterV3-Large.jpeg",
    alt: "Sheikh Alafasy – Ramadan & Eid Tour Scandinavia 2025",
    caption: "An Evening of Inspiration",
  },
  {
    // Blogger family/son photo 1
    src: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgqZ4mZEd2uejiHKj9PhGJUdQ7qhVtiAkxfplvgKOH-6AQUApXOncDr1Uquy0n7WhEA9OCI0TnMoaF9P4ELA-8uWNeo_xA2Tu0onU-M-LV94DR_XO12ejPOHpG86geZ3DEevjc4r8ciDfwC/s1600/mishary+rashid+alafasy+sons..jpg",
    alt: "Sheikh Mishary Rashid Alafasy with his son",
    caption: "A Father's Love",
  },
  {
    // Blogger family/son photo 2
    src: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgRZklEFpMhZFaCQDNqnaB2Ca0ajSs-5KTxDBO2k3mNxKY_pIJ1x6ae6QBt0Pr3uVJklgQrLuPdgdL0RUwodwIy3yUySIiw35VtwrtN9KmSsSmL8QKwnWZKSd7xaY_MnMu1DIdx6Ako490Y/s1600/mishary+rashid+alafasy+sons.jpg",
    alt: "Sheikh Mishary Rashid Alafasy – family moment",
    caption: "With His Family",
  },
  {
    // Community visit photo from blog
    src: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhAfDoaBNv2TBtX_3IAbrvp0ehFjCBx1dy-msPleZ0btCo3AqqX6lLc8CXkAZ28eDeoyGP_bTs5BzTrrmZBbj1gHGi588Y6nAxdgIQsjbysJB_ncds7EHfA_adlkaCxFTxAutVWNYtwDOkO/s1600/Hamza+Andreas+Tzortzis+in+mishary+rashid+alafasy+house.jpg",
    alt: "Sheikh Alafasy welcoming guests at his home in Kuwait",
    caption: "Open Heart",
  },
];

export default function AlafasyBio() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.1 }
    );
    const el = document.getElementById("alafasy-bio-section");
    if (el) observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="alafasy-bio-section"
      className="relative py-24 sm:py-32 bg-gradient-to-b from-slate-900 via-emerald-950 to-slate-900 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section header */}
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="inline-flex items-center gap-2 text-amber-400 mb-4">
            <BookOpen className="w-5 h-5" />
            <span className="text-sm font-medium tracking-widest uppercase">The Voice of the Quran</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            Biography of <span className="text-amber-400">Sheikh Mishary Alafasy</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left: Photo and Quick Info */}
          <div
            className={`transition-all duration-700 delay-200 ${
              visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"
            }`}
          >
            {/* Animated biography gallery */}
            <div className="relative mb-8 overflow-hidden rounded-3xl border border-amber-500/20 bg-emerald-950/40 p-4 shadow-2xl">
              <div className="absolute inset-0 bg-amber-500/10 blur-2xl" />
              <div className="relative grid grid-cols-2 gap-4 sm:grid-cols-3">
                {bioImages.map((image, index) => (
                  <div
                    key={image.src}
                    className={`group relative overflow-hidden rounded-2xl border border-emerald-700/30 bg-emerald-900/40 shadow-lg transition-all duration-700 hover:z-10 hover:scale-105 hover:border-amber-400/60 ${
                      visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-16"
                    }`}
                    style={{ transitionDelay: `${index * 140 + 200}ms` }}
                  >
                    <img
                      src={image.src}
                      alt={image.alt}
                      onError={(e) => {
                        const target = e.currentTarget;
                        // Prevent infinite loop
                        if (!target.dataset.fallback) {
                          target.dataset.fallback = "true";
                          target.src = "/images/alafasy-hero.jpg";
                        }
                      }}
                      className={`h-40 w-full object-cover transition-transform duration-700 group-hover:scale-110 ${
                        index === 3 || index === 5 ? "sm:h-52" : "sm:h-44"
                      }`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                    {/* Caption overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-2.5 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <p className="text-white text-xs font-medium drop-shadow-md">{image.caption}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="relative mt-5 rounded-2xl bg-gradient-to-t from-black/60 to-emerald-900/30 p-5">
                <h3 className="text-2xl font-bold text-white">Sheikh Mishary Rashid Alafasy</h3>
                <p className="text-amber-400" dir="rtl">مشاري بن راشد العفاسي</p>
                <p className="mt-2 text-sm text-emerald-200/60">
                  A visual journey through portraits, community moments, and public appearances.
                </p>
              </div>
            </div>

            {/* Quick facts */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Full Name", value: "Mishary bin Rashid bin Gharib Alafasy" },
                { label: "Born", value: "September 5, 1976" },
                { label: "Nationality", value: "Kuwaiti" },
                { label: "Education", value: "Islamic University of Madinah" },
                { label: "Specialization", value: "Ten Qira'at & Tafsir" },
                { label: "Role", value: "Imam, Reciter, Preacher" },
              ].map((item, i) => (
                <div key={i} className="bg-emerald-900/30 border border-emerald-700/20 rounded-xl p-3">
                  <p className="text-emerald-200/40 text-xs">{item.label}</p>
                  <p className="text-white text-sm font-medium">{item.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Biography and Achievements */}
          <div
            className={`transition-all duration-700 delay-400 ${
              visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"
            }`}
          >
            {/* Bio text */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Heart className="w-5 h-5 text-amber-400" />
                About the Sheikh
              </h3>
              <div className="text-emerald-200/70 leading-relaxed space-y-4">
                <p>
                  <span className="text-amber-400 font-semibold">Qari Mishary bin Rashid Alafasy</span> is a 
                  Kuwaiti Quran reciter, imam, preacher, and nasheed artist who has amassed a phenomenal 
                  following online through his beautiful voice and incredible personality.
                </p>
                <p>
                  After studying in the Islamic University of Madinah's College of Quran, Sheikh Mishary 
                  began his journey as an Imam in Kuwait. His melodious voice and impeccable Tajweed have 
                  made him one of the most recognizable and beloved Quran reciters in the world.
                </p>
                <p>
                  In addition to his Quranic recitation, Alafasy has released several nasheed albums. 
                  While he primarily recites in Arabic, he has also recorded nasheeds in other languages 
                  including Japanese, Turkish, English, and French.
                </p>
                <p>
                  On October 25, 2008, Alafasy was awarded the first Arab Creativity Oscar by the 
                  Arab Creativity Union in Egypt, recognizing his tremendous contributions to promoting 
                  Islam and the Quran worldwide.
                </p>
              </div>
            </div>

            {/* Achievements grid */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Star className="w-5 h-5 text-amber-400" />
                Achievements
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {achievements.map((item, index) => (
                  <div
                    key={index}
                    className="bg-gradient-to-br from-emerald-900/50 to-slate-900/50 border border-emerald-700/20 rounded-xl p-4 hover:border-amber-500/30 transition-colors"
                  >
                    <item.icon className="w-5 h-5 text-amber-400 mb-2" />
                    <p className="text-2xl font-bold text-white">{item.label}</p>
                    <p className="text-amber-400 text-sm font-medium">{item.sublabel}</p>
                    <p className="text-emerald-200/50 text-xs mt-1">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Timeline */}
            <div>
              <h3 className="text-xl font-bold text-white mb-4">Journey Through Time</h3>
              <div className="relative">
                <div className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-amber-500 to-emerald-500" />
                <div className="space-y-4">
                  {timeline.map((item, index) => (
                    <div key={index} className="flex items-start gap-4 pl-2">
                      <div className="w-8 h-8 rounded-full bg-amber-500/20 border-2 border-amber-500/50 flex items-center justify-center flex-shrink-0 relative z-10">
                        <span className="text-amber-400 text-xs font-bold">{item.year.slice(-2)}</span>
                      </div>
                      <div className="pt-1">
                        <p className="text-amber-400 text-sm font-medium">{item.year}</p>
                        <p className="text-emerald-200/70 text-sm">{item.event}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Social links */}
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="https://www.youtube.com/@alafasy"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-red-600/20 border border-red-500/30 text-red-400 px-4 py-2 rounded-lg hover:bg-red-600/30 transition-colors"
              >
                <Globe className="w-4 h-4" />
                YouTube (11.6M)
              </a>
              <a
                href="https://www.alafasy.co/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-emerald-600/20 border border-emerald-500/30 text-emerald-400 px-4 py-2 rounded-lg hover:bg-emerald-600/30 transition-colors"
              >
                <Music className="w-4 h-4" />
                Official App
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
