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

  const [yearChoro, setYearChoro] = useState(YearChoro.YNone);
  const [indicVal, setIndicVal] = useState(IndicatorVal.None);
  const [disable2018, setDisable2018] = useState(false);
  const [disable2020, setDisable2020] = useState(false);
  const [yearState, setYrSt] = useState("");
  const [indicState, setIndSt] = useState("");

  const activeViewChangeHandler = (jmv: JimuMapView) => {
    if (jmv) {
      setJimuMapView(jmv);
    }
  };

  const loadYears = (evt) => {
    setYearChoro(YearChoro.YNone);

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
    setYrSt("");
    setIndSt("");
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
    };
  }

  const changeHandler = (evt) => {
    var indicLayer = indicVal + " " + evt.target.value;
    console.log("Selected Layer is", indicLayer);

    if (jimuMapView && indicVal !== IndicatorVal.None) {

      const layerList = new LayerList({
        view: jimuMapView.view
      });
      removeAllChoro();
      jimuMapView.view.when(() => {
        const layer1 = layerList.operationalItems.flatten((layer) => {
          return layer.children
        });
        const sublayer1 = layer1.find((layerView) => {
          return layerView.title.includes(indicLayer)
        });

        sublayer1.layer.opacity = 0.8,
        sublayer1.visible = true;
        sublayer1.parent.visible = true;
        sublayer1.parent.parent.visible = true;

        // const legMap = new Expand({
        //   view: jimuMapView.view,
        //   content: ({
        //     new Legend({
        //       view: jimuMapView.view
        //       // container: document.createElement('div')
        //       // layerInfos: [{
        //       //   layer: sublayer1.layer,
        //       //   title: ""
        //       // }]
        //     });
        //   }),
        //   expanded: true,
        //   id: "legend"
        // });

        // jimuMapView.view.ui.add(legMap, "bottom-left")
      });

      // const visLayer = jimuMapView.view.map.layers.getItemAt(0);
      const allLayers = jimuMapView.view.map.layers.flatten((layer) => {
        return layer.children
      });

      const visLayer = allLayers.find((layerView) => {
        return layerView.title.includes(indicLayer)
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

      jimuMapView.view.ui.add(expLeg, "bottom-left");
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
        label = "Select Indicators"
        level={0}
        type="default"
        className={`collapseToggle`}
        onRequestClose={() => {
          removeAllChoro();
          setYearChoro(YearChoro.YNone);
          setIndicVal(IndicatorVal.None);
        }}
      >
        <div>
        <p className="shadow-sm m-3 p-3 bg-white rounded">
          <Select
            name="select-indicator"
            onChange={(evt) => {
              loadYears(evt);
            }}
            style={{ maxWidth: "100%"}}
            placeholder="Choose an indicator..."
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
              changeHandler(evt);
            }}
            placeholder="Choose a year...">
              <Option
              value={YearChoro.Y2018}
              disabled={disable2018}>
                {"2018"}</Option>
              <Option
              value={YearChoro.Y2019}>
                {"2019"}</Option>
              <Option
              value={YearChoro.Y2020}
              disabled={disable2020}>
                {"2020"}</Option>
            </Select>
            <br /> <br />
            <Button
              value={"Clear All"}
              onClick={() => {
                removeAllChoro();
                setYearChoro(YearChoro.YNone);
                setIndicVal(IndicatorVal.None);
                setYrSt("");
                setIndicVal("");
              }}
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






/*interface IState {
  jimuMapView: JimuMapView;
  checkedFB: boolean;
  checkedCP: boolean;
  checkedFO: boolean;
  checkedSNAP: boolean;
  checkedSGS: boolean;
  checkedMGS: boolean;
  checkedLGS: boolean;
  checkedOGS: boolean;
  checkedCS: boolean;
  checkedSS: boolean;
  checkedSM: boolean;
  checkedFV: boolean;
  checkedMP: boolean;
  checkedSF: boolean;
  checkedDR: boolean;
  checkedFM: boolean;
  checkedFBCO: boolean;
  checkedMC: boolean;
}



export default class ViewLayersToggle extends React.PureComponent<AllWidgetProps<IMConfig>,IState> {

  constructor(props) {
    super(props);
    this.state = {
      jimuMapView: undefined,
      checkedFB: false,
      checkedCP: false,
      checkedFO: false,
      checkedSNAP: false,
      checkedSGS: false,
      checkedMGS: false,
      checkedLGS: false,
      checkedOGS: false,
      checkedCS: false,
      checkedSS: false,
      checkedSM: false,
      checkedFV: false,
      checkedMP: false,
      checkedSF: false,
      checkedDR: false,
      checkedFM: false,
      checkedFBCO: false,
      checkedMC: false
    };
  }

  changeHandler1 = (evt) => {
    if (evt.target.value && evt.target.value !== "") {  
      if (this.state.jimuMapView) {
        const layerList = new LayerList({
          view: this.state.jimuMapView.view
        });
        if (evt.target.value === "Food Bank Council of Michigan") {
          var checkedState = this.state.checkedFB
        }
        if (evt.target.value === "MI Bridges Community Partners") {
          var checkedState = this.state.checkedCP
        }
        if (evt.target.value === "MDHHS Field Offices") {
          var checkedState = this.state.checkedFO
        }
        if (evt.target.value === "Historical SNAP Store Locations") {
          var checkedState = this.state.checkedSNAP
        }
        if (checkedState === false){
          this.state.jimuMapView.view.when(() => {
            const layer1 = layerList.operationalItems.find((layerView) => {
              return layerView.title === evt.target.value;
            });    
            layer1.visible = true
          });
        }
        else {
          this.state.jimuMapView.view.when(() => {
            const layer1 = layerList.operationalItems.find((layerView) => {
              return layerView.title === evt.target.value;
            });    
            layer1.visible = false
          });
        }
        if (evt.target.value === "Food Bank Council of Michigan") {
          this.setState({
            checkedFB: !this.state.checkedFB
          });
        }
        if (evt.target.value === "MI Bridges Community Partners") {
          this.setState({
            checkedCP: !this.state.checkedCP
          });
        }
        if (evt.target.value === "MDHHS Field Offices") {
          this.setState({
            checkedFO: !this.state.checkedFO
          });
        }
        if (evt.target.value === "Historical SNAP Store Locations") {
          this.setState({
            checkedSNAP: !this.state.checkedSNAP
          });
        }
      }
    }
  }

  changeHandler2 = (evt) => {
    if (evt.target.value && evt.target.value !== "") {  
      if (this.state.jimuMapView) {
        const layerList = new LayerList({
          view: this.state.jimuMapView.view
        });
        if (evt.target.value === "Small Grocery Store") {
          var checkedState = this.state.checkedSGS
        }
        if (evt.target.value === "Medium Grocery Store") {
          var checkedState = this.state.checkedMGS
        }
        if (evt.target.value === "Large Grocery Store") {
          var checkedState = this.state.checkedLGS
        }
        if (evt.target.value === "Combination Grocery/Other") {
          var checkedState = this.state.checkedOGS
        }
        if (evt.target.value === "Convenience Store") {
          var checkedState = this.state.checkedCS
        }
        if (evt.target.value === "Super Store") {
          var checkedState = this.state.checkedSS
        }
        if (evt.target.value === "Supermarket") {
          var checkedState = this.state.checkedSM
        }
        if (evt.target.value === "Fruits/Veg Specialty") {
          var checkedState = this.state.checkedFV
        }
        if (evt.target.value === "Meat/Poultry Specialty") {
          var checkedState = this.state.checkedFB
        }
        if (evt.target.value === "Seafood Specialty") {
          var checkedState = this.state.checkedSF
        }
        if (evt.target.value === "Delivery Route") {
          var checkedState = this.state.checkedDR
        }
        if (evt.target.value === "Farmers' Market") {
          var checkedState = this.state.checkedFM
        }
        if (evt.target.value === "Food Buying Co-op") {
          var checkedState = this.state.checkedFBCO
        }
        if (evt.target.value === "Military Commissary") {
          var checkedState = this.state.checkedMC
        }
        if (checkedState === false){
          this.state.jimuMapView.view.when(() => {
            const layer1 = layerList.operationalItems.find((layerView) => {
              return layerView.title === evt.target.value;
            });    
            layer1.visible = true
          });
        }
        else {
          this.state.jimuMapView.view.when(() => {
            const layer1 = layerList.operationalItems.find((layerView) => {
              return layerView.title === evt.target.value;
            });    
            layer1.visible = false
          });
        }
        if (evt.target.value === "Small Grocery Store") {
          this.setState({
            checkedFB: !this.state.checkedSGS
          });
        }
        if (evt.target.value === "Medium Grocery Store") {
          this.setState({
            checkedFB: !this.state.checkedMGS
          });
        }
        if (evt.target.value === "Large Grocery Store") {
          this.setState({
            checkedFB: !this.state.checkedLGS
          });
        }
        if (evt.target.value === "Combination Grocery/Other") {
          this.setState({
            checkedFB: !this.state.checkedOGS
          });
        }
        if (evt.target.value === "Convenience Store") {
          this.setState({
            checkedFB: !this.state.checkedCS
          });
        }
        if (evt.target.value === "Super Store") {
          this.setState({
            checkedFB: !this.state.checkedSS
          });
        }
        if (evt.target.value === "Supermarket") {
          this.setState({
            checkedFB: !this.state.checkedSM
          });
        }
        if (evt.target.value === "Fruits/Veg Specialty") {
          this.setState({
            checkedFB: !this.state.checkedFV
          });
        }
        if (evt.target.value === "Meat/Poultry Specialty") {
          this.setState({
            checkedFB: !this.state.checkedMP
          });
        }
        if (evt.target.value === "Seafood Specialty") {
          this.setState({
            checkedFB: !this.state.checkedSF
          });
        }
        if (evt.target.value === "Delivery Route") {
          this.setState({
            checkedFB: !this.state.checkedDR
          });
        }
        if (evt.target.value === "Farmers' Market") {
          this.setState({
            checkedFB: !this.state.checkedFM
          });
        }
        if (evt.target.value === "Food Buying Co-op") {
          this.setState({
            checkedFB: !this.state.checkedFBCO
          });
        }
        if (evt.target.value === "Military Commissary") {
          this.setState({
            checkedFB: !this.state.checkedMC
          });
        }
      }
    }
  }

  
  render() {

    function test() {
      const [showButton, setShowButton] = useState(true);
      const toggleButton = () => {
        setShowButton(!showButton);
      };
    }

      return (
        <div>
          {showButton &&
          <button
            onClick={toggleButton}
          >
            hide me
          </button>}
        </div>
      )
  }
};
*/



/*const Widget = (props: AllWidgetProps<IMConfig>) => {
  return (
    <div className="widget-demo jimu-widget m-2">
      <p>Simple Widget</p>
      <p>exampleConfigProperty: {props.config.exampleConfigProperty}</p>
    </div>
  )
}

export default Widget*/

  // const [showButton, setShowButton1] = useState(true);
  // const [showButton2, setShowButton2] = useState(true);

  // const [buttonState, setButtonState] = useState(false);

  // const [mainProps, setMainProps] = useState({
  //   // jimuMapView: undefined,
  //   yearChoro: YearChoro.YNone,
  //   disable2018: false,
  //   disable2020: false,
  //   yearVal: Array("","",""),
  //   indicVal2: IndicatorVal.None,
  //   indicVal: Array("None", "Labor Force Participation Rate", "Unemployment",
  //   "Income", "Housing", "Overall Poverty", "Child Poverty", "Senior Poverty",
  //   "Household Poverty", "ALICE", "Combined ALICE and HH Poverty", "Issuance",
  //   "SNAP HH", "SNAP Persons", "WIC", "Black", "Hispanic", "Feeding America Child Rates",
  //   "Feeding America Overall Rates"),
  //   checked: false,

  //   checkedState: false,
  //   checkedState2: false,
  //   checkedState3: false
  // })


  // const showLayerList = (evt) => {
  //   if (evt.target.value && evt.target.value !== "") {  
  //     if (jimuMapView) {
  //       const layerList = new LayerList({
  //         view: jimuMapView.view
  //       });
  //       if (mainProps.checkedState === false){
  //         jimuMapView.view.when(() => {
  //           jimuMapView.view.ui.add(layerList, "top-right");
  //         });  
  //       }
  //       else {
  //         jimuMapView.view.when(() => {
  //           jimuMapView.view.ui.remove(layerList);
  //         });
  //       }

  //       setMainProps(previousState => {
  //         return { ...previousState, checkedState: !checkedState}
  //       })
  //       // this.setState({
  //       //   checkedState: !this.state.checkedState
  //       // });
  //     }
  //   }
  // }

  // const loadYears = (evt) => {
  //   setYearChoro(YearChoro.YNone);


  //   // setMainProps(previousState => {
  //   //   return { ...previousState, yearChoro: YearChoro.YNone}
  //   // })
  //   // this.setState({ yearChoro: YearChoro.YNone }) // this will reset the checked value of all radio buttons to empty

  //   // if (evt.target.value === "None") {
  //   //   setMainProps(previousState => {
  //   //     return { ...previousState, 
  //   //           yearVal: Array("", "", ""),
  //   //           indicVal: Array("", "", "", "", "", "", "", "", "", "", "", "", "",
  //   //           "", "", "", "", "", ""),
  //   //           disable2018: false,
  //   //           disable2020: false}
  //   // })
  //   //   removeAllChoro();
  //   // }

  //   if (evt.value === IndicatorVal.Issuance || evt.value === IndicatorVal.SNAPHH || evt.target.value === IndicatorVal.SNAPP || evt.target.value === IndicatorVal.WIC){
  //     setDisable2018(false);
  //     setDisable2020(false);

  //     if (evt.target.value === "Issuance"){
  //       setMainProps(previousState => {
  //         return { ...previousState, yearVal: Array("Issuance 2018","Issuance 2019","Issuance 2020")}
  //         })
  //     }
  //     if (evt.target.value === "SNAP HH"){
  //       setMainProps(previousState => {
  //         return { ...previousState,
  //         yearVal: Array("SNAP HH 2018","SNAP HH 2019","SNAP HH 2020")}
  //       })
  //     }
  //     if (evt.target.value === "SNAP Persons"){
  //       setMainProps(previousState => {
  //         return { ...previousState,
  //         yearVal: Array("SNAP Persons 2018","SNAP Persons 2019","SNAP Persons 2020")}
  //       })
  //     }
  //     if (evt.target.value === "WIC"){
  //       setMainProps(previousState => {
  //         return { ...previousState, 
  //         yearVal: Array("WIC 2018","WIC 2019","WIC 2020")}
  //       })
  //     }
  //   }
    

  //   if (evt.target.value === "Household Poverty" || evt.target.value === "ALICE" || evt.target.value === "Combined ALICE and HH Poverty"){
  //     setMainProps(previousState => {
  //       return { ...previousState,
  //       disable2018: true,
  //       disable2020: true}
  //     })
  //     if (evt.target.value === "Household Poverty"){
  //       setMainProps(previousState => {
  //         return { ...previousState,
  //           yearVal: Array("","Poverty (HH) 2019","")}
  //       })
  //     }
  //     if (evt.target.value === "ALICE"){
  //       setMainProps(previousState => {
  //         return { ...previousState,
  //           yearVal: Array("","ALICE 2019","")}
  //       })
  //     }
  //     if (evt.target.value === "Combined ALICE and HH Poverty"){
  //       setMainProps(previousState => {
  //         return { ...previousState,
  //         yearVal: Array("","Combined ALICE and HH Poverty 2019","")}
  //       })
  //     }
  //   }
    
  //   else {
  //     setMainProps(previousState => {
  //     return { ...previousState,
  //       disable2018: false,
  //       disable2020: true}
  //     })
  //     if (evt.target.value === "Labor Force Participation Rate"){
  //       setMainProps(previousState => {
  //         return { ...previousState,
  //         yearVal: Array("Labor Force Participation 2018","Labor Force Participation 2019","")}
  //       })
  //     }
  //     if (evt.target.value === "Unemployment"){
  //       setMainProps(previousState => {
  //         return { ...previousState, 
  //         yearVal: Array("Unemployment 2018","Unemployment 2019","")}
  //       })
  //     }
  //     if (evt.target.value === "Income"){
  //       setMainProps(previousState => {
  //         return { ...previousState,
  //         yearVal: Array("Median Income 2018","Median Income 2019","")}
  //       })
  //     }
  //     if (evt.target.value === "Overall Poverty"){
  //       setMainProps(previousState => {
  //         return { ...previousState,
  //         yearVal: Array("Overall Poverty 2018","Overall Poverty 2019","")}
  //       })
  //     }
  //     if (evt.target.value === "Child Poverty"){
  //       setMainProps(previousState => {
  //         return { ...previousState,
  //         yearVal: Array("Child Poverty 2018","Child Poverty 2019","")}
  //       })
  //     }
  //     if (evt.target.value === "Senior Poverty"){
  //       setMainProps(previousState => {
  //         return { ...previousState,
  //         yearVal: Array("Senior Poverty 2018","Senior Poverty 2019","")}
  //       })
  //     }
  //     if (evt.target.value === "Housing"){
  //       setMainProps(previousState => {
  //         return { ...previousState,
  //         yearVal: Array("Housing Burdened 2018","Housing Burdened 2019","")}
  //       })
  //     }
  //     if (evt.target.value === "Black"){
  //       setMainProps(previousState => {
  //         return { ...previousState,
  //         yearVal: Array("Black 2018","Black 2019","")}
  //       })
  //     }
  //     if (evt.target.value === "Hispanic"){
  //       setMainProps(previousState => {
  //         return { ...previousState,
  //         yearVal: Array("Hispanic 2018","Hispanic 2019","")}
  //       })
  //     }
  //     if (evt.target.value === "Feeding America Child Rates"){
  //       setMainProps(previousState => {
  //         return { ...previousState,
  //         yearVal: Array("FA Child 2018","FA Child 2019","")}
  //       })
  //     }
  //     if (evt.target.value === "Feeding America Overall Rates"){
  //       setMainProps(previousState => {
  //         return { ...previousState,
  //         yearVal: Array("FA Overall 2018","FA Overall 2019","")}
  //       })
  //     }
  //   }
  // }