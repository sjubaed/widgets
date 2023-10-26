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

  // When a field is chosen from the dropdown, save it to the settings.
  const fieldsListChangeHandler = (evt) => {
    if (evt && evt.length === 1) {
      props.onSettingChange({
        id: props.id,
        config: props.config.set('filterField', evt[0].name)
      });
    }
  }


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
                onChange={onDataSourceChange}
                widgetId={props.id}
                hideDataView={true}
                />
            </div>
          </SettingRow>
        </SettingSection>

        {props.useDataSources && props.useDataSources.length > 0 &&
          <SettingSection
            className="attribute-selector-section"
            title={props.intl.formatMessage({
              id: "chooseAttributeSelectorLabel",
              defaultMessage: "Please choose a filter attribute."
            })}
          >
            <SettingRow>
              <FieldSelector
                useDataSources={props.useDataSources}
                types={supportedFieldTypes}
                onChange={fieldsListChangeHandler}
                selectedFields={Immutable([props.config.filterField])}
                isMultiple={false}
                isSearchInputHidden={false}
                isDataSourceDropDownHidden
                useDropdown
              />
            </SettingRow>
          </SettingSection>
        }
    </div>;
};

export default Setting;
