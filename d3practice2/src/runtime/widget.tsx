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
import { SqlExpression, SqlResult, jsx } from 'jimu-core'
import React, { useState } from 'react';
import { type AllWidgetProps, SqlQueryParams, DataSourceManager, FeatureLayerDataSource, DataSource, IMDataSourceInfo } from 'jimu-core';
import * as d3 from 'd3';
import raw from './DataRecords.json'
import raw2 from './flare2.json'
import * as fs from 'fs';
import { Button } from 'jimu-ui'
import { JimuMapView, JimuMapViewComponent } from "jimu-arcgis";
import LayerList from '@arcgis/core/widgets/LayerList';

const { useEffect, useRef } = React

console.log(raw)

// Selects which county you want to see the data of
const selectedCounty = 25

//empty arrays for all relevant data to pull from later
const countyNames = []
const countyPop2018 = []
const countyPop2019 = []
const countyPop2020 = []
const countyWhitePop2018 = []
const countyWhitePop2019 = []
const countyWhitePop2020 = []
const countyBlackPop2018 = []
const countyBlackPop2019 = []
const countyBlackPop2020 = []
const countyAsianPop2018 = []
const countyAsianPop2019 = []
const countyAsianPop2020 = []
const countyNativePop2018 = []
const countyNativePop2019 = []
const countyNativePop2020 = []
const countyPIPop2018 = []
const countyPIPop2019 = []
const countyPIPop2020 = []

//for loop to parse json file to get relavent data
for (let i = 0; i < 82; i++) {
  countyNames.push(raw[i].attributes.County_Name)
  countyPop2018.push(raw[i].attributes.Total_Population__2018_)
  countyPop2019.push(raw[i].attributes.Total_Population__2019_)
  countyPop2020.push(raw[i].attributes.Total_Population__2020_)
  countyWhitePop2018.push(raw[i].attributes.White_Population__2018_)
  countyWhitePop2019.push(raw[i].attributes.White_Population__2019_)
  countyWhitePop2020.push(raw[i].attributes.White_Population__2020_)
  countyBlackPop2018.push(raw[i].attributes.Black_Population__2018_)
  countyBlackPop2019.push(raw[i].attributes.Black_Population__2019_)
  countyBlackPop2020.push(raw[i].attributes.Black_Population__2020_)
  countyAsianPop2018.push(raw[i].attributes.Asian_Population__2018_)
  countyAsianPop2019.push(raw[i].attributes.Asian_Population__2019_)
  countyAsianPop2020.push(raw[i].attributes.Asian_Population__2020_)
  countyNativePop2018.push(raw[i].attributes.Native_Population__2018_)
  countyNativePop2019.push(raw[i].attributes.Native_Population__2019_)
  countyNativePop2020.push(raw[i].attributes.Native_Population__2020_)
  countyPIPop2018.push(raw[i].attributes.Pacific_Islander_Population__20)
  countyPIPop2019.push(raw[i].attributes.Pacific_Islander_Population__21)
  countyPIPop2020.push(raw[i].attributes.Pacific_Islander_Population__22)
};

//gets all relavent data for specific county
const activeDataSet = [
  countyNames[selectedCounty],
  countyPop2018[selectedCounty],
  countyPop2019[selectedCounty],
  countyPop2020[selectedCounty],
  countyWhitePop2018[selectedCounty],
  countyWhitePop2019[selectedCounty],
  countyWhitePop2020[selectedCounty],
  countyBlackPop2018[selectedCounty],
  countyBlackPop2019[selectedCounty],
  countyBlackPop2020[selectedCounty],
  countyAsianPop2018[selectedCounty],
  countyAsianPop2019[selectedCounty],
  countyAsianPop2020[selectedCounty],
  countyNativePop2018[selectedCounty],
  countyNativePop2019[selectedCounty],
  countyNativePop2020[selectedCounty],
  countyPIPop2018[selectedCounty],
  countyPIPop2019[selectedCounty],
  countyPIPop2020[selectedCounty],
]

//first level of data to be displayed
const topLevelData = [
  activeDataSet[1],
  activeDataSet[2],
  activeDataSet[3]
]

//2018 data
const racedata2018 = [
  activeDataSet[4],
  activeDataSet[7],
  activeDataSet[10],
  activeDataSet[13],
  activeDataSet[16]
]

//2019 data
const racedata2019 = [
  activeDataSet[5],
  activeDataSet[8],
  activeDataSet[11],
  activeDataSet[14],
  activeDataSet[17]
]

//2020 data
const racedata2020 = [
  activeDataSet[6],
  activeDataSet[9],
  activeDataSet[12],
  activeDataSet[15],
  activeDataSet[18]
]

//array to hold the different data levels
const displayData = [
  topLevelData,
  racedata2018,
  racedata2019,
  racedata2020
]

//index for displayData
const displayNumber = 0

console.log(activeDataSet);
console.log(topLevelData);
console.log(racedata2018);
console.log(racedata2019);
console.log(racedata2020);

//hierarchy for bar graph
const data = {
  "name": activeDataSet[0],
  "children": [
    {
      "name": "Pop 2018",
      "children": [
        { "name": "White", "size": activeDataSet[4] },
        { "name": "Black", "size": activeDataSet[7] },
        { "name": "Asian", "size": activeDataSet[10] },
        { "name": "Native", "size": activeDataSet[13] },
        { "name": "Pacific Islander", "size": activeDataSet[16] }
      ]
    },
    {
      "name": "Pop 2019",
      "children": [
        { "name": "White", "size": activeDataSet[5] },
        { "name": "Black", "size": activeDataSet[8] },
        { "name": "Asian", "size": activeDataSet[11] },
        { "name": "Native", "size": activeDataSet[14] },
        { "name": "Pacific Islander", "size": activeDataSet[17] }
      ]
    },
    {
      "name": "Pop 2020",
      "children": [
        { "name": "White", "size": activeDataSet[6] },
        { "name": "Black", "size": activeDataSet[9] },
        { "name": "Asian", "size": activeDataSet[12] },
        { "name": "Native", "size": activeDataSet[15] },
        { "name": "Pacific Islander", "size": activeDataSet[18] }
      ]
    }
  ]
}

//forming root nodes
const root = d3.hierarchy(data);

console.log(displayData[displayNumber])

const w = 800;
const h = 600;
const margin = ({ top: 20, right: 0, bottom: 30, left: 40 })






function Widget(props: AllWidgetProps<any>) {


    const [enableMI, setMI] = useState(false);

    const ShowMI = () => {
      setMI(!enableMI);
      console.log(enableMI)
    };

    const totalPopDataset = []

    useEffect(() => {

      if (props.useDataSources.length > 0) {
        const dsManager = DataSourceManager.getInstance();
        const useDataSource = props.useDataSources[0];
        const ds: FeatureLayerDataSource = dsManager.getDataSource(useDataSource.dataSourceId) as FeatureLayerDataSource;

        if (ds.getSelectedRecords().length > 0) {
          console.log(ds.getSelectedRecords()[0].getData());
          totalPopDataset.push(ds.getSelectedRecords()[0].getData().Total_Population__2018_);
          totalPopDataset.push(ds.getSelectedRecords()[0].getData().Total_Population__2019_);
          totalPopDataset.push(ds.getSelectedRecords()[0].getData().Total_Population__2020_);
          console.log(totalPopDataset)
        }
      }

    },[enableMI])

    

  // Create a React Ref - https://reactjs.org/docs/refs-and-the-dom.html
  const mainRef = useRef<HTMLDivElement>()

  //  const storingDataPoints = () => {
  //    if (props.useDataSources.length > 0) {
  //      const dsManager = DataSourceManager.getInstance();
  //      const useDataSource = props.useDataSources[0];
  //      const ds: FeatureLayerDataSource = dsManager.getDataSource(useDataSource.dataSourceId) as FeatureLayerDataSource;


  //      console.log(useDataSource);     
  //    }
  //  }

  //  console.log(typeof(table));

  useEffect(() => {
    if (mainRef && mainRef.current) {

      //d3 code

      const x = d3
        .scaleLinear()
        .domain([0, d3.max(totalPopDataset)])
        .range([0, 100])

      const div = d3.create('div')
      // Apply some styles to the chart container.
      div.style('font', '20px sans-serif')
      div.style('text-align', 'center')
      div.style('color', 'white')

      // Define the initial (empty) selection for the bars.
      const bar = div.selectAll('div')

      // Bind this selection to the data (computing enter, update and exit).
      const barUpdate = bar.data(totalPopDataset)

      // Join the selection and the data, appending the entering bars.
      const barNew = barUpdate.join('div')
        // .on("click", (event) => console.log(event.x event.y)
        //     );


      // Apply some styles to the bars.
      barNew.style('background', 'steelblue')
      barNew.style('padding', '3px')
      barNew.style('margin', '4px')



      // Set the width as a function of data.
      // barNew.style("width", (d) => `${d * 10}px`);
      barNew.style('width', (d) => `${x(d)}px`)

      // Set the text of each bar as the data.
      barNew.text((d) => d)


      //d3 code end

      mainRef.current.appendChild(div.node())

    }
  }, [mainRef, totalPopDataset])

  return (
    <div className="App">
      <div ref={mainRef}></div>
      <Button
      onClick={ShowMI}
      size="default"
      >
      Button
      </Button>
    </div>
  )
}

export default Widget