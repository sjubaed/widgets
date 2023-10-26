import { React, type AllWidgetProps, jsx, DataSourceComponent, SqlQueryParams, DataSourceManager, QueriableDataSource, DataSource } from 'jimu-core';
import defaultMessages from './translations/default';
import { Button, Dropdown, DropdownMenu, DropdownButton, DropdownItem, MultiSelect, Label, Checkbox, CollapsablePanel } from 'jimu-ui';
import { type IMConfig } from '../config';
import { JimuMapView, JimuMapViewComponent } from "jimu-arcgis";
import { MapDataSourceImpl } from 'jimu-arcgis/arcgis-data-source';
import { useState } from 'react';
import "./styles.css";
import { Button1 } from './components/Button';



function App() {
  const [showButton, setShowButton1] = useState(true);
  const [showButton2, setShowButton2] = useState(true);



  const toggleButton = () => {
    setShowButton1(!showButton);
  };

  const toggleButton2 = () => {
    setShowButton2(!showButton2);
  }

  return (
    <div style={{ display: "flex" }}>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <Button1 onClick={toggleButton} text="Food Bank Council of Michigan" />
        <Button1 text="MI Bridges Community Partners" />
        <Button1 text="MDHHS Field Offices" />
        <Button1 onClick={toggleButton2} text="Historical SNAP Store Locations" />
      </div>
      {!showButton && <div style={{ display: "flex", flexDirection: "column" }}>
        <Button1 text="All" />
        <Button1 text="Food Banks" />
        <Button1 text="Distribution Centers" />
      </div>}
      {!showButton2 && <div style={{ display: "flex", flexDirection: "column" }}>
        <Button1 text="All" />
        <Button1 text="Distribution Centers" />
        <Button1 text="Small Grocery Store" />
        <Button1 text="Medium Grocery Store" />
        <Button1 text="Distribution Centers" />
        <Button1 text="Large Grocery Store" />
        <Button1 text="Combination Grocery/Other" />
        <Button1 text="Convenience Store" />
        <Button1 text="Super Store" />
        <Button1 text="Supermarket" />
        <Button1 text="Fruits/Veg Specialty" />
        <Button1 text="Meat/Poultry Specialty" />
        <Button1 text="Seafood Specialty" />
        <Button1 text="Delivery Route" />
        <Button1 text="Farmers' Market" />
        <Button1 text="Food Buying Co-op" />
        <Button1 text="Military Commissary" />
      </div>}
    </div>
  );
}

export default App;






/*interface IState {
  jimuMapView: JimuMapView;
  checkedFB: boolean;
  checkedCP: boolean;
  checkedFO: boolean;
  checkedSNAP: boolean;
  checkedSGS: boolean;
  checkedMGS: boolean;
  checkedLGS: boolean;
  checkedOGS: boolean;
  checkedCS: boolean;
  checkedSS: boolean;
  checkedSM: boolean;
  checkedFV: boolean;
  checkedMP: boolean;
  checkedSF: boolean;
  checkedDR: boolean;
  checkedFM: boolean;
  checkedFBCO: boolean;
  checkedMC: boolean;
}



export default class ViewLayersToggle extends React.PureComponent<AllWidgetProps<IMConfig>,IState> {

  constructor(props) {
    super(props);
    this.state = {
      jimuMapView: undefined,
      checkedFB: false,
      checkedCP: false,
      checkedFO: false,
      checkedSNAP: false,
      checkedSGS: false,
      checkedMGS: false,
      checkedLGS: false,
      checkedOGS: false,
      checkedCS: false,
      checkedSS: false,
      checkedSM: false,
      checkedFV: false,
      checkedMP: false,
      checkedSF: false,
      checkedDR: false,
      checkedFM: false,
      checkedFBCO: false,
      checkedMC: false
    };
  }

  changeHandler1 = (evt) => {
    if (evt.target.value && evt.target.value !== "") {  
      if (this.state.jimuMapView) {
        const layerList = new LayerList({
          view: this.state.jimuMapView.view
        });
        if (evt.target.value === "Food Bank Council of Michigan") {
          var checkedState = this.state.checkedFB
        }
        if (evt.target.value === "MI Bridges Community Partners") {
          var checkedState = this.state.checkedCP
        }
        if (evt.target.value === "MDHHS Field Offices") {
          var checkedState = this.state.checkedFO
        }
        if (evt.target.value === "Historical SNAP Store Locations") {
          var checkedState = this.state.checkedSNAP
        }
        if (checkedState === false){
          this.state.jimuMapView.view.when(() => {
            const layer1 = layerList.operationalItems.find((layerView) => {
              return layerView.title === evt.target.value;
            });    
            layer1.visible = true
          });
        }
        else {
          this.state.jimuMapView.view.when(() => {
            const layer1 = layerList.operationalItems.find((layerView) => {
              return layerView.title === evt.target.value;
            });    
            layer1.visible = false
          });
        }
        if (evt.target.value === "Food Bank Council of Michigan") {
          this.setState({
            checkedFB: !this.state.checkedFB
          });
        }
        if (evt.target.value === "MI Bridges Community Partners") {
          this.setState({
            checkedCP: !this.state.checkedCP
          });
        }
        if (evt.target.value === "MDHHS Field Offices") {
          this.setState({
            checkedFO: !this.state.checkedFO
          });
        }
        if (evt.target.value === "Historical SNAP Store Locations") {
          this.setState({
            checkedSNAP: !this.state.checkedSNAP
          });
        }
      }
    }
  }

  changeHandler2 = (evt) => {
    if (evt.target.value && evt.target.value !== "") {  
      if (this.state.jimuMapView) {
        const layerList = new LayerList({
          view: this.state.jimuMapView.view
        });
        if (evt.target.value === "Small Grocery Store") {
          var checkedState = this.state.checkedSGS
        }
        if (evt.target.value === "Medium Grocery Store") {
          var checkedState = this.state.checkedMGS
        }
        if (evt.target.value === "Large Grocery Store") {
          var checkedState = this.state.checkedLGS
        }
        if (evt.target.value === "Combination Grocery/Other") {
          var checkedState = this.state.checkedOGS
        }
        if (evt.target.value === "Convenience Store") {
          var checkedState = this.state.checkedCS
        }
        if (evt.target.value === "Super Store") {
          var checkedState = this.state.checkedSS
        }
        if (evt.target.value === "Supermarket") {
          var checkedState = this.state.checkedSM
        }
        if (evt.target.value === "Fruits/Veg Specialty") {
          var checkedState = this.state.checkedFV
        }
        if (evt.target.value === "Meat/Poultry Specialty") {
          var checkedState = this.state.checkedFB
        }
        if (evt.target.value === "Seafood Specialty") {
          var checkedState = this.state.checkedSF
        }
        if (evt.target.value === "Delivery Route") {
          var checkedState = this.state.checkedDR
        }
        if (evt.target.value === "Farmers' Market") {
          var checkedState = this.state.checkedFM
        }
        if (evt.target.value === "Food Buying Co-op") {
          var checkedState = this.state.checkedFBCO
        }
        if (evt.target.value === "Military Commissary") {
          var checkedState = this.state.checkedMC
        }
        if (checkedState === false){
          this.state.jimuMapView.view.when(() => {
            const layer1 = layerList.operationalItems.find((layerView) => {
              return layerView.title === evt.target.value;
            });    
            layer1.visible = true
          });
        }
        else {
          this.state.jimuMapView.view.when(() => {
            const layer1 = layerList.operationalItems.find((layerView) => {
              return layerView.title === evt.target.value;
            });    
            layer1.visible = false
          });
        }
        if (evt.target.value === "Small Grocery Store") {
          this.setState({
            checkedFB: !this.state.checkedSGS
          });
        }
        if (evt.target.value === "Medium Grocery Store") {
          this.setState({
            checkedFB: !this.state.checkedMGS
          });
        }
        if (evt.target.value === "Large Grocery Store") {
          this.setState({
            checkedFB: !this.state.checkedLGS
          });
        }
        if (evt.target.value === "Combination Grocery/Other") {
          this.setState({
            checkedFB: !this.state.checkedOGS
          });
        }
        if (evt.target.value === "Convenience Store") {
          this.setState({
            checkedFB: !this.state.checkedCS
          });
        }
        if (evt.target.value === "Super Store") {
          this.setState({
            checkedFB: !this.state.checkedSS
          });
        }
        if (evt.target.value === "Supermarket") {
          this.setState({
            checkedFB: !this.state.checkedSM
          });
        }
        if (evt.target.value === "Fruits/Veg Specialty") {
          this.setState({
            checkedFB: !this.state.checkedFV
          });
        }
        if (evt.target.value === "Meat/Poultry Specialty") {
          this.setState({
            checkedFB: !this.state.checkedMP
          });
        }
        if (evt.target.value === "Seafood Specialty") {
          this.setState({
            checkedFB: !this.state.checkedSF
          });
        }
        if (evt.target.value === "Delivery Route") {
          this.setState({
            checkedFB: !this.state.checkedDR
          });
        }
        if (evt.target.value === "Farmers' Market") {
          this.setState({
            checkedFB: !this.state.checkedFM
          });
        }
        if (evt.target.value === "Food Buying Co-op") {
          this.setState({
            checkedFB: !this.state.checkedFBCO
          });
        }
        if (evt.target.value === "Military Commissary") {
          this.setState({
            checkedFB: !this.state.checkedMC
          });
        }
      }
    }
  }

  
  render() {

    function test() {
      const [showButton, setShowButton] = useState(true);
      const toggleButton = () => {
        setShowButton(!showButton);
      };
    }

      return (
        <div>
          {showButton &&
          <button
            onClick={toggleButton}
          >
            hide me
          </button>}
        </div>
      )
  }
};
*/



/*const Widget = (props: AllWidgetProps<IMConfig>) => {
  return (
    <div className="widget-demo jimu-widget m-2">
      <p>Simple Widget</p>
      <p>exampleConfigProperty: {props.config.exampleConfigProperty}</p>
    </div>
  )
}

export default Widget*/
