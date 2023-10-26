import { React, AllWidgetProps, FormattedMessage } from 'jimu-core';
import { JimuMapViewComponent, JimuMapView } from 'jimu-arcgis';

import Legend from "esri/widgets/Legend";
import LegendVM from "esri/widgets/Legend/LegendViewModel";
import ActiveLayerInfo from "esri/widgets/Legend/support/ActiveLayerInfo";

import defaultMessages from "./translations/default";

const { useState, useRef, useEffect } = React;

export default function ({
  useMapWidgetIds
}: AllWidgetProps<{}>) {
  const apiWidgetContainer = useRef<HTMLDivElement>();

  const [layerInfo, setLayerInfo] = useState<ActiveLayerInfo>(null);
  const [jimuMapView, setJimuMapView] = useState<JimuMapView>(null);
  const [legendWidget, setLegendWidget] = useState<Legend>(null)

  useEffect(() => {
    if (jimuMapView && apiWidgetContainer.current) {
      if (!legendWidget) {

        // since the widget replaces the container, we must create a new DOM node
        // so when we destroy we will not remove the "ref" DOM node
        const container = document.createElement("div");
        apiWidgetContainer.current.appendChild(container);

        const legend = new Legend({
          view: jimuMapView.view,
          container: container
        });
        setLegendWidget(legend);
      }

      const vm = new LegendVM({
        view: jimuMapView.view,
        layerInfos: [{layerInfo}]
      });

      setLayerInfo(vm.activeLayerInfos.getItemAt(0));
    }

    return () => {
      if (legendWidget) {
        legendWidget.destroy();
        setLegendWidget(null);
      }
    }
  }, [apiWidgetContainer, jimuMapView])

  const onActiveViewChange = (jmv: JimuMapView) => {
    if (jimuMapView && legendWidget) {
      // we have a "previous" map where we added the widget
      // (ex: case where two Maps in single Experience page and user is switching
      // between them in the Settings) - we must destroy the old widget in this case.
      legendWidget.destroy();
      setLegendWidget(null);
    }

    if (jmv) {
      setJimuMapView(jmv);
    }
  }

  const isConfigured = useMapWidgetIds && useMapWidgetIds.length === 1;

  return <div className="widget-use-map-view" style={{ width: '100%', height: '100%', overflow: 'hidden' }}>
    {!isConfigured && <h3><FormattedMessage id="pleaseSelectMap" defaultMessage={defaultMessages.pleaseSelectAMap} /></h3>}
    {/* <h3>
      <FormattedMessage id="widgetDemonstrates" defaultMessage={defaultMessages.widgetDemonstrates} />
    </h3> */}

    <JimuMapViewComponent
      useMapWidgetId={useMapWidgetIds?.[0]}
      onActiveViewChange={onActiveViewChange}
    />

    {/* <hr />
    <h4><FormattedMessage id="thisUsesViewModel" defaultMessage={defaultMessages.thisUsesViewModel} /></h4>
    <div>
      <FormattedMessage id="layerTitle" defaultMessage={defaultMessages.layerTitle} />: {layerInfo && layerInfo.title}
    </div>

    <hr /> */}

    {/* <h4><FormattedMessage id="thisShowsLegendWidget" defaultMessage={defaultMessages.thisShowsLegendWidget} /></h4> */}
    <div ref={apiWidgetContainer} />
  </div>;
}