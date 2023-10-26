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
  featureLayerOnMap: FeatureLayer;
  layerList: LayerList;
  checkedState: boolean;
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
      checkedState: false
    };
  }

  // This function returns a promise which resolves to an object containing the final renderer.
  createRelationshipRenderer = () => {
    const featureLayer = new FeatureLayer({
      portalItem: {
        id: "c15dee83f38946e386a06547a069456f" // portal ID of map
      },
    });

    const params = {
      layer: featureLayer,
      view: this.state.jimuMapView.view,
      field1: {
        field: "labor_force_participation_rate_2019",
      },
      field2: {
        field: "unemp_rate_2019",
      },
      numClasses: 2,
      focus: "HH",
      edgesType: "solid"
    };

    return relationshipRendererCreator.createRenderer(params);
  }


  changeHandler = (evt) => {
    if (evt.target.value && evt.target.value !== "") {  
      if (this.state.jimuMapView) {
        this.setState({
          checkedState: !this.state.checkedState
        });
        const featureLayer = new FeatureLayer({
          portalItem: {
            id: "c15dee83f38946e386a06547a069456f" // portal ID of map
          },
        });
        this.state.jimuMapView.view.when().then(() => {
          return featureLayer.when();
        }).then(this.createRelationshipRenderer).then((response) => {
          featureLayer.renderer = response.renderer;
        });
      }
    }
  }


/*   showLayers = (evt) => {
    const allLayers = this.state.jimuMapView.view.allLayerViews
    if (this.state.jimuMapView){
      this.setState({
        checkedState: true
      })
      const featureLayer = new FeatureLayer({
        layerId: allLayers[1]
      })
      this.state.jimuMapView.view.map.add(featureLayer)
    }
  }

  // This function removes current feature layer and adds new one
  selectChangeHandler = (evt) => {
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
        const allLayers = this.state.jimuMapView.maxLayerIndex
        const featureLayer = new FeatureLayer({
          // url: evt.target.value,
          portalItem: {
            id: "c15dee83f38946e386a06547a069456f" // portal ID of map
          },
          layerId: evt.target.value,
        });
        this.state.allLayersWithMap.operationalItems
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
 */
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
          <p>
            <Label>
            <Checkbox value={"chor"}
            checked={this.state.checkedState}
            onChange={(evt) => {this.changeHandler(evt)}}/>
              {"Bivariate Choropleth"}
              </Label>
          </p>
      </div>
    );
  }
}