///////////////////////
/////////////////////////
// REQUERIDO PARA QUE LA PASARELA DE PAGO FUNCIONE
const { resolve } = require("path");
const env = require("dotenv").config({ path: "./.env" });
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2022-08-01",
});

//SON LAS RUTAS PARA LA PARTE DE LA PARESALE DE PAGOS

const express = require("express");

const api = express.Router();

api.use(express.static(process.env.STATIC_DIR));

api.get("/nada", (req, res) => {
  const path = resolve(process.env.STATIC_DIR + "/index.html");
  res.sendFile(path);
});

api.get("/config", (req, res) => {
  res.send({
    publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
  });
});

api.post("/create-payment-intent", async (req, res) => {
  const { amount } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      currency: "usd",
      amount,
      automatic_payment_methods: {
        enabled: true,
      },
    });

    res.send({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    return res.status(400).send({
      error: {
        message: error.message,
      },
    });
  }
});
/////////////////////////////

module.exports = api;
