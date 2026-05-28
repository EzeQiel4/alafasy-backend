import { Heart, Sparkles, ArrowRight, RefreshCw } from "lucide-react";

interface ConfirmationProps {
  amount: number;
  campaignFlag: string;
  campaignTitle: string;
  donorName: string;
  onClose: () => void;
  onGiveAgain: () => void;
}

export default function Confirmation({
  amount,
  campaignFlag,
  campaignTitle,
  donorName,
  onClose,
  onGiveAgain,
}: ConfirmationProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />

      <div className="relative bg-gradient-to-b from-emerald-900 to-slate-900 border border-amber-500/30 rounded-3xl w-full max-w-md overflow-hidden shadow-2xl shadow-amber-500/20 text-center">
        {/* Confetti-like particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-amber-400/30 rounded-full animate-ping"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
              }}
            />
          ))}
        </div>

        <div className="relative p-8 sm:p-10">
          {/* Success icon */}
          <div className="inline-flex items-center justify-center mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-emerald-400/20 rounded-full blur-2xl animate-pulse" />
              <div className="relative bg-gradient-to-br from-emerald-500/30 to-emerald-600/20 p-5 rounded-full border border-emerald-400/30">
                <Heart className="w-10 h-10 text-emerald-400" />
              </div>
            </div>
          </div>

          {/* JazakAllah */}
          <h2 className="text-3xl font-bold text-white mb-2">
            JazakAllahu Khairan
          </h2>
          <p className="text-amber-400/80 text-sm mb-1" dir="rtl" lang="ar">
            جَزَاكُمُ ٱللَّهُ خَيْرًا
          </p>
          <p className="text-emerald-200/60 text-sm mb-8">
            May Allah reward you with the best in return
          </p>

          {/* Confirmation card */}
          <div className="bg-gradient-to-br from-emerald-800/50 to-emerald-900/50 border border-amber-500/20 rounded-2xl p-6 mb-8">
            <p className="text-emerald-200/50 text-xs uppercase tracking-wider mb-4">
              Your Sadaqah Summary
            </p>

            <div className="space-y-3 text-left">
              <div className="flex justify-between items-center">
                <span className="text-emerald-200/50 text-sm">Campaign</span>
                <span className="text-white font-medium text-sm">
                  {campaignFlag} {campaignTitle}
                </span>
              </div>
              <div className="h-px bg-emerald-700/30" />
              <div className="flex justify-between items-center">
                <span className="text-emerald-200/50 text-sm">Amount</span>
                <span className="text-amber-400 font-bold text-lg">${amount}</span>
              </div>
              <div className="h-px bg-emerald-700/30" />
              <div className="flex justify-between items-center">
                <span className="text-emerald-200/50 text-sm">Donor</span>
                <span className="text-emerald-300 text-sm">{donorName || "Anonymous"}</span>
              </div>
            </div>
          </div>

          {/* Dua */}
          <div className="mb-8 p-4 bg-amber-500/5 border border-amber-500/10 rounded-xl">
            <p className="text-emerald-100/70 text-sm italic leading-relaxed">
              "You are giving in the path of Allah. May your Sadaqah be accepted and multiplied many times over. 
              Barakallahu feek — May Allah bless you."
            </p>
          </div>

          {/* Duas for the donor */}
          <div className="grid grid-cols-2 gap-3 mb-8">
            <div className="bg-emerald-800/30 border border-emerald-700/20 rounded-xl p-3 text-center">
              <Sparkles className="w-4 h-4 text-amber-400/60 mx-auto mb-1" />
              <p className="text-amber-400/80 text-xs">Reward Multiplied</p>
            </div>
            <div className="bg-emerald-800/30 border border-emerald-700/20 rounded-xl p-3 text-center">
              <Heart className="w-4 h-4 text-emerald-400/60 mx-auto mb-1" />
              <p className="text-emerald-300/80 text-xs">Accepted by Allah</p>
            </div>
          </div>

          {/* Action buttons */}
          <button
            onClick={onGiveAgain}
            className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-emerald-950 font-semibold py-4 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/25 flex items-center justify-center gap-2 mb-3"
          >
            <RefreshCw className="w-5 h-5" />
            Give Again
          </button>
          <button
            onClick={onClose}
            className="w-full bg-emerald-800/30 hover:bg-emerald-800/50 text-emerald-200/60 font-medium py-3 rounded-xl transition-all duration-300 border border-emerald-700/20 flex items-center justify-center gap-2"
          >
            <ArrowRight className="w-4 h-4" />
            Return Home
          </button>
        </div>
      </div>
    </div>
  );
}
