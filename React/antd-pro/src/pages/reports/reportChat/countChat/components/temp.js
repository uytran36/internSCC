import React from 'react';
import { Chart, Legend, Geom, Tooltip } from 'bizcharts';

const data = [
  { genre: 'Sports', sold: 275 },
  { genre: 'Strategy', sold: 115 },
  { genre: 'Action', sold: 120 },
  { genre: 'Shooter', sold: 350 },
  { genre: 'Other', sold: 150 },
];

function Demo() {
  return (
    <Chart width={600} height={400} data={data}>
      <Tooltip />
      <Legend position="top" />
      <Geom type="bar" position="sold" color="genre" />
    </Chart>
  );
}

export default Demo;
