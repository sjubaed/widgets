/** @jsx jsx */
import { React, jsx } from "jimu-core";
import { AllWidgetSettingProps } from "jimu-for-builder";
import {
  MapWidgetSelector,
  SettingRow,
  SettingSection,
} from "jimu-ui/advanced/setting-components";
import defaultI18nMessages from "../runtime/translations/default";
import { IMConfig } from "../config";

interface IState {
  layerTextareaValue: string;
}

export default class Setting extends React.PureComponent<
  AllWidgetSettingProps<IMConfig>,
  IState
> {
  constructor(props) {
    super(props);

    console.log(
      "TYPEOF undefined",
      typeof this.props.config?.layerUrls === undefined
    );

    this.state = {
      layerTextareaValue:
        this.props.config?.layerUrls === undefined
          ? ""
          : this.props.config?.layerUrls.join("\n"),
    };
  }

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
            <MapWidgetSelector
              onSelect={this.onMapSelected}
              useMapWidgetIds={this.props.useMapWidgetIds}
            />
          </SettingRow>
        </SettingSection>

        <SettingSection
          title={this.props.intl.formatMessage({
            id: "layers",
            defaultMessage: defaultI18nMessages.layers,
          })}
        >
          <SettingRow>
            <textarea
              className="w-100 p-1"
              style={{ whiteSpace: "nowrap", minHeight: "100px" }}
              value={this.state.layerTextareaValue}
              onChange={this.onTextChange}
            ></textarea>
          </SettingRow>
        </SettingSection>
      </div>
    );
  }
}