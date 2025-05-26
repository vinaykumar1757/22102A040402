const axios = require('axios');

const sources = {
  p: 'http://20.244.56.144/test/primes',
  f: 'http://20.244.56.144/test/fibo',
  e: 'http://20.244.56.144/test/even',
  r: 'http://20.244.56.144/test/rand'
};

async function fetchNumbers(id) {
  if (!sources[id]) return [];

  try {
    const response = await axios.get(sources[id], { timeout: 500 });
    return response.data.numbers || [];
  } catch (err) {
    return [];
  }
}

module.exports = fetchNumbers;
