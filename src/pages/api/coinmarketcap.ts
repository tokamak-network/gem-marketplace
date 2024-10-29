import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const apiKey = process.env.NEXT_PUBLIC_COINMARKETCAP_API_KEY;
  const url =
    "https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest";
  try {
    const response = await fetch(`${url}?slug=tokamak-network`, {
      method: "GET",
      headers: {
        "X-CMC_PRO_API_KEY": apiKey!,
        'Accept': 'application/json'
      },
    });

    const data = await response.json();

    return res.status(200).json([{ current_price: data.data[6731].quote.USD.price }]);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
}
