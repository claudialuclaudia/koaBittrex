var bittrex = require('node-bittrex-api');

const json = require('koa-json')
const Koa = require('koa')
const app = new Koa()

var res = [];

bittrex.options({
  'apikey' : API_KEY,
  'apisecret' : API_SECRET,
});

bittrex.getmarkets( function (data, err) {
   if (err) {
    return console.error(err);
  }
  for( var i in data.result ) {
      res.push({exchange: 'bittrex', pair: data.result[i].MarketName});
    }
});

app.use(json())

app.use((ctx) => {
//   ctx.body = JSON.stringify({BTC: res});
  ctx.body = {BTC: res};
})

app.listen(8080, () => { console.log('goto http://localhost:8080') })
