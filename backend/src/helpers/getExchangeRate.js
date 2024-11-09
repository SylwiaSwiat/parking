const axios = require("axios");

async function getExchangeRate(currency, endDate) {
  const formattedDate = endDate.slice(0, 10);
  const access_key = process.env.EXCHANGE_API_KEY;

  const url = `http://api.exchangeratesapi.io/v1/${formattedDate}?access_key=${access_key}&base=EUR&symbols=${currency}`;
  console.log("Fetching exchange rate from URL:", url);

  try {
    const response = await axios.get(url);
    console.log("Exchange Rate Response:", response.data);

    if (!response.data.rates || !response.data.rates[currency]) {
      throw new Error(`Currency rate for ${currency} not found.`);
    }

    return response.data.rates[currency];
  } catch (error) {
    console.error("Error fetching exchange rate:", error.message || error);
    throw new Error("Error fetching exchange rate. Please try again later.");
  }
}

module.exports = getExchangeRate;
