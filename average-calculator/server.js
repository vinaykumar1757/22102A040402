const express = require('express');
const fetchNumbers = require('./utils/fetchNumbers');

const app = express();
const PORT = 3000;
const WINDOW_SIZE = 10;

let numberWindow = [];

app.get('/numbers/:id', async (req, res) => {
  const { id } = req.params;
  const previous = [...numberWindow];

  const fetched = await fetchNumbers(id);
  const uniqueFetched = fetched.filter(n => !numberWindow.includes(n));

  numberWindow = [...numberWindow, ...uniqueFetched].slice(-WINDOW_SIZE);
  
  const average = (
    numberWindow.reduce((sum, val) => sum + val, 0) / numberWindow.length || 0
  ).toFixed(2);

  res.json({
    windowPrevState: previous,
    windowCurrState: numberWindow,
    avg: Number(average)
  });
});

app.listen(PORT, () => {
  console.log(`Average Calculator running on port ${PORT}`);
});
