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
import { React, jsx } from 'jimu-core';
import * as Plot from '@observablehq/plot';
import * as d3 from "d3";
const { useEffect, useRef } = React

export default function Widget () {
  // Create a React Ref - https://reactjs.org/docs/refs-and-the-dom.html
  const mainRef = useRef<HTMLDivElement>()
  // const [data, setData] = useState();

  const data = d3.ticks(-2, 2, 200).map(Math.sin);

  // const x = d3
  //   .scaleLinear()
  //   .domain([0, d3.max(data)])
  //   .range([0, 100])

  useEffect(() => {
    if (data === undefined) return;
    const plot = Plot.plot({
      y: {grid: true},
      color: {scheme: "burd"},
      marks: [
        Plot.ruleY([0]),
        Plot.lineY(data)
      ]
    });
    mainRef.current.append(plot);
    return () => plot.remove();
  }, [data]);

  

  return (
    <div className="widget-d3 jimu-widget p-2">
      <p>
        This widget shows how to include an external library (D3.js) in your
        custom Experience Builder widget. The D3.js code being used comes from
          the tutorial{' '}
        <a href="https://observablehq.com/@d3/lets-make-a-bar-chart">
          Let’s Make a Bar Chart, Part 1
          </a>
          .
        </p>
      <div ref={mainRef}></div>
    </div>
  )
}