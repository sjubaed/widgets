/** @jsx jsx */
/*
import { React, AllWidgetProps, jsx, DataSourceComponent, SqlQueryParams, DataSourceManager, QueriableDataSource, DataSource } from 'jimu-core'
import { Label, Radio, Select, DropdownButton, defaultMessages as jimuUIMessages, Dropdown, DropdownMenu, Option } from 'jimu-ui'
*/
import { AllWidgetProps, jsx, FeatureLayerDataSource, SqlQueryParams, DataSourceManager } from "jimu-core";
import { IMConfig } from "../config";
import { TextInput, WidgetPlaceholder } from 'jimu-ui';
/**const alertIcon = require('./assets/alert.svg');**/


import defaultMessages from "./translations/default";

export default function (props: AllWidgetProps<IMConfig>) {

  const textInputChangeHandler = (evt) => {
    if (props.useDataSources.length > 0) {
      // First get the DataSourceManager instance
      const dsManager = DataSourceManager.getInstance();

      // Get the data source using useDataSource.dataSourceId
      const useDataSource = props.useDataSources[0];
      const ds: FeatureLayerDataSource = dsManager.getDataSource(useDataSource.dataSourceId) as FeatureLayerDataSource;

      // Build the queryParams, with the configured filterField and the value
      // that has been typed into the TextInput by the user
      const queryParams: SqlQueryParams = {
        where: `${props.config.filterField} LIKE '%${evt.target.value}%'`
      };

      // Filter the data source using updateQueryParams function.
      ds.updateQueryParams(queryParams, props.id);
    }
  }

  // By default, if we have no filterField selected, show a placeholder:
  let mainContent = <WidgetPlaceholder icon={""} message={defaultMessages.chooseAttribute} />;

  if (props.config.filterField) {
    // If fieldField is selected, show the Text Input box to allow filtering.
    const placeholderText = `${defaultMessages.filterLayer} on ${props.config.filterField} attribute`
    mainContent = <p>
      <TextInput placeholder={placeholderText} onChange={(e) => { textInputChangeHandler(e); }} />
    </p>;
  };

  return (
    <div className="widget-get-map-coordinates jimu-widget p-2">
      {mainContent}
    </div>
  );
}