import { useState, useCallback } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import QuranSection from "./components/QuranSection";
import AlafasyBio from "./components/AlafasyBio";
import AlafasySection from "./components/AlafasySection";
import StatsSection from "./components/StatsSection";
import AudioPlayer from "./components/AudioPlayer";
import TicketsSection from "./components/TicketsSection";
import PrayerSection from "./components/PrayerSection";
import Campaigns from "./components/Campaigns";
import DonationModal, { Campaign } from "./components/DonationModal";
import NiyyahScreen from "./components/NiyyahScreen";
import PaymentGatewayModal from "./components/PaymentGatewayModal";
import Confirmation from "./components/Confirmation";
import Footer from "./components/Footer";

export default function App() {
  const [donationState, setDonationState] = useState<{
    step: "closed" | "modal" | "niyyah" | "payment" | "confirmation";
    campaign: Campaign | null;
    amount: number;
    donorName: string;
    isAnonymous: boolean;
    selectedCurrency: string;
  }>({
    step: "closed",
    campaign: null,
    amount: 0,
    donorName: "",
    isAnonymous: false,
    selectedCurrency: "USD",
  });

  const scrollToCauses = useCallback(() => {
    document.getElementById("campaigns-section")?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const handleDonate = useCallback((campaign: Campaign) => {
    setDonationState({
      step: "modal",
      campaign,
      amount: 0,
      donorName: "",
      isAnonymous: false,
      selectedCurrency: "USD",
    });
  }, []);

  const handleDonationSubmit = useCallback((amount: number, donorName: string, isAnonymous: boolean, selectedCurrency: string) => {
    setDonationState((prev) => ({
      ...prev,
      step: "niyyah",
      amount,
      donorName,
      isAnonymous,
      selectedCurrency,
    }));
  }, []);

  const handleNiyyahConfirm = useCallback(() => {
    setDonationState((prev) => ({
      ...prev,
      step: "payment",
    }));
  }, []);

  const handlePaymentSuccess = useCallback(() => {
    setDonationState((prev) => ({
      ...prev,
      step: "confirmation",
    }));
  }, []);

  const handleClose = useCallback(() => {
    setDonationState({
      step: "closed",
      campaign: null,
      amount: 0,
      donorName: "",
      isAnonymous: false,
      selectedCurrency: "USD",
    });
  }, []);

  const handleGiveAgain = useCallback(() => {
    setDonationState((prev) => ({
      ...prev,
      step: "modal",
      amount: 0,
      donorName: "",
      isAnonymous: false,
      selectedCurrency: "USD",
    }));
  }, []);

  const handleCloseModal = useCallback(() => {
    setDonationState((prev) => {
      if (prev.step === "modal") return { ...prev, step: "closed" };
      if (prev.step === "niyyah") return { ...prev, step: "modal" };
      if (prev.step === "payment") return { ...prev, step: "niyyah" };
      return prev;
    });
  }, []);

  return (
    <div className="min-h-screen bg-emerald-950 text-white">
      <Navbar />

      <main>
        <Hero onScrollToCauses={scrollToCauses} />
        <QuranSection />
        <AlafasyBio />
        <AlafasySection />
        <StatsSection />
        <AudioPlayer />
        <TicketsSection />
        <PrayerSection />
        <Campaigns onDonate={handleDonate} />
      </main>

      <Footer />

      {/* Donation Modal */}
      {donationState.step === "modal" && donationState.campaign && (
        <DonationModal
          campaign={donationState.campaign}
          onClose={handleClose}
          onSubmit={handleDonationSubmit}
        />
      )}

      {/* Niyyah Screen */}
      {donationState.step === "niyyah" && donationState.campaign && (
        <NiyyahScreen
          amount={donationState.amount}
          campaignFlag={donationState.campaign.flag}
          campaignTitle={donationState.campaign.title}
          donorName={donationState.donorName}
          isAnonymous={donationState.isAnonymous}
          onConfirm={handleNiyyahConfirm}
          onBack={handleCloseModal}
        />
      )}

      {/* Payment Gateway */}
      {donationState.step === "payment" && donationState.campaign && (
        <PaymentGatewayModal
          campaign={donationState.campaign}
          amount={donationState.amount}
          donorName={donationState.donorName}
          isAnonymous={donationState.isAnonymous}
          selectedCurrency={donationState.selectedCurrency}
          onClose={handleClose}
          onSuccess={handlePaymentSuccess}
          onBack={handleCloseModal}
        />
      )}

      {/* Confirmation Screen */}
      {donationState.step === "confirmation" && donationState.campaign && (
        <Confirmation
          amount={donationState.amount}
          campaignFlag={donationState.campaign.flag}
          campaignTitle={donationState.campaign.title}
          donorName={donationState.donorName}
          onClose={handleClose}
          onGiveAgain={handleGiveAgain}
        />
      )}
    </div>
  );
}
