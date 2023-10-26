/** @jsx jsx */
import { React, AllWidgetProps, jsx, DataSourceComponent, SqlQueryParams, DataSourceManager, QueriableDataSource, DataSource } from 'jimu-core'
import { Label, Radio, Select, DropdownButton, defaultMessages as jimuUIMessages, Dropdown, DropdownMenu, Option } from 'jimu-ui'

interface State {
  FB_Type: FBtype
}

enum FBtype {
  FB = 'FB',
  DC = 'DC',
  All = 'All'
}

export default class Widget extends React.PureComponent<AllWidgetProps<unknown>, State> {
  setState(arg0: { FB_Type: any }) {
    throw new Error('Method not implemented.')
  }
  props: any
  state: { FB_Type: FBtype }
  constructor (props) {
    super(props)

    this.state = {
      FB_Type: FBtype.All
    }
  }

  componentWillUnmount () {
    const dataSourceId = this.props.useDataSources?.[0]?.dataSourceId
    const dataSource = dataSourceId && DataSourceManager.getInstance().getDataSource(dataSourceId) as QueriableDataSource
    if (dataSource) {
      // Reset query in data source
      dataSource.updateQueryParams(this.getQuery(FBtype.All), this.props.id)
    }
  }

  getQuery = (FB_Type: FBtype): SqlQueryParams => {
    return {
      where: this.getFilter(FB_Type)
    }
  }

  getFilter = (FB_Type: FBtype): string => {
    if (FB_Type && FB_Type !== FBtype.All) {
      return '(Type LIKE `%${FB_Type}%`)'
    }
    return '(1=1)'
  }

  onRadioButtonChange = e => {
    const FB_Type = e.target.value
    // Update radio button selected status
    this.setState({ FB_Type })

    const dataSourceId = this.props.useDataSources?.[0]?.dataSourceId
    const dataSource = dataSourceId && DataSourceManager.getInstance().getDataSource(dataSourceId) as QueriableDataSource
    if (dataSource) {
      // Update query in data source
      dataSource.updateQueryParams(this.getQuery(FB_Type), this.props.id)
    }
  }

  onDataSourceCreated = (ds: DataSource) => {
    if (this.state.FB_Type && ds) {
      const dataSource = ds as QueriableDataSource
      // Update query in data source
      dataSource.updateQueryParams(this.getQuery(this.state.FB_Type), this.props.id)
    }
  }

  render () {
    return (
      <div className='widget-demo jimu-widget m-2'>
        <DataSourceComponent // Create data source which is use by current widget
          useDataSource={this.props.useDataSources?.[0]}
          widgetId={this.props.id}
          onDataSourceCreated={this.onDataSourceCreated}
        />
        <div role='radiogroup' aria-label={"Choose Food Bank"}>
          <b>{this.props.intl.formatMessage({ id: 'selectType', defaultMessage: 'Select:'})}</b><br />
          <Label style={{ cursor: 'pointer' }} className='d-flex align-items-center'>
            <Radio
              style={{ cursor: 'pointer' }} value={FBtype.All} checked={this.state.FB_Type === FBtype.All} onChange={this.onRadioButtonChange}
            /> {this.props.intl.formatMessage({ id: 'All' })}
          </Label>
          <Label style={{ cursor: 'pointer' }} className='d-flex align-items-center'>
            <Radio
              style={{ cursor: 'pointer' }} value={FBtype.FB} checked={this.state.FB_Type === FBtype.FB} onChange={this.onRadioButtonChange}
            /> {this.props.intl.formatMessage({ id: 'Food Banks Only'})}
          </Label>
          <Label style={{ cursor: 'pointer' }} className='d-flex align-items-center'>
            <Radio
              style={{ cursor: 'pointer' }} value={FBtype.DC} checked={this.state.FB_Type === FBtype.DC} onChange={this.onRadioButtonChange}
            /> {this.props.intl.formatMessage({ id: 'Distribution Centers Only'})}
          </Label>
          <p />
        </div>
      </div>

/*
      <div>
        <Select placeholder='Select Indicator' onChange={this.loadLayerList}>
          <Option value = {FBtype.FB}>Food Banks</Option>
          <Option value = {FBtype.DC}>Distribution Centers</Option>
        </Select>
        <Select placeholder='Select Year' onChange={this.loadFeatureLayer}>
          <Option value = {"2018"}>2018</Option>
          <Option value = {"2019"}>2019</Option>
        </Select>
      </div>
*/
    )
  }
}