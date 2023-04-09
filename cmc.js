import fetch from "node-fetch";
import d from "dotenv";

d.config();

const apiEndpoint = 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest';
const coinTicker = 'XRP'; // The ticker symbol for Bitcoin
const currency = 'USD';

fetch(`${apiEndpoint}?symbol=${coinTicker}&convert=${currency}`, {
  headers: {
    'X-CMC_PRO_API_KEY': process.env.FIG
  }
})
  .then(response => response.json())
  .then(data => {
    console.log(`Current ${coinTicker} price: ${data.data[coinTicker].quote[currency].price}`);
  })
  .catch(error => {
    console.error('Error:', error);
  });
