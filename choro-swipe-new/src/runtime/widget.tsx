import { React, AllWidgetProps, jsx, DataSourceComponent, SqlQueryParams, DataSourceManager, QueriableDataSource, DataSource } from 'jimu-core';
import defaultMessages from './translations/default';
import { Button, Dropdown, DropdownMenu, DropdownButton, DropdownItem, MultiSelect, Select, Option, Label, Checkbox, CollapsablePanel, CollapsableToggle } from 'jimu-ui';
import { type IMConfig } from '../config';
import { JimuMapView, JimuMapViewComponent } from "jimu-arcgis";
import { MapDataSourceImpl } from 'jimu-arcgis/arcgis-data-source';

import LayerList from "esri/widgets/LayerList";
import Layer from "esri/layers/Layer";
import FeatureLayer from "esri/layers/FeatureLayer";
import View from "esri/views/View";
import { layer } from "esri/views/3d/support/LayerPerformanceInfo";
import Legend from "esri/widgets/Legend";
import Expand from "esri/widgets/Expand";
import LegendVM from "esri/widgets/Legend/LegendViewModel";
import ActiveLayerInfo from "esri/widgets/Legend/support/ActiveLayerInfo";

import Swipe from "esri/widgets/Swipe";

import { useState, useEffect } from 'react';

import "./styles.css";
import { Button1 } from './components/Button';
import { Select } from '@mui/material/Select';

// interface IState {
//   jimuMapView: JimuMapView;
//   yearChoro: YearChoro;
//   disable2018: boolean;
//   disable2020: boolean;
//   yearVal: Array<string>;
//   indicVal2: IndicatorVal;
//   indicVal: Array<string>;
//   checked: boolean;
  
//   checkedState: boolean;
//   checkedState2: boolean;
//   checkedState3: boolean;
// }

enum IndicatorVal {
  None = "None",
  LFPR = "Labor Force Participation",
  Unemployment = "Unemployment",
  Income = "Income",
  Housing = "Housing Burdened",
  OP = "Overall Poverty",
  CP = "Child Poverty",
  SP = "Senior Poverty",
  HHP = "Poverty (HH)",
  ALICE = "ALICE",
  ALICEComb = "Combined ALICE and HH Poverty",
  Issuance = "Issuance",
  SNAPHH = "SNAP HH",
  SNAPP = "SNAP Persons",
  WIC = "WIC",
  Black = "Black",
  White = "White",
  Asian = "Asian",
  PI = "PI",
  Native = "Native",
  Other = "Other",
  MultiRace = "Multiracial",
  Hispanic = "Hispanic",
  FAC = "FA Child",
  FAO = "FA Overall"
}
// "None", "Labor Force Participation Rate", "Unemployment",
//       "Income", "Housing", "Overall Poverty", "Child Poverty", "Senior Poverty",
//       "Household Poverty", "ALICE", "Combined ALICE and HH Poverty", "Issuance",
//       "SNAP HH", "SNAP Persons", "WIC", "Black", "Hispanic", "Feeding America Child Rates",
//       "Feeding America Overall Rates"

enum YearChoro {
  Y2018 = "2018",
  Y2019 = "2019",
  Y2020 = "2020",
  YNone = "None"
}

const { useState } = React

function App(props: AllWidgetProps<any>) {

  const [jimuMapView, setJimuMapView] = useState(undefined);

  const [yearChoroLeft, setYearChoroLeft] = useState(YearChoro.YNone);
  const [indicValLeft, setIndicValLeft] = useState(IndicatorVal.None);
  const [yearChoroRight, setYearChoroRight] = useState(YearChoro.YNone);
  const [indicValRight, setIndicValRight] = useState(IndicatorVal.None);
  
  const [disable2018Left, setDisable2018Left] = useState(false);
  const [disable2020Left, setDisable2020Left] = useState(false);
  const [disable2018Right, setDisable2018Right] = useState(false);
  const [disable2020Right, setDisable2020Right] = useState(false);
  
  // const [comparisonLayers, setCompareLayers] = useState(Array<string>);
  const [leadLayer, setLeadLayer] = useState("");
  const [trailLayer, setTrailLayer] = useState("");

  const [swipeVis, setSwipeVis] = useState(false)

  const [yearState, setYrSt] = useState("");
  const [indicState, setIndSt] = useState("");


  // ##################### FUNCTIONS #############################
  const activeViewChangeHandler = (jmv: JimuMapView) => {
    if (jmv) {
      setJimuMapView(jmv);
    }
  };

  // Load Years for Both Sides
  const loadYearsLeft = (evt) => {
    setYearChoroLeft(YearChoro.YNone);

    if (evt.target.value === IndicatorVal.WIC || evt.target.value === IndicatorVal.Issuance || evt.target.value === IndicatorVal.SNAPHH || evt.target.value === IndicatorVal.SNAPP) {
      setDisable2018Left(false);
      setDisable2020Left(false)
    }

    else if (evt.target.value === IndicatorVal.HHP || evt.target.value === IndicatorVal.ALICE || evt.target.value === IndicatorVal.ALICEComb) {
      setDisable2018Left(true);
      setDisable2020Left(true)
    }

    else {
      setDisable2018Left(false);
      setDisable2020Left(true)
    }

    setIndicValLeft(evt.target.value);
    // setYrSt("");
    // setIndSt("");
  }

  const loadYearsRight = (evt) => {
    setYearChoroRight(YearChoro.YNone);

    if (evt.target.value === IndicatorVal.WIC || evt.target.value === IndicatorVal.Issuance || evt.target.value === IndicatorVal.SNAPHH || evt.target.value === IndicatorVal.SNAPP) {
      setDisable2018Right(false);
      setDisable2020Right(false)
    }

    else if (evt.target.value === IndicatorVal.HHP || evt.target.value === IndicatorVal.ALICE || evt.target.value === IndicatorVal.ALICEComb) {
      setDisable2018Right(true);
      setDisable2020Right(true)
    }

    else {
      setDisable2018Right(false);
      setDisable2020Right(true)
    }

    setIndicValRight(evt.target.value);
    // setYrSt("");
    // setIndSt("");
  }

  const removeAllChoro = () => {
    if (jimuMapView) {
      const layerList = new LayerList({
        view: jimuMapView.view
      });
      jimuMapView.view.when(() => {
        const layerAll = layerList.operationalItems.flatten((layer) => {
          return layer.children
        });
        layerAll.forEach((layerView) => {
          if (layerView.title !== "County Boundaries" && layerView.title !== "Food Bank Council of Michigan" && layerView.title !== "MI Bridges Community Partners" &&
          layerView.title !== "MDHHS Field Offices" && layerView.title !== "Historical SNAP Store Locations") {
            return layerView.visible = false
          }
        });
      })

      jimuMapView.view.ui.empty("bottom-left");
      jimuMapView.view.ui.empty("bottom-right");
    };
  }

  // Swipe widget
  const makeSwipe = (evt) => {
    if (jimuMapView){
      const layerList = new LayerList({
        view: jimuMapView.view
      });
      removeAllChoro();
      console.log("Comparison layers are currently", leadLayer, "and", trailLayer)

      jimuMapView.view.when(() => {
        const layer1 = layerList.operationalItems.flatten((layer) => {
          return layer.children
        });

        if (leadLayer !== "" && trailLayer !== "") {
          const leftLayer = layer1.find((layerView) => {
            return layerView.title.includes(leadLayer)
          });
          const rightLayer = layer1.find((layerView) => {
            return layerView.title.includes(trailLayer)
          });
  
          const swipe = new Swipe({
            leadingLayers: [leftLayer.layer],
            trailingLayers: [rightLayer.layer],
            position: 50,
            view: jimuMapView.view,
            id: "swipe-widget"
          });

          jimuMapView.view.ui.add(swipe);
          leftLayer.layer.opacity = 0.8,
          leftLayer.visible = true,
          rightLayer.layer.opacity = 0.8,
          rightLayer.visible = true
        };
      });

      makeLegend(leadLayer, "bottom-left");
      makeLegend(trailLayer, "bottom-right");
    }
  }

  // Change Handlers
  const changeHandlerLeft = (evt) => {
    if (jimuMapView) {
      removeAllChoro();
      setLeadLayer(indicValLeft + " " + evt.target.value, "");
    }
    console.log("After left choices, left layer is currently", leadLayer)
  }

  const changeHandlerRight = (evt) => {
    if (jimuMapView) {
      removeAllChoro();
      setTrailLayer(indicValRight + " " + evt.target.value);
    }
    console.log("After right choices, right layer is currently", trailLayer)
  }

  const clearMap = () => {
    removeAllChoro();
    setLeadLayer("");
    setTrailLayer("");
    setYearChoroLeft(YearChoro.YNone);
    setIndicValLeft(IndicatorVal.None);
    setYearChoroRight(YearChoro.YNone);
    setIndicValRight(IndicatorVal.None);
    jimuMapView.view.ui.find("swipe-widget").destroy();
    jimuMapView.view.ui.remove("swipe-widget");
  }


  const makeLegend = (evt: String, pos: String) => {
    if (jimuMapView){
      const allLayers = jimuMapView.view.map.layers.flatten((layer) => {
        return layer.children
      });

      const visLayer = allLayers.find((layerView) => {
        return layerView.title.includes(evt)
      });

      const legend = new Legend({
        view: jimuMapView.view,
        id: "customLegend",
        layerInfos: [{
          layer: visLayer,
          title: ""
        }]
      });

      const expLeg = new Expand({
        view: jimuMapView.view,
        content: legend,
        expanded: true
      });

      jimuMapView.view.ui.add(expLeg, pos);
    }
  }



  return (
    <div className="widget-demo jimu-widget m-2">
    {props.useMapWidgetIds && props.useMapWidgetIds.length === 1 && (
      // The JimuMapViewComponent gives us a connection to the
      // ArcGIS JS API MapView object. We store it in the State.
      <JimuMapViewComponent useMapWidgetId={props.useMapWidgetIds?.[0]} onActiveViewChange={activeViewChangeHandler} />
    )}

    <div style={{ display: "flex", flexDirection: "column" }}>
      <CollapsableToggle
        label = "Compare Indicators"
        level={0}
        type="default"
        className={`collapseToggle`}
        onRequestClose={() => {
          clearMap();
        }}
      >
        <div>
        <p className="shadow-sm m-3 p-3 bg-white rounded">
          <Select
            name="select-indicator"
            onChange={(evt) => {
              loadYearsLeft(evt);
            }}
            style={{ maxWidth: "100%"}}
            placeholder="Choose a left indicator..."
            value = {indicState}
          >
            {/*Categories: Poverty, Food Assistance, Race, Housing, Labor, Feeding America*/}
            {/* <Option value="None">{"None"}</Option> */}
            <Option header>{"Labor"}</Option>
            <Option value={IndicatorVal.LFPR}>{"Labor Force Participation Rate"}</Option>
            <Option value={IndicatorVal.Unemployment}>{"Unemployment Rate"}</Option>
            <Option value={IndicatorVal.Income}>{"Median Income"}</Option>
            <Option value={IndicatorVal.Housing}>{"Housing Burdened"}</Option>
            <Option divider></Option>
            <Option header>{"Poverty"}</Option>
            <Option value={IndicatorVal.OP}>{"Overall Poverty"}</Option>
            <Option value={IndicatorVal.CP}>{"Child Poverty"}</Option>
            <Option value={IndicatorVal.SP}>{"Senior Poverty"}</Option>
            <Option value={IndicatorVal.HHP}>{"Household Poverty"}</Option>
            <Option value={IndicatorVal.ALICE}>{"ALICE"}</Option>
            <Option value={IndicatorVal.ALICEComb}>{"Combined ALICE and Household Poverty"}</Option>
            <Option divider></Option>
            <Option header>{"Food Assistance"}</Option>
            <Option value={IndicatorVal.Issuance}>{"Issuance"}</Option>
            <Option value={IndicatorVal.SNAPHH}>{"SNAP (Households)"}</Option>
            <Option value={IndicatorVal.SNAPP}>{"SNAP (Persons)"}</Option>
            <Option value={IndicatorVal.WIC}>{"WIC"}</Option>
            <Option divider></Option>
            <Option header>{"Race/Ethnicity"}</Option>
            <Option value={IndicatorVal.White}>{"White"}</Option>
            <Option value={IndicatorVal.Black}>{"Black"}</Option>
            <Option value={IndicatorVal.Asian}>{"Asian"}</Option>
            <Option value={IndicatorVal.PI}>{"Pacific Islander"}</Option>
            <Option value={IndicatorVal.Native}>{"Native"}</Option>
            <Option value={IndicatorVal.Other}>{"Other Race"}</Option>
            <Option value={IndicatorVal.MultiRace}>{"Multiple Races"}</Option>
            <Option value={IndicatorVal.Hispanic}>{"Hispanic"}</Option>
            <Option divider></Option>
            <Option header>{"Feeding America Model Estimates"}</Option>
            <Option value={IndicatorVal.FAC}>{"Child Rates"}</Option>
            <Option value={IndicatorVal.FAO}>{"Overall Rates"}</Option>
          </Select><br /><br />
          
          <div aria-label="Select Year" className="text-center"
          style={{ margin: "0 auto" }}>
            
            <Select
            value = {yearState}
            onChange={(evt) => {
              changeHandlerLeft(evt);
            }}
            placeholder="Choose a left year...">
              <Option
              value={YearChoro.Y2018}
              disabled={disable2018Left}>
                {"2018"}</Option>
              <Option
              value={YearChoro.Y2019}>
                {"2019"}</Option>
              <Option
              value={YearChoro.Y2020}
              disabled={disable2020Left}>
                {"2020"}</Option>
            </Select>

            <br /><br />

            <Select
            name="select-indicator"
            onChange={(evt) => {
              loadYearsRight(evt);
            }}
            style={{ maxWidth: "100%"}}
            placeholder="Choose a right indicator..."
            value = {indicState}
          >
            {/*Categories: Poverty, Food Assistance, Race, Housing, Labor, Feeding America*/}
            {/* <Option value="None">{"None"}</Option> */}
            <Option header>{"Labor"}</Option>
            <Option value={IndicatorVal.LFPR}>{"Labor Force Participation Rate"}</Option>
            <Option value={IndicatorVal.Unemployment}>{"Unemployment Rate"}</Option>
            <Option value={IndicatorVal.Income}>{"Median Income"}</Option>
            <Option value={IndicatorVal.Housing}>{"Housing Burdened"}</Option>
            <Option divider></Option>
            <Option header>{"Poverty"}</Option>
            <Option value={IndicatorVal.OP}>{"Overall Poverty"}</Option>
            <Option value={IndicatorVal.CP}>{"Child Poverty"}</Option>
            <Option value={IndicatorVal.SP}>{"Senior Poverty"}</Option>
            <Option value={IndicatorVal.HHP}>{"Household Poverty"}</Option>
            <Option value={IndicatorVal.ALICE}>{"ALICE"}</Option>
            <Option value={IndicatorVal.ALICEComb}>{"Combined ALICE and Household Poverty"}</Option>
            <Option divider></Option>
            <Option header>{"Food Assistance"}</Option>
            <Option value={IndicatorVal.Issuance}>{"Issuance"}</Option>
            <Option value={IndicatorVal.SNAPHH}>{"SNAP (Households)"}</Option>
            <Option value={IndicatorVal.SNAPP}>{"SNAP (Persons)"}</Option>
            <Option value={IndicatorVal.WIC}>{"WIC"}</Option>
            <Option divider></Option>
            <Option header>{"Race/Ethnicity"}</Option>
            <Option value={IndicatorVal.White}>{"White"}</Option>
            <Option value={IndicatorVal.Black}>{"Black"}</Option>
            <Option value={IndicatorVal.Asian}>{"Asian"}</Option>
            <Option value={IndicatorVal.PI}>{"Pacific Islander"}</Option>
            <Option value={IndicatorVal.Native}>{"Native"}</Option>
            <Option value={IndicatorVal.Other}>{"Other Race"}</Option>
            <Option value={IndicatorVal.MultiRace}>{"Multiple Races"}</Option>
            <Option value={IndicatorVal.Hispanic}>{"Hispanic"}</Option>
            <Option divider></Option>
            <Option header>{"Feeding America Model Estimates"}</Option>
            <Option value={IndicatorVal.FAC}>{"Child Rates"}</Option>
            <Option value={IndicatorVal.FAO}>{"Overall Rates"}</Option>
          </Select><br /><br />
          
          <div aria-label="Select Year" className="text-center"
          style={{ margin: "0 auto" }}>
            
            <Select
            value = {yearState}
            onChange={(evt) => {
              changeHandlerRight(evt);
            }}
            placeholder="Choose a right year...">
              <Option
              value={YearChoro.Y2018}
              disabled={disable2018Right}>
                {"2018"}</Option>
              <Option
              value={YearChoro.Y2019}>
                {"2019"}</Option>
              <Option
              value={YearChoro.Y2020}
              disabled={disable2020Right}>
                {"2020"}</Option>
            </Select>

            <br /> <br />
            <Button
              value={"swipe"}
              onClick={(evt) => {
                makeSwipe(evt);
              }}
              size="sm"
            > {"Compare"}
            </Button>

            <Button
              value={"Clear All"}
              onClick={clearMap}
              size="sm"
            > {"Clear Indicators"}
            </Button>
            </div>
          </p>
        </div>
      </CollapsableToggle>
    </div>
  </div>
  );
}

export default App;

