import * as React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { useEffect, useState } from 'react';
import "./styles.css";

function Multiselection() {

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

  const FBDCGroup = () => {setshowFBDCGroup(!showFBDCGroup);};
  const ShowMI = () => {setMI(!enableMI);};
  const ShowFO = () => {setFO(!enableFO);};
  const ShowSNAPGroup = () => {setshowSNAPGroup(!showSNAPGroup);};
  
  const ShowFB = () => {setFB(!enableFB);};
  const ShowDC = () => {setDC(!enableDC);};

  const ShowSGS = () => {setSGS(!enableSGS);};
  const ShowMGS = () => {setMGS(!enableMGS);};
  const ShowLGS = () => {
    setLGS(!enableLGS);
    if (enableALL === true) {
      setALL(false)
    }
  };
  const ShowCGO = () => {setCGO(!enableCGO);};
  const ShowCS = () => {setCS(!enableCS);};
  const ShowSS = () => {setSS(!enableSS);};
  const ShowSM = () => {setSM(!enableSM);};
  const ShowFV = () => {setFV(!enableFV);};
  const ShowMP = () => {setMP(!enableMP);};
  const ShowSF = () => {setSF(!enableSF);};
  const ShowDR = () => {setDR(!enableDR);};
  const ShowFM = () => {setFM(!enableFM);};
  const ShowFBCO = () => {setFBCO(!enableFBCO);};
  const ShowMC = () => {setMC(!enableMC);};

  
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
    else {
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
  },[enableALL])

  return (
    <div style={{ display: "flex" }}>
      <div style={{ display: "flex", flexDirection: "column" }}>
          <ToggleButton className={`MuiToggleButton ${showFBDCGroup ? "Mui-selected" : "MuiToggleButton"}`} value="FBDC" onChange={FBDCGroup}>Food Bank Council of Michigan</ToggleButton>
          <ToggleButton className={`MuiToggleButton ${enableMI ? "Mui-selected" : "MuiToggleButton"}`} value="MI" onChange={ShowMI}>MI Bridges Community Partners</ToggleButton>
          <ToggleButton className={`MuiToggleButton ${enableFO ? "Mui-selected" : "MuiToggleButton"}`} value="FO" onChange={ShowFO}>MDHHS Field Offices</ToggleButton>
          <ToggleButton className={`MuiToggleButton ${showSNAPGroup ? "Mui-selected" : "MuiToggleButton"}`} value="SNAP" onChange={ShowSNAPGroup}>Historical SNAP Store Locations</ToggleButton>
      </div>
      {showFBDCGroup && <div style={{ display: "flex", flexDirection: "column" }}>
          <ToggleButton className={`MuiToggleButton ${enableFB ? "Mui-selected" : "MuiToggleButton"}`} value="FB" onChange={ShowFB}>Food Banks</ToggleButton>
          <ToggleButton className={`MuiToggleButton ${enableDC ? "Mui-selected" : "MuiToggleButton"}`} value="DC" onChange={ShowDC}>Distribution Centers</ToggleButton>
      </div>}
      {showSNAPGroup && <div style={{ display: "flex", flexDirection: "column" }}>
          <ToggleButton className={`MuiToggleButton ${enableALL ? "Mui-selected" : "MuiToggleButton"}`} value="ALL" onChange={()=>{setALL(!enableALL)}}>All</ToggleButton>
          <ToggleButton className={`MuiToggleButton ${enableSGS ? "Mui-selected" : "MuiToggleButton"}`} value="SGS" onChange={ShowSGS}>Small Grocery Store</ToggleButton>
          <ToggleButton className={`MuiToggleButton ${enableMGS ? "Mui-selected" : "MuiToggleButton"}`} value="MGS" onChange={ShowMGS}>Medium Grocery Store</ToggleButton>
          <ToggleButton className={`MuiToggleButton ${enableLGS ? "Mui-selected" : "MuiToggleButton"}`} value="LGS" onChange={ShowLGS}>Large Grocery Store</ToggleButton>
          <ToggleButton className={`MuiToggleButton ${enableCGO ? "Mui-selected" : "MuiToggleButton"}`} value="CGO" onChange={ShowCGO}>Combination Grocery/Other</ToggleButton>
          <ToggleButton className={`MuiToggleButton ${enableCS ? "Mui-selected" : "MuiToggleButton"}`} value="CS" onChange={ShowCS}>Convenience Store</ToggleButton>
          <ToggleButton className={`MuiToggleButton ${enableSS ? "Mui-selected" : "MuiToggleButton"}`} value="SS" onChange={ShowSS}>Super Store</ToggleButton>
          <ToggleButton className={`MuiToggleButton ${enableSM ? "Mui-selected" : "MuiToggleButton"}`} value="SM" onChange={ShowSM}>Supermarket</ToggleButton>
          <ToggleButton className={`MuiToggleButton ${enableFV ? "Mui-selected" : "MuiToggleButton"}`} value="FV" onChange={ShowFV}>Fruits/Veg Specialty</ToggleButton>
          <ToggleButton className={`MuiToggleButton ${enableMP ? "Mui-selected" : "MuiToggleButton"}`} value="MP" onChange={ShowMP}>Meat/Poultry Specialty</ToggleButton>
          <ToggleButton className={`MuiToggleButton ${enableSF ? "Mui-selected" : "MuiToggleButton"}`} value="SF" onChange={ShowSF}>Seafood Specialty</ToggleButton>
          <ToggleButton className={`MuiToggleButton ${enableDR ? "Mui-selected" : "MuiToggleButton"}`} value="DR" onChange={ShowDR}>Delivery Route</ToggleButton>
          <ToggleButton className={`MuiToggleButton ${enableFM ? "Mui-selected" : "MuiToggleButton"}`} value="FM" onChange={ShowFM}>Farmers' Market</ToggleButton>
          <ToggleButton className={`MuiToggleButton ${enableFBCO ? "Mui-selected" : "MuiToggleButton"}`} value="FBCO" onChange={ShowFBCO}>Food Buying Co-op</ToggleButton>
          <ToggleButton className={`MuiToggleButton ${enableMC ? "Mui-selected" : "MuiToggleButton"}`} value="MC" onChange={ShowMC}>Military Commissary</ToggleButton>
      </div>}
    </div>

  )
}

export default Multiselection

