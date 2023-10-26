/** @jsx jsx */
/*
import { React, AllWidgetProps, jsx, DataSourceComponent, SqlQueryParams, DataSourceManager, QueriableDataSource, DataSource } from 'jimu-core'
import { Label, Radio, Select, DropdownButton, defaultMessages as jimuUIMessages, Dropdown, DropdownMenu, Option } from 'jimu-ui'
*/
import { React, AllWidgetProps, jsx, DataSourceManager, QueriableDataSource } from "jimu-core";
import { useState } from "react";
import { IMConfig } from "../config";

import defaultMessages from "./translations/default";
import FeatureLayer from "esri/layers/FeatureLayer";
import { JimuMapViewComponent, JimuMapView, IMJimuLayerViewInfo } from "jimu-arcgis";
import { Radio, Label, Select, Option, Slider, Checkbox, Button, Dropdown, Switch, CollapsablePanel } from "jimu-ui";
import LayerList from "esri/widgets/LayerList";
import Expand from "esri/widgets/Expand";
// import Query from "esri/rest/support/Query";
// import query from "esri/rest/query";
import Layer from "esri/layers/Layer";
import View from "esri/views/View";
// import { Button1 } from './components/Button';

interface IState {
  jimuMapView: JimuMapView;
  yearChoro: YearChoro;
  disable2018: boolean;
  disable2020: boolean;
  yearVal: Array<string>;
  indicVal2: IndicatorVal;
  indicVal: Array<string>;
  checked: boolean;
  
  checkedState: boolean;
  checkedState2: boolean;
  checkedState3: boolean;

  showButton: boolean;
  showButton2: boolean;
  setShowButton1: boolean;
  setShowButton2: boolean;
}

enum IndicatorVal {
  None = "None",
  LFPR = "Labor Force Participation Rate",
  Unemployment = "Unemployment",
  Income = "Income",
  Housing = "Housing",
  OP = "Overall Poverty",
  CP = "Child Poverty",
  SP = "Senior Poverty",
  HHP = "Household Poverty",
  ALICE = "ALICE",
  ALICEComb = "Combined ALICE and HH Poverty",
  Issuance = "Issuance",
  SNAPHH = "SNAP HH",
  SNAPP = "SNAP Persons",
  WIC = "WIC",
  Black = "Black",
  Hispanic = "Hispanic",
  FAC = "Feeding America Child Rates",
  FAO = "Feeding America Overall Rates"
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

export default class ViewLayersToggle extends React.PureComponent<
  AllWidgetProps<IMConfig>,
  IState
> {
  dsManager = DataSourceManager.getInstance();

  constructor(props) {
    super(props);
    this.state = {
      jimuMapView: undefined,
      yearChoro: YearChoro.YNone,
      disable2018: false,
      disable2020: false,
      yearVal: Array("","",""),
      indicVal2: IndicatorVal.None,
      indicVal: Array("None", "Labor Force Participation Rate", "Unemployment",
      "Income", "Housing", "Overall Poverty", "Child Poverty", "Senior Poverty",
      "Household Poverty", "ALICE", "Combined ALICE and HH Poverty", "Issuance",
      "SNAP HH", "SNAP Persons", "WIC", "Black", "Hispanic", "Feeding America Child Rates",
      "Feeding America Overall Rates"),
      checked: false,

      checkedState: false,
      checkedState2: false,
      checkedState3: false
      
      showButton: true,
      setShowButton1: true,
      showButton2: true,
      setShowButton2: true
    };
  }

  showLayerList = (evt) => {
    if (evt.target.value && evt.target.value !== "") {  
      if (this.state.jimuMapView) {
        const layerList = new LayerList({
          view: this.state.jimuMapView.view
        });
        if (this.state.checkedState === false){
          this.state.jimuMapView.view.when(() => {
            this.state.jimuMapView.view.ui.add(layerList, "top-right");
          });  
        }
        else {
          this.state.jimuMapView.view.when(() => {
            this.state.jimuMapView.view.ui.remove(layerList);
          });
        }
        this.setState({
          checkedState: !this.state.checkedState
        });
      }
    }
  }

  loadYears = (evt) => {
    this.setState({ yearChoro: YearChoro.YNone }) // this will reset the checked value of all radio buttons to empty

    if (evt.target.value === "None") {
      this.setState({
        yearVal: Array("", "", ""),
        indicVal: Array("", "", "", "", "", "", "", "", "", "", "", "", "",
      "", "", "", "", "", ""),
        disable2018: false,
        disable2020: false
      })
      this.removeAllChoro();
    }

    if (evt.target.value === "Issuance" || evt.target.value === "SNAP HH" || evt.target.value === "SNAP Persons" || evt.target.value === "WIC"){
      this.setState({
        disable2018: false,
        disable2020: false
      })
      if (evt.target.value === "Issuance"){
        this.setState({
          yearVal: Array("Issuance 2018","Issuance 2019","Issuance 2020")
        })
      }
      if (evt.target.value === "SNAP HH"){
        this.setState({
          yearVal: Array("SNAP HH 2018","SNAP HH 2019","SNAP HH 2020")
        })
      }
      if (evt.target.value === "SNAP Persons"){
        this.setState({
          yearVal: Array("SNAP Persons 2018","SNAP Persons 2019","SNAP Persons 2020")
        })
      }
      if (evt.target.value === "WIC"){
        this.setState({
          yearVal: Array("WIC 2018","WIC 2019","WIC 2020")
        })
      }
    }
    

    if (evt.target.value === "Household Poverty" || evt.target.value === "ALICE" || evt.target.value === "Combined ALICE and HH Poverty"){
      this.setState({
        disable2018: true,
        disable2020: true
      })
      if (evt.target.value === "Household Poverty"){
        this.setState({
          yearVal: Array("","Poverty (HH) 2019","")
        })
      }
      if (evt.target.value === "ALICE"){
        this.setState({
          yearVal: Array("","ALICE 2019","")
        })
      }
      if (evt.target.value === "Combined ALICE and HH Poverty"){
        this.setState({
          yearVal: Array("","Combined ALICE and HH Poverty 2019","")
        })
      }
    }
    
    else {
      this.setState({
        disable2018: false,
        disable2020: true
      })
      if (evt.target.value === "Labor Force Participation Rate"){
        this.setState({
          yearVal: Array("Labor Force Participation 2018","Labor Force Participation 2019","")
        })
      }
      if (evt.target.value === "Unemployment"){
        this.setState({
          yearVal: Array("Unemployment 2018","Unemployment 2019","")
        })
      }
      if (evt.target.value === "Income"){
        this.setState({
          yearVal: Array("Median Income 2018","Median Income 2019","")
        })
      }
      if (evt.target.value === "Overall Poverty"){
        this.setState({
          yearVal: Array("Overall Poverty 2018","Overall Poverty 2019","")
        })
      }
      if (evt.target.value === "Child Poverty"){
        this.setState({
          yearVal: Array("Child Poverty 2018","Child Poverty 2019","")
        })
      }
      if (evt.target.value === "Senior Poverty"){
        this.setState({
          yearVal: Array("Senior Poverty 2018","Senior Poverty 2019","")
        })
      }
      if (evt.target.value === "Housing"){
        this.setState({
          yearVal: Array("Housing Burdened 2018","Housing Burdened 2019","")
        })
      }
      if (evt.target.value === "Black"){
        this.setState({
          yearVal: Array("Black 2018","Black 2019","")
        })
      }
      if (evt.target.value === "Hispanic"){
        this.setState({
          yearVal: Array("Hispanic 2018","Hispanic 2019","")
        })
      }
      if (evt.target.value === "Feeding America Child Rates"){
        this.setState({
          yearVal: Array("FA Child 2018","FA Child 2019","")
        })
      }
      if (evt.target.value === "Feeding America Overall Rates"){
        this.setState({
          yearVal: Array("FA Overall 2018","FA Overall 2019","")
        })
      }
    }
  }

  removeAllChoro = () => {
    if (this.state.jimuMapView) {
      const layerList = new LayerList({
        view: this.state.jimuMapView.view
      });
      this.state.jimuMapView.view.when(() => {
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
    }
  }

  changeHandler = (evt) => {
    if (evt.target.value === this.state.yearVal[0] && evt.target.value !== "") {
      this.setState({
        yearChoro: YearChoro.Y2018 
      })
    }

    if (evt.target.value === this.state.yearVal[1] && evt.target.value !== "") {
      this.setState({
        yearChoro: YearChoro.Y2019 
      })
    }

    if (evt.target.value === this.state.yearVal[2] && evt.target.value !== "") {
      this.setState({
        yearChoro: YearChoro.Y2020 
      })
    }

    if (evt.target.value && evt.target.value !== "") {  
      if (this.state.jimuMapView) {
        const layerList = new LayerList({
          view: this.state.jimuMapView.view
        });
        this.removeAllChoro();
        this.state.jimuMapView.view.when(() => {
          const layer1 = layerList.operationalItems.flatten((layer) => {
            return layer.children
          });
          const sublayer1 = layer1.find((layerView) => {
            return layerView.title.includes(evt.target.value)
          });
          sublayer1.visible = true,
          sublayer1.parent.visible = true,
          sublayer1.parent.parent.visible = true
        });
      }
    }
  }

  expandWidget = () => {
    const expand = new Expand({
      view: this.state.jimuMapView.view,
      content: document.getElementById("choro-visible"),
      id: "choro-expand",
      expanded: true
    });
    this.state.jimuMapView.view.when(() => {
      if (this.state.checked === true){
        this.state.jimuMapView.view.ui.add(
          expand,
          "top-left"
        );
        document.getElementById("choro-visible").style.setProperty("display", "block");        
      }
      else {
        this.state.jimuMapView.view.ui.remove("choro-expand");
        // document.getElementById("choro-visible").style.setProperty("display", "none");
        this.state.jimuMapView.view.ui.empty("top-left");
      }
    });
    this.setState({
      checked: !this.state.checked
    });
  }

  expandWidget2 = () => {
      this.state.jimuMapView.view.when(() => {
        const expand = new Expand({
          view: this.state.jimuMapView.view,
          content: this.textInput.current,
          expanded: true,
          id: "choro-expand"
        });

        if (this.state.checked === true){
          this.state.jimuMapView.view.ui.add(expand, "top-right");
        }
        document.getElementById("choro-visible").style.setProperty("display", "block");
        this.setState({
          checked: !this.state.checked
        });
      };
  }

  toggleButton = () => {
    setShowButton1(!this.showButton);
  }

  toggleButton2 = () => {
    setShowButton2(!this.showButton2)
  }

  // changeHandler = (evt) => {
  //   if (evt.target.value && evt.target.value !== "") {  
  //     if (this.state.jimuMapView) {
  //       const layerList = new LayerList({
  //         view: this.state.jimuMapView.view
  //       });
  //       this.removeAllChoro();
  //       if (this.state.checkedState3 === false){
  //         this.state.jimuMapView.view.when(() => {
  //           const layer1 = layerList.operationalItems.flatten((layer) => {
  //             return layer.children
  //           });
  //           const sublayer1 = layer1.find((layerView) => {
  //             return layerView.title.includes(evt.target.value)
  //           });
  //           sublayer1.visible = true,
  //           sublayer1.parent.visible = true,
  //           sublayer1.parent.parent.visible = true
  //         });
  //       }
  //       this.setState({
  //         checkedState3: !this.state.checkedState3
  //       });
  //     }
  //   }
  // }

  render() {
    return (
      <div
        className="choro-toggle-visible-new"
        style={{ overflow: "auto" }}
      >
        {this.props.hasOwnProperty("useMapWidgetIds") &&
          this.props.useMapWidgetIds &&
          this.props.useMapWidgetIds.length === 1 && (
            // The JimuMapViewComponent gives us a connection to the
            // ArcGIS JS API MapView object. We store it in the State.
            <JimuMapViewComponent
              useMapWidgetId={this.props.useMapWidgetIds?.[0]}
              onActiveViewChange={(jmv: JimuMapView) => {
                this.setState({
                  jimuMapView: jmv,
                });
              }}
            />
          )}
          <div>
            <Label>
            <Switch
              checked={this.state.checked}
              onChange={() => {
                this.expandWidget();
              }}>
            </Switch>
            {"Show Indicators"}
            </Label>
            < br />


{/*}                <Button
              onClick={() => {
                this.expandWidget2();
              }}>
                {"Show Indicators2"}
                </Button>
*/}          </div>



        <div id = "choro-visible" style={{display: "none"}}>
        <p className="shadow-sm m-3 p-3 bg-white rounded">
          <Select
            name="select-indicator"
            onChange={(evt) => {
              this.loadYears(evt);
            }}
            style={{ maxWidth: "100%"}}
            placeholder="Indicator"
          >
            {/*Categories: Poverty, Food Assistance, Race, Housing, Labor, Feeding America*/}
            {/* <Option value="None">{"None"}</Option> */}
            <Option header>{"Labor"}</Option>
            <Option value={this.state.indicVal[1]}>{"Labor Force Participation Rate"}</Option>
            <Option value={this.state.indicVal[2]}>{"Unemployment Rate"}</Option>
            <Option value={this.state.indicVal[3]}>{"Median Income"}</Option>
            <Option value={this.state.indicVal[4]}>{"Housing Burdened"}</Option>
            <Option divider></Option>
            <Option header>{"Poverty"}</Option>
            <Option value={this.state.indicVal[5]}>{"Overall Poverty"}</Option>
            <Option value={this.state.indicVal[6]}>{"Child Poverty"}</Option>
            <Option value={this.state.indicVal[7]}>{"Senior Poverty"}</Option>
            <Option value={this.state.indicVal[8]}>{"Household Poverty"}</Option>
            <Option value={this.state.indicVal[9]}>{"ALICE"}</Option>
            <Option value={this.state.indicVal[10]}>{"Combined ALICE and Household Poverty"}</Option>
            <Option divider></Option>
            <Option header>{"Food Assistance"}</Option>
            <Option value={this.state.indicVal[11]}>{"Issuance"}</Option>
            <Option value={this.state.indicVal[12]}>{"SNAP (Households)"}</Option>
            <Option value={this.state.indicVal[13]}>{"SNAP (Persons)"}</Option>
            <Option value={this.state.indicVal[14]}>{"WIC"}</Option>
            <Option divider></Option>
            <Option header>{"Race/Ethnicity"}</Option>
            <Option value={this.state.indicVal[15]}>{"Black"}</Option>
            <Option value={this.state.indicVal[16]}>{"Hispanic"}</Option>
            <Option divider></Option>
            <Option header>{"Feeding America Model Estimates"}</Option>
            <Option value={this.state.indicVal[17]}>{"Child Rates"}</Option>
            <Option value={this.state.indicVal[18]}>{"Overall Rates"}</Option>
          </Select><br />
          
          <div aria-label="Select Year" className="text-center"
          style={{ margin: "0 auto" }}>
            
            <Select
            onChange={(evt) => {
              this.changeHandler(evt);
            }}
            placeholder="Year">
              <Option
              value={this.state.yearVal[0]}
              disabled={this.state.disable2018}>
                {"2018"}</Option>
              <Option
              value={this.state.yearVal[1]}>
                {"2019"}</Option>
              <Option
              value={this.state.yearVal[2]}
              disabled={this.state.disable2020}>
                {"2020"}</Option>
            </Select>
            <br />
            <Button
              value={"Clear All"}
              onClick={() => {
                this.removeAllChoro();
              }}
              size="sm"
            > {"Clear Indicators"}
            </Button>
            </div>
          </p>
          </div>

          {/* <div>
            <Slider min={0} max={2} step={1}
            defaultValue = {0}
            value = {10}
            onChange={(evt) => {
              this.selectChangeHandler(evt);
            }}></Slider>
          </div> */}
          {/* <p>
              <Label>
            <Checkbox value={"layerlist"}
            checked={this.state.checkedState}
            onChange={(evt) => {this.showLayerList(evt)}}/>
              {"Layer List"}
              </Label>

          </p> */}
      </div>
    );
  }
}