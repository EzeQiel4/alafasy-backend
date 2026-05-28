import { Heart, Check } from "lucide-react";

interface NiyyahScreenProps {
  amount: number;
  campaignFlag: string;
  campaignTitle: string;
  donorName: string;
  isAnonymous: boolean;
  onConfirm: () => void;
  onBack: () => void;
}

export default function NiyyahScreen({ amount, campaignFlag, campaignTitle, onConfirm, onBack }: NiyyahScreenProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

      <div className="relative bg-gradient-to-b from-emerald-900 to-slate-900 border border-amber-500/20 rounded-3xl w-full max-w-md overflow-hidden shadow-2xl shadow-amber-500/10 text-center">
        {/* Decorative top */}
        <div className="h-2 bg-gradient-to-r from-emerald-600 via-amber-500 to-emerald-600" />

        <div className="p-8 sm:p-10">
          {/* Hands icon */}
          <div className="inline-flex items-center justify-center mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-amber-400/20 rounded-full blur-xl animate-pulse" />
              <div className="relative bg-gradient-to-br from-amber-400/20 to-amber-600/20 p-4 rounded-full border border-amber-500/30">
                <Heart className="w-8 h-8 text-amber-400" />
              </div>
            </div>
          </div>

          {/* Hadith */}
          <div className="mb-8">
            <p className="text-xl text-amber-200/90 mb-3" dir="rtl" lang="ar">
              إِنَّمَا الأَعْمَالُ بِالنِّيَّاتِ
            </p>
            <blockquote className="text-lg text-emerald-100/80 italic leading-relaxed mb-3">
              "Actions are judged by intentions."
            </blockquote>
            <p className="text-amber-400/60 text-sm">— Hadith (Bukhari & Muslim)</p>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-4 mb-8">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />
            <Heart className="w-3 h-3 text-amber-400/40" />
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />
          </div>

          {/* Niyyah reminder */}
          <h3 className="text-xl font-bold text-white mb-3">A Moment of Intention</h3>
          <p className="text-emerald-200/60 text-sm leading-relaxed mb-8">
            You are about to give <span className="text-amber-400 font-semibold">Sadaqah</span> to{" "}
            <span className="text-white font-medium">{campaignFlag} {campaignTitle}</span>. 
            May your intention be pure, for the sake of Allah alone.
          </p>

          {/* Donation summary */}
          <div className="bg-emerald-800/30 border border-emerald-700/30 rounded-xl p-4 mb-8">
            <div className="flex items-center justify-center gap-2 text-amber-400 text-2xl font-bold">
              <span>${amount}</span>
            </div>
            <p className="text-emerald-200/40 text-xs mt-1">
              You are giving in the path of Allah
            </p>
          </div>

          {/* Confirm button */}
          <button
            onClick={onConfirm}
            className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-emerald-950 font-bold py-4 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/25 hover:scale-[1.02] flex items-center justify-center gap-2 mb-3"
          >
            <Check className="w-5 h-5" />
            Confirm — May It Be Accepted
          </button>

          <button
            onClick={onBack}
            className="w-full bg-emerald-800/30 hover:bg-emerald-800/50 text-emerald-200/60 font-medium py-3 rounded-xl transition-all duration-300 border border-emerald-700/20"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}
