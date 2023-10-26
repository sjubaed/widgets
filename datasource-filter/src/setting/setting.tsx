/** @jsx jsx */
import { React, jsx, DataSourceTypes, Immutable, UseDataSource } from 'jimu-core'
import { AllWidgetSettingProps } from 'jimu-for-builder'
import { DataSourceSelector } from 'jimu-ui/advanced/data-source-selector'

export default class Setting extends React.PureComponent<AllWidgetSettingProps<unknown>, unknown> {
  supportedTypes = Immutable([DataSourceTypes.FeatureLayer])

  onDataSourceChange = (useDataSources: UseDataSource[]) => {
    this.props.onSettingChange({
      id: this.props.id,
      useDataSources: useDataSources
    })
  }
    props: any

  render () {
    return (
      <div className='widget-setting-demo p-3'>
        <DataSourceSelector
          mustUseDataSource
          types={this.supportedTypes}
          useDataSources={this.props.useDataSources}
          onChange={this.onDataSourceChange}
          widgetId={this.props.id}
        />
      </div>
    )
  }
}