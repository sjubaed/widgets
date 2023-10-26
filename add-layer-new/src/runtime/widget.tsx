import { React, type AllWidgetProps } from 'jimu-core'
import { type IMConfig } from '../config'
import { JimuMapViewComponent, JimuMapView } from 'jimu-arcgis'
import FeatureLayer from "esri/layers/FeatureLayer";


const { useState } = React


const Widget = (props: AllWidgetProps<any>) => {
  const [jimuMapView, setJimuMapView] = useState<JimuMapView>()

  /** ADD: **/
  const activeViewChangeHandler = (jmv: JimuMapView) => {
    if (jmv) {
      setJimuMapView(jmv);
    }
  };


  const formSubmit = (evt) => {
    evt.preventDefault();
    // More here soon

    // *** ADD ***
    // create a new FeatureLayer
    const layer = new FeatureLayer({
      url: "https://services1.arcgis.com/4ezfu5dIwH83BUNL/arcgis/rest/services/MI_FI_Map_WFL1/FeatureServer"
    });

    // Add the layer to the map (accessed through the Experience Builder JimuMapView data source)
    jimuMapView.view.map.add(layer);
  };

  return (
    <div className="widget-demo jimu-widget m-2">
    {props.useMapWidgetIds && props.useMapWidgetIds.length === 1 && (
      <JimuMapViewComponent useMapWidgetId={props.useMapWidgetIds?.[0]} onActiveViewChange={activeViewChangeHandler} />
    )}

    {/* *** ADD: *** */}
    <form onSubmit={formSubmit}>
      <div>
        <button>Add Layer</button>
      </div>
    </form>
    </div>
  )
}

export default Widget
