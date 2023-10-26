/** @jsx jsx */
import { jsx, Immutable, UseDataSource, JimuFieldType } from "jimu-core";
import { AllWidgetSettingProps } from "jimu-for-builder";
import { DataSourceSelector, AllDataSourceTypes, FieldSelector } from "jimu-ui/advanced/data-source-selector";
import {
  SettingSection,
  SettingRow
} from "jimu-ui/advanced/setting-components";
import { IMConfig } from "../config";
import defaultI18nMessages from "../runtime/translations/default";

export default function (props: AllWidgetSettingProps<IMConfig>) {

  const supportedDsTypes = Immutable([AllDataSourceTypes.FeatureLayer]);
  const supportedFieldTypes = Immutable([JimuFieldType.String]);

  // When the dataSource is chosen, save it to the settings.
  const onDataSourceChange = (useDataSources: UseDataSource[]) => {
    if (!useDataSources) {
      return
    }

    props.onSettingChange({
      id: props.id,
      useDataSources: useDataSources
    });
  }

  // When a field is chosen from the dropdown, save it to the settings.
  const fieldsListChangeHandler = (evt) => {
    if (evt && evt.length === 1) {
      props.onSettingChange({
        id: props.id,
        config: props.config.set('filterField', evt[0].name)
      });
    }
  }

  return (
    <div>
      <div className="widget-setting-get-map-coordinates">

        <SettingSection
          className="data-source-selector-section"
          title={props.intl.formatMessage({
            id: "dataSourceSelectorLabel",
            defaultMessage: defaultI18nMessages.selectDataSource
          })}
        >
          <SettingRow>
            <DataSourceSelector
              types={supportedDsTypes}
              useDataSourcesEnabled
              mustUseDataSource
              useDataSources={props.useDataSources}
              onChange={onDataSourceChange} widgetId={props.id}
              hideDataView={true}
            />

          </SettingRow>
        </SettingSection>

        {props.useDataSources && props.useDataSources.length > 0 &&
          <SettingSection
            className="attribute-selector-section"
            title={props.intl.formatMessage({
              id: "chooseAttributeSelectorLabel",
              defaultMessage: defaultI18nMessages.chooseAttribute
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

      </div>
    </div>
  );
};