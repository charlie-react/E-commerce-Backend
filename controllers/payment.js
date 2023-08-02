const { StatusCodes } = require("http-status-codes");
const Stripe = require("stripe");

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const payment = async (req, res) => {
  console.log(req.body)
  try {
    const params = {
      submit_type: "pay",
      mode: "payment",
      payment_method_types: ["card"],
      billing_address_collection: "auto",
      shipping_options: [{ shipping_rate: "shr_1NWHTAEN5RLj7e0iYn2F5v5v" }],
      line_items: req.body.map((item) => {
        return {
          price_data: {
            currency: "usd",
            product_data: {
              name: item.name,
              images:[item.image]
            },
            unit_amount: item.price * 100,
          },
          adjustable_quantity: {
            enabled: true,
            minimum: 1,
          },
          quantity:item.qty
        };
      }),
      success_url:`${process.env.FRONTEND_URL}/success`,
      cancel_url:`${process.env.FRONTEND_URL}/cancelled`
    };
    const session = await stripe.checkout.sessions.create(params);
    res.status(StatusCodes.OK).json(session.id);
  } catch (error) {
    res
      .status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
      .json(error.message);
  }
};

module.exports = payment;
