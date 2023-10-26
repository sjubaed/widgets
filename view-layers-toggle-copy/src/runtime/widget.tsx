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
import { Radio, Label, Select, Option, Slider } from "jimu-ui";
import LayerList from "esri/widgets/LayerList";
import Query from "esri/rest/support/Query";
import query from "esri/rest/query";
import { featureLayer } from "jimu-for-test/lib/mock-data/feature-service";

interface IState {
  jimuMapView: JimuMapView;
  featureLayerOnMap: FeatureLayer;
  layerList: LayerList;
  yearChoro: YearChoro;
  disable2018: boolean;
  disable2020: boolean;
  radioVal: Array<string>;
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
      featureLayerOnMap: undefined,
      layerList: undefined,
      yearChoro: YearChoro.YNone,
      disable2018: false,
      disable2020: false,
      radioVal: Array("","",""),
    };
  }

  // This function removes current feature layer and adds new one
  selectChangeHandler = (evt) => {
    if (evt.target.value === this.state.radioVal[0] && evt.target.value !== "") {
      this.setState({
        yearChoro: YearChoro.Y2018 
      })
    }

    if (evt.target.value === this.state.radioVal[1] && evt.target.value !== "") {
      this.setState({
        yearChoro: YearChoro.Y2019 
      })
    }

    if (evt.target.value === this.state.radioVal[2] && evt.target.value !== "") {
      this.setState({
        yearChoro: YearChoro.Y2020 
      })
    }

    if (this.state.jimuMapView) {
      if (this.state.featureLayerOnMap) {
        // Remove the old Feature Layer
        this.state.jimuMapView.view.map.remove(this.state.featureLayerOnMap);
        this.setState({
          featureLayerOnMap: undefined,
        });
      }

      if (evt.target.value && evt.target.value !== "") {
        // Create and add the new Feature Layer
        const featureLayer = new FeatureLayer({
          // url: evt.target.value,
          portalItem: {
            id: "c902f9ce643a46ee8640b4bc7590dc8a" // portal ID of map
          },
          layerId: evt.target.value,
        });
        /*this.state.allLayersWithMap.operationalItems*/
        this.state.jimuMapView.view.map.add(featureLayer, 2); // The 2 signifies that the added layer should be below the food banks layer
        this.setState({
          featureLayerOnMap: featureLayer,
        });
      }
    } else {
      console.error(
        "You probably need to choose your map in the settings panel."
      );
    }
  };

  loadYears = (evt) => {
    this.setState({ yearChoro: YearChoro.YNone }) // this will reset the checked value of all radio buttons to empty

    if (evt.target.value === "None"){
      this.setState({
        radioVal: Array("","",""),
        featureLayerOnMap: undefined,
        disable2018: false,
        disable2020: false
      })
      if (this.state.jimuMapView){
        if (this.state.featureLayerOnMap){
          this.state.jimuMapView.view.map.remove(this.state.featureLayerOnMap);
        }
      }
    }

    if (evt.target.value === "Issuance" || evt.target.value === "SNAPHH" || evt.target.value === "SNAPP" || evt.target.value === "WIC"){
      this.setState({
        disable2018: false,
        disable2020: false
      })
      if (evt.target.value === "Issuance"){
        this.setState({
          radioVal: Array("40","16","7")
        })
      }
      if (evt.target.value === "SNAPHH"){
        this.setState({
          radioVal: Array("41","17","8")
        })
      }
      if (evt.target.value === "SNAPP"){
        this.setState({
          radioVal: Array("42","18","9")
        })
      }
      if (evt.target.value === "WIC"){
        this.setState({
          radioVal: Array("38","14","5")
        })
      }
    }
    

    if (evt.target.value === "HHP" || evt.target.value === "ALICE" || evt.target.value === "ALICEComb" || evt.target.value === "FAC" || evt.target.value === "FAO"){
      this.setState({
        disable2018: true,
        disable2020: true
      })
      if (evt.target.value === "HHP"){
        this.setState({
          radioVal: Array("","30","")
        })
      }
      if (evt.target.value === "ALICE"){
        this.setState({
          radioVal: Array("","29","")
        })
      }
      if (evt.target.value === "ALICEComb"){
        this.setState({
          radioVal: Array("","28","")
        })
      }
      if (evt.target.value === "FAC"){
        this.setState({
          radioVal: Array("","12","")
        })
      }
      if (evt.target.value === "FAO"){
        this.setState({
          radioVal: Array("","13","")
        })
      }
    }
    
    else {
      this.setState({
        disable2018: false,
        disable2020: true
      })
      if (evt.target.value === "LFPR"){
        this.setState({
          radioVal: Array("47","23","")
        })
      }
      if (evt.target.value === "Unemployment"){
        this.setState({
          radioVal: Array("48","24","")
        })
      }
      if (evt.target.value === "Income"){
        this.setState({
          radioVal: Array("50","26","")
        })
      }
      if (evt.target.value === "OP"){
        this.setState({
          radioVal: Array("52","31","")
        })
      }
      if (evt.target.value === "CP"){
        this.setState({
          radioVal: Array("53","32","")
        })
      }
      if (evt.target.value === "SP"){
        this.setState({
          radioVal: Array("54","33","")
        })
      }
      if (evt.target.value === "Housing"){
        this.setState({
          radioVal: Array("49","25","")
        })
      }
      if (evt.target.value === "Black"){
        this.setState({
          radioVal: Array("45","21","")
        })
      }
      if (evt.target.value === "Hispanic"){
        this.setState({
          radioVal: Array("44","20","")
        })
      }
    }
  }


/*   onRadioButtonChange = e => {
    // const FB_Type = e.target.value
    // Update radio button selected status
    this.setState({ featureLayerOnMap: undefined })

    const dataSourceId = this.props.useDataSources?.[0]?.dataSourceId
    const dataSource = dataSourceId && DataSourceManager.getInstance().getDataSource(dataSourceId) as QueriableDataSource
    if (dataSource) {
      // Update query in data source
      // dataSource.updateQueryParams(this.getQuery(FB_Type), this.props.id)
    }
  }
 */

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
          <Select
            name="select-indicator"
            onChange={(evt) => {
              this.loadYears(evt);
            }}
            style={{ maxWidth: "100%"}}
            placeholder="Choose an indicator..."
          >
            {/*Categories: Poverty, Food Assistance, Race, Housing, Labor, Feeding America*/}
            <Option value="None">{"None"}</Option>
            <Option header>{"Labor"}</Option>
            <Option value="LFPR">{"Labor Force Participation Rate"}</Option>
            <Option value="Unemployment">{"Unemployment Rate"}</Option>
            <Option value="Income">{"Median Income"}</Option>
            <Option value="Housing">{"Housing Burdened"}</Option>
            <Option divider></Option>
            <Option header>{"Poverty"}</Option>
            <Option value="OP">{"Overall Poverty"}</Option>
            <Option value="CP">{"Child Poverty"}</Option>
            <Option value="SP">{"Senior Poverty"}</Option>
            <Option value="HHP">{"Household Poverty"}</Option>
            <Option value="ALICE">{"ALICE"}</Option>
            <Option value="ALICEComb">{"Combined ALICE and Household Poverty"}</Option>
            <Option divider></Option>
            <Option header>{"Food Assistance"}</Option>
            <Option value="Issuance">{"Issuance"}</Option>
            <Option value="SNAPHH">{"SNAP (Households)"}</Option>
            <Option value="SNAPP">{"SNAP (Persons)"}</Option>
            <Option value="WIC">{"WIC"}</Option>
            <Option divider></Option>
            <Option header>{"Race/Ethnicity"}</Option>
            <Option value="Black">{"Black"}</Option>
            <Option value="Hispanic">{"Hispanic"}</Option>
            <Option divider></Option>
            <Option header>{"Feeding America Model Estimates"}</Option>
            <Option value="FAC">{"Child Rates"}</Option>
            <Option value="FAO">{"Overall Rates"}</Option>
          </Select><br />
          
          <div aria-label="Select Year" className="text-center"
          style={{ margin: "0 auto" }}>
          {<h6><i>Select Year</i></h6>}
            <Label centric
            style={{ cursor: "pointer"}} className='d-flex align-items-center justify-content-center'>
              <Radio style={{ cursor: 'pointer' }}
              value={this.state.radioVal[0]}
              checked={this.state.yearChoro === YearChoro.Y2018}
              disabled={this.state.disable2018}
              onChange={(evt) => {
                this.selectChangeHandler(evt);
                }}/>
              {"2018"}
            </Label>
            <Label centric
            style={{ cursor: "pointer"}} className='d-flex align-items-center justify-content-center'>
              <Radio style={{ cursor: 'pointer' }}
              value={this.state.radioVal[1]}
              checked={this.state.yearChoro === YearChoro.Y2019}
              onChange={(evt) => {
                this.selectChangeHandler(evt);
                }}/>
              {"2019"}
            </Label>
            <Label centric
            style={{ cursor: "pointer"}} className='d-flex align-items-center justify-content-center'>
              <Radio style={{ cursor: 'pointer' }}
              value={this.state.radioVal[2]}
              checked={this.state.yearChoro === YearChoro.Y2020}
              disabled={this.state.disable2020}
              onChange={(evt) => {
                this.selectChangeHandler(evt);
                }}/>
              {"2020"}
            </Label>
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
      </div>
    );
  }
}