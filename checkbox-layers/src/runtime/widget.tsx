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
import { Radio, Label, Select, Option, Checkbox } from "jimu-ui";
import LayerList from "esri/widgets/LayerList";
import Query from "esri/rest/support/Query";
import query from "esri/rest/query";
import Layer from "esri/layers/Layer";

interface IState {
  jimuMapView: JimuMapView;
  featureLayerOnMapFB: FeatureLayer;
  featureLayerOnMapCP: FeatureLayer;
  featureLayerOnMapFO: FeatureLayer;
  featureLayerOnMapSNAP: FeatureLayer;
  pointLayer: LayerLabel;
  checkedFB: boolean;
  checkedCP: boolean;
  checkedFO: boolean;
  checkedSNAP: boolean;
}

enum LayerLabel {
  FB = "FB", // Food Banks
  CP = "CP", // Community Partners
  FO = "FO", // Field Offices
  SNAP = "SNAP", // SNAP Store locations
  None = "None"
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
      featureLayerOnMapFB: undefined,
      featureLayerOnMapCP: undefined,
      featureLayerOnMapFO: undefined,
      featureLayerOnMapSNAP: undefined,
      pointLayer: LayerLabel.None,
      checkedFB: false,
      checkedCP: false,
      checkedFO: false,
      checkedSNAP: false
    };
  }

  // OLD FUNCTION
  selectChangeHandler = (evt) => {
    if (evt.target.value === "0") {
      if (this.state.checkedFB === (false)) {
        this.setState({
          pointLayer: LayerLabel.FB,
          checkedFB: true
        })  
      }
      else {
        this.setState({
          pointLayer: LayerLabel.None,
          checkedFB: false
        })
      }
    }

    if (evt.target.value === "1") {
      if (this.state.checkedCP === (false)) {
        this.setState({
          pointLayer: LayerLabel.CP,
          checkedCP: true
        })  
      }
      else {
        this.setState({
          pointLayer: LayerLabel.None,
          checkedCP: false
        })
      }
    }


    if (this.state.jimuMapView) {
      if ((this.state.checkedFB === (false)) || (this.state.checkedCP === (false))) {
        // Remove the old Feature Layer
        this.state.jimuMapView.view.map.remove(this.state.featureLayerOnMapFB);
        this.setState({
          featureLayerOnMapFB: undefined,
        });
      }

      if (evt.target.value && evt.target.value !== "" && (this.state.checkedFB === (true) || this.state.checkedCP === (true))) {
        // Create and add the new Feature Layer
        const featureLayer = new FeatureLayer({
          // url: evt.target.value,
          portalItem: {
            id: "c902f9ce643a46ee8640b4bc7590dc8a" // portal ID of map
          },
          layerId: evt.target.value,
        });
        /*this.state.allLayersWithMap.operationalItems*/
        this.state.jimuMapView.view.map.add(featureLayer);
        this.setState({
          featureLayerOnMapFB: featureLayer,
        });
      }
    } else {
      console.error(
        "You probably need to choose your map in the settings panel."
      );
    }
  };

  selectChangeHandlerFB = (evt) => {
    this.setState({
      checkedFB: !this.state.checkedFB
    })

    if (this.state.jimuMapView) {
      if (this.state.checkedFB === (true)) {
        // Remove the old Feature Layer
        this.state.jimuMapView.view.map.remove(this.state.featureLayerOnMapFB);
        this.setState({
          featureLayerOnMapFB: undefined,
        });
      }

      if (evt.target.value && evt.target.value !== "" && this.state.checkedFB === (false)) {
        // Create and add the new Feature Layer
        const featureLayer = new FeatureLayer({
          // url: evt.target.value,
          portalItem: {
            id: "c902f9ce643a46ee8640b4bc7590dc8a" // portal ID of map
          },
          layerId: evt.target.value,
        });
        /*this.state.allLayersWithMap.operationalItems*/
        this.state.jimuMapView.view.map.add(featureLayer);
        this.setState({
          featureLayerOnMapFB: featureLayer,
        });
      }
    } else {
      console.error(
        "You probably need to choose your map in the settings panel."
      );
    }
  };

  selectChangeHandlerCP = (evt) => {
    this.setState({
      checkedCP: !this.state.checkedCP
    })

    if (this.state.jimuMapView) {
      if (this.state.checkedCP === (true)) {
        // Remove the old Feature Layer
        this.state.jimuMapView.view.map.remove(this.state.featureLayerOnMapCP);
        this.setState({
          featureLayerOnMapCP: undefined,
        });
      }

      if (evt.target.value && evt.target.value !== "" && this.state.checkedCP === (false)) {
        // Create and add the new Feature Layer
        const featureLayer = new FeatureLayer({
          // url: evt.target.value,
          portalItem: {
            id: "c902f9ce643a46ee8640b4bc7590dc8a" // portal ID of map
          },
          layerId: evt.target.value,
        });
        /*this.state.allLayersWithMap.operationalItems*/
        this.state.jimuMapView.view.map.add(featureLayer);
        this.setState({
          featureLayerOnMapCP: featureLayer,
        });
      }
    } else {
      console.error(
        "You probably need to choose your map in the settings panel."
      );
    }
  };

  selectChangeHandlerFO = (evt) => {
    this.setState({
      checkedFO: !this.state.checkedFO
    })

    if (this.state.jimuMapView) {
      if (this.state.checkedFO === (true)) {
        // Remove the old Feature Layer
        this.state.jimuMapView.view.map.remove(this.state.featureLayerOnMapFO);
        this.setState({
          featureLayerOnMapFO: undefined,
        });
      }

      if (evt.target.value && evt.target.value !== "" && this.state.checkedFO === (false)) {
        // Create and add the new Feature Layer
        const featureLayer = new FeatureLayer({
          // url: evt.target.value,
          portalItem: {
            id: "c902f9ce643a46ee8640b4bc7590dc8a" // portal ID of map
          },
          layerId: evt.target.value,
        });
        /*this.state.allLayersWithMap.operationalItems*/
        this.state.jimuMapView.view.map.add(featureLayer);
        this.setState({
          featureLayerOnMapFO: featureLayer,
        });
      }
    } else {
      console.error(
        "You probably need to choose your map in the settings panel."
      );
    }
  };

  selectChangeHandlerSNAP = (evt) => {
    this.setState({
      checkedSNAP: !this.state.checkedSNAP
    })

    if (this.state.jimuMapView) {
      if (this.state.checkedSNAP === (true)) {
        // Remove the old Feature Layer
        this.state.jimuMapView.view.map.remove(this.state.featureLayerOnMapSNAP);
        this.setState({
          featureLayerOnMapSNAP: undefined,
        });
      }

      if (evt.target.value && evt.target.value !== "" && this.state.checkedSNAP === (false)) {
        // Create and add the new Feature Layer
        const featureLayer = new FeatureLayer({
          // url: evt.target.value,
          portalItem: {
            id: "c902f9ce643a46ee8640b4bc7590dc8a" // portal ID of map
          },
          layerId: evt.target.value,
        });
        /*this.state.allLayersWithMap.operationalItems*/
        this.state.jimuMapView.view.map.add(featureLayer);
        this.setState({
          featureLayerOnMapSNAP: featureLayer,
        });
      }
    } else {
      console.error(
        "You probably need to choose your map in the settings panel."
      );
    }
  };


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
        className="widget-checkbox-layers jimu-widget"
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
              value={"0"}
              checked={this.state.checkedFB}
              onChange={(evt) => {
                this.selectChangeHandlerFB(evt);
              }}/>
              {"Food Banks and Distribution Centers"}
            </Label> 

            <Label centric
            style={{ cursor: "pointer"}} className='d-flex align-items-center' aria-label="MI-CP">
              <Checkbox style={{ cursor: 'pointer' }}
              value={"1"}
              checked={this.state.checkedCP}
              onChange={(evt) => {
                this.selectChangeHandlerCP(evt);
              }}/>
              {"MI Bridges Community Partners"}
            </Label>

            <Label centric
            style={{ cursor: "pointer"}} className='d-flex align-items-center' aria-label="MDHHS">
              <Checkbox style={{ cursor: 'pointer' }}
              value={"2"}
              checked={this.state.checkedFO}
              onChange={(evt) => {
                this.selectChangeHandlerFO(evt);
              }}/>
              {"MDHHS Field Offices"}
            </Label>

            <Label centric
            style={{ cursor: "pointer"}} className='d-flex align-items-center' aria-label="SNAP">
              <Checkbox style={{ cursor: 'pointer' }}
              value={"3"}
              checked={this.state.checkedSNAP}
              onChange={(evt) => {
                this.selectChangeHandlerSNAP(evt);
              }}/>
              {"SNAP Store Locations"}
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