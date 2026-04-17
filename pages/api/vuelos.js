import { Duffel } from '@duffel/api';

const duffel = new Duffel({
  token: process.env.DUFFEL_ACCESS_TOKEN,
});

export default async function handler(req, res) {
  const { origen, destino, fecha } = req.query;
  try {
    const offerRequest = await duffel.offerRequests.create({
      slices: [{ origin: origen, destination: destino, departure_date: fecha }],
      passengers: [{ type: 'adult' }],
      cabin_class: 'economy',
    });
    res.status(200).json(offerRequest.data.offers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}