/*import { IMConfig, React, jsx } from 'jimu-core';
import { BaseWidgetSetting, AllWidgetSettingProps} from 'jimu-for-builder';
import { JimuMapViewSelector, SettingSection } from 'jimu-ui/advanced/setting-components';

export default class Setting extends BaseWidgetSetting<AllWidgetSettingProps<any>, any> {

    onMapWidgetSelected = (useMapWidgetIds: string[]) => {
        this.props.onSettingChange({
            id: this.props.id,
            useMapWidgetIds: useMapWidgetIds
        });
    };
    render () {
        return <div className="widget-setting-demo">
        <SettingSection
            className="map-selector-selection"
            title={"Select Map Widget"}
            >
            <JimuMapViewSelector
                useMapWidgetIds={this.props.useMapWidgetIds}
                onSelect={this.onMapWidgetSelected}
            />
        </SettingSection>
        </div>;
    }

}*/
import { IMConfig, React, jsx, DataSourceTypes, Immutable, UseDataSource, JimuFieldType } from 'jimu-core';
import { BaseWidgetSetting, AllWidgetSettingProps} from 'jimu-for-builder';
import { JimuMapViewSelector, SettingSection, SettingRow, MapWidgetSelector } from 'jimu-ui/advanced/setting-components';
import { DataSourceSelector, AllDataSourceTypes, FieldSelector } from 'jimu-ui/advanced/data-source-selector'

const Setting = (props: AllWidgetSettingProps<any>) => {

  const onMapWidgetSelected = (useMapWidgetIds: string[]) => {
      props.onSettingChange({
          id: props.id,
          useMapWidgetIds: useMapWidgetIds
      });
  };

  const supportedTypes = Immutable([DataSourceTypes.FeatureLayer]);
  const supportedFieldTypes = Immutable([JimuFieldType.String]);

  const onDataSourceChange = (useDataSources: UseDataSource[]) => {
    props.onSettingChange({
      id: props.id,
      useDataSources: useDataSources
    })
  };






    return <div className="widget-setting-demo">
        <SettingSection
            className="map-selector-selection"
            title={"Select Map Widget"}
        >
        <MapWidgetSelector
            useMapWidgetIds={props.useMapWidgetIds}
            onSelect={onMapWidgetSelected}
        />
        </SettingSection>

        <SettingSection
            className="attribute-selector-section"
            title={"Please choose a data source."}>
          <SettingRow>
            <div className='widget-setting-demo p-3'>
                <DataSourceSelector
                mustUseDataSource
                useDataSourcesEnabled
                types={supportedTypes}
                useDataSources={props.useDataSources}
                isMultiple={true}
                onChange={onDataSourceChange}
                widgetId={props.id}
                hideDataView={true}
                />
            </div>
          </SettingRow>
        </SettingSection>

    </div>;
};

export default Setting;
