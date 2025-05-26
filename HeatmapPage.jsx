import React, { useEffect, useState } from 'react';
import { HeatMapGrid } from 'react-grid-heatmap';

const HeatmapPage = () => {
  const [heatmapData, setHeatmapData] = useState([]);
  const [labels, setLabels] = useState([]);
  const [interval, setInterval] = useState(15);

  useEffect(() => {
    fetch(`http://localhost:3000/api/heatmap?interval=${interval}`)
      .then(res => res.json())
      .then(({ data, stocks }) => {
        setHeatmapData(data);
        setLabels(stocks);
      });
  }, [interval]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Correlation Heatmap</h1>
      <select
        className="mb-4 p-2 border"
        value={interval}
        onChange={e => setInterval(e.target.value)}
      >
        {[5, 15, 30, 60].map(min => (
          <option key={min} value={min}>{`Last ${min} min`}</option>
        ))}
      </select>
      <HeatMapGrid
        data={heatmapData}
        xLabels={labels}
        yLabels={labels}
        cellRender={value => value.toFixed(2)}
        cellStyle={(_x, _y, ratio) => ({
          background: `rgb(${255 * (1 - ratio)}, ${255 * ratio}, 0)`,
          fontSize: '12px',
        })}
      />
    </div>
  );
};

export default HeatmapPage;
