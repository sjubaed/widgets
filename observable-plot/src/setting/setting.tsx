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
import { IMConfig, React, jsx, DataSourceTypes, Immutable, UseDataSource, JimuFieldType, IMFieldSchema } from 'jimu-core';
import { BaseWidgetSetting, AllWidgetSettingProps} from 'jimu-for-builder';
import { JimuMapViewSelector, SettingSection, SettingRow, MapWidgetSelector } from 'jimu-ui/advanced/setting-components';
import { DataSourceSelector, AllDataSourceTypes, FieldSelector } from 'jimu-ui/advanced/data-source-selector'
import { useState } from 'react';

const Setting = (props: AllWidgetSettingProps<any>) => {

  const [selectedFields, setSelectedFields] = useState({}); // initialize state

  const onMapWidgetSelected = (useMapWidgetIds: string[]) => {
      props.onSettingChange({
          id: props.id,
          useMapWidgetIds: useMapWidgetIds
      });
  };

  const supportedTypes = Immutable([DataSourceTypes.FeatureLayer]);
  const supportedFieldTypes = Immutable([JimuFieldType.Number]);

  const onDataSourceChange = (useDataSources: UseDataSource[]) => {
    props.onSettingChange({
      id: props.id,
      useDataSources: useDataSources
    })
  };

  // const onDataSourceChange2 = (useDataSources2: UseDataSource[]) => {
  //   props.onSettingChange({
  //     id: props.id,
  //     useDataSources: useDataSources2
  //   })
  // };

  // const onFieldChange = (attributeName, allSelectedFields: IMFieldSchema, ds: DataSource) => {
  //   const fieldName = allSelectedFields[0].jimuName;

  //   setSelectedFields(prevState => {
  //     const updatedFieldsForDataSource = {
  //       ...prevState.selectedFields[ds.id],
  //       [attributeName]: fieldName
  //     };

  //     return {
  //       selectedFields: {
  //         ...prevState.selectedFields,
  //         [ds.id]: updatedFieldsForDataSource
  //       }
  //     };
  //   }, () => {
  //     props.onSettingChange({
  //       id: props.id,
  //       useDataSourcesL [...props.useDataSources].map(item =>
  //         item.dataSourceId === ds.id ? { ...item, ...{ fields: allSelectedFields.map(f => f.jimuName) } }
  //         : item )
  //     });
  //   });
  // };

  // When a field is chosen from the dropdown, save it to the settings.
  // const fieldsListChangeHandler = (evt, ds: DataSource) => {
  //   if (evt && evt.length === 1) {
  //     props.onSettingChange({
  //       id: props.id,
  //       config: props.config.set('filterField', evt[0].name)
  //     });
  //   }

  //   setSelectedFields(ds.id)
  // }

  // const fieldsListChangeHandler2 = (evt) => {
  //   if (evt && evt.length === 1) {
  //     props.onSettingChange({
  //       id: props.id,
  //       config: props.config.set('filterField2', evt[0].name)
  //     });
  //   }
  // }


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
//                isMultipleDataView
                types={supportedTypes}
                useDataSources={props.useDataSources}
                onChange={onDataSourceChange}
                widgetId={props.id}
                hideDataView={false} // allows for selected features, i.e. data for single county
                isMultiple={false}
                />
            </div>
          </SettingRow>
{/*          <SettingRow>
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
*/}        </SettingSection>

{/*        <SettingSection
            className="attribute-selector-section"
            title={"Please choose a data source 2."}>
          <SettingRow>
            <div className='widget-setting-demo p-3'>
                <DataSourceSelector
                mustUseDataSource
                useDataSourcesEnabled
                types={supportedTypes}
                useDataSources={props.useDataSources}
                onChange={onDataSourceChange2}
                widgetId={props.id}
                hideDataView={true}
                />
            </div>
          </SettingRow>
        </SettingSection>
*/}
    </div>;
};

export default Setting;
