import React, { useEffect, useState } from 'react';
import { type AllWidgetProps, SqlQueryParams, DataSourceManager, FeatureLayerDataSource } from 'jimu-core';
import ToggleButton from '@mui/material/ToggleButton';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Collapse from '@mui/material/Collapse';

import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import VisibilityOffRoundedIcon from '@mui/icons-material/VisibilityOffRounded';
import DoneOutlineRoundedIcon from '@mui/icons-material/DoneOutlineRounded';
import DoneRoundedIcon from '@mui/icons-material/DoneRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

import { JimuMapView, JimuMapViewComponent } from "jimu-arcgis";
import LayerList from '@arcgis/core/widgets/LayerList';
import "./styles.css";


/*function layerActivation(layerName:boolean) {
  const [jimuMapView, setJimuMapView] = useState(undefined);

  if (jimuMapView) {
    const layerList = new LayerList({
      view: jimuMapView.view
    });
    if (layerName) {
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
}*/

let storeType: string[] = ['NONE','NONE','NONE','NONE','NONE','NONE','NONE','NONE','NONE','NONE','NONE','NONE','NONE','NONE']
let fbSrcType: string[] = ['NONE','NONE','NONE','NONE','NONE','NONE','NONE']

function Multiselection(props: AllWidgetProps<any>) {

  /*##################################################-----SETTING_CONSTANTS-----#####################################################################################*/

  const [jimuMapView, setJimuMapView] = useState(undefined);

  const [showFBDCGroup, setshowFBDCGroup] = useState(false);
  const [enableMI, setMI] = useState(false);
  const [enableFO, setFO] = useState(false);
  const [showSNAPGroup, setshowSNAPGroup] = useState(false);
  
  const [enableAllFB, setAllFB] = useState(false);
  const [enableFeed, setFeed] = useState(false);
  const [enableFBEM, setFBEM] = useState(false);
  const [enablePantry, setPantry] = useState(false);
  const [enableSMfood, setSMfood] = useState(false);
  const [enableFH, setFH] = useState(false);
  const [enableGLFB, setGLFB] = useState(false);
  const [enableFG, setFG] = useState(false);

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

  const [collapseOpen, setCollapseOpen] = useState(false);

 

  /*###############################################-----BUTTON_GROUP_FILTERS-----########################################################################################*/

  //where: (`${props.config.filterField} LIKE 'FB' OR ${props.config.filterField} LIKE 'DC'`)
  // button adds to list/array, pulls from list/array using index into sql code
  // init with list/array having 14 "none"s and buttons replace according to index

  const changeHandlerFBs = () => {
    if (props.useDataSources.length > 0) {
      const dsManager = DataSourceManager.getInstance();
      const useDataSource = props.useDataSources[0];
      const ds: FeatureLayerDataSource = dsManager.getDataSource(useDataSource.dataSourceId) as FeatureLayerDataSource;

      const queryParams: SqlQueryParams = {
        where: (`${'MERGE_SRC'} LIKE '%${fbSrcType[0]}%' 
              OR ${'MERGE_SRC'} LIKE '%${fbSrcType[1]}%'
              OR ${'MERGE_SRC'} LIKE '%${fbSrcType[2]}%'
              OR ${'MERGE_SRC'} LIKE '%${fbSrcType[3]}%'
              OR ${'MERGE_SRC'} LIKE '%${fbSrcType[4]}%'
              OR ${'MERGE_SRC'} LIKE '%${fbSrcType[5]}%'
              OR ${'MERGE_SRC'} LIKE '%${fbSrcType[6]}%'`)
      };

      // console.log(queryParams)

      ds.updateQueryParams(queryParams, props.id);

      console.log(fbSrcType)
    }
  }

  const changeHandlerSNAP = () => {
    if (props.useDataSources.length > 0) {
      const dsManager = DataSourceManager.getInstance();
      const useDataSource = props.useDataSources[1];
      const ds: FeatureLayerDataSource = dsManager.getDataSource(useDataSource.dataSourceId) as FeatureLayerDataSource;


      const queryParams: SqlQueryParams = {
        where: (`${'Store_Type'} LIKE '%${storeType[0]}%' 
              OR ${'Store_Type'} LIKE '%${storeType[1]}%'
              OR ${'Store_Type'} LIKE '%${storeType[2]}%'
              OR ${'Store_Type'} LIKE '%${storeType[3]}%'
              OR ${'Store_Type'} LIKE '%${storeType[4]}%'
              OR ${'Store_Type'} LIKE '%${storeType[5]}%'
              OR ${'Store_Type'} LIKE '%${storeType[6]}%'
              OR ${'Store_Type'} LIKE '%${storeType[7]}%'
              OR ${'Store_Type'} LIKE '%${storeType[8]}%'
              OR ${'Store_Type'} LIKE '%${storeType[9]}%'
              OR ${'Store_Type'} LIKE '%${storeType[10]}%'
              OR ${'Store_Type'} LIKE '%${storeType[11]}%'
              OR ${'Store_Type'} LIKE '%${storeType[12]}%'
              OR ${'Store_Type'} LIKE '%${storeType[13]}%'`)
      };

      ds.updateQueryParams(queryParams, props.id);
      
      console.log("enableSGS:",enableSGS)
      console.log(storeType)
    }
  }

  /*const changeHandlerSNAP = () => {
    if (props.useDataSources.length > 0) {
      const dsManager = DataSourceManager.getInstance();
      const useDataSource = props.useDataSources[0];
      const ds: FeatureLayerDataSource = dsManager.getDataSource(useDataSource.dataSourceId) as FeatureLayerDataSource;

      if (enableSGS) { var targetVal1 = "Small Grocery Store" }
      else { var targetVal1 = "NONE" }
      if (enableMGS) { var targetVal2 = "Medium Grocery Store" }
      else { var targetVal2 = "NONE" }
      if (enableLGS) { var targetVal3 = "Large Grocery Store" }
      else { var targetVal3 = "NONE" }
      if (enableCGO) { var targetVal4 = "Combination Grocery/Other" }
      else { var targetVal4 = "NONE" }
      if (enableCS) { var targetVal5 = "Convenience Store" }
      else { var targetVal5 = "NONE" }
      if (enableSS) { var targetVal6 = "Super Store" }
      else { var targetVal6 = "NONE" }
      if (enableSM) { var targetVal7 = "Supermarket" }
      else { var targetVal7 = "NONE" }
      if (enableFV) { var targetVal8 = "Fruits/Veg Specialty" }
      else { var targetVal8 = "NONE" }
      if (enableMP) { var targetVal9 = "Meat/Poultry Specialty" }
      else { var targetVal9 = "NONE" }
      if (enableSF) { var targetVal10 = "Seafood Specialty" }
      else { var targetVal10 = "NONE" }
      if (enableDR) { var targetVal11 = "Delivery Route" }
      else { var targetVal11 = "NONE" }
      if (enableFM) { var targetVal12 = "Farmers' Market" }
      else { var targetVal12 = "NONE" }
      if (enableFBCO) { var targetVal13 = "Food Buying Co-op" }
      else { var targetVal13 = "NONE" }
      if (enableMC) { var targetVal14 = "Military Commissary" }
      else { var targetVal14 = "NONE" }


      const queryParams: SqlQueryParams = {
        where: (`${props.config.filterField2} LIKE '%${targetVal1}%' 
              OR ${props.config.filterField2} LIKE '%${targetVal2}%'
              OR ${props.config.filterField2} LIKE '%${targetVal3}%'
              OR ${props.config.filterField2} LIKE '%${targetVal4}%'
              OR ${props.config.filterField2} LIKE '%${targetVal5}%'
              OR ${props.config.filterField2} LIKE '%${targetVal6}%'
              OR ${props.config.filterField2} LIKE '%${targetVal7}%'
              OR ${props.config.filterField2} LIKE '%${targetVal8}%'
              OR ${props.config.filterField2} LIKE '%${targetVal9}%'
              OR ${props.config.filterField2} LIKE '%${targetVal10}%'
              OR ${props.config.filterField2} LIKE '%${targetVal11}%'
              OR ${props.config.filterField2} LIKE '%${targetVal12}%'
              OR ${props.config.filterField2} LIKE '%${targetVal13}%'
              OR ${props.config.filterField2} LIKE '%${targetVal14}%'`)
      };
      console.log(targetVal1)
      console.log(targetVal2)
      console.log(targetVal3)
      console.log(targetVal4)
      console.log(targetVal5)
      console.log(targetVal6)
      console.log(targetVal7)
      console.log(targetVal8)
      console.log(targetVal9)
      console.log(targetVal10)
      console.log(targetVal11)
      console.log(targetVal12)
      console.log(targetVal13)
      console.log(targetVal14)

      ds.updateQueryParams(queryParams, props.id);
    }
  }*/

  /*const changeHandlerDC = (evt) => {
    if (props.useDataSources.length > 0) {
      const dsManager = DataSourceManager.getInstance();
      const useDataSource = props.useDataSources[0];
      const ds: FeatureLayerDataSource = dsManager.getDataSource(useDataSource.dataSourceId) as FeatureLayerDataSource;
  
  
      if (!enableDC) {var targetVal = "DC"}
      else { var targetVal = "NONE"}
  
      const queryParams: SqlQueryParams = {
        where: `${props.config.filterField} LIKE '%${targetVal}%'`
      };
  
      ds.updateQueryParams(queryParams, props.id);
    }
  }*/


  /*###############################################-----BUTTON_FUNCTIONS-----########################################################################################*/


  const FBDCGroup = () => {
    if (jimuMapView) {
      const layerList = new LayerList({
        view: jimuMapView.view
      });

      if (showFBDCGroup === false) {
        jimuMapView.view.when(() => {
          const layer1 = layerList.operationalItems.find((layerView) => {
            return layerView.title === "Food Banks";
          });
          layer1.visible = true
        });
      }
      else {
        jimuMapView.view.when(() => {
          const layer1 = layerList.operationalItems.find((layerView) => {
            return layerView.title === "Food Banks";
          });
          layer1.visible = false
        });
      }
    }
    setshowFBDCGroup(!showFBDCGroup);
    setAllFB(true);
    setFeed(true);
    setFBEM(true);
    setPantry(true);
    setSMfood(true);
    setFH(true);
    setGLFB(true);
    setFG(true);
  };

  const ShowFeed = () => {
    setFeed(!enableFeed);
    if (enableAllFB === true) {
      setAllFB(false)
    };
  };

  const ShowFBEM = () => {
    setFBEM(!enableFBEM);
    if (enableAllFB === true) {
      setAllFB(false)
    };
  };

  const ShowPantry = () => {
    setPantry(!enablePantry);
    if (enableAllFB === true) {
      setAllFB(false)
    };
  };

  const ShowSMfood = () => {
    setSMfood(!enableSMfood);
    if (enableAllFB === true) {
      setAllFB(false)
    };
  };

  const ShowFH = () => {
    setFH(!enableFH);
    if (enableAllFB === true) {
      setAllFB(false)
    };
  };

  const ShowGLFB = () => {
    setGLFB(!enableGLFB);
    if (enableAllFB === true) {
      setAllFB(false)
    };
  };

  const ShowFG = () => {
    setFG(!enableFG);
    if (enableAllFB === true) {
      setAllFB(false)
    };
  };


  const ShowMI = () => {
    if (jimuMapView) {
      const layerList = new LayerList({
        view: jimuMapView.view
      });

      if (enableMI === false) {
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

      if (enableFO === false) {
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

      if (showSNAPGroup === false) {
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
    setshowSNAPGroup(!showSNAPGroup);
    setALL(true);
    setSGS(true);
    setMGS(true);
    setLGS(true);
    setCGO(true);
    setCS(true);
    setSS(true);
    setSM(true);
    setFV(true);
    setMP(true);
    setSF(true);
    setDR(true);
    setFM(true);
    setFBCO(true);
    setMC(true);
  };
  const ShowSGS = () => {
    setSGS(!enableSGS);
    if (enableALL === true) {
      setALL(false)
    };
  };
  const ShowMGS = () => {
    setMGS(!enableMGS);
    if (enableALL === true) {
      setALL(false)
    };
  };
  const ShowLGS = () => {
    setLGS(!enableLGS);
    if (enableALL === true) {
      setALL(false)
    };
  };
  const ShowCGO = () => {
    setCGO(!enableCGO);
    if (enableALL === true) {
      setALL(false)
    };
  };
  const ShowCS = () => {
    setCS(!enableCS);
    if (enableALL === true) {
      setALL(false)
    };
  };
  const ShowSS = () => {
    setSS(!enableSS);
    if (enableALL === true) {
      setALL(false)
    };
  };
  const ShowSM = () => {
    setSM(!enableSM);
    if (enableALL === true) {
      setALL(false)
    };
  };
  const ShowFV = () => {
    setFV(!enableFV);
    if (enableALL === true) {
      setALL(false)
    };
  };
  const ShowMP = () => {
    setMP(!enableMP);
    if (enableALL === true) {
      setALL(false)
    };
  };
  const ShowSF = () => {
    setSF(!enableSF);
    if (enableALL === true) {
      setALL(false)
    };
  };
  const ShowDR = () => {
    setDR(!enableDR);
    if (enableALL === true) {
      setALL(false)
    };
  };
  const ShowFM = () => {
    setFM(!enableFM);
    if (enableALL === true) {
      setALL(false)
    };
  };
  const ShowFBCO = () => {
    setFBCO(!enableFBCO);
    if (enableALL === true) {
      setALL(false)
    };
  };
  const ShowMC = () => {
    setMC(!enableMC);
    if (enableALL === true) {
      setALL(false)
    };
  };

  /*#######################################################################################################################################*/

  /*useEffect(() => {
    layerActivation(enableMI)
  }, [enableMI])*/

  /*###################################################-----RENDERING_FUNCTION-----####################################################################################*/

  useEffect(() => {
    if (showFBDCGroup || enableFeed) {
      if (enableFeed) {fbSrcType[0] = "Feedwm"}
      else {fbSrcType[0]= "NONE"}
    changeHandlerFBs()}
  }, [enableFeed])

  useEffect(() => {
    if (showFBDCGroup || enableFBEM) {
      if (enableFBEM) {fbSrcType[1] = "FBEM"}
      else {fbSrcType[1]= "NONE"}
    changeHandlerFBs()}
  }, [enableFBEM])

  useEffect(() => {
    if (showFBDCGroup || enablePantry) {
      if (enablePantry) {fbSrcType[2] = "Pantry"}
      else {fbSrcType[2]= "NONE"}
    changeHandlerFBs()}
  }, [enablePantry])

  useEffect(() => {
    if (showFBDCGroup || enableSMfood) {
      if (enableSMfood) {fbSrcType[3] = "Smfood"}
      else {fbSrcType[3]= "NONE"}
    changeHandlerFBs()}
  }, [enableSMfood])

  useEffect(() => {
    if (showFBDCGroup || enableFH) {
      if (enableFH) {fbSrcType[4] = "Forgottenharvest"}
      else {fbSrcType[4]= "NONE"}
    changeHandlerFBs()}
  }, [enableFH])

  useEffect(() => {
    if (showFBDCGroup || enableGLFB) {
      if (enableGLFB) {fbSrcType[5] = "GLFB"}
      else {fbSrcType[5]= "NONE"}
    changeHandlerFBs()}
  }, [enableGLFB])

  useEffect(() => {
    if (showFBDCGroup || enableFG) {
      if (enableFG) {fbSrcType[6] = "Foodgatherers"}
      else {fbSrcType[6]= "NONE"}
    changeHandlerFBs()}
  }, [enableFG])

  useEffect(() => {
    if (enableAllFB) {
      setFeed(true);
      setFBEM(true);
      setPantry(true);
      setSMfood(true);
      setFH(true);
      setGLFB(true);
      setFG(true);
    }
    else if (!enableAllFB && enableFeed && enableFBEM && enablePantry &&
      enableSMfood && enableFH && enableGLFB && enableFG) {
      setFeed(false);
      setFBEM(false);
      setPantry(false);
      setSMfood(false);
      setFH(false);
      setGLFB(false);
      setFG(false);
    }
  }, [enableAllFB])



  useEffect(() => {
    if (showSNAPGroup || enableSGS) {
      if (enableSGS) {storeType[0] = "Small Grocery Store"}
      else {storeType[0]= "NONE"}
      changeHandlerSNAP()}
    }, [enableSGS])
  useEffect(() => {
    if (showSNAPGroup || enableMGS) {
      if (enableMGS) {storeType[1] = "Medium Grocery Store"}
      else {storeType[1]= "NONE"}
      changeHandlerSNAP()}
    }, [enableMGS])
  useEffect(() => {
    if (showSNAPGroup || enableLGS) {
      if (enableLGS) {storeType[2] = "Large Grocery Store"}
      else {storeType[2]= "NONE"}
      changeHandlerSNAP()}
    }, [enableLGS])
  useEffect(() => {
    if (showSNAPGroup || enableCGO) {
      if (enableCGO) {storeType[3] = "Combination Grocery/Other"}
      else {storeType[3]= "NONE"}
      changeHandlerSNAP()}
    }, [enableCGO])
  useEffect(() => {
    if (showSNAPGroup || enableCS) {
      if (enableCS) {storeType[4] = "Convenience Store"}
      else {storeType[4]= "NONE"}
      changeHandlerSNAP()}
    }, [enableCS])
  useEffect(() => {
    if (showSNAPGroup || enableSS) {
      if (enableSS) {storeType[5] = "Super Store"}
      else {storeType[5]= "NONE"}
      changeHandlerSNAP()}
    }, [enableSS])
  useEffect(() => {
    if (showSNAPGroup || enableSM) {
      if (enableSM) {storeType[6] = "Supermarket"}
      else {storeType[6]= "NONE"}
      changeHandlerSNAP()}
    }, [enableSM])
  useEffect(() => {
    if (showSNAPGroup || enableFV) {
      if (enableFV) {storeType[7] = "Fruits/Veg Specialty"}
      else {storeType[7]= "NONE"}
      changeHandlerSNAP()}
    }, [enableFV])
  useEffect(() => {
    if (showSNAPGroup || enableMP) {
      if (enableMP) {storeType[8] = "Meat/Poultry Specialty"}
      else {storeType[8]= "NONE"}
      changeHandlerSNAP()}
    }, [enableMP])
  useEffect(() => {
    if (showSNAPGroup || enableSF) {
      if (enableSF) {storeType[9] = "Seafood Specialty"}
      else {storeType[9]= "NONE"}
      changeHandlerSNAP()}
    }, [enableSF])
  useEffect(() => {
    if (showSNAPGroup || enableDR) {
      if (enableDR) {storeType[10] = "Delivery Route"}
      else {storeType[10]= "NONE"}
      changeHandlerSNAP()}
    }, [enableDR])
  useEffect(() => {
    if (showSNAPGroup || enableFM) {
      if (enableFM) {storeType[11] = "Farmers'' Market"}
      else {storeType[11]= "NONE"}
      changeHandlerSNAP()}
    }, [enableFM])
  useEffect(() => {
    if (showSNAPGroup || enableFBCO) {
      if (enableFBCO) {storeType[12] = "Food Buying Co-op"}
      else {storeType[12]= "NONE"}
      changeHandlerSNAP()}
    }, [enableFBCO])
  useEffect(() => {
    if (showSNAPGroup || enableMC) {
      if (enableMC) {storeType[13] = "Military Commissary"}
      else {storeType[13]= "NONE"}
      changeHandlerSNAP()}
    }, [enableMC])

    

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
  }, [enableALL])

  /*###########################################-----LINKING_WIDGET_TO_MAP-----############################################################################################*/

  const activeViewChangeHandler = (jmv: JimuMapView) => {
    if (jmv) {
      setJimuMapView(jmv);
    }
  };

  /*#######################################################################################################################################*/

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
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>

      <ToggleButton sx={{ boxShadow: 3 }} className={`MuiIndicButton ${collapseOpen ? "MuiIndicSelected" : "MuiIndicButton"}`} onChange={() => setCollapseOpen(!collapseOpen)}>Supporting Sites</ToggleButton>

      <Collapse in={collapseOpen}>

        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>

          {/*Food Bank Council of America*/}
          <Accordion onChange={FBDCGroup} className={`MuiAccordion`}>
            <AccordionSummary>
              <Typography align="center" sx={{ fontSize: 13 }}>Food Banks</Typography>
            </AccordionSummary>

            <AccordionDetails>
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
{/*              <ToggleButton className={`MuiToggleButton ${enableFB ? "Mui-selected" : "MuiToggleButton"}`} value="FB" onChange={ShowFB} sx={{textTransform: "none"}}>Food Banks</ToggleButton>
              <ToggleButton className={`MuiToggleButton ${enableDC ? "Mui-selected" : "MuiToggleButton"}`} value="DC" onChange={ShowDC} sx={{textTransform: "none"}}>Distribution Centers</ToggleButton>*/}
            <FormGroup>
              <FormControlLabel checked={enableAllFB} className={`MuiToggleButton ${enableAllFB ? "Mui-selected" : "MuiToggleButton"}`} control={<Checkbox value="All" onChange={() => { setAllFB(!enableAllFB)} checkedIcon={<DoneRoundedIcon style={{ color: '#00274C', fontSize: 'medium'}}/>} icon={<CloseRoundedIcon style={{ fontSize: 'medium'}}/>} />} label={<Typography sx={{ fontSize: 13 }}>All</Typography>} labelPlacement="end"/>
              <FormControlLabel checked={enableFeed} className={`MuiToggleButton ${enableFeed ? "Mui-selected" : "MuiToggleButton"}`} control={<Checkbox value="Feed" onChange={ShowFeed} checkedIcon={<DoneRoundedIcon style={{ color: '#00274C', fontSize: 'medium'}}/>} icon={<CloseRoundedIcon style={{ fontSize: 'medium'}}/>} />} label={<Typography sx={{ fontSize: 13 }}>Feeding America</Typography>} labelPlacement="end"/>
              <FormControlLabel checked={enableFBEM} className={`MuiToggleButton ${enableFBEM ? "Mui-selected" : "MuiToggleButton"}`} control={<Checkbox value="FBEM" onChange={ShowFBEM} checkedIcon={<DoneRoundedIcon style={{ color: '#00274C', fontSize: 'medium'}}/>} icon={<CloseRoundedIcon style={{ fontSize: 'medium'}}/>} />} label={<Typography sx={{ fontSize: 13 }}>Food Bank of <br /> Eastern Michigan</Typography>} labelPlacement="end"/>
              <FormControlLabel checked={enablePantry} className={`MuiToggleButton ${enablePantry ? "Mui-selected" : "MuiToggleButton"}`} control={<Checkbox value="Pantry" onChange={ShowPantry} checkedIcon={<DoneRoundedIcon style={{ color: '#00274C', fontSize: 'medium'}}/>} icon={<CloseRoundedIcon style={{ fontSize: 'medium'}}/>} />} label={<Typography sx={{ fontSize: 13 }}>Gleaners Community <br /> Food Bank</Typography>} labelPlacement="end"/>
              <FormControlLabel checked={enableSMfood} className={`MuiToggleButton ${enableSMfood ? "Mui-selected" : "MuiToggleButton"}`} control={<Checkbox value="SMfood" onChange={ShowSMfood} checkedIcon={<DoneRoundedIcon style={{ color: '#00274C', fontSize: 'medium'}}/>} icon={<CloseRoundedIcon style={{ fontSize: 'medium'}}/>} />} label={<Typography sx={{ fontSize: 13 }}>Southern Michigan <br /> Food Bank</Typography>} labelPlacement="end"/>
              <FormControlLabel checked={enableFH} className={`MuiToggleButton ${enableFH ? "Mui-selected" : "MuiToggleButton"}`} control={<Checkbox value="FH" onChange={ShowFH} checkedIcon={<DoneRoundedIcon style={{ color: '#00274C', fontSize: 'medium'}}/>} icon={<CloseRoundedIcon style={{ fontSize: 'medium'}}/>} />} label={<Typography sx={{ fontSize: 13 }}>Forgotten Harvest</Typography>} labelPlacement="end"/>
              <FormControlLabel checked={enableGLFB} className={`MuiToggleButton ${enableGLFB ? "Mui-selected" : "MuiToggleButton"}`} control={<Checkbox value="GLFB" onChange={ShowGLFB} checkedIcon={<DoneRoundedIcon style={{ color: '#00274C', fontSize: 'medium'}}/>} icon={<CloseRoundedIcon style={{ fontSize: 'medium'}}/>} />} label={<Typography sx={{ fontSize: 13 }}>Greater Lansing <br /> Food Bank</Typography>} labelPlacement="end"/>
              <FormControlLabel checked={enableFG} className={`MuiToggleButton ${enableFG ? "Mui-selected" : "MuiToggleButton"}`} control={<Checkbox value="FG" onChange={ShowFG} checkedIcon={<DoneRoundedIcon style={{ color: '#00274C', fontSize: 'medium'}}/>} icon={<CloseRoundedIcon style={{ fontSize: 'medium'}}/>} />} label={<Typography sx={{ fontSize: 13 }}>Food Gatherers</Typography>} labelPlacement="end"/>
            </FormGroup>

            </div>
            </AccordionDetails>
          </Accordion>

          {/*MI Bridges*/}
          <Accordion onChange={ShowMI} className={`MuiAccordion`}>
            <AccordionSummary>
              <Typography align="center" sx={{ fontSize: 13 }}>MI Bridges Community Partners</Typography>
            </AccordionSummary>

            <AccordionDetails>
            </AccordionDetails>
          </Accordion>

          {/*MDHHS Field Offices*/}
          <Accordion onChange={ShowFO} className={`MuiAccordion`}>
            <AccordionSummary>
              <Typography align="center" sx={{ fontSize: 13 }}>MDHHS Field Offices</Typography>
            </AccordionSummary>

            <AccordionDetails>
            </AccordionDetails>
          </Accordion>

          {/*SNAP Stores*/}
          <Accordion onChange={ShowSNAPGroup} className={`MuiAccordion`}>
            <AccordionSummary>
              <Typography align="center" sx={{ fontSize: 13 }}>Historical SNAP Store Locations</Typography>
            </AccordionSummary>

            <AccordionDetails>
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
            <FormGroup>
              <FormControlLabel checked={enableALL} className={`MuiToggleButton ${enableALL ? "Mui-selected" : "MuiToggleButton"}`} control={<Checkbox value="ALL" onChange={() => { setALL(!enableALL) }} checkedIcon={<DoneRoundedIcon style={{ color: '#00274C', fontSize: 'medium'}}/>} icon={<CloseRoundedIcon sx={{ fontSize: 'medium'}}/>} />} label=<Typography sx={{fontSize: 13}}>All</Typography> labelPlacement="end" />
              <FormControlLabel checked={enableSGS} className={`MuiToggleButton ${enableSGS ? "Mui-selected" : "MuiToggleButton"}`} control={<Checkbox value="SGS" onChange={ShowSGS} checkedIcon={<DoneRoundedIcon style={{ color: '#00274C', fontSize: 'medium'}}/>} icon={<CloseRoundedIcon sx={{ fontSize: 'medium'}}/>} />} label=<Typography sx={{fontSize: 13}}>Small Grocery Store</Typography> labelPlacement="end" />
              <FormControlLabel checked={enableMGS} className={`MuiToggleButton ${enableMGS ? "Mui-selected" : "MuiToggleButton"}`} control={<Checkbox value="MGS" onChange={ShowMGS} checkedIcon={<DoneRoundedIcon style={{ color: '#00274C', fontSize: 'medium'}}/>} icon={<CloseRoundedIcon sx={{ fontSize: 'medium'}}/>} />} label=<Typography sx={{fontSize: 13}}>Medium Grocery Store</Typography> labelPlacement="end" />
              <FormControlLabel checked={enableLGS} className={`MuiToggleButton ${enableLGS ? "Mui-selected" : "MuiToggleButton"}`} control={<Checkbox value="LGS" onChange={ShowLGS} checkedIcon={<DoneRoundedIcon style={{ color: '#00274C', fontSize: 'medium'}}/>} icon={<CloseRoundedIcon sx={{ fontSize: 'medium'}}/>} />} label=<Typography sx={{fontSize: 13}}>Large Grocery Store</Typography> labelPlacement="end" />
              <FormControlLabel checked={enableCGO} className={`MuiToggleButton ${enableCGO ? "Mui-selected" : "MuiToggleButton"}`} control={<Checkbox value="CGO" onChange={ShowCGO} checkedIcon={<DoneRoundedIcon style={{ color: '#00274C', fontSize: 'medium'}}/>} icon={<CloseRoundedIcon sx={{ fontSize: 'medium'}}/>} />} label=<Typography sx={{fontSize: 13}}>Combination Grocery/Other</Typography> labelPlacement="end" />
              <FormControlLabel checked={enableCS} className={`MuiToggleButton ${enableCS ? "Mui-selected" : "MuiToggleButton"}`} control={<Checkbox value="CS" onChange={ShowCS} checkedIcon={<DoneRoundedIcon style={{ color: '#00274C', fontSize: 'medium'}}/>} icon={<CloseRoundedIcon sx={{ fontSize: 'medium'}}/>} />} label=<Typography sx={{fontSize: 13}}>Convenience Store</Typography> labelPlacement="end" />
              <FormControlLabel checked={enableSS} className={`MuiToggleButton ${enableSS ? "Mui-selected" : "MuiToggleButton"}`} control={<Checkbox value="SS" onChange={ShowSS} checkedIcon={<DoneRoundedIcon style={{ color: '#00274C', fontSize: 'medium'}}/>} icon={<CloseRoundedIcon sx={{ fontSize: 'medium'}}/>} />} label=<Typography sx={{fontSize: 13}}>Super Store</Typography> labelPlacement="end" />
              <FormControlLabel checked={enableSM} className={`MuiToggleButton ${enableSM ? "Mui-selected" : "MuiToggleButton"}`} control={<Checkbox value="SM" onChange={ShowSM} checkedIcon={<DoneRoundedIcon style={{ color: '#00274C', fontSize: 'medium'}}/>} icon={<CloseRoundedIcon sx={{ fontSize: 'medium'}}/>} />} label=<Typography sx={{fontSize: 13}}>Supermarket</Typography> labelPlacement="end" />
              <FormControlLabel checked={enableFV} className={`MuiToggleButton ${enableFV ? "Mui-selected" : "MuiToggleButton"}`} control={<Checkbox value="FV" onChange={ShowFV} checkedIcon={<DoneRoundedIcon style={{ color: '#00274C', fontSize: 'medium'}}/>} icon={<CloseRoundedIcon sx={{ fontSize: 'medium'}}/>} />} label=<Typography sx={{fontSize: 13}}>Fruits/Veg Specialty</Typography> labelPlacement="end" />
              <FormControlLabel checked={enableMP} className={`MuiToggleButton ${enableMP ? "Mui-selected" : "MuiToggleButton"}`} control={<Checkbox value="MP" onChange={ShowMP} checkedIcon={<DoneRoundedIcon style={{ color: '#00274C', fontSize: 'medium'}}/>} icon={<CloseRoundedIcon sx={{ fontSize: 'medium'}}/>} />} label=<Typography sx={{fontSize: 13}}>Meat/Poultry Specialty</Typography> labelPlacement="end" />
              <FormControlLabel checked={enableSF} className={`MuiToggleButton ${enableSF ? "Mui-selected" : "MuiToggleButton"}`} control={<Checkbox value="SF" onChange={ShowSF} checkedIcon={<DoneRoundedIcon style={{ color: '#00274C', fontSize: 'medium'}}/>} icon={<CloseRoundedIcon sx={{ fontSize: 'medium'}}/>} />} label=<Typography sx={{fontSize: 13}}>Seafood Specialty</Typography> labelPlacement="end" />
              <FormControlLabel checked={enableDR} className={`MuiToggleButton ${enableDR ? "Mui-selected" : "MuiToggleButton"}`} control={<Checkbox value="DR" onChange={ShowDR} checkedIcon={<DoneRoundedIcon style={{ color: '#00274C', fontSize: 'medium'}}/>} icon={<CloseRoundedIcon sx={{ fontSize: 'medium'}}/>} />} label=<Typography sx={{fontSize: 13}}>Delivery Route</Typography> labelPlacement="end" />
              <FormControlLabel checked={enableFM} className={`MuiToggleButton ${enableFM ? "Mui-selected" : "MuiToggleButton"}`} control={<Checkbox value="FM" onChange={ShowFM} checkedIcon={<DoneRoundedIcon style={{ color: '#00274C', fontSize: 'medium'}}/>} icon={<CloseRoundedIcon sx={{ fontSize: 'medium'}}/>} />} label=<Typography sx={{fontSize: 13}}>Farmers' Market</Typography> labelPlacement="end" />
              <FormControlLabel checked={enableFBCO} className={`MuiToggleButton ${enableFBCO ? "Mui-selected" : "MuiToggleButton"}`} control={<Checkbox value="FBCO" onChange={ShowFBCO} checkedIcon={<DoneRoundedIcon style={{ color: '#00274C', fontSize: 'medium'}}/>} icon={<CloseRoundedIcon sx={{ fontSize: 'medium'}}/>} />} label=<Typography sx={{fontSize: 13}}>Food Buying Co-op</Typography> labelPlacement="end" />
              <FormControlLabel checked={enableMC} className={`MuiToggleButton ${enableMC ? "Mui-selected" : "MuiToggleButton"}`} control={<Checkbox value="MC" onChange={ShowMC} checkedIcon={<DoneRoundedIcon style={{ color: '#00274C', fontSize: 'medium'}}/>} icon={<CloseRoundedIcon sx={{ fontSize: 'medium'}}/>} />} label=<Typography sx={{fontSize: 13}}>Military Commissary</Typography> labelPlacement="end" />

{/*              <ToggleButton className={`MuiToggleButton ${enableALL ? "Mui-selected" : "MuiToggleButton"}`} value="ALL" onChange={() => { setALL(!enableALL) }} sx={{textTransform: "none"}}>All</ToggleButton>
              <ToggleButton className={`MuiToggleButton ${enableSGS ? "Mui-selected" : "MuiToggleButton"}`} value="SGS" onChange={ShowSGS} sx={{textTransform: "none"}}>Small Grocery Store</ToggleButton>
              <ToggleButton className={`MuiToggleButton ${enableMGS ? "Mui-selected" : "MuiToggleButton"}`} value="MGS" onChange={ShowMGS} sx={{textTransform: "none"}}>Medium Grocery Store</ToggleButton>
              <ToggleButton className={`MuiToggleButton ${enableLGS ? "Mui-selected" : "MuiToggleButton"}`} value="LGS" onChange={ShowLGS} sx={{textTransform: "none"}}>Large Grocery Store</ToggleButton>
              <ToggleButton className={`MuiToggleButton ${enableCGO ? "Mui-selected" : "MuiToggleButton"}`} value="CGO" onChange={ShowCGO} sx={{textTransform: "none"}}>Combination Grocery/Other</ToggleButton>
              <ToggleButton className={`MuiToggleButton ${enableCS ? "Mui-selected" : "MuiToggleButton"}`} value="CS" onChange={ShowCS} sx={{textTransform: "none"}}>Convenience Store</ToggleButton>
              <ToggleButton className={`MuiToggleButton ${enableSS ? "Mui-selected" : "MuiToggleButton"}`} value="SS" onChange={ShowSS} sx={{textTransform: "none"}}>Super Store</ToggleButton>
              <ToggleButton className={`MuiToggleButton ${enableSM ? "Mui-selected" : "MuiToggleButton"}`} value="SM" onChange={ShowSM} sx={{textTransform: "none"}}>Supermarket</ToggleButton>
              <ToggleButton className={`MuiToggleButton ${enableFV ? "Mui-selected" : "MuiToggleButton"}`} value="FV" onChange={ShowFV} sx={{textTransform: "none"}}>Fruits/Veg Specialty</ToggleButton>
              <ToggleButton className={`MuiToggleButton ${enableMP ? "Mui-selected" : "MuiToggleButton"}`} value="MP" onChange={ShowMP} sx={{textTransform: "none"}}>Meat/Poultry Specialty</ToggleButton>
              <ToggleButton className={`MuiToggleButton ${enableSF ? "Mui-selected" : "MuiToggleButton"}`} value="SF" onChange={ShowSF} sx={{textTransform: "none"}}>Seafood Specialty</ToggleButton>
              <ToggleButton className={`MuiToggleButton ${enableDR ? "Mui-selected" : "MuiToggleButton"}`} value="DR" onChange={ShowDR} sx={{textTransform: "none"}}>Delivery Route</ToggleButton>
              <ToggleButton className={`MuiToggleButton ${enableFM ? "Mui-selected" : "MuiToggleButton"}`} value="FM" onChange={ShowFM} sx={{textTransform: "none"}}>Farmers' Market</ToggleButton>
              <ToggleButton className={`MuiToggleButton ${enableFBCO ? "Mui-selected" : "MuiToggleButton"}`} value="FBCO" onChange={ShowFBCO} sx={{textTransform: "none"}}>Food Buying Co-op</ToggleButton>
              <ToggleButton className={`MuiToggleButton ${enableMC ? "Mui-selected" : "MuiToggleButton"}`} value="MC" onChange={ShowMC} sx={{textTransform: "none"}}>Military Commissary</ToggleButton>*/}
            </FormGroup>
            </div>
            </AccordionDetails>
          </Accordion>


{/*          <ToggleButton className={`MuiToggleButton ${showFBDCGroup ? "Mui-selected" : "MuiToggleButton"}`} value="FBDC" onChange={FBDCGroup}>Food Bank Council of Michigan</ToggleButton>
          <ToggleButton className={`MuiToggleButton ${enableMI ? "Mui-selected" : "MuiToggleButton"}`} value="MI" onChange={ShowMI}>MI Bridges Community Partners</ToggleButton>
          <ToggleButton className={`MuiToggleButton ${enableFO ? "Mui-selected" : "MuiToggleButton"}`} value="FO" onChange={ShowFO}>MDHHS Field Offices</ToggleButton>
          <ToggleButton className={`MuiToggleButton ${showSNAPGroup ? "Mui-selected" : "MuiToggleButton"}`} value="SNAP" onChange={ShowSNAPGroup}>Historical SNAP Store Locations</ToggleButton>
*/}        </div>
{/*        {showFBDCGroup && <div style={{ display: "flex", flexDirection: "column" }}>
          <ToggleButton className={`MuiToggleButton ${enableFB ? "Mui-selected" : "MuiToggleButton"}`} value="FB" onChange={ShowFB} sx={{textTransform: "none"}}>Food Banks</ToggleButton>
          <ToggleButton className={`MuiToggleButton ${enableDC ? "Mui-selected" : "MuiToggleButton"}`} value="DC" onChange={ShowDC} sx={{textTransform: "none"}}>Distribution Centers</ToggleButton>
        </div>}
        {showSNAPGroup && <div style={{ display: "flex", flexDirection: "column" }}>
          <ToggleButton className={`MuiToggleButton ${enableALL ? "Mui-selected" : "MuiToggleButton"}`} value="ALL" onChange={() => { setALL(!enableALL) }} sx={{textTransform: "none"}}>All</ToggleButton>
          <ToggleButton className={`MuiToggleButton ${enableSGS ? "Mui-selected" : "MuiToggleButton"}`} value="SGS" onChange={ShowSGS} sx={{textTransform: "none"}}>Small Grocery Store</ToggleButton>
          <ToggleButton className={`MuiToggleButton ${enableMGS ? "Mui-selected" : "MuiToggleButton"}`} value="MGS" onChange={ShowMGS} sx={{textTransform: "none"}}>Medium Grocery Store</ToggleButton>
          <ToggleButton className={`MuiToggleButton ${enableLGS ? "Mui-selected" : "MuiToggleButton"}`} value="LGS" onChange={ShowLGS} sx={{textTransform: "none"}}>Large Grocery Store</ToggleButton>
          <ToggleButton className={`MuiToggleButton ${enableCGO ? "Mui-selected" : "MuiToggleButton"}`} value="CGO" onChange={ShowCGO} sx={{textTransform: "none"}}>Combination Grocery/Other</ToggleButton>
          <ToggleButton className={`MuiToggleButton ${enableCS ? "Mui-selected" : "MuiToggleButton"}`} value="CS" onChange={ShowCS} sx={{textTransform: "none"}}>Convenience Store</ToggleButton>
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
*/}       
          <br />
          <div style={{flex: 1, height: '3px', backgroundColor: 'black', m: 1}} />
          {/* horizontal rule*/}
        </Collapse>
      </div>
    </div>
  );
}

export default Multiselection

