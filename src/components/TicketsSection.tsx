import { useEffect, useState } from "react";
import {
  Ticket,
  Crown,
  Star,
  Users,
  Calendar,
  MapPin,
  Check,
  ChevronRight,
  Music,
  Camera,
  Gift,
  Heart,
  CreditCard,
  Bitcoin,
  Lock,
  X,
  Copy,
  QrCode,
  User,
  Mail,
} from "lucide-react";

interface TicketTier {
  id: string;
  name: string;
  badge: string;
  badgeColor: string;
  borderColor: string;
  glowColor: string;
  price: number;
  icon: typeof Star;
  features: string[];
  popular?: boolean;
  remaining: number;
}

const API_BASE =
  import.meta.env.VITE_API_URL || "http://localhost:5000";

const ticketTiers: TicketTier[] = [
  {
    id: "bronze",
    name: "Bronze",
    badge: "Regular",
    badgeColor: "from-amber-700 to-amber-800",
    borderColor: "border-amber-700/30",
    glowColor: "shadow-amber-900/20",
    price: 250,
    icon: Ticket,
    features: [
      "General admission to event",
      "Live Quran recitation experience",
      "Meet & greet photo opportunity",
      "Commemorative event badge",
      "Light refreshments included",
      "Event program booklet",
    ],
    remaining: 250,
  },

  {
    id: "silver",
    name: "Silver",
    badge: "VIP",
    badgeColor: "from-slate-400 to-slate-500",
    borderColor: "border-slate-400/40",
    glowColor: "shadow-slate-400/20",
    price: 500,
    icon: Star,
    features: [
      "Everything in Bronze, plus:",
      "Priority front-section seating",
      "Extended 5-minute private meet & greet",
      "Personalized signed item from Sheikh",
      "Exclusive VIP lounge access",
      "Complimentary dinner buffet",
      "Early entry to venue",
    ],
    popular: true,
    remaining: 75,
  },

  {
    id: "gold",
    name: "Gold",
    badge: "VVIP",
    badgeColor: "from-amber-400 to-amber-500",
    borderColor: "border-amber-400/50",
    glowColor: "shadow-amber-400/30",
    price: 1200,
    icon: Crown,
    features: [
      "Everything in Silver, plus:",
      "Front row premium seating",
      "15-minute private audience with Sheikh",
      "Private recitation dedication",
      "Professional photo session with Sheikh",
      "Exclusive signed Quran gift",
      "VIP backstage access",
      "Private dinner with Sheikh",
      "Certificate of attendance",
    ],
    remaining: 15,
  },
];

const cryptoOptions = [
  { key: "btc", name: "Bitcoin", icon: "₿" },
  { key: "eth", name: "Ethereum", icon: "Ξ" },
  { key: "usdttrc20", name: "USDT", icon: "₮" },
];

export default function TicketsSection() {
  const [visible, setVisible] = useState(false);

  const [selectedTier, setSelectedTier] =
    useState<TicketTier | null>(null);

  const [paymentMethod, setPaymentMethod] =
    useState<"card" | "crypto" | null>(null);

  const [selectedCrypto, setSelectedCrypto] =
    useState("btc");

  const [isProcessing, setIsProcessing] =
    useState(false);

  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const [showCryptoBox, setShowCryptoBox] =
    useState(false);

  const [cryptoAddress, setCryptoAddress] =
    useState("");

  const [cryptoAmount, setCryptoAmount] =
    useState("");

  const [copied, setCopied] = useState(false);

  const [user, setUser] = useState({
    name: "",
    email: "",
  });

  const isFormValid =
    user.name.trim() !== "" &&
    user.email.trim() !== "" &&
    user.email.includes("@");

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const el = document.getElementById(
      "tickets-section"
    );

    if (el) observer.observe(el);

    return () => observer.disconnect();
  }, []);

  const handleSelectTier = (tierId: string) => {
    const tier = ticketTiers.find(
      (t) => t.id === tierId
    );

    if (!tier) return;

    setSelectedTier(tier);
    setPaymentMethod(null);
    setShowCryptoBox(false);
    setMessage(null);

    document
      .getElementById("payment-flow")
      ?.scrollIntoView({
        behavior: "smooth",
      });
  };

  const handleCardPayment = async () => {
    if (!selectedTier) return;

    try {
      setIsProcessing(true);
      setMessage(null);

      const response = await fetch(
        `${API_BASE}/create-checkout-session`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            amount: selectedTier.price,
            campaignTitle: `${selectedTier.name} Ticket`,
            email: user.email,
            name: user.name,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(
          "Failed to create checkout session"
        );
      }

      const data = await response.json();

      if (data?.url) {
        window.location.href = data.url;
      } else {
        throw new Error("No checkout URL returned");
      }
    } catch (error) {
      console.error("Flutterwave payment error:", error);

      setMessage({
        type: "error",
        text:
          "Unable to start card payment. Please try again.",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCryptoPayment = async () => {
    if (!selectedTier) return;

    try {
      setIsProcessing(true);
      setMessage(null);

      const response = await fetch(
        `${API_BASE}/create-crypto-payment`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            amount: selectedTier.price,
            currency: "usd",
            coin: selectedCrypto,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(
          "Failed to generate crypto payment"
        );
      }

      const data = await response.json();

      if (!data?.pay_address) {
        throw new Error(
          "No payment address returned"
        );
      }

      setCryptoAddress(data.pay_address);
      setCryptoAmount(data.pay_amount);

      setShowCryptoBox(true);

      setMessage({
        type: "success",
        text:
          "Crypto payment address generated successfully.",
      });
    } catch (error) {
      console.error("Crypto payment error:", error);

      setMessage({
        type: "error",
        text:
          "Failed to generate crypto payment. Please try again.",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(
        cryptoAddress
      );

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (err) {
      console.error("Copy failed:", err);
    }
  };

  return (
    <section
      id="tickets-section"
      className="relative py-24 sm:py-32 bg-gradient-to-b from-slate-900 via-emerald-950 to-slate-900 overflow-hidden"
    >
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl" />

        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        <div
          className={`text-center mb-12 transition-all duration-700 ${visible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-8"
            }`}
        >
          <div className="inline-flex items-center gap-2 text-amber-400 mb-4">
            <Ticket className="w-5 h-5" />

            <span className="text-sm font-medium tracking-widest uppercase">
              Exclusive Event
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            Meet & Greet with{" "}
            <span className="text-amber-400">
              Sheikh Alafasy
            </span>
          </h2>

          <p className="text-emerald-200/70 max-w-2xl mx-auto text-lg mb-8">
            An exclusive opportunity to meet the beloved Sheikh,
            witness his mesmerizing recitations live,
            and receive his blessings in person.
          </p>

          <div className="flex flex-wrap justify-center gap-6 text-emerald-200/60">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-amber-400/60" />
              <span>Limited Availability</span>
            </div>

            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-amber-400/60" />
              <span>
                London, Manchester & Birmingham
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-amber-400/60" />
              <span>340 Tickets Available</span>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {ticketTiers.map((tier, index) => (
            <div
              key={tier.id}
              className={`relative transition-all duration-700 ${visible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-12"
                }`}
              style={{
                transitionDelay: `${index * 200 + 300}ms`,
              }}
            >
              <div
                className={`relative bg-gradient-to-b from-emerald-900/80 to-slate-900/80 border ${tier.borderColor} rounded-3xl overflow-hidden h-full flex flex-col ${tier.popular
                  ? "scale-105 shadow-2xl " +
                  tier.glowColor
                  : ""
                  }`}
              >
                {tier.popular && (
                  <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white text-center py-1.5 text-sm font-semibold">
                    ⭐ Most Popular
                  </div>
                )}

                <div
                  className={`bg-gradient-to-r ${tier.badgeColor} p-6 text-center ${tier.popular ? "pt-10" : ""
                    }`}
                >
                  <tier.icon className="w-10 h-10 text-white/90 mx-auto mb-2" />

                  <h3 className="text-2xl font-bold text-white">
                    {tier.name}
                  </h3>

                  <p className="text-white/70 text-sm">
                    {tier.badge}
                  </p>
                </div>

                <div className="text-center py-6 border-b border-emerald-700/20">
                  <span className="text-4xl font-bold text-white">
                    ${tier.price}
                  </span>

                  <span className="text-emerald-200/50 text-sm">
                    {" "}
                    / person
                  </span>
                </div>

                <div className="p-6 flex-1">
                  <ul className="space-y-3">
                    {tier.features.map((feature, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-3"
                      >
                        <Check className="w-4 h-4 mt-0.5 flex-shrink-0 text-emerald-400" />

                        <span className="text-emerald-200/70 text-sm">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-6 pt-0">
                  <p className="text-emerald-200/40 text-xs mb-4 text-center">
                    Only {tier.remaining} tickets remaining
                  </p>

                  <button
                    onClick={() =>
                      handleSelectTier(tier.id)
                    }
                    className="w-full py-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:opacity-90 text-white"
                  >
                    Get {tier.badge}

                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div
          id="payment-flow"
          className="max-w-2xl mx-auto"
        >
          {selectedTier && (
            <div className="bg-emerald-900/40 border border-emerald-700/30 rounded-3xl p-8">
              {message && (
                <div
                  className={`mb-6 rounded-2xl border p-4 flex items-start gap-3 ${message.type === "success"
                    ? "bg-green-500/10 border-green-500/20"
                    : "bg-red-500/10 border-red-500/20"
                    }`}
                >
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center ${message.type === "success"
                      ? "bg-green-500/20"
                      : "bg-red-500/20"
                      }`}
                  >
                    {message.type === "success" ? (
                      <Check className="w-5 h-5 text-green-400" />
                    ) : (
                      <X className="w-5 h-5 text-red-400" />
                    )}
                  </div>

                  <div className="flex-1">
                    <h5
                      className={`font-semibold ${message.type === "success"
                        ? "text-green-400"
                        : "text-red-400"
                        }`}
                    >
                      {message.type === "success"
                        ? "Success"
                        : "Payment Error"}
                    </h5>

                    <p className="text-sm text-emerald-100/70 mt-1">
                      {message.text}
                    </p>
                  </div>
                </div>
              )}

              <h3 className="text-2xl font-bold text-white mb-6 text-center">
                Complete Your Booking
              </h3>

              <div className="bg-slate-900/60 rounded-2xl p-6 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-emerald-200">
                    Selected Package
                  </span>

                  <span className="text-white font-bold">
                    {selectedTier.name}
                  </span>
                </div>

                <div className="flex justify-between items-center mt-4">
                  <span className="text-emerald-200">
                    Amount
                  </span>

                  <span className="text-amber-400 text-2xl font-bold">
                    ${selectedTier.price}
                  </span>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div>
                  <label className="text-emerald-200/50 text-xs mb-2 block flex items-center gap-1.5 font-medium">
                    <User className="w-3.5 h-3.5 text-amber-400" />
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={user.name}
                    onChange={(e) =>
                      setUser((prev) => ({ ...prev, name: e.target.value }))
                    }
                    placeholder="E.g., Mohammed Alafasy"
                    className="w-full bg-slate-900/60 border border-emerald-700/30 rounded-xl px-4 py-3 text-white placeholder-emerald-400/30 focus:outline-none focus:border-amber-500/50 transition-colors"
                    required
                  />
                </div>

                <div>
                  <label className="text-emerald-200/50 text-xs mb-2 block flex items-center gap-1.5 font-medium">
                    <Mail className="w-3.5 h-3.5 text-amber-400" />
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={user.email}
                    onChange={(e) =>
                      setUser((prev) => ({ ...prev, email: e.target.value }))
                    }
                    placeholder="E.g., mohammed@example.com"
                    className="w-full bg-slate-900/60 border border-emerald-700/30 rounded-xl px-4 py-3 text-white placeholder-emerald-400/30 focus:outline-none focus:border-amber-500/50 transition-colors"
                    required
                  />
                </div>
              </div>

              {!showCryptoBox && (
                <>
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <button
                      onClick={() =>
                        setPaymentMethod("card")
                      }
                      className={`p-5 rounded-2xl border transition-all ${paymentMethod === "card"
                        ? "border-amber-400 bg-amber-500/10"
                        : "border-emerald-700/30 bg-slate-900/40"
                        }`}
                    >
                      <CreditCard className="w-8 h-8 text-blue-400 mx-auto mb-3" />

                      <p className="text-white font-semibold">
                        Card
                      </p>

                      <p className="text-emerald-200/50 text-sm mt-1">
                        Visa / Mastercard
                      </p>
                    </button>

                    <button
                      onClick={() =>
                        setPaymentMethod("crypto")
                      }
                      className={`p-5 rounded-2xl border transition-all ${paymentMethod === "crypto"
                        ? "border-amber-400 bg-amber-500/10"
                        : "border-emerald-700/30 bg-slate-900/40"
                        }`}
                    >
                      <Bitcoin className="w-8 h-8 text-orange-400 mx-auto mb-3" />

                      <p className="text-white font-semibold">
                        Crypto
                      </p>

                      <p className="text-emerald-200/50 text-sm mt-1">
                        BTC / ETH / USDT
                      </p>
                    </button>
                  </div>

                  {paymentMethod === "crypto" && (
                    <div className="grid grid-cols-3 gap-3 mb-6">
                      {cryptoOptions.map((crypto) => (
                        <button
                          key={crypto.key}
                          onClick={() =>
                            setSelectedCrypto(
                              crypto.key
                            )
                          }
                          className={`p-3 rounded-xl border ${selectedCrypto === crypto.key
                            ? "border-amber-400 bg-amber-500/10"
                            : "border-emerald-700/30 bg-slate-900/40"
                            }`}
                        >
                          <div className="text-2xl mb-2">
                            {crypto.icon}
                          </div>

                          <p className="text-white text-sm">
                            {crypto.name}
                          </p>
                        </button>
                      ))}
                    </div>
                  )}

                  {paymentMethod === "card" && (
                    <button
                      onClick={handleCardPayment}
                      disabled={isProcessing || !isFormValid}
                      className="w-full py-4 rounded-2xl bg-gradient-to-r from-blue-500 to-blue-600 hover:opacity-90 text-white font-bold text-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isProcessing ? (
                        "Processing..."
                      ) : (
                        <>
                          <Lock className="w-5 h-5" />
                          Pay with Card
                        </>
                      )}
                    </button>
                  )}

                  {paymentMethod === "crypto" && (
                    <button
                      onClick={handleCryptoPayment}
                      disabled={isProcessing || !isFormValid}
                      className="w-full py-4 rounded-2xl bg-gradient-to-r from-orange-500 to-orange-600 hover:opacity-90 text-white font-bold text-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isProcessing ? (
                        "Generating..."
                      ) : (
                        <>
                          <Bitcoin className="w-5 h-5" />
                          Generate Crypto Payment
                        </>
                      )}
                    </button>
                  )}
                </>
              )}

              {showCryptoBox && (
                <div className="text-center">
                  <div className="bg-white p-4 rounded-2xl inline-block mb-6">
                    <img
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(
                        cryptoAddress
                      )}`}
                      alt="QR Code"
                    />
                  </div>

                  <div className="bg-slate-900/60 rounded-2xl p-5 mb-5">
                    <div className="flex items-center justify-between gap-3">
                      <div className="text-left">
                        <p className="text-emerald-200/50 text-xs mb-1">
                          Wallet Address
                        </p>

                        <p className="text-amber-400 break-all text-sm">
                          {cryptoAddress}
                        </p>
                      </div>

                      <button
                        onClick={handleCopy}
                        className="p-3 rounded-xl bg-emerald-700/30 hover:bg-emerald-700/50"
                      >
                        {copied ? (
                          <Check className="w-5 h-5 text-green-400" />
                        ) : (
                          <Copy className="w-5 h-5 text-white" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="bg-amber-500/10 border border-amber-500/20 rounded-2xl p-4 mb-6">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <QrCode className="w-5 h-5 text-amber-400" />

                      <span className="text-amber-400 font-semibold">
                        Payment Details
                      </span>
                    </div>

                    <p className="text-white text-lg font-bold">
                      {cryptoAmount}{" "}
                      {selectedCrypto.toUpperCase()}
                    </p>

                    <p className="text-emerald-200/60 text-sm mt-2">
                      Send exact amount to complete booking
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="mt-20">
          <h3 className="text-xl font-bold text-white text-center mb-6">
            What to Expect
          </h3>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                icon: Music,
                title: "Live Recitations",
                desc: "Beautiful Quran recitations",
              },

              {
                icon: Camera,
                title: "Photo Opportunities",
                desc: "Professional photos",
              },

              {
                icon: Heart,
                title: "Spiritual Experience",
                desc: "A night of inspiration",
              },

              {
                icon: Gift,
                title: "Exclusive Gifts",
                desc: "Signed memorabilia",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-emerald-900/30 border border-emerald-700/20 rounded-xl p-4 text-center"
              >
                <item.icon className="w-8 h-8 text-amber-400/60 mx-auto mb-3" />

                <h4 className="text-white font-medium mb-1">
                  {item.title}
                </h4>

                <p className="text-emerald-200/50 text-sm">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}