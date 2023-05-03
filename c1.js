import dotenv from "dotenv"
import fetch from "node-fetch"
dotenv.config()

const key = process.env.FIG


const myApi = `https://pro-api.coinmarketcap.com/v1/tools/price-conversion?${new URLSearchParams({
    amount: 0.094,
    symbol: 'BTC',
    convert: 'USD'
  })}`;

fetch(myApi, {
    headers: {
      'X-CMC_PRO_API_KEY': key
    }
})
.then(resp => resp.json())
.then(data => {
    const convertedAmount = data.data.quote.USD.price;
    console.log(`1 BTC is currently worth ${convertedAmount} USD`);
})
.catch(error => console.error(error));