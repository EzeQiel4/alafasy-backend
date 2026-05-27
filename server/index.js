const express = require("express");
const cors = require("cors");
const Stripe = require("stripe");
const axios = require("axios");

require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

/* ROOT */
app.get("/", (req, res) => {
  res.send("Payment API Running");
});

/* STRIPE CHECKOUT SESSION */
app.post("/create-checkout-session", async (req, res) => {
  try {
    const { amount, currency, campaignTitle } = req.body;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],

      line_items: [
        {
          price_data: {
            currency: currency || "usd",

            product_data: {
              name: campaignTitle,
            },

            unit_amount: amount * 100,
          },

          quantity: 1,
        },
      ],

      mode: "payment",

      success_url: `${process.env.CLIENT_URL}/success`,

      cancel_url: `${process.env.CLIENT_URL}/cancel`,
    });

    res.json({
      url: session.url,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Something went wrong",
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
app.listen(5000, () => {
  console.log("Server running on port 5000");
});