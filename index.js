const {log, error} = console;
import exp  from "express";
const app = exp();
const server = app.listen(3232, log('Proxy server is running at port 3232'));
import got from "got";
import cors from "cors";

import tulind from "tulind";
import {promisify} from "util";


const sma_async = promisify(tulind.indicators.sma.indicator);
const ema_async = promisify(tulind.indicators.ema.indicator);
const rsi_async = promisify(tulind.indicators.rsi.indicator);
const macd_async = promisify(tulind.indicators.macd.indicator);

// sma
const sma_inc = async (data) => {
   const d1 = data.map((d) => d.close);
   const results = await sma_async([d1], [100]);
   const d2 = results[0];
   const diff = data.length - d2.length;
   const emptyArr = [...new Array(diff)].map((d) => '');
   const d3 = [...emptyArr, ...d2];
   data = data.map((d, i) => ({ ...d, sma: d3[i] }));

   return data;
};

// ema
const ema_inc = async (data) => {
  const d1 = data.map((d) => d.close);
  const results = await ema_async([d1], [21]);
  const d2 = results[0];
  const diff = data.length - d2.length;
  const emptyArr = [...new Array(diff)].map((d) => '');
  const d3 = [...emptyArr, ...d2];
  data = data.map((d, i) => ({ ...d, ema: d3[i] }));

  return data;
};


// rsi_inc

const rsi_inc = async (data) => {
  const d1 = data.map((d) => d.close);
  const results = await rsi_async([d1], [21]);
  const d2 = results[0];
  const diff = data.length - d2.length;
  const emptyArray = [...new Array(diff)].map((d) => '');
  const d3 = [...emptyArray, ...d2];
  data = data.map((d, i) => ({ ...d, rsi: d3[i] }));
  return data;
};


// markers_inc

const markers_inc = (data) => {
  //EMA21 CROSSOVER SMA100 - LONG
  //EMA21 CROSSUNDER SMA100 - SHORT
  data = data.map((d, i, arr) => {
    const long =
      arr[i]?.ema > arr[i]?.sma && arr[i - 1]?.ema < arr[i - 1]?.sma
        ? true
        : false;
    const short =
      arr[i]?.ema < arr[i]?.sma && arr[i - 1]?.ema > arr[i - 1]?.sma
        ? true
        : false;
    return { ...d, long, short };
  });
  return data;
};


// macd_inc

const macd_inc = async (data) => {
  const d1 = data.map((d) => d.close);
  const results = await macd_async([d1], [12, 26, 9]);
  const diff = data.length - results[0].length;
  const emptyArray = [...new Array(diff)].map((d) => '');

  const macd1 = [...emptyArray, ...results[0]];
  const macd2 = [...emptyArray, ...results[1]];
  const macd3 = [...emptyArray, ...results[2]];

  data = data.map((d, i) => ({
    ...d,
    macd_fast: macd1[i],
    macd_slow: macd2[i],
    macd_histogram: macd3[i],
  }));
  return data;
};

// ******App******

app.use(cors());
app.get('/:symbol/:interval', async (req, res) => {
    try {
    const {symbol, interval} = req.params;
    const resp = await got (
       `https://api.binance.com/api/v3/klines?symbol=${symbol}&interval=${interval}`
    );
    const data = JSON.parse(resp.body);
    let klinedata = data.map((d) => ({
      time: d[0] / 1000,
      open: d[1] * 1,
      high: d[2] * 1,
      low: d[3] * 1,
      close: d[4] * 1,
    }));
    klinedata = await sma_inc(klinedata);
    klinedata = await ema_inc(klinedata);
    klinedata = markers_inc(klinedata);
    klinedata = await rsi_inc(klinedata);
    klinedata = await macd_inc(klinedata);
    res.status(200).json(klinedata);
  } catch (err) {
    res.status(500).send(err);
  }
});