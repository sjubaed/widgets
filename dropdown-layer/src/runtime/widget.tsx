import { React, type AllWidgetProps, jsx, DataSourceComponent, SqlQueryParams, DataSourceManager, QueriableDataSource, DataSource, FeatureLayerDataSource } from 'jimu-core';
import defaultMessages from './translations/default';
import { Button, Dropdown, DropdownMenu, DropdownButton, DropdownItem, MultiSelect, Label, Checkbox, CollapsablePanel, TextInput, WidgetPlaceholder } from 'jimu-ui';
import { type IMConfig } from '../config';
import { JimuMapView, JimuMapViewComponent } from "jimu-arcgis";
import { MapDataSourceImpl } from 'jimu-arcgis/arcgis-data-source';

import * as React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

import { useState, useEffect } from 'react';

import LayerList from "esri/widgets/LayerList";
import MapView from "esri/views/MapView";
import Layer from "esri/layers/Layer";
import View from "esri/views/View";
import { layer } from "esri/views/3d/support/LayerPerformanceInfo";

import "./styles.css";
import { Button1, SmallButton } from './components/Button';


enum FBtype {
  FB = 'FB', // Food Bank
  DC = 'DC', // Distribution Center
  All = 'All'
}

function Multiselection(props: AllWidgetProps<any>) {

  const [jimuMapView, setJimuMapView] = useState(undefined);

  const [FB_Type, setTypeFB] = useState(FBtype.All);

  const [showFBDCGroup, setshowFBDCGroup] = useState(false);
  const [enableMI, setMI] = useState(false);
  const [enableFO, setFO] = useState(false);
  const [showSNAPGroup, setshowSNAPGroup] = useState(false);
  const [enableFB, setFB] = useState(false);
  const [enableDC, setDC] = useState(false);
  const [enableALL, setALL] = useState(false);
  const [enableSGS, setSGS] = useState(false);
  const [enableMGS, setMGS] = useState(false);
  const [enableLGS, setLGS] = useState(false);
  const [enableCGO, setCGO] = useState(false);
  const [enableCS, setCS] = useState(false);
  const [enableSS, setSS] = useState(false);
  const [enableSM, setSM] = useState(false);
  const [enableFV, setFV] = useState(false);
  const [enableMP, setMP] = useState(false);
  const [enableSF, setSF] = useState(false);
  const [enableDR, setDR] = useState(false);
  const [enableFM, setFM] = useState(false);
  const [enableFBCO, setFBCO] = useState(false);
  const [enableMC, setMC] = useState(false);


////////////////////////////////////////////////////////////////////////////////////////////////////

  const changeHandler = (evt) => {
    if (props.useDataSources.length > 0) {
      // First get the DataSourceManager instance
      const dsManager = DataSourceManager.getInstance();

      // Get the data source using useDataSource.dataSourceId
      const useDataSource = props.useDataSources[0];
      const ds: FeatureLayerDataSource = dsManager.getDataSource(useDataSource.dataSourceId) as FeatureLayerDataSource;

      // Build the queryParams, with the configured filterField and the value
      // that has been typed into the TextInput by the user

      if (!enableFB && enableDC) {
        const queryParams: SqlQueryParams = {
          where: `${props.config.filterField} LIKE '%${FBtype.FB}%'`
        };

        // Filter the data source using updateQueryParams function.
        ds.updateQueryParams(queryParams, props.id);
      }
      
      else if (enableFB && !enableDC) {
        const queryParams: SqlQueryParams = {
          where: `${props.config.filterField} LIKE '%${FBtype.DC}%'`
        };

        // Filter the data source using updateQueryParams function.
        ds.updateQueryParams(queryParams, props.id);
      }

      // else if { !enableFB && !enableDC } {
      //   evt.preventDefault();
      // }

      else if (!enableFB && !enableDC) {
        const queryParams: SqlQueryParams = {
          where: `${props.config.filterField} LIKE '%${FBtype.FB}%' OR ${props.config.filterField} LIKE '%${FBtype.DC}%'`
        };

        // Filter the data source using updateQueryParams function.
        ds.updateQueryParams(queryParams, props.id);
      }

      else if (enableFB && enableDC) {
        const queryParams: SqlQueryParams = {
          where: `${props.config.filterField} LIKE '%${FBtype.All}%'`
        };

        // Filter the data source using updateQueryParams function.
        ds.updateQueryParams(queryParams, props.id);        
      }
      // if (!enableDC) {var targetVal = "DC"}
    }
  }


  // const changeHandlerFB = (evt) => {
  //   if (props.useDataSources.length > 0) {
  //     // First get the DataSourceManager instance
  //     const dsManager = DataSourceManager.getInstance();

  //     // Get the data source using useDataSource.dataSourceId
  //     const useDataSource = props.useDataSources[0];
  //     const ds: FeatureLayerDataSource = dsManager.getDataSource(useDataSource.dataSourceId) as FeatureLayerDataSource;

  //     // Build the queryParams, with the configured filterField and the value
  //     // that has been typed into the TextInput by the user

  //     if (!enableFB) {var targetVal = "FB"}
  //     else { var targetVal = "DC" }
  //     // if (!enableDC) {var targetVal = "DC"}

  //     const queryParams: SqlQueryParams = {
  //       where: `${props.config.filterField} LIKE '%${targetVal}%'`
  //     };

  //     // Filter the data source using updateQueryParams function.
  //     ds.updateQueryParams(queryParams, props.id);
  //   }
  // }

  const changeHandlerDC = (evt) => {
    if (props.useDataSources.length > 0) {
      // First get the DataSourceManager instance
      const dsManager = DataSourceManager.getInstance();

      // Get the data source using useDataSource.dataSourceId
      const useDataSource = props.useDataSources[0];
      const ds: FeatureLayerDataSource = dsManager.getDataSource(useDataSource.dataSourceId) as FeatureLayerDataSource;

      // Build the queryParams, with the configured filterField and the value
      // that has been typed into the TextInput by the user

      // if (!enableFB) {var targetVal = "FB"}
      if (!enableDC) {var targetVal = "DC"}
      else { var targetVal = "FB"}

      const queryParams: SqlQueryParams = {
        where: `${props.config.filterField} LIKE '%${targetVal}%'`
      };

      // Filter the data source using updateQueryParams function.
      ds.updateQueryParams(queryParams, props.id);
    }
  }

  // By default, if we have no filterField selected, show a placeholder:
  let mainContent = <WidgetPlaceholder icon={""} message={"Choose Attribute"} />;

  if (props.config.filterField) {
    // If fieldField is selected, show the Text Input box to allow filtering.
    const placeholderText = `${'Filter layer'} on ${props.config.filterField} attribute`
    mainContent = <p>
      <TextInput placeholder={placeholderText} onChange={(e) => { changeHandlerFB(e); }} />
    </p>;
  };


////////////////////////////////////////////////////////////////////////////////////////////////////

  const FBDCGroup = () => {
    if (jimuMapView) {
      const layerList = new LayerList({
        view: jimuMapView.view
      });

      if (showFBDCGroup === false){
        jimuMapView.view.when(() => {
          const layer1 = layerList.operationalItems.find((layerView) => {
            return layerView.title === "Food Bank Council of Michigan";
          });
          layer1.visible = true
        });
      }
      else {
        jimuMapView.view.when(() => {
          const layer1 = layerList.operationalItems.find((layerView) => {
            return layerView.title === "Food Bank Council of Michigan";
          });    
          layer1.visible = false
        });
      }
    }
    setshowFBDCGroup(!showFBDCGroup);
  };

  useEffect(() => {
    if (showFBDCGroup) {
      setFB(true)
      setDC(true)
    }
    else {
      setFB(false)
      setFB(false)
    }
  }, [showFBDCGroup])


  const ShowFB = (evt) => {
    setFB(!enableFB);
    changeHandler(evt);
  };
  
  const ShowDC = (evt) => {
    setDC(!enableDC);
    changeHandler(evt);
  };


  const ShowMI = () => {
    if (jimuMapView) {
      const layerList = new LayerList({
        view: jimuMapView.view
      });

      if (enableMI === false){
        jimuMapView.view.when(() => {
          const layer1 = layerList.operationalItems.find((layerView) => {
            return layerView.title === "MI Bridges Community Partners";
          });
          layer1.visible = true
        });
      }
      else {
        jimuMapView.view.when(() => {
          const layer1 = layerList.operationalItems.find((layerView) => {
            return layerView.title === "MI Bridges Community Partners";
          });    
          layer1.visible = false
        });
      }
    }
    setMI(!enableMI);
  };
  
  const ShowFO = () => {
    if (jimuMapView) {
      const layerList = new LayerList({
        view: jimuMapView.view
      });

      if (enableFO === false){
        jimuMapView.view.when(() => {
          const layer1 = layerList.operationalItems.find((layerView) => {
            return layerView.title === "MDHHS Field Offices";
          });
          layer1.visible = true
        });
      }
      else {
        jimuMapView.view.when(() => {
          const layer1 = layerList.operationalItems.find((layerView) => {
            return layerView.title === "MDHHS Field Offices";
          });    
          layer1.visible = false
        });
      }
    }
    setFO(!enableFO);
  };


  
  const ShowSNAPGroup = () => {
    if (jimuMapView) {
      const layerList = new LayerList({
        view: jimuMapView.view
      });

      if (showSNAPGroup === false){
        jimuMapView.view.when(() => {
          const layer1 = layerList.operationalItems.find((layerView) => {
            return layerView.title === "Historical SNAP Store Locations";
          });
          layer1.visible = true
        });
      }
      else {
        jimuMapView.view.when(() => {
          const layer1 = layerList.operationalItems.find((layerView) => {
            return layerView.title === "Historical SNAP Store Locations";
          });    
          layer1.visible = false
        });
      }
    }
    setALL(!enableALL);
    setshowSNAPGroup(!showSNAPGroup);
  };
  
  const ShowSGS = () => {
    setSGS(!enableSGS);
    if (enableALL === true) {
      setALL(false)
    }
  };
  
  const ShowMGS = () => {
    setMGS(!enableMGS);
    if (enableALL === true) {
      setALL(false)
    }
  };
  const ShowLGS = () => {
    setLGS(!enableLGS);
    if (enableALL === true) {
      setALL(false)
    }
  };
  const ShowCGO = () => {
    setCGO(!enableCGO);
    if (enableALL === true) {
      setALL(false)
    }
  };
  const ShowCS = () => {
    setCS(!enableCS);
    if (enableALL === true) {
      setALL(false)
    }
  };
  const ShowSS = () => {
    setSS(!enableSS);
    if (enableALL === true) {
      setALL(false)
    }
  };
  const ShowSM = () => {
    setSM(!enableSM);
    if (enableALL === true) {
      setALL(false)
    }
  };
  const ShowFV = () => {
    setFV(!enableFV);
    if (enableALL === true) {
      setALL(false)
    }
  };
  const ShowMP = () => {
    setMP(!enableMP);
    if (enableALL === true) {
      setALL(false)
    }
  };
  const ShowSF = () => {
    setSF(!enableSF);
    if (enableALL === true) {
      setALL(false)
    }
  };
  const ShowDR = () => {
    setDR(!enableDR);
    if (enableALL === true) {
      setALL(false)
    }
  };
  const ShowFM = () => {
    setFM(!enableFM);
    if (enableALL === true) {
      setALL(false)
    }
  };
  const ShowFBCO = () => {
    setFBCO(!enableFBCO);
    if (enableALL === true) {
      setALL(false)
    }
  };
  const ShowMC = () => {
    setMC(!enableMC);
    if (enableALL === true) {
      setALL(false)
    }
  };


  // useEffect((evt) => {
  //   if (evt === true) {
  //     setALL(false)
  //   }, [enableSGS, enableMGS, enableLGS, enableCGO, enableCS, enableSS, enableSM, enableFV, enableMP, enableSF, enableDR, enableFM, enableFBCO, enableMC]})

  const ShowAll = () => {setALL(!enableALL);};

  useEffect(() => {
    if (enableALL) {
      setSGS(true)
      setMGS(true)
      setLGS(true)
      setCGO(true)
      setCS(true)
      setSS(true)
      setSM(true)
      setFV(true)
      setMP(true)
      setSF(true)
      setDR(true)
      setFM(true)
      setFBCO(true)
      setMC(true)
    }
    else if (!enableALL && enableSGS && enableMGS && enableLGS &&
      enableCGO && enableCS && enableSS && enableSM &&
      enableFV && enableMP && enableSF && enableDR && enableFM &&
      enableFBCO && enableMC) {
      setSGS(false)
      setMGS(false)
      setLGS(false)
      setCGO(false)
      setCS(false)
      setSS(false)
      setSM(false)
      setFV(false)
      setMP(false)
      setSF(false)
      setDR(false)
      setFM(false)
      setFBCO(false)
      setMC(false)
    }
    // else {
    //   setSGS(false)
    //   setMGS(false)
    //   setLGS(false)
    //   setCGO(false)
    //   setCS(false)
    //   setSS(false)
    //   setSM(false)
    //   setFV(false)
    //   setMP(false)
    //   setSF(false)
    //   setDR(false)
    //   setFM(false)
    //   setFBCO(false)
    //   setMC(false)
    // }
  },[enableALL])

  const activeViewChangeHandler = (jmv: JimuMapView) => {
    if (jmv) {
      setJimuMapView(jmv);
    }
  };

  return (
    <div
      className="dropdown-layer jimu-widget"
      style={{ overflow: "auto" }}>
        {props.hasOwnProperty("useMapWidgetIds") &&
          props.useMapWidgetIds &&
          props.useMapWidgetIds.length === 1 && (
            // The JimuMapViewComponent gives us a connection to the
            // ArcGIS JS API MapView object. We store it in the State.
            <JimuMapViewComponent
              useMapWidgetId={props.useMapWidgetIds?.[0]}
              onActiveViewChange={activeViewChangeHandler}
            />
          )}


    <div style={{ display: "flex", flexDirection: "column" }}>
      <div style={{ display: "flex", flexDirection: "column" }}>
          <ToggleButton className={`MuiToggleButton ${showFBDCGroup ? "Mui-selected" : "MuiToggleButton"}`} value="FBDC" onChange={FBDCGroup} sx={{textTransform: "none"}}>Food Bank Council of Michigan</ToggleButton>
            {showFBDCGroup && <div style={{ display: "flex", flexDirection: "column" }}>
            <ToggleButton className={`MuiToggleButton ${enableFB ? "Mui-selected" : "MuiToggleButtonSmall"}`} value="FB" onChange={ShowFB} sx={{textTransform: "none"}}>Food Banks</ToggleButton>
            <ToggleButton className={`MuiToggleButton ${enableDC ? "Mui-selected" : "MuiToggleButtonSmall"}`} value="DC" onChange={ShowDC} sx={{textTransform: "none"}}>Distribution Centers</ToggleButton>
            </div>}
          <ToggleButton className={`MuiToggleButton ${enableMI ? "Mui-selected" : "MuiToggleButton"}`} value="MI" onChange={ShowMI} sx={{textTransform: "none"}}>MI Bridges Community Partners</ToggleButton>
          <ToggleButton className={`MuiToggleButton ${enableFO ? "Mui-selected" : "MuiToggleButton"}`} value="FO" onChange={ShowFO} sx={{textTransform: "none"}}>MDHHS Field Offices</ToggleButton>
          <ToggleButton className={`MuiToggleButton ${showSNAPGroup ? "Mui-selected" : "MuiToggleButton"}`} value="SNAP" onChange={ShowSNAPGroup} sx={{textTransform: "none"}}>Historical SNAP Store Locations</ToggleButton>
      </div>
      {showSNAPGroup && <div style={{ display: "flex", flexDirection: "column" }}>
          <ToggleButton className={`MuiToggleButton ${enableALL ? "Mui-selected" : "MuiToggleButton"}`} value="ALL" onChange={ShowAll} sx={{textTransform: "none"}}>All</ToggleButton>
          <ToggleButton className={`MuiToggleButton ${enableSGS ? "Mui-selected" : "MuiToggleButton"}`} value="SGS" onChange={ShowSGS} sx={{textTransform: "none"}}>Small Grocery Store</ToggleButton>
          <ToggleButton className={`MuiToggleButton ${enableMGS ? "Mui-selected" : "MuiToggleButton"}`} value="MGS" onChange={ShowMGS} sx={{textTransform: "none"}}>Medium Grocery Store</ToggleButton>
          <ToggleButton className={`MuiToggleButton ${enableLGS ? "Mui-selected" : "MuiToggleButton"}`} value="LGS" onChange={ShowLGS} sx={{textTransform: "none"}}>Large Grocery Store</ToggleButton>
          <ToggleButton className={`MuiToggleButton ${enableCGO ? "Mui-selected" : "MuiToggleButton"}`} value="CGO" onChange={ShowCGO} sx={{textTransform: "none"}}>Combination Grocery/Other</ToggleButton>
          <ToggleButton className={`MuiToggleButton ${enableCS ? "Mui-selected" : "MuiToggleButton"}`} value="CGO" onChange={ShowCS} sx={{textTransform: "none"}}>Convenience Store/Other</ToggleButton>
          <ToggleButton className={`MuiToggleButton ${enableSS ? "Mui-selected" : "MuiToggleButton"}`} value="SS" onChange={ShowSS} sx={{textTransform: "none"}}>Super Store</ToggleButton>
          <ToggleButton className={`MuiToggleButton ${enableSM ? "Mui-selected" : "MuiToggleButton"}`} value="SM" onChange={ShowSM} sx={{textTransform: "none"}}>Supermarket</ToggleButton>
          <ToggleButton className={`MuiToggleButton ${enableFV ? "Mui-selected" : "MuiToggleButton"}`} value="FV" onChange={ShowFV} sx={{textTransform: "none"}}>Fruits/Veg Specialty</ToggleButton>
          <ToggleButton className={`MuiToggleButton ${enableMP ? "Mui-selected" : "MuiToggleButton"}`} value="MP" onChange={ShowMP} sx={{textTransform: "none"}}>Meat/Poultry Specialty</ToggleButton>
          <ToggleButton className={`MuiToggleButton ${enableSF ? "Mui-selected" : "MuiToggleButton"}`} value="SF" onChange={ShowSF} sx={{textTransform: "none"}}>Seafood Specialty</ToggleButton>
          <ToggleButton className={`MuiToggleButton ${enableDR ? "Mui-selected" : "MuiToggleButton"}`} value="DR" onChange={ShowDR} sx={{textTransform: "none"}}>Delivery Route</ToggleButton>
          <ToggleButton className={`MuiToggleButton ${enableFM ? "Mui-selected" : "MuiToggleButton"}`} value="FM" onChange={ShowFM} sx={{textTransform: "none"}}>Farmers' Market</ToggleButton>
          <ToggleButton className={`MuiToggleButton ${enableFBCO ? "Mui-selected" : "MuiToggleButton"}`} value="FBCO" onChange={ShowFBCO} sx={{textTransform: "none"}}>Food Buying Co-op</ToggleButton>
          <ToggleButton className={`MuiToggleButton ${enableMC ? "Mui-selected" : "MuiToggleButton"}`} value="MC" onChange={ShowMC} sx={{textTransform: "none"}}>Military Commissary</ToggleButton>
      </div>}
    </div>
  </div>
  );
}

export default Multiselection;

// function App(props: AllWidgetProps<any>) {
//   const [showButton, setShowButton1] = useState(true);
//   const [showButton2, setShowButton2] = useState(true);

//   const [jimuMapView, setJimuMapView] = useState(undefined);
//   const [checkedFO, setCheckedFO] = useState(false);

//   const toggleButton = () => {
//     setShowButton1(!showButton);
//   }

//   const toggleButton2 = () => {
//     setShowButton2(!showButton2);
//   }

//   const changeHandler = (evt) => {
//     if (evt.target.value && evt.target.value !== "") {
//       if (jimuMapView) {
//         const layerList = new LayerList({
//           view: jimuMapView.view
//         });

//         if (evt.target.value === "MDHHS Field Offices") {
//           var checkedState = checkedFO
//         }

//         if (checkedState === false){
//           jimuMapView.view.when(() => {
//             const layer1 = layerList.operationalItems.find((layerView) => {
//               return layerView.title === evt.target.value;
//             });    
//             layer1.visible = true
//           });
//         }
//         else {
//           jimuMapView.view.when(() => {
//             const layer1 = layerList.operationalItems.find((layerView) => {
//               return layerView.title === evt.target.value;
//             });    
//             layer1.visible = false
//           });
//         }

//         if (evt.target.value === "MDHHS Field Offices") {
//           setCheckedFO(!checkedFO);
//         }
//       }
//     }
//   }

//   const activeViewChangeHandler = (jmv: JimuMapView) => {
//     if (jmv) {
//       setJimuMapView(jmv);
//     }
//   };

//   return (
//     <div
//       className="dropdown-layer jimu-widget"
//       style={{ overflow: "auto" }}>
//         {props.hasOwnProperty("useMapWidgetIds") &&
//           props.useMapWidgetIds &&
//           props.useMapWidgetIds.length === 1 && (
//             // The JimuMapViewComponent gives us a connection to the
//             // ArcGIS JS API MapView object. We store it in the State.
//             <JimuMapViewComponent
//               useMapWidgetId={props.useMapWidgetIds?.[0]}
//               onActiveViewChange={activeViewChangeHandler}
//             />
//           )}

//       <div style={{ display: "flex", flexDirection: "column" }}>
//         <div style={{ display: "flex", flexDirection: "column" }}>
//           <Button1 onClick={toggleButton} text="Food Bank Council of Michigan" />
//             {!showButton && <div style={{ display: "flex", flexDirection: "column" }}>
//           <SmallButton text="All" />
//           <SmallButton text="Food Banks" />
//           <SmallButton text="Distribution Centers" />
//         </div>}
//           <Button1 text="MI Bridges Community Partners" />
//           <Button1 onClick={changeHandler} text="MDHHS Field Offices" />
//           <Button1 onClick={toggleButton2} text="Historical SNAP Store Locations" />
//         </div>
//         {!showButton2 && <div style={{ display: "flex", flexDirection: "column" }}>
//           <SmallButton text="All" />
//           <SmallButton text="Distribution Centers" />
//           <SmallButton text="Small Grocery Store" />
//           <SmallButton text="Medium Grocery Store" />
//           <SmallButton text="Distribution Centers" />
//           <SmallButton text="Large Grocery Store" />
//           <SmallButton text="Combination Grocery/Other" />
//           <SmallButton text="Convenience Store" />
//           <SmallButton text="Super Store" />
//           <SmallButton text="Supermarket" />
//           <SmallButton text="Fruits/Veg Specialty" />
//           <SmallButton text="Meat/Poultry Specialty" />
//           <SmallButton text="Seafood Specialty" />
//           <SmallButton text="Delivery Route" />
//           <SmallButton text="Farmers' Market" />
//           <SmallButton text="Food Buying Co-op" />
//           <SmallButton text="Military Commissary" />
//         </div>}
//       </div>
//     </div>
//   );
// }

// export default App;
