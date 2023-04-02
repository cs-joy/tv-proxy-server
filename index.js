const {log, error} = console;
import exp  from "express";
const app = exp();
const server = app.listen(3232, log('Proxy server is running at port 3232'));
import got from "got";
import cors from "cors";

app.use(cors())
app.get('/:symbol/:interval', async (req, res) => {
    try {
    const {symbol, interval} = req.params;
    const resp = await got (
        `https://api.binance.com/api/v3/klines?symbol=${symbol}&interval=${interval}`
    );
    const data = JSON.parse(resp.body);
    const klinedata = data.map((d) => ({
      time: d[0] / 1000,
      open: d[1] * 1,
      high: d[2] * 1,
      low: d[3] * 1,
      close: d[4] * 1,
    }));
    res.status(200).json(klinedata);
  } catch (err) {
    res.status(500).send(err);
  }
});