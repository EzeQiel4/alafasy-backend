import { useEffect, useState } from "react";
import { Heart, MapPin, Users, Droplet, UtensilsCrossed, Stethoscope } from "lucide-react";

interface Campaign {
  id: string;
  title: string;
  subtitle: string;
  flag: string;
  description: string;
  needs: string[];
  needIcons: ("medical" | "food" | "shelter" | "water")[];
  progress: number;
  target: string;
  raised: string;
  beneficiaries: string;
  quote: string;
  color: string;
}

const campaigns: Campaign[] = [
  {
    id: "iran",
    title: "Iran Relief Fund",
    subtitle: "Medical Aid, Food Support, Crisis Relief",
    flag: "🇮🇷",
    description:
      "Communities across Iran face severe economic hardship and medical crises. Your Sadaqah provides essential medical aid, food support, and crisis relief to families struggling to survive.",
    needs: ["Medical supplies & medicine", "Food packages for families", "Emergency crisis relief"],
    needIcons: ["medical", "food", "shelter"],
    progress: 67,
    target: "$50,000",
    raised: "$33,500",
    beneficiaries: "2,400+",
    quote: "Whoever relieves a believer's hardship, Allah will relieve his hardship on the Day of Judgment.",
    color: "from-emerald-600 to-teal-700",
  },
  {
    id: "pakistan",
    title: "Pakistan Relief Fund",
    subtitle: "Flood Recovery, Poverty Assistance, Shelter",
    flag: "🇵🇰",
    description:
      "Devastating floods and extreme poverty have left millions of Pakistanis without shelter, food, or clean water. Your charity helps rebuild lives and restore hope in flood-affected regions.",
    needs: ["Flood recovery materials", "Shelter & building supplies", "Poverty assistance programs"],
    needIcons: ["water", "shelter", "food"],
    progress: 45,
    target: "$75,000",
    raised: "$33,750",
    beneficiaries: "5,100+",
    quote: "The best of people are those that bring most benefit to the rest of humanity.",
    color: "from-green-600 to-emerald-700",
  },
  {
    id: "gaza",
    title: "Gaza Emergency Fund",
    subtitle: "Humanitarian Emergency Aid, Food & Medical Relief",
    flag: "🇵🇸",
    description:
      "Gaza is experiencing one of the gravest humanitarian crises in recent history. Children, women, and elderly families desperately need food, medical care, and emergency shelter. Your giving can be the lifeline they depend on.",
    needs: ["Emergency food rations", "Medical relief supplies", "Emergency shelter & blankets"],
    needIcons: ["food", "medical", "shelter"],
    progress: 82,
    target: "$100,000",
    raised: "$82,000",
    beneficiaries: "12,800+",
    quote: "You will never attain righteousness until you spend from what you love.",
    color: "from-red-700 to-red-900",
  },
];

const iconMap: Record<string, typeof Heart> = {
  medical: Stethoscope,
  food: UtensilsCrossed,
  shelter: Users,
  water: Droplet,
};

export default function Campaigns({ onDonate }: { onDonate: (campaign: Campaign) => void }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.1 }
    );
    const el = document.getElementById("campaigns-section");
    if (el) observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="campaigns-section"
      className="relative py-24 sm:py-32 bg-gradient-to-b from-emerald-950 via-slate-900 to-emerald-950"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section header */}
        <div
          className={`text-center mb-16 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
        >
          <div className="inline-flex items-center gap-2 text-amber-400 mb-4">
            <MapPin className="w-5 h-5" />
            <span className="text-sm font-medium tracking-widest uppercase">Humanitarian Causes</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            Direct Your <span className="text-amber-400">Sadaqah</span>
          </h2>
          <p className="text-emerald-200/70 max-w-2xl mx-auto text-lg">
            Helping those in need is beloved to Allah. Choose a cause close to your heart and make a difference today.
          </p>
        </div>

        {/* Campaign cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {campaigns.map((campaign, index) => (
            <div
              key={campaign.id}
              className={`group relative transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
                }`}
              style={{ transitionDelay: `${index * 200 + 300}ms` }}
            >
              <div className="relative bg-gradient-to-b from-emerald-900/80 to-slate-900/80 border border-emerald-700/30 rounded-3xl overflow-hidden hover:border-amber-500/40 transition-all duration-500 hover:shadow-2xl hover:shadow-amber-500/10 h-full flex flex-col">
                {/* Flag header */}
                <div className={`relative h-40 bg-gradient-to-r ${campaign.color} flex items-center justify-center overflow-hidden`}>
                  <div className="absolute inset-0 bg-black/20" />
                  <span className="relative text-7xl drop-shadow-lg">{campaign.flag}</span>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-xl font-bold text-white mb-1">{campaign.title}</h3>
                  <p className="text-amber-400/80 text-sm mb-4">{campaign.subtitle}</p>
                  <p className="text-emerald-200/60 text-sm leading-relaxed mb-5 flex-1">
                    {campaign.description}
                  </p>

                  {/* Needs */}
                  <div className="flex flex-wrap gap-2 mb-5">
                    {campaign.needIcons.map((icon, i) => {
                      const Icon = iconMap[icon];
                      return (
                        <span
                          key={i}
                          className="inline-flex items-center gap-1.5 bg-emerald-800/50 border border-emerald-700/30 rounded-full px-3 py-1 text-xs text-emerald-200/70"
                        >
                          <Icon className="w-3 h-3" />
                          {campaign.needs[i]}
                        </span>
                      );
                    })}
                  </div>

                  {/* Progress bar */}
                  <div className="mb-4">
                    <div className="flex justify-between text-xs mb-1.5">
                      <span className="text-emerald-200/50">{campaign.raised} raised</span>
                      <span className="text-emerald-200/50">of {campaign.target}</span>
                    </div>
                    <div className="h-2 bg-emerald-800/50 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-amber-500 to-amber-400 rounded-full transition-all duration-1000"
                        style={{ width: visible ? `${campaign.progress}%` : "0%" }}
                      />
                    </div>
                    <div className="flex justify-between text-xs mt-1.5">
                      <span className="text-amber-400/70 font-medium">{campaign.progress}% funded</span>
                      <span className="text-emerald-200/40">{campaign.beneficiaries} helped</span>
                    </div>
                  </div>

                  {/* Hadith quote */}
                  <blockquote className="text-emerald-300/40 text-xs italic mb-5 pl-3 border-l-2 border-amber-500/20">
                    "{campaign.quote}"
                  </blockquote>

                  {/* Donate button */}
                  <button
                    onClick={() => onDonate(campaign)}
                    className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-emerald-950 font-semibold py-3.5 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/25 hover:scale-[1.02] flex items-center justify-center gap-2"
                  >
                    <Heart className="w-5 h-5" />
                    Give Sadaqah
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Featured Impact Video */}
        <div
          className={`mt-16 transition-all duration-700 delay-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-white mb-2">See Your Impact in Action</h3>
            <p className="text-emerald-200/60">Watch how Sheikh Alafasy raised £400,000+ for Gaza relief</p>
          </div>

          <div className="max-w-sm mx-auto">
            <div className="relative w-full overflow-hidden rounded-2xl aspect-[9/16]">
              <iframe
                src="https://www.tiktok.com/embed/v2/7454203206206278944"
                className="absolute inset-0 w-full h-full border-0"
                allowFullScreen
                scrolling="no"
              />
            </div>
            <p className="text-center text-emerald-200/50 text-sm mt-4">
              🤲 Al Mustafa Welfare Trust x Sheikh Alafasy — Manchester is next!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
