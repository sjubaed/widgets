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
import { React, jsx, type AllWidgetProps, SqlQueryParams, DataSourceManager, FeatureLayerDataSource } from 'jimu-core';
import * as Plot from '@observablehq/plot';
import * as d3 from "d3";
const { useEffect, useRef } = React

export default function Widget (props: AllWidgetProps<any>) {
  // Create a React Ref - https://reactjs.org/docs/refs-and-the-dom.html
  const mainRef = useRef<HTMLDivElement>()
  // const [data, setData] = useState();

  if (props.useDataSources.length > 0) {
      const dsManager = DataSourceManager.getInstance();
      const useDataSource = props.useDataSources[0];
      const ds: FeatureLayerDataSource = dsManager.getDataSource(useDataSource.dataSourceId) as FeatureLayerDataSource;

      console.log(ds)

      // console.log(queryParams)

    }

  const data = d3.ticks(-2, 2, 200).map(Math.sin);


  var marginLeft = 100;
  var marginRight = 30;
  var marginBottom = 0;
  var marginTop = 30;

  var height = 894;
  var duration = 750;
  var barStep = 27;
  var barPadding = 3 / barStep;

  const color = d3.scaleOrdinal([true, false], ["steelblue", "#aaa"]);
  console.log(color)

  const yAxis = g => g
    .attr("class", "y-axis")
    .attr("transform", `translate(${marginLeft + 0.5},0)`)
    .call(g => g.append("line")
        .attr("stroke", "currentColor")
        .attr("y1", marginTop)
        .attr("y2", height - marginBottom))

  const xAxis = g => g
    .attr("class", "x-axis")
    .attr("transform", `translate(0,${marginTop})`)
    .call(d3.axisTop(x).ticks(width / 80, "s"))
    .call(g => (g.selection ? g.selection() : g).select(".domain").remove())

  console.log(xAxis);

  const x = d3.scaleLinear().range([marginLeft, width - marginRight]);

  const root = d3.hierarchy(data)
    .sum(d => d.value)
    .sort((a, b) => b.value - a.value)
    .eachAfter(d => d.index = d.parent ? d.parent.index = d.parent.index + 1 || 0 : 0);

  // const stagger = () = {
  //   let value = 0;
  //   return (d, i) => {
  //     const t = `translate(${x(value) - x(0)},${barStep * i})`;
  //     value += d.value;
  //     return t;
  //   };
  // }

  // const stack = (i) = {
  //   let value = 0;
  //   return d => {
  //     const t = `translate(${x(value) - x(0)},${barStep * i})`;
  //     value += d.value;
  //     return t;
  //   };
  // }


  // const svg = d3.create("svg")
  //   .attr("viewBox", [0, 0, width, height])
  //   .attr("width", width)
  //   .attr("height", height)
  //   .attr("style", "max-width: 100%; height: auto;");

  // x.domain([0, root.value]);

  // svg.append("rect")
  //   .attr("class", "background")
  //   .attr("fill", "none")
  //   .attr("pointer-events", "all")
  //   .attr("width", width)
  //   .attr("height", height)
  //   .attr("cursor", "pointer")
  //   .on("click", (event, d) => up(svg, d));

  // svg.append("g")
  //   .call(xAxis);

  // svg.append("g")
  //   .call(yAxis);

  // down(svg, root);

  // return svg.node();

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
        This widget shows how to include ObservableHQ's Plot in your
        custom Experience Builder widget.
        </p>
      <div ref={mainRef}></div>
    </div>
  )
}