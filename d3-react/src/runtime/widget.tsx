/** @jsx jsx */
/**
  Licensing

  Copyright 2022 Esri

  Licensed under the Apache License, Version 2.0 (the "License"); You
  may not use this file except in compliance with the License. You may
  obtain a copy of the License at
  http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or
  implied. See the License for the specific language governing
  permissions and limitations under the License.

  A copy of the license is available in the repository's
  LICENSE file.
*/
import { React, jsx } from 'jimu-core'
import * as d3 from 'd3'
const { useEffect, useRef, useState, useMemo } = React

// interface Data {
//   label: string;
//   value: number;
// }

// const DATA: Data[] = [
//   { label: "Apples", value: 100 },
//   { label: "Bananas", value: 200 },
//   { label: "Oranges", value: 50 },
//   { label: "Kiwis", value: 150 }
// ];

interface AxisBottomProps {
  scale: ScaleBand<string>;
  transform: string;
}

interface AxisLeftProps {
  scale: ScaleLinear<number, number, never>;
}

interface BarsProps {
  data: BarChartProps["data"];
  height: number;
  scaleX: AxisBottomProps["scale"];
  scaleY: AxisLeftProps["scale"];
}

// interface BarChartProps {
//   data: Data[];
// }

const data3 = {
  name: "Lead",
  children: [
  {
    name: "Seeded",
    children: [
      { name: "Apples", value: 100 },
      { name: "Oranges", value: 50},
      { name: "Kiwis", value: 150}
    ]
  },
  {
    name: "Berries",
    children: [
      { name: "Bananas", value: 200 },
      { name: "Cherries", value: 90 }
    ]
  }
  ]
};

const data4 = {
  name: "Eve",
  children: [
    {name: "Cain", value: 200},
    {name: "Seth", children: [{name: "Enos", value: 100}, {name: "Noam", value: 20}]},
    {name: "Abel", value: 0},
    {name: "Awan", children: [{name: "Enoch", value: 50}]},
    {name: "Azura", value: 10}
  ]
};

const data2 = [
  { label: "Apples", value: 100},
  { label: "Bananas", value: 200 },
  { label: "Cherries", value: 90 },
  { label: "Oranges", value: 50 },
  { label: "Kiwis", value: 150 }
];

const rootHier = d3.hierarchy(data3)
  .sum(d => d.value)
  .sort((a, b) => b.value - a.value)
  .eachAfter(d => d.index = d.parent ? d.parent.index = d.parent.index + 1 || 0 : 0)

console.log(rootHier)


function barChart({ data }: BarChartProps) {
  const margin = { top: 10, right: 0, bottom: 20, left: 30 };
  const width = 500 - margin.left - margin.right;
  const height = 300 - margin.top - margin.bottom;

  const scaleX = d3.scaleBand(data2.map(({ label }) => label), [0, width]);
  const scaleY = d3.scaleLinear([0, Math.max(...data2.map(({ value }) => value))], [height, 0]);

  console.log(data2)

  return (
    <svg
      width={width + margin.left + margin.right}
      height={height + margin.top + margin.bottom}
    >
      <g transform={`translate(${margin.left}, ${margin.top})`}>
        <AxisBottom scale={scaleX} transform={`translate(0, ${height})`} />
        <AxisLeft scale={scaleY} />
        <Bars data={data2} height={height} scaleX={scaleX} scaleY={scaleY} />
      </g>
    </svg>
  );
}

function AxisBottom({ scale, transform }: AxisBottomProps) {
  const ref = useRef<SVGGElement>(null);

  useEffect(() => {
    if (ref.current) {
      d3.select(ref.current).call(d3.axisBottom(scale));
    }
  }, [scale]);

  return <g ref={ref} transform={transform} />;
}

function AxisLeft({ scale }: AxisLeftProps) {
  const ref = useRef<SVGGElement>(null);

  useEffect(() => {
    if (ref.current) {
      d3.select(ref.current).call(d3.axisLeft(scale));
    }
  }, [scale]);

  return <g ref={ref} />;
}

function Bars({ data, height, scaleX, scaleY }: BarsProps) {
  //const ref = useRef<SVGGElement>(null);
  // useEffect(() => {
  //   if (ref.current) {
  //     const bar = svg.selectAll("svg");
  //     const barUpdate = bar.data(data);
  //     const barNew = barUpdate.join("bar")
  //     barNew.style('background', 'steelblue')
  //     // barNew.style('padding', '3px')
  //     // barNew.style('margin', '4px')
  //     // barNew.style('width', (d) => `${x(d)}px`)
  //     // barNew.text((d) => d)
  //     //ref.current.appendChild(svg.node())
  //   }
  // }, [data])

  return (
    <>
    {data.map(({ value, label}) => (
      <rect
        x={scaleX(label)}
        y={scaleY(value)}
        width={scaleX.bandwidth()}
        height={height - scaleY(value)}
        fill="teal"
        />
        ))}
    </>
    );
}

export default barChart