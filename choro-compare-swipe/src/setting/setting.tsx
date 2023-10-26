/** @jsx jsx */
import { React, jsx, DataSourceManager } from "jimu-core";
import { AllWidgetSettingProps } from "jimu-for-builder";
import {
  JimuMapViewSelector,
  JimuLayerViewSelector,
  MapWidgetSelector,
  SettingRow,
  SettingSection,
} from "jimu-ui/advanced/setting-components";
import defaultI18nMessages from "../runtime/translations/default";
import { IMConfig } from "../config";
import { IMJimuLayerViewInfo } from "jimu-arcgis";

interface IState {
  /*layerTextareaValue: string;
  allLayersOnMap: LayerList;*/
}

export default class Setting extends React.PureComponent<
  AllWidgetSettingProps<IMConfig>,
  IState
> {
  dsManager = DataSourceManager.getInstance();
  
  constructor(props) {
    super(props);

    this.state = {};
  }
/*    console.log(
      "TYPEOF undefined",
      typeof this.props.config?.layerUrls === undefined,
      typeof this.state.allLayersOnMap.operationalItems === undefined
    );

    this.state = {
      layerTextareaValue:
        this.props.config?.layerUrls === undefined
          ? ""
          : this.props.config?.layerUrls.join("\n"),
      allLayersOnMap: undefined
    };
*/
onAllowOverlapPropertyChange = (evt: React.FormEvent<HTMLInputElement>) => {
  this.props.onSettingChange({
    id: this.props.id,
    config: this.props.config.set("allowOverlap", evt.currentTarget.checked),
  });
};

onMapWidgetSelected = (useMapWidgetIds: string[]) => {
  this.props.onSettingChange({
    id: this.props.id,
    useMapWidgetIds: useMapWidgetIds,
  });
};

onLayerSelected = (jimuLayerViewInfo: IMJimuLayerViewInfo) => {
  console.log("layer selected", jimuLayerViewInfo);
  const dataSourceId = jimuLayerViewInfo
    ? jimuLayerViewInfo.dataSourceId
    : null;
  const dataSource: any = this.dsManager.getDataSource(dataSourceId);
  const layer = dataSource ? dataSource.layer : null;
  const layerId = layer ? layer.id : null;
  this.props.onSettingChange({
    id: this.props.id,
    config: this.props.config
      .set("layerViewInfo", jimuLayerViewInfo)
      .set("layerId", layerId),
  });
};

onSnappingDistanceChanged = (event: number) => {
  this.setState({ snappingDistanceInput: event });
  this.props.onSettingChange({
    id: this.props.id,
    config: this.props.config.set("snappingDistance", event),
  });
};

onMaxAreaChanged = (event: number) => {
  this.setState({ maxAreaInput: event });
  this.props.onSettingChange({
    id: this.props.id,
    config: this.props.config.set("maxArea", event),
  });
};

  onMapSelected = (useMapWidgetIds: string[]) => {
    this.props.onSettingChange({
      id: this.props.id,
      useMapWidgetIds: useMapWidgetIds,
    });
  };

  onTextChange = (event) => {
    this.setState({ layerTextareaValue: event.target.value });

    this.props.onSettingChange({
      id: this.props.id,
      config: this.props.config.set(
        "layerUrls",
        event.target.value.split("\n")
      ),
    });
  };

  render() {
    return (
      <div className="view-layers-toggle-setting">
        <SettingSection
          title={this.props.intl.formatMessage({
            id: "selectedMapLabel",
            defaultMessage: defaultI18nMessages.selectedMap,
          })}
        >
          <SettingRow>
            <JimuMapViewSelector
              onSelect={this.onMapWidgetSelected}
              useMapWidgetIds={this.props.useMapWidgetIds}
            />
          </SettingRow>
        </SettingSection>

        {/* <SettingSection
          title={this.props.intl.formatMessage({
            id: "layers",
            defaultMessage: defaultI18nMessages.layerId,
          })}
        >
          <SettingRow>
            <div className="w-100">
                <JimuLayerViewSelector
                  useMapWidgetIds={this.props.useMapWidgetIds}
                  onSelect={this.onLayerSelected}
                  jimuLayerViewInfo={
                    this.props.config && this.props.config.layerViewInfo
                  }
                ></JimuLayerViewSelector>
              </div>
          </SettingRow>
        </SettingSection> */}
      </div>
    );
  }
}