import React, { useEffect, useState } from 'react';
import { AllWidgetProps } from 'jimu-core';
import { Option } from 'jimu-ui'
import { JimuMapView, JimuMapViewComponent } from "jimu-arcgis";

import LayerList from '@arcgis/core/widgets/LayerList';
import Legend from "@arcgis/core/widgets/Legend";
import Expand from "@arcgis/core/widgets/Expand";
import Swipe from "@arcgis/core/widgets/Swipe";

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Button from '@mui/material/Button';

enum IndicatorVal {
  None = "",
  LFPR = "Labor Force Participation ",
  Unemployment = "Unemployment ",
  Income = "Income ",
  Housing = "Housing Burdened ",
  OP = "Overall Poverty ",
  CP = "Child Poverty ",
  SP = "Senior Poverty ",
  HHP = "Poverty (HH) ",
  ALICE = "ALICE ",
  ALICEComb = "Combined ALICE and HH Poverty ",
  Issuance = "Issuance ",
  SNAPHH = "SNAP HH ",
  SNAPP = "SNAP Persons ",
  WIC = "WIC ",
  Black = "Black ",
  White = "White ",
  Asian = "Asian ",
  PI = "PI ",
  Native = "Native ",
  Other = "Other ",
  MultiRace = "Multiracial ",
  Hispanic = "Hispanic ",
  FAC = "FA Child ",
  FAO = "FA Overall "
}

enum YearChoro {
  Y2018 = "2018",
  Y2019 = "2019",
  Y2020 = "2020",
  YNone = ""
}

function App(props: AllWidgetProps<any>) {

  const [jimuMapView, setJimuMapView] = useState(undefined);

  const [indicValLeft, setIndicValLeft] = useState(IndicatorVal.None);
  const [indicValRight, setIndicValRight] = useState(IndicatorVal.None);
  const [yearChoroLeft, setYearChoroLeft] = useState(YearChoro.YNone);
  const [yearChoroRight, setYearChoroRight] = useState(YearChoro.YNone);
  const [indicVal, setIndicVal] = useState(IndicatorVal.None);
  const [disable2018, setDisable2018] = useState(false);
  const [disable2020, setDisable2020] = useState(false);
  const [disable2018left, setDisable2018left] = useState(false);
  const [disable2020left, setDisable2020left] = useState(false);
  const [disable2018right, setDisable2018right] = useState(false);
  const [disable2020right, setDisable2020right] = useState(false);
  const [yearChoro, setYearChoro] = useState(YearChoro.YNone);
  const [swipeVis, setSwipeVis] = useState(false);
  const [compareOn, setCompareOn] = useState(false);



  const activeViewChangeHandler = (jmv: JimuMapView) => {
    if (jmv) {
      setJimuMapView(jmv);
    }
  };

  //################################################################## TOP_DROPDOWN_FUNCTIONS ##########################################################################################

  const loadYears = (evt) => {

    if (evt.target.value === IndicatorVal.WIC || evt.target.value === IndicatorVal.Issuance || evt.target.value === IndicatorVal.SNAPHH || evt.target.value === IndicatorVal.SNAPP) {
      setDisable2018(false);
      setDisable2020(false)
    }

    else if (evt.target.value === IndicatorVal.HHP || evt.target.value === IndicatorVal.ALICE || evt.target.value === IndicatorVal.ALICEComb) {
      setDisable2018(true);
      setDisable2020(true)
    }

    else {
      setDisable2018(false);
      setDisable2020(true)
    }

    setIndicVal(evt.target.value);
    console.log("onChangeSelect:" + evt.target.value)
  }

  const loadYearsleft = (evt) => {

    if (evt.target.value === IndicatorVal.WIC || evt.target.value === IndicatorVal.Issuance || evt.target.value === IndicatorVal.SNAPHH || evt.target.value === IndicatorVal.SNAPP) {
      setDisable2018left(false);
      setDisable2020left(false)
    }

    else if (evt.target.value === IndicatorVal.HHP || evt.target.value === IndicatorVal.ALICE || evt.target.value === IndicatorVal.ALICEComb) {
      setDisable2018left(true);
      setDisable2020left(true)
    }

    else {
      setDisable2018left(false);
      setDisable2020left(true)
    }

    setIndicValLeft(evt.target.value);
    console.log("onChangeSelectLeft:" + evt.target.value)
  }

  const loadYearsright = (evt) => {

    if (evt.target.value === IndicatorVal.WIC || evt.target.value === IndicatorVal.Issuance || evt.target.value === IndicatorVal.SNAPHH || evt.target.value === IndicatorVal.SNAPP) {
      setDisable2018right(false);
      setDisable2020right(false)
    }

    else if (evt.target.value === IndicatorVal.HHP || evt.target.value === IndicatorVal.ALICE || evt.target.value === IndicatorVal.ALICEComb) {
      setDisable2018right(true);
      setDisable2020right(true)
    }

    else {
      setDisable2018right(false);
      setDisable2020right(true)
    }

    setIndicValRight(evt.target.value);
    console.log("onChangeSelectRight:" + evt.target.value)
  }


  //################################################################ RESET_LAYER_FUNCTION ############################################################################################

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
    };
  }


  //############################################################### BOTTON_RADIO_GROUP_FUNCTIONS #############################################################################################

  const changeHandler = (evt) => {
    removeAllChoro();
    setYearChoro(evt.target.value);
    console.log("onRadioSelect:" + evt.target.value)
  };

  const changeHandlerLeft = (evt) => {
    if (jimuMapView) {
      removeAllChoro();
      setYearChoroLeft(evt.target.value)
      console.log("onRadioSelectLeft:" + evt.target.value)
    }
  }

  const changeHandlerRight = (evt) => { 
      removeAllChoro();
      setYearChoroRight(evt.target.value)
      console.log("onRadioSelectRadio:" + evt.target.value)
  }

  //############################################################ OTHER FUNCTIONS ################################################################################################  

  //Clears everything (not working atm)
  const clearMap = () => {
    removeAllChoro();
    setYearChoroLeft(YearChoro.YNone);
    setIndicValLeft(IndicatorVal.None);
    setYearChoroRight(YearChoro.YNone);
    setIndicValRight(IndicatorVal.None);
    jimuMapView.view.ui.find("swipe-widget").destroy();
    jimuMapView.view.ui.remove("swipe-widget");
  }

  //Function for clearing old swipe widget 
  const compare = () => {
    console.log(swipeVis)
    if (swipeVis) {
      setSwipeVis(false)
      jimuMapView.view.ui.find("swipe-widget").destroy();
      jimuMapView.view.ui.remove("swipe-widget");
      makeSwipe()
    }
    else {
      makeSwipe()
    }
  }

  //Show layer for single indicator input
  const showIndic = () => {
    if (jimuMapView && indicVal !== IndicatorVal.None && yearChoro !== YearChoro.YNone) {

      const layerList = new LayerList({
        view: jimuMapView.view
      });
      removeAllChoro();
      jimuMapView.view.when(() => {
        const layer1 = layerList.operationalItems.flatten((layer) => {
          return layer.children
        });
        const sublayer1 = layer1.find((layerView) => {
          return layerView.title.includes(indicVal + yearChoro)
        });

        console.log("Selected Layer:", (indicVal + yearChoro))

        sublayer1.layer.opacity = 0.8,
          sublayer1.visible = true;
        sublayer1.parent.visible = true;
        sublayer1.parent.parent.visible = true;

      });
    }


  }

  //Show layer and swipe widget for double indicator input
  const makeSwipe = () => {
    if (jimuMapView) {
      const layerList = new LayerList({
        view: jimuMapView.view
      });
      removeAllChoro();


      jimuMapView.view.when(() => {
        const layer1 = layerList.operationalItems.flatten((layer) => {
          return layer.children
        });


        console.log("Hidden Selected Layer Left:", (indicValLeft + yearChoroLeft))
        console.log("Hidden Selected Layer Right:", (indicValRight + yearChoroRight))

        if ((indicValLeft + yearChoroLeft) !== "" && (indicValRight + yearChoroRight) !== "") {
          const leftLayer = layer1.find((layerView) => {
            return layerView.title.includes((indicValLeft + yearChoroLeft))
          });
          console.log("Selected Layer Left:", (indicValLeft + yearChoroLeft))
          const rightLayer = layer1.find((layerView) => {
            return layerView.title.includes((indicValRight + yearChoroRight))
          });
          console.log("Selected Layer Right:", (indicValRight + yearChoroRight))

          setSwipeVis(true);

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

    }
  }

  //Function for swapping b/w the single and double input
  //also carries over single input to left input and vice versa and clearing swipe widget
  const swap = () => {
    setCompareOn(!compareOn)
    if (!compareOn) {
      setIndicValLeft(indicVal)
      setYearChoroLeft(yearChoro)
    }
    if (compareOn) {
      setIndicVal(indicValLeft)
      setYearChoro(yearChoroLeft) 
    }
    if (swipeVis) {
      setSwipeVis(false)
      jimuMapView.view.ui.find("swipe-widget").destroy();
      jimuMapView.view.ui.remove("swipe-widget");
    }
  }



  //############################################################ RENDERING FUNCTION ################################################################################################

  //functions for re-rendering on choosing variables
  useEffect(() => {
    if (jimuMapView && !compareOn) {
      showIndic()
    }
  }, [indicVal, yearChoro, compareOn])
  useEffect(() => {
    if (jimuMapView && compareOn) {
      compare()
    }
  }, [indicValLeft, yearChoroLeft, indicValRight, yearChoroRight, compareOn])

  return (
    <div className="widget-demo jimu-widget m-2">
      {props.useMapWidgetIds && props.useMapWidgetIds.length === 1 && (
        // The JimuMapViewComponent gives us a connection to the
        // ArcGIS JS API MapView object. We store it in the State.
        <JimuMapViewComponent useMapWidgetId={props.useMapWidgetIds?.[0]} onActiveViewChange={activeViewChangeHandler} />
      )}

      {!compareOn && <Box alignItems="center" justifyContent="center" style={{ display: "flex", flexDirection: "column" }} sx={{ backgroundColor: 'white', border: '1px dashed grey', width: 800, height: 250 }}>
        <FormControl sx={{ minWidth: 200, maxWidth: 400 }}>
          <InputLabel id="demo-simple-select-label">Indicator</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={indicVal}
            label="Indicator"
            onChange={(evt) => {
              loadYears(evt);
            }}
          >
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
          </Select>
        </FormControl>
        <FormControl>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            defaultValue={yearChoro}
            onChange={(evt) => {
              changeHandler(evt);
            }}
          >
            <FormControlLabel value={YearChoro.Y2018} disabled={disable2018} control={<Radio />} label="2018" />
            <FormControlLabel value={YearChoro.Y2019} control={<Radio />} label="2019" />
            <FormControlLabel value={YearChoro.Y2020} disabled={disable2020} control={<Radio />} label="2020" />
          </RadioGroup>
        </FormControl>
        <Button
          variant="outlined"
          onClick={swap}>Compare</Button>
      </Box>}

      {compareOn && <Box style={{ display: "flex" }} sx={{ backgroundColor: 'white', width: 800, height: 250 }}>
        <Box alignItems="center" justifyContent="center" style={{ display: "flex", flexDirection: "column" }} sx={{ border: '1px dashed grey', width: 400, height: 250 }}>
          <FormControl sx={{ minWidth: 200, maxWidth: 400 }}>
            <InputLabel id="demo-simple-select-label">Left Indicator</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={indicValLeft}
              label="Left Indicator" 
              onChange={(evt) => {
                loadYearsleft(evt);
              }}
            >
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
            </Select>
          </FormControl>
          <FormControl>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
              defaultValue={yearChoroLeft}
              onChange={(evt) => {
                changeHandlerLeft(evt);
              }}
            >
              <FormControlLabel value={YearChoro.Y2018} disabled={disable2018left} control={<Radio />} label="2018" />
              <FormControlLabel value={YearChoro.Y2019} control={<Radio />} label="2019" />
              <FormControlLabel value={YearChoro.Y2020} disabled={disable2020left} control={<Radio />} label="2020" />
            </RadioGroup>
          </FormControl>
          <Button
            variant="outlined"
            onClick={clearMap}>Clear ALL</Button>
        </Box>
        <Box alignItems="center" justifyContent="center" style={{ display: "flex", flexDirection: "column" }} sx={{ border: '1px dashed grey', width: 400, height: 250 }}>
          <FormControl sx={{ minWidth: 200, maxWidth: 400 }}>
            <InputLabel id="demo-simple-select-label">Right Indicator</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={indicValRight}
              label="Right Indicator"
              onChange={(evt) => {
                loadYearsright(evt);
              }}
            >
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
            </Select>
          </FormControl>
          <FormControl>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
              defaultValue={yearChoroRight}
              onChange={(evt) => {
                changeHandlerRight(evt);
              }}
            >
              <FormControlLabel value={YearChoro.Y2018} disabled={disable2018right} control={<Radio />} label="2018" />
              <FormControlLabel value={YearChoro.Y2019} control={<Radio />} label="2019" />
              <FormControlLabel value={YearChoro.Y2020} disabled={disable2020right} control={<Radio />} label="2020" />
            </RadioGroup>
          </FormControl>
          <Button
            variant="outlined"
            onClick={swap}>Select</Button>
        </Box>
      </Box>}




    </div>
  )



}

export default App;
