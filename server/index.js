const express = require("express");
const Stripe = require("stripe");
const stripe = new Stripe("sk_test_51KyQ9pE8TxQAl8Y8ukGWushgskKk4y9FlZivJJPn22Kw9pZwfPNvrtAWcrV7FsAnrSagUUZgDEDXgPftkRzxSCvM00V5e32DGq");

const cors = require("cors");

const app = express();

app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());

app.post("/api/checkout", async (req, res) => {
  // you can get more data to find in a database, and so on
  const { id, amount } = req.body;

  try {
    const payment = await stripe.paymentIntents.create({
      amount,
      currency: "USD",
      description: "Gaming Keyboard",
      payment_method: id,
      confirm: true, //confirm the payment at the same time
    });

    console.log(payment);

    return res.status(200).json({ message: "Successful Payment" });
  } catch (error) {
    console.log(error);
    return res.json({ message: error.raw.message });
  }
});

app.listen(3001, () => {
  console.log("Server on port", 3001);
});