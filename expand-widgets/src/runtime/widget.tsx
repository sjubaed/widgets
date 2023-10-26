/** @jsx jsx */
import { React, AllWidgetProps, jsx } from 'jimu-core';
import { IMConfig } from '../config';
import { Button } from "jimu-ui";
import Expand from "esri/widgets/Expand";

export default class Widget extends React.PureComponent<AllWidgetProps<IMConfig>, any> {
  constructor (props) {
    super(props)

    this.state = {}
  }

  expandWidget = () => {
    this.state.jimuMapView.view.ui.add(
      new Expand({
        view: this.state.jimuMapView.view,
        content: document.getElementById("choro-toggle-visible-new"),
        expanded: true
      }),
      "top-right"
    );
  }

  render () {
    return (
      <div className="widget-demo jimu-widget m-2">
        <p>Simple Widget</p>
        <p>exampleConfigProperty: {this.props.config.exampleConfigProperty}</p>
        <Button onClick={() => {
          this.expandWidget();
          }}>{"Move"}</Button>
      </div>
    )
  }
}
