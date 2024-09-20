const express = require("express");
const dotenv = require("dotenv");
const payOS = require("./utils/payos");

const app = express();
const PORT = process.env.PORT || 3030;
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", express.static("public"));
app.use("/payment", require("./controllers/payment-controller"));
app.use("/order", require("./controllers/order-controller"));

app.post("/create-payment-link", async (req, res) => {
  try {
    const paymentLinkResponse = await payOS.createPaymentLink(req.body);
    res.redirect(paymentLinkResponse.checkoutUrl);
  } catch (error) {
    console.error(error);
    res.send("Something went error");
  }
});

app.listen(PORT, function () {
  console.log(`Server is listening on port ${PORT}`);
});
