import fetch from "node-fetch";
const apiEndpoint = 'https://api.coingecko.com/api/v3/simple/price';
const coinId = 'dashcoin';
const currency = 'usd';

fetch(`${apiEndpoint}?ids=${coinId}&vs_currencies=${currency}`)
  .then(response => response.json())
  .then(data => {
    console.log(`Current ${coinId.toUpperCase()} price: ${data[coinId][currency]}`);
  })
  .catch(error => {
    console.error('Error:', error);
  });
