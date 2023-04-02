const {log, error} = console;

import tulind from "tulind";
import {promisify} from "util";

const sma_async = promisify(tulind.indicators.sma.indicator);

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
// export default sma_inc;
module.exports = { sma_inc };