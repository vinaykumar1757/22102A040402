import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const StockPage = () => {
  const [data, setData] = useState([]);
  const [interval, setInterval] = useState(15);

  useEffect(() => {
    fetch(`http://localhost:3000/api/stocks?interval=${interval}`)
      .then(res => res.json())
      .then(json => setData(json));
  }, [interval]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Stock Price Chart</h1>
      <select
        className="mb-4 p-2 border"
        value={interval}
        onChange={e => setInterval(e.target.value)}
      >
        {[5, 15, 30, 60].map(min => (
          <option key={min} value={min}>{`Last ${min} min`}</option>
        ))}
      </select>
      <LineChart width={800} height={400} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="timestamp" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="price" stroke="#8884d8" />
        <Line type="monotone" dataKey="average" stroke="#82ca9d" />
      </LineChart>
    </div>
  );
};

export default StockPage;
