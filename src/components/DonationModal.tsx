import { useEffect, useState } from "react";
import { X, Heart, User } from "lucide-react";

export interface Campaign {
  id: string;
  title: string;
  subtitle: string;
  flag: string;
  description: string;
  needs: string[];
  needIcons: string[];
  progress: number;
  target: string;
  raised: string;
  beneficiaries: string;
  quote: string;
  color: string;
}

const currencySymbols: Record<string, string> = {
  USD: "$",
  EUR: "€",
  GBP: "£",
  AED: "د.إ",
  SAR: "﷼",
  KWD: "د.ك",
  QAR: "﷼",
  BHD: ".د.ب",
  OMR: "﷼",
  JOD: "د.ا",
  NGN: "₦",
  EGP: "£",
  ZAR: "R",
  PKR: "₨",
  INR: "₹",
  BDT: "৳",
  MYR: "RM",
  IDR: "Rp",
  TRY: "₺",
};

interface DonationModalProps {
  campaign: Campaign;
  onClose: () => void;
  onSubmit: (amount: number, donorName: string, isAnonymous: boolean, selectedCurrency: string) => void;
}

export default function DonationModal({ campaign, onClose, onSubmit }: DonationModalProps) {
  const [amount, setAmount] = useState(25);
  const [exchangeRate, setExchangeRate] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState("");
  const [donorName, setDonorName] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [step, setStep] = useState<"amount" | "details">("amount");
  const detectCurrency = () => {
    const locale = navigator.language;

    if (locale.includes("NG")) return "NGN";
    if (locale.includes("SA")) return "SAR";
    if (locale.includes("AE")) return "AED";
    if (locale.includes("KW")) return "KWD";
    if (locale.includes("PK")) return "PKR";
    if (locale.includes("GB")) return "GBP";
    if (locale.includes("EU")) return "EUR";
    if (locale.includes("TR")) return "TRY";
    if (locale.includes("MY")) return "MYR";

    return "USD";
  };

  const [selectedCurrency, setSelectedCurrency] = useState(detectCurrency());
  const donationPresets: Record<string, number[]> = {
    USD: [25, 50, 100, 500],
    NGN: [5000, 10000, 50000, 100000],
    SAR: [100, 200, 500, 1000],
    AED: [100, 250, 500, 1000],
    KWD: [10, 25, 50, 100],
    PKR: [5000, 10000, 25000, 50000],
    EUR: [25, 50, 100, 500],
    GBP: [20, 50, 100, 250],
  };
  const currentPresets =
    donationPresets[selectedCurrency] || donationPresets.USD;
  useEffect(() => {
    const fetchExchangeRate = async () => {
      try {
        const response = await fetch(
          `https://api.exchangerate-api.com/v4/latest/${selectedCurrency}`
        );

        const data = await response.json();

        setExchangeRate(data.rates.USD);
      } catch (error) {
        console.error(error);
      }
    };

    fetchExchangeRate();
  }, [selectedCurrency]);
  const usdEquivalent = exchangeRate
    ? (amount * exchangeRate).toFixed(2)
    : null;
  const currencySymbol = currencySymbols[selectedCurrency] || "$";
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative bg-gradient-to-b from-emerald-900 to-slate-900 border border-amber-500/20 rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl shadow-amber-500/10 max-h-[90vh] overflow-y-auto">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 text-emerald-300/50 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Campaign header */}
        <div className={`h-24 bg-gradient-to-r ${campaign.color} flex items-center justify-center`}>
          <div className="text-center">
            <span className="text-5xl">{campaign.flag}</span>
            <h3 className="text-white font-bold text-lg mt-1">{campaign.title}</h3>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8">
          {step === "amount" ? (
            <div>
              <h4 className="text-xl font-bold text-white mb-2">Choose Your Amount</h4>
              <p className="text-emerald-200/60 text-sm mb-6">
                Every amount, no matter how small, is multiplied by Allah.
              </p>

              {/* Currency Selector */}
              <div className="mb-4">
                <label className="text-emerald-200/50 text-xs mb-2 block">Select Donation Currency</label>
                <select
                  value={selectedCurrency}
                  onChange={(e) => {
                    const newCurrency = e.target.value;
                    setSelectedCurrency(newCurrency);
                    const presets = donationPresets[newCurrency] || donationPresets.USD;
                    setAmount(presets[0]);
                    setCustomAmount("");
                  }}
                  className="w-full bg-emerald-800/30 border border-emerald-700/30 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-500/50 transition-colors cursor-pointer"
                >
                  <option value="USD" className="bg-slate-900 text-white">USD ($) - US Dollar</option>
                  <option value="EUR" className="bg-slate-900 text-white">EUR (€) - Euro</option>
                  <option value="GBP" className="bg-slate-900 text-white">GBP (£) - British Pound</option>
                  <option value="AED" className="bg-slate-900 text-white">AED (د.إ) - UAE Dirham</option>
                  <option value="SAR" className="bg-slate-900 text-white">SAR (﷼) - Saudi Riyal</option>
                  <option value="KWD" className="bg-slate-900 text-white">KWD (د.ك) - Kuwaiti Dinar</option>
                  <option value="NGN" className="bg-slate-900 text-white">NGN (₦) - Nigerian Naira</option>
                  <option value="PKR" className="bg-slate-900 text-white">PKR (₨) - Pakistani Rupee</option>
                </select>
              </div>

              {/* Preset amounts */}
              <div className="grid grid-cols-4 gap-3 mb-6">
                {currentPresets.map((a) => (
                  <button
                    key={a}
                    onClick={() => {
                      setAmount(a);
                      setCustomAmount("");
                    }}
                    className={`py-3 rounded-xl font-semibold transition-all duration-200 ${amount === a && !customAmount
                      ? "bg-amber-500 text-emerald-950 shadow-lg shadow-amber-500/25 scale-105"
                      : "bg-emerald-800/50 text-emerald-200/70 hover:bg-emerald-700/50 border border-emerald-700/30"
                      }`}
                  >
                    {currencySymbol}{a}
                  </button>
                ))}
              </div>

              {/* Custom amount */}
              <div className="mb-6">
                <label className="text-emerald-200/50 text-xs mb-2 block">Or enter custom amount ({currencySymbol})</label>
                <input
                  type="number"
                  value={customAmount}
                  onChange={(e) => {
                    setCustomAmount(e.target.value);
                    setAmount(Number(e.target.value));
                  }}
                  placeholder="Enter amount..."
                  className="w-full bg-emerald-800/30 border border-emerald-700/30 rounded-xl px-4 py-3 text-white placeholder-emerald-400/30 focus:outline-none focus:border-amber-500/50 transition-colors"
                />
              </div>

              {/* Continue button */}
              <button
                onClick={() => setStep("details")}
                disabled={!(amount > 0 || customAmount)}
                className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 disabled:opacity-40 disabled:cursor-not-allowed text-emerald-950 font-semibold py-4 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/25 flex items-center justify-center gap-2"
              >
                <Heart className="w-5 h-5" />
                Continue — {customAmount ? `${currencySymbol}${customAmount}` : `${currencySymbol}${amount}`}
              </button>
            </div>
          ) : (
            <div>
              <h4 className="text-xl font-bold text-white mb-2">Your Details</h4>
              <p className="text-emerald-200/60 text-sm mb-6">
                Give with sincerity. Your name is optional — what matters is your intention.
              </p>

              {/* Name input */}
              <div className="mb-5">
                <label className="text-emerald-200/50 text-xs mb-2 block flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5" />
                  Your Name (Optional)
                </label>
                <input
                  type="text"
                  value={donorName}
                  onChange={(e) => setDonorName(e.target.value)}
                  placeholder="Abdullah, Fatima..."
                  className="w-full bg-emerald-800/30 border border-emerald-700/30 rounded-xl px-4 py-3 text-white placeholder-emerald-400/30 focus:outline-none focus:border-amber-500/50 transition-colors"
                />
              </div>

              {/* Anonymous toggle */}
              <div className="flex items-center gap-3 mb-6 p-3 bg-emerald-800/20 rounded-xl border border-emerald-700/20">
                <button
                  onClick={() => setIsAnonymous(!isAnonymous)}
                  className={`relative w-11 h-6 rounded-full transition-colors duration-200 ${isAnonymous ? "bg-amber-500" : "bg-emerald-700"
                    }`}
                >
                  <div
                    className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition-transform duration-200 ${isAnonymous ? "translate-x-5" : "translate-x-0.5"
                      }`}
                  />
                </button>
                <span className="text-emerald-200/60 text-sm">Give anonymously</span>
              </div>

              {/* Summary */}
              <div className="bg-emerald-800/30 border border-emerald-700/30 rounded-xl p-4 mb-6">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-emerald-200/50">Campaign</span>
                  <span className="text-white font-medium">{campaign.flag} {campaign.title}</span>
                </div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-emerald-200/50">Amount</span>
                  <span className="text-amber-400 font-bold">
                    {currencySymbol}{customAmount ? customAmount : amount}
                    {usdEquivalent && selectedCurrency !== "USD" && (
                      <span className="text-emerald-200/50 text-xs font-normal ml-1.5">
                        (≈ ${usdEquivalent} USD)
                      </span>
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-emerald-200/50">Status</span>
                  <span className="text-emerald-300">{isAnonymous ? "Anonymous" : donorName || "Anonymous"}</span>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={() => setStep("amount")}
                  className="flex-1 bg-emerald-800/50 hover:bg-emerald-700/50 text-emerald-200/70 font-medium py-4 rounded-xl transition-all duration-300 border border-emerald-700/30"
                >
                  Back
                </button>
                <button
                  onClick={() =>
                    onSubmit(
                      selectedCurrency === "USD"
                        ? amount
                        : Number(usdEquivalent || amount),
                      donorName,
                      isAnonymous,
                      "USD"
                    )
                  }
                  disabled={!(amount > 0 || customAmount)}
                  className="flex-1 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 disabled:opacity-40 disabled:cursor-not-allowed text-emerald-950 font-semibold py-4 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/25"
                >
                  Review & Confirm
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
