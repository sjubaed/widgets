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
import { Radio, Label, Checkbox } from "jimu-ui";
import LayerList from "esri/widgets/LayerList";
import relationshipRendererCreator from "esri/smartMapping/renderers/relationship"
import MapView from "esri/views/MapView";
// import WebMap from "esri/WebMap";
// import Query from "esri/rest/support/Query";
// import query from "esri/rest/query";
import Layer from "esri/layers/Layer";
import View from "esri/views/View";
import { layer } from "esri/views/3d/support/LayerPerformanceInfo";

interface IState {
  jimuMapView: JimuMapView;
  checkedFB: boolean;
  checkedCP: boolean;
  checkedFO: boolean;
  checkedSNAP: boolean;
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
      checkedFB: false,
      checkedCP: false,
      checkedFO: false,
      checkedSNAP: false
    };
  }

  changeHandler = (evt) => {
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
          <p className="d-flex flex-column bd-highlight mb-3">
          
          <div style={{ margin: "0 auto" }}>
          {/* {defaultMessages.viewLayer}:<br /> */}
            <Label centric
            style={{ cursor: "pointer"}} className='d-flex align-items-center' aria-label="FB-DC">
              <Checkbox style={{ cursor: 'pointer' }}
              value={"Food Bank Council of Michigan"}
              checked={this.state.checkedFB}
              onChange={(evt) => {
                this.changeHandler(evt);
              }}/>
              {"Food Banks and Distribution Centers"}
            </Label> 

            <Label centric
            style={{ cursor: "pointer"}} className='d-flex align-items-center' aria-label="MI-CP">
              <Checkbox style={{ cursor: 'pointer' }}
              value={"MI Bridges Community Partners"}
              checked={this.state.checkedCP}
              onChange={(evt) => {
                this.changeHandler(evt);
              }}/>
              {"MI Bridges Community Partners"}
            </Label>

            <Label centric
            style={{ cursor: "pointer"}} className='d-flex align-items-center' aria-label="MDHHS">
              <Checkbox style={{ cursor: 'pointer' }}
              value={"MDHHS Field Offices"}
              checked={this.state.checkedFO}
              onChange={(evt) => {
                this.changeHandler(evt);
              }}/>
              {"MDHHS Field Offices"}
            </Label>

            <Label centric
            style={{ cursor: "pointer"}} className='d-flex align-items-center' aria-label="SNAP">
              <Checkbox style={{ cursor: 'pointer' }}
              value={"Historical SNAP Store Locations"}
              checked={this.state.checkedSNAP}
              onChange={(evt) => {
                this.changeHandler(evt);
              }}/>
              {"Historical SNAP Store Locations"}
            </Label>
            </div>
          </p>
      </div>
    );
  }
}