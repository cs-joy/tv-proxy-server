import fetch from "node-fetch";
const apiEndpoint = 'https://api.coingecko.com/api/v3/simple/price';
const coinTicker = 'rocket-pool'; // The ticker symbol for Bitcoin
const currency = 'usd';

fetch(`${apiEndpoint}?ids=${coinTicker}&vs_currencies=${currency}`)
  .then(response => response.json())
  .then(data => {
    console.log(`Current ${coinTicker.toUpperCase()} price: ${data[coinTicker][currency]}$`);
  })
  .catch(error => {
    console.error('Error:', error);
  });
