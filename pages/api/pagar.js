const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { destino, precio } = req.body;
    try {
      const session = await stripe.checkout.sessions.create({
        line_items: [{
          price_data: {
            currency: 'eur',
            product_data: { name: `Vuelo a ${destino}` },
            unit_amount: precio * 100,
          },
          quantity: 1,
        }],
        mode: 'payment',
        success_url: `${req.headers.origin}/?success=true`,
        cancel_url: `${req.headers.origin}/?cancel=true`,
      });
      res.status(200).json({ url: session.url });
    } catch (err) { res.status(500).json({ error: err.message }); }
  }
}