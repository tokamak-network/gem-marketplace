export async function fetchMarketPrice() {
  
  try {
    const response = await fetch(`/api/coinmarketcap`);
    if (!response.ok) {
      throw new Error("Failed to fetch the market price");
    }
    const data = await response.json();
    return data[0];
  } catch (error) {
  }
}
