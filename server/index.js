const express = require("express");
const cors = require("cors");
const axios = require("axios");

require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());


/* ROOT */
app.get("/", (req, res) => {
  res.send("Payment API Running");
});

/* FLUTTERWAVE PAYMENT LINK */
app.post("/create-checkout-session", async (req, res) => {
  try {
    const { amount, campaignTitle, email, name } = req.body;

    const response = await axios.post(
      "https://api.flutterwave.com/v3/payments",
      {
        tx_ref: "donation-" + Date.now(),

        amount: Number(amount),

        currency: "NGN",

        redirect_url: `${process.env.CLIENT_URL}/success`,

        customer: {
          email: email || "donor@example.com",
          name: name || "Anonymous Donor",
        },

        customizations: {
          title: campaignTitle || "Donation",
          description: "Donation Payment",
        },
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.FLW_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    res.json({
      url: response.data.data.link,
    });

  } catch (error) {

    console.error(
      error.response?.data || error.message
    );

    res.status(500).json({
      error: "Flutterwave payment failed",
    });
  }
});
/* CREATE CRYPTO PAYMENT */
app.post("/create-crypto-payment", async (req, res) => {
  try {
    const { amount, currency, coin } = req.body;

    console.log("Incoming Request:", {
      amount,
      currency,
      coin,
    });

    const response = await axios.post(
      "https://api.nowpayments.io/v1/payment",
      {
        price_amount: Number(amount),
        price_currency: currency,
        pay_currency: coin,
        is_fixed_rate: true,

        ipn_callback_url: "https://yourdomain.com/ipn",

        success_url: `${process.env.CLIENT_URL}/success`,
        cancel_url: `${process.env.CLIENT_URL}/cancel`,
      },
      {
        headers: {
          "x-api-key": process.env.NOWPAYMENTS_API_KEY,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("NOWPayments Response:", response.data);

    res.json(response.data);

  } catch (error) {

    console.log(
      "NOWPayments ERROR:",
      error.response?.data || error.message
    );

    res.status(500).json({
      error:
        error.response?.data ||
        error.message ||
        "Crypto payment creation failed",
    });
  }
});

/* CHECK CRYPTO PAYMENT STATUS */
app.get("/check-crypto-payment/:id", async (req, res) => {
  try {
    const paymentId = req.params.id;

    const response = await axios.get(
      `https://api.nowpayments.io/v1/payment/${paymentId}`,
      {
        headers: {
          "x-api-key": process.env.NOWPAYMENTS_API_KEY,
        },
      }
    );

    res.json(response.data);

  } catch (error) {

    console.error(
      error.response?.data || error.message
    );

    res.status(500).json({
      error: "Failed to check payment",
    });
  }
});

/* START SERVER */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});