import dotenv from "dotenv";
import fetch from "node-fetch";
dotenv.config();

function convert() {
//   const amount = document.getElementById('amount').value;
//   const from = document.getElementById('from').value.toUpperCase();
//   const to = document.getElementById('to').value.toUpperCase();
const amount = 0.567;
const from = "BTC";
const to = "USD";
  const url = `https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=${from},${to}&convert=${to}`;
  const headers = {
    'X-CMC_PRO_API_KEY': process.env.FIG
  };
  
  fetch(url, { headers })
    .then(response => {
        if (!response.ok) {
            console.log("error occured");
        } else {
            response.json();
        }
    })
    .then(data => {
        console.log(data);
    //   const fromPrice = data.data[from].quote[to].price;
    //   const toPrice = data.data[to].quote[to].price;
    //   const convertedAmount = amount / fromPrice * toPrice;
    //   console.log(`${amount} ${from} = ${convertedAmount.toFixed(2)} ${to}`);
      //document.getElementById('result').textContent = `${amount} ${from} = ${convertedAmount.toFixed(2)} ${to}`;
    })
    .catch(error => {
      console.error(error);
      console.log('An error occurred.');
      //document.getElementById('result').textContent = 'An error occurred.';
    });
}


convert();