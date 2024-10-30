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

    const eth_res = await fetch(`${url}?slug=ethereum`, {
      method: "GET",
      headers: {
        "X-CMC_PRO_API_KEY": apiKey!,
        'Accept': 'application/json'
      },
    });

    const data = await response.json();
    const ethData = await eth_res.json();
    console.log(ethData)

    return res.status(200).json([{ ton_price: data.data[6731].quote.USD.price, eth_price: ethData.data[1027].quote.USD.price }]);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
}
