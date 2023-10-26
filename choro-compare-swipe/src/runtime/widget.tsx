/** @jsx jsx */
/*
import { React, AllWidgetProps, jsx, DataSourceComponent, SqlQueryParams, DataSourceManager, QueriableDataSource, DataSource } from 'jimu-core'
import { Label, Radio, Select, DropdownButton, defaultMessages as jimuUIMessages, Dropdown, DropdownMenu, Option } from 'jimu-ui'
*/
import { React, AllWidgetProps, jsx, DataSourceManager, QueriableDataSource } from "jimu-core";
import { IMConfig } from "../config";

import defaultMessages from "./translations/default";
import FeatureLayer from "esri/layers/FeatureLayer";
import { JimuMapViewComponent, JimuMapView, IMJimuLayerViewInfo } from "jimu-arcgis";
import { Radio, Label, Select, Option, Slider, Checkbox, Button } from "jimu-ui";
import LayerList from "esri/widgets/LayerList";
import Swipe from "esri/widgets/Swipe";
// import Query from "esri/rest/support/Query";
// import query from "esri/rest/query";
import Layer from "esri/layers/Layer";
import View from "esri/views/View";

interface IState {
  jimuMapView: JimuMapView;
  yearChoroLeft: YearChoro;
  yearChoroRight: YearChoro;
  disable2018Left: boolean;
  disable2020Left: boolean;
  disable2018Right: boolean;
  disable2020Right: boolean;
  yearValLeft: Array<string>;
  indicValLeft: Array<string>;
  yearValRight: Array<string>;
  indicValRight: Array<string>;
  comparisonLayers: Array<string>;
  featureLayerOnMap: FeatureLayer;
  
  checkedState: boolean;
  checkedState2: boolean;
  checkedState3: boolean;
}

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
      yearChoroLeft: YearChoro.YNone,
      yearChoroRight: YearChoro.YNone,
      disable2018Left: false,
      disable2020Left: false,
      disable2018Right: false,
      disable2020Right: false,
      yearValLeft: Array("","",""),
      indicValLeft: Array("None", "Labor Force Participation Rate", "Unemployment",
      "Income", "Housing", "Overall Poverty", "Child Poverty", "Senior Poverty",
      "Household Poverty", "ALICE", "Combined ALICE and HH Poverty", "Issuance",
      "SNAP HH", "SNAP Persons", "WIC", "Black", "Hispanic", "Feeding America Child Rates",
      "Feeding America Overall Rates"),
      yearValRight: Array("","",""),
      indicValRight: Array("None", "Labor Force Participation Rate", "Unemployment",
      "Income", "Housing", "Overall Poverty", "Child Poverty", "Senior Poverty",
      "Household Poverty", "ALICE", "Combined ALICE and HH Poverty", "Issuance",
      "SNAP HH", "SNAP Persons", "WIC", "Black", "Hispanic", "Feeding America Child Rates",
      "Feeding America Overall Rates"),
      comparisonLayers: Array("",""),
      featureLayerOnMap: undefined,

      checkedState: false,
      checkedState2: false,
      checkedState3: false
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

  makeSwipe = (evt) => {
    if (evt.target.value && evt.target.value !== "") {
      if (this.state.jimuMapView) {
        // this.setState({
        //   checkedState2: !this.state.checkedState2
        // });
        const layerList = new LayerList({
          view: this.state.jimuMapView.view
        });
        this.removeAllChoro();
        this.state.jimuMapView.view.when(() => {
          const layer1 = layerList.operationalItems.flatten((layer) => {
            return layer.children
          });
          if (this.state.comparisonLayers[0] !== "" && this.state.comparisonLayers[1] !== "") {
            const leftlayer = layer1.find((layerView) => {
              return layerView.title.includes(this.state.comparisonLayers[0])
            });
            const rightlayer = layer1.find((layerView) => {
              return layerView.title.includes(this.state.comparisonLayers[1])
            });
            const swipe = new Swipe({
              leadingLayers: [leftlayer.layer],
              trailingLayers: [rightlayer.layer],
              position: 35,
              view: this.state.jimuMapView.view
            });
            this.state.jimuMapView.view.ui.add(swipe);
            leftlayer.visible = true,
            rightlayer.visible = true  
          };
          // if (this.state.checkedState2 == true) {
          // }
          // if (this.state.checkedState2 == false) {
          //   swipe.destroy();
          //   swipe.view = null;
          //   this.state.jimuMapView.view.ui.empty();
          // }
        });
      }
    }
  }

  makeSwipe2 = (evt) => {
    if (evt.target.value && evt.target.value !== "") {
      if (this.state.jimuMapView) {
        this.setState({
          checkedState2: !this.state.checkedState2
        })
        // const layerList = new LayerList({
        //   view: this.state.jimuMapView.view
        // });
        // this.removeAllChoro();
        const sublayer1 = new FeatureLayer({
          // url: evt.target.value,
          portalItem: {
            id: "c902f9ce643a46ee8640b4bc7590dc8a" // portal ID of map
          },
          layerId: 16,
        });
        const sublayer2 = new FeatureLayer({
          // url: evt.target.value,
          portalItem: {
            id: "c902f9ce643a46ee8640b4bc7590dc8a" // portal ID of map
          },
          layerId: 40,
        });
        const swipe = new Swipe({
          leadingLayers: [sublayer1],
          trailingLayers: [sublayer2],
          position: 35,
          view: this.state.jimuMapView.view
        });
        if (this.state.checkedState2 == false) {
          this.state.jimuMapView.view.map.add(sublayer1, 2);
          this.setState({
            featureLayerOnMap: sublayer1,
          });
          this.state.jimuMapView.view.map.add(sublayer2, 2);
          this.setState({
            featureLayerOnMap: sublayer2,
          });
          this.state.jimuMapView.view.ui.add(swipe);
        }
        if (this.state.checkedState2 == true) {
          swipe.destroy();
          swipe.view = null;
          this.state.jimuMapView.view.ui.remove(swipe);
          // this.state.jimuMapView.view.ui.empty();          
          this.state.jimuMapView.view.map.remove(this.state.featureLayerOnMap);
          this.setState({
            featureLayerOnMap: undefined,
          });
          // this.state.jimuMapView.view.ui.remove(swipe);
        }
      }
    }
  }

  loadYearsLeft = (evt) => {

    if (evt.target.value === "None") {
      this.setState({
        yearValLeft: Array("", "", ""),
        indicValLeft: Array("", "", "", "", "", "", "", "", "", "", "", "", "",
      "", "", "", "", "", ""),
        disable2018Left: false,
        disable2020Left: false
      })
      this.removeAllChoro();
    }

    if (evt.target.value === "Issuance" || evt.target.value === "SNAP HH" || evt.target.value === "SNAP Persons" || evt.target.value === "WIC"){
      this.setState({
        disable2018Left: false,
        disable2020Left: false
      })
      if (evt.target.value === "Issuance"){
        this.setState({
          yearValLeft: Array("Issuance 2018","Issuance 2019","Issuance 2020")
        })
      }
      if (evt.target.value === "SNAP HH"){
        this.setState({
          yearValLeft: Array("SNAP HH 2018","SNAP HH 2019","SNAP HH 2020")
        })
      }
      if (evt.target.value === "SNAP Persons"){
        this.setState({
          yearValLeft: Array("SNAP Persons 2018","SNAP Persons 2019","SNAP Persons 2020")
        })
      }
      if (evt.target.value === "WIC"){
        this.setState({
          yearValLeft: Array("WIC 2018","WIC 2019","WIC 2020")
        })
      }
    }
    

    if (evt.target.value === "Household Poverty" || evt.target.value === "ALICE" || evt.target.value === "Combined ALICE and HH Poverty"){
      this.setState({
        disable2018Left: true,
        disable2020Left: true
      })
      if (evt.target.value === "Household Poverty"){
        this.setState({
          yearValLeft: Array("","Poverty (HH) 2019","")
        })
      }
      if (evt.target.value === "ALICE"){
        this.setState({
          yearValLeft: Array("","ALICE 2019","")
        })
      }
      if (evt.target.value === "Combined ALICE and HH Poverty"){
        this.setState({
          yearValLeft: Array("","Combined ALICE and HH Poverty 2019","")
        })
      }
    }
    
    else {
      this.setState({
        disable2018Left: false,
        disable2020Left: true
      })
      if (evt.target.value === "Labor Force Participation Rate"){
        this.setState({
          yearValLeft: Array("Labor Force Participation 2018","Labor Force Participation 2019","")
        })
      }
      if (evt.target.value === "Unemployment"){
        this.setState({
          yearValLeft: Array("Unemployment 2018","Unemployment 2019","")
        })
      }
      if (evt.target.value === "Income"){
        this.setState({
          yearValLeft: Array("Median Income 2018","Median Income 2019","")
        })
      }
      if (evt.target.value === "Overall Poverty"){
        this.setState({
          yearValLeft: Array("Overall Poverty 2018","Overall Poverty 2019","")
        })
      }
      if (evt.target.value === "Child Poverty"){
        this.setState({
          yearValLeft: Array("Child Poverty 2018","Child Poverty 2019","")
        })
      }
      if (evt.target.value === "Senior Poverty"){
        this.setState({
          yearValLeft: Array("Senior Poverty 2018","Senior Poverty 2019","")
        })
      }
      if (evt.target.value === "Housing"){
        this.setState({
          yearValLeft: Array("Housing Burdened 2018","Housing Burdened 2019","")
        })
      }
      if (evt.target.value === "Black"){
        this.setState({
          yearValLeft: Array("Black 2018","Black 2019","")
        })
      }
      if (evt.target.value === "Hispanic"){
        this.setState({
          yearValLeft: Array("Hispanic 2018","Hispanic 2019","")
        })
      }
      if (evt.target.value === "Feeding America Child Rates"){
        this.setState({
          yearValLeft: Array("FA Child 2018","FA Child 2019","")
        })
      }
      if (evt.target.value === "Feeding America Overall Rates"){
        this.setState({
          yearValLeft: Array("FA Overall 2018","FA Overall 2019","")
        })
      }
    }
  }

  loadYearsRight = (evt) => {

    if (evt.target.value === "None") {
      this.setState({
        yearValRight: Array("", "", ""),
        indicValRight: Array("", "", "", "", "", "", "", "", "", "", "", "", "",
      "", "", "", "", "", ""),
        disable2018Right: false,
        disable2020Right: false
      })
      this.removeAllChoro();
    }

    if (evt.target.value === "Issuance" || evt.target.value === "SNAP HH" || evt.target.value === "SNAP Persons" || evt.target.value === "WIC"){
      this.setState({
        disable2018Right: false,
        disable2020Right: false
      })
      if (evt.target.value === "Issuance"){
        this.setState({
          yearValRight: Array("Issuance 2018","Issuance 2019","Issuance 2020")
        })
      }
      if (evt.target.value === "SNAP HH"){
        this.setState({
          yearValRight: Array("SNAP HH 2018","SNAP HH 2019","SNAP HH 2020")
        })
      }
      if (evt.target.value === "SNAP Persons"){
        this.setState({
          yearValRight: Array("SNAP Persons 2018","SNAP Persons 2019","SNAP Persons 2020")
        })
      }
      if (evt.target.value === "WIC"){
        this.setState({
          yearValRight: Array("WIC 2018","WIC 2019","WIC 2020")
        })
      }
    }
    

    if (evt.target.value === "Household Poverty" || evt.target.value === "ALICE" || evt.target.value === "Combined ALICE and HH Poverty"){
      this.setState({
        disable2018Right: true,
        disable2020Right: true
      })
      if (evt.target.value === "Household Poverty"){
        this.setState({
          yearValRight: Array("","Poverty (HH) 2019","")
        })
      }
      if (evt.target.value === "ALICE"){
        this.setState({
          yearValRight: Array("","ALICE 2019","")
        })
      }
      if (evt.target.value === "Combined ALICE and HH Poverty"){
        this.setState({
          yearValRight: Array("","Combined ALICE and HH Poverty 2019","")
        })
      }
    }
    
    else {
      this.setState({
        disable2018Right: false,
        disable2020Right: true
      })
      if (evt.target.value === "Labor Force Participation Rate"){
        this.setState({
          yearValRight: Array("Labor Force Participation 2018","Labor Force Participation 2019","")
        })
      }
      if (evt.target.value === "Unemployment"){
        this.setState({
          yearValRight: Array("Unemployment 2018","Unemployment 2019","")
        })
      }
      if (evt.target.value === "Income"){
        this.setState({
          yearValRight: Array("Median Income 2018","Median Income 2019","")
        })
      }
      if (evt.target.value === "Overall Poverty"){
        this.setState({
          yearValRight: Array("Overall Poverty 2018","Overall Poverty 2019","")
        })
      }
      if (evt.target.value === "Child Poverty"){
        this.setState({
          yearValRight: Array("Child Poverty 2018","Child Poverty 2019","")
        })
      }
      if (evt.target.value === "Senior Poverty"){
        this.setState({
          yearValRight: Array("Senior Poverty 2018","Senior Poverty 2019","")
        })
      }
      if (evt.target.value === "Housing"){
        this.setState({
          yearValRight: Array("Housing Burdened 2018","Housing Burdened 2019","")
        })
      }
      if (evt.target.value === "Black"){
        this.setState({
          yearValRight: Array("Black 2018","Black 2019","")
        })
      }
      if (evt.target.value === "Hispanic"){
        this.setState({
          yearValRight: Array("Hispanic 2018","Hispanic 2019","")
        })
      }
      if (evt.target.value === "Feeding America Child Rates"){
        this.setState({
          yearValRight: Array("FA Child 2018","FA Child 2019","")
        })
      }
      if (evt.target.value === "Feeding America Overall Rates"){
        this.setState({
          yearValRight: Array("FA Overall 2018","FA Overall 2019","")
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

  changeHandlerLeft = (evt) => {
    if (evt.target.value && evt.target.value !== "") {
      if (this.state.jimuMapView) {
        this.removeAllChoro();
        if (evt.target.value === YearChoro.Y2018){
          this.state.comparisonLayers[0] = this.state.yearValLeft[0]
        };
        if (evt.target.value === YearChoro.Y2019){
          this.state.comparisonLayers[0] = this.state.yearValLeft[1]
        };
        if (evt.target.value === YearChoro.Y2020){
          this.state.comparisonLayers[0] = this.state.yearValLeft[2]
        };
      }
    }
  }

  changeHandlerRight = (evt) => {
    if (evt.target.value && evt.target.value !== "") {
      if (this.state.jimuMapView) {
        this.removeAllChoro();
        if (evt.target.value === YearChoro.Y2018){
          this.state.comparisonLayers[1] = this.state.yearValRight[0]
        };
        if (evt.target.value === YearChoro.Y2019){
          this.state.comparisonLayers[1] = this.state.yearValRight[1]
        };
        if (evt.target.value === YearChoro.Y2020){
          this.state.comparisonLayers[1] = this.state.yearValRight[2]
        };
      }
    }
  }

  clearMap = () => {
    this.removeAllChoro();
    this.setState({
      // yearValLeft: Array("", "", ""),
      // yearValRight: Array("", "", ""),
      // indicValLeft: Array("None", "Labor Force Participation Rate", "Unemployment",
      // "Income", "Housing", "Overall Poverty", "Child Poverty", "Senior Poverty",
      // "Household Poverty", "ALICE", "Combined ALICE and HH Poverty", "Issuance",
      // "SNAP HH", "SNAP Persons", "WIC", "Black", "Hispanic", "Feeding America Child Rates",
      // "Feeding America Overall Rates"),
      // indicValRight: Array("None", "Labor Force Participation Rate", "Unemployment",
      // "Income", "Housing", "Overall Poverty", "Child Poverty", "Senior Poverty",
      // "Household Poverty", "ALICE", "Combined ALICE and HH Poverty", "Issuance",
      // "SNAP HH", "SNAP Persons", "WIC", "Black", "Hispanic", "Feeding America Child Rates",
      // "Feeding America Overall Rates"),
      // yearChoroLeft: YearChoro.YNone,
      // yearChoroRight: YearChoro.YNone,
      // disable2018Left: false,
      // disable2020Left: false,
      // disable2018Right: false,
      // disable2020Right: false,
      comparisonLayers: Array("","")
    })
    this.state.jimuMapView.view.ui.empty();
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
        className="widget-view-layers-toggle-copy jimu-widget"
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
          <p className="shadow-sm m-3 p-3 bg-white rounded">
            {"Left Map:"}
          <Select
            name="select-indicator-left"
            onChange={(evt) => {
              this.loadYearsLeft(evt);
            }}
            style={{ maxWidth: "100%"}}
            placeholder="Choose an indicator..."
          >
            {/*Categories: Poverty, Food Assistance, Race, Housing, Labor, Feeding America*/}
            {/* <Option value="None">{"None"}</Option> */}
            <Option header>{"Labor"}</Option>
            <Option value={this.state.indicValLeft[1]}>{"Labor Force Participation Rate"}</Option>
            <Option value={this.state.indicValLeft[2]}>{"Unemployment Rate"}</Option>
            <Option value={this.state.indicValLeft[3]}>{"Median Income"}</Option>
            <Option value={this.state.indicValLeft[4]}>{"Housing Burdened"}</Option>
            <Option divider></Option>
            <Option header>{"Poverty"}</Option>
            <Option value={this.state.indicValLeft[5]}>{"Overall Poverty"}</Option>
            <Option value={this.state.indicValLeft[6]}>{"Child Poverty"}</Option>
            <Option value={this.state.indicValLeft[7]}>{"Senior Poverty"}</Option>
            <Option value={this.state.indicValLeft[8]}>{"Household Poverty"}</Option>
            <Option value={this.state.indicValLeft[9]}>{"ALICE"}</Option>
            <Option value={this.state.indicValLeft[10]}>{"Combined ALICE and Household Poverty"}</Option>
            <Option divider></Option>
            <Option header>{"Food Assistance"}</Option>
            <Option value={this.state.indicValLeft[11]}>{"Issuance"}</Option>
            <Option value={this.state.indicValLeft[12]}>{"SNAP (Households)"}</Option>
            <Option value={this.state.indicValLeft[13]}>{"SNAP (Persons)"}</Option>
            <Option value={this.state.indicValLeft[14]}>{"WIC"}</Option>
            <Option divider></Option>
            <Option header>{"Race/Ethnicity"}</Option>
            <Option value={this.state.indicValLeft[15]}>{"Black"}</Option>
            <Option value={this.state.indicValLeft[16]}>{"Hispanic"}</Option>
            <Option divider></Option>
            <Option header>{"Feeding America Model Estimates"}</Option>
            <Option value={this.state.indicValLeft[17]}>{"Child Rates"}</Option>
            <Option value={this.state.indicValLeft[18]}>{"Overall Rates"}</Option>
          </Select><br />
          
          <div aria-label="Select Year Left" className="text-center"
          style={{ margin: "0 auto" }}>
            <Select
            onChange={(evt) => {
              this.changeHandlerLeft(evt);
            }}
            placeholder="Choose a year...">
              <Option
              value={YearChoro.Y2018}
              disabled={this.state.disable2018Left}>
                {"2018"}</Option>
              <Option
              value={YearChoro.Y2019}>
                {"2019"}</Option>
              <Option
              value={YearChoro.Y2020}
              disabled={this.state.disable2020Left}>
                {"2020"}</Option>
            </Select>
          </div>
          <div style={{
            textAlign: "center",
            fontSize: "18px"
          }}>{"vs"}</div>

          {"Right Map:"}
          <Select
            name="select-indicator-right"
            onChange={(evt) => {
              this.loadYearsRight(evt);
            }}
            style={{ maxWidth: "100%"}}
            placeholder="Choose an indicator..."
          >
            {/*Categories: Poverty, Food Assistance, Race, Housing, Labor, Feeding America*/}
            {/* <Option value="None">{"None"}</Option> */}
            <Option header>{"Labor"}</Option>
            <Option value={this.state.indicValRight[1]}>{"Labor Force Participation Rate"}</Option>
            <Option value={this.state.indicValRight[2]}>{"Unemployment Rate"}</Option>
            <Option value={this.state.indicValRight[3]}>{"Median Income"}</Option>
            <Option value={this.state.indicValRight[4]}>{"Housing Burdened"}</Option>
            <Option divider></Option>
            <Option header>{"Poverty"}</Option>
            <Option value={this.state.indicValRight[5]}>{"Overall Poverty"}</Option>
            <Option value={this.state.indicValRight[6]}>{"Child Poverty"}</Option>
            <Option value={this.state.indicValRight[7]}>{"Senior Poverty"}</Option>
            <Option value={this.state.indicValRight[8]}>{"Household Poverty"}</Option>
            <Option value={this.state.indicValRight[9]}>{"ALICE"}</Option>
            <Option value={this.state.indicValRight[10]}>{"Combined ALICE and Household Poverty"}</Option>
            <Option divider></Option>
            <Option header>{"Food Assistance"}</Option>
            <Option value={this.state.indicValRight[11]}>{"Issuance"}</Option>
            <Option value={this.state.indicValRight[12]}>{"SNAP (Households)"}</Option>
            <Option value={this.state.indicValRight[13]}>{"SNAP (Persons)"}</Option>
            <Option value={this.state.indicValRight[14]}>{"WIC"}</Option>
            <Option divider></Option>
            <Option header>{"Race/Ethnicity"}</Option>
            <Option value={this.state.indicValRight[15]}>{"Black"}</Option>
            <Option value={this.state.indicValRight[16]}>{"Hispanic"}</Option>
            <Option divider></Option>
            <Option header>{"Feeding America Model Estimates"}</Option>
            <Option value={this.state.indicValRight[17]}>{"Child Rates"}</Option>
            <Option value={this.state.indicValRight[18]}>{"Overall Rates"}</Option>
          </Select><br />
          
          <div aria-label="Select Year Right" className="text-center"
          style={{ margin: "0 auto" }}>
            <Select
            onChange={(evt) => {
              this.changeHandlerRight(evt);
            }}
            placeholder="Choose a year...">
              <Option
              value={YearChoro.Y2018}
              disabled={this.state.disable2018Right}>
                {"2018"}</Option>
              <Option
              value={YearChoro.Y2019}>
                {"2019"}</Option>
              <Option
              value={YearChoro.Y2020}
              disabled={this.state.disable2020Right}>
                {"2020"}</Option>
            </Select><br />

            <Button
              value={"swipe"}
              onClick={(evt) => {
                this.makeSwipe(evt);
              }}
              size="sm"
              >
              {"Compare"}
            </Button>

            <Button
              value={"Clear All"}
              onClick={() => {
                this.clearMap();
              }}
              size="sm"
            > {"Clear"}
            </Button>
          </div>

          {/* <div>
            <Slider min={0} max={2} step={1}
            defaultValue = {0}
            value = {10}
            onChange={(evt) => {
              this.selectChangeHandler(evt);
            }}></Slider>
          </div> */}

        </p>
          {/* <p>
              <Label>
            <Checkbox value={"layerlist"}
            checked={this.state.checkedState}
            onChange={(evt) => {this.showLayerList(evt)}}/>
              {"Layer List"}
              </Label>
              <Label>
            <Checkbox value={"swipe"}
            checked={this.state.checkedState2}
            onChange={(evt) => {this.makeSwipe(evt)}}/>
              {"Compare Issuance"}
              </Label>

          </p> */}
          {/* <div id = "logoDiv">{"Logo"}</div> */}
      </div>
    );
  }
}