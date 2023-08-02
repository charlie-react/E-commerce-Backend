Object.keys(require.cache).forEach(function (key) {
  delete require.cache[key];
});

const express = require("express");
require("dotenv").config();
require("express-async-errors");
const connectDB = require("./db/connectdb");
const tstRouter = require("./routes/tstroute");
const productRouter = require("./routes/product")
const paymentRouter = require("./routes/payment")
const cors = require("cors");
const Stripe = require("stripe")

const app = express();

const errorHandlerMiddleware = require("./middlewares/errorHandlerMiddleware");

const notFound = require("./middlewares/notFound");
// const { default: Stripe } = require("stripe");

// middlewares
app.use(express.json({ limit: "10mb" }));
app.use(cors());


app.use(tstRouter);
app.use(productRouter)
app.use(paymentRouter)


app.use(errorHandlerMiddleware);
app.use(notFound);



const port = process.env.PORT || 5001;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`port is listenin on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};
start();
