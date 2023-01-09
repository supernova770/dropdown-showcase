import Dropdown from "./components/Dropdown/Dropdown";
import { useState } from "react";
import styles from "./App.module.css";

const optionsData = [
  { value: "Select a guitar brand", label: "Select a guitar" },
  { value: "Fender", label: "Fender" },
  { value: "Strandberg", label: "Strandberg" },
  { value: "Gibson", label: "Gibson" },
  { value: "Ibanez", label: "Ibanez" },
  { value: "ESP", label: "ESP" },
  { value: "Cort", label: "Cort" },
];

const App = () => {

  const [selectedBrand, setSelectedBrand] = useState<string>("");

  const selectBrandHandler = (selectedOption: string) => {
    setSelectedBrand(selectedOption);
  };

  return (
    <div style={{ display: "flex", alignContent:"center" }}>
      <div style={{margin:"0 auto", textAlign:"center"}}>
        <h1 style={{ margin: 10, fontFamily: "Arial", fontSize:25 }}>
          Dropdown with default selection 
        </h1>
        <h4 style={{ margin: 10, fontFamily: "Arial", fontSize:18 }}>
          selected: {selectedBrand}
        </h4>
        <Dropdown
          options={optionsData}
          // defaultValue={"Strandberg"}
          label="Select a guitar brand:"
          onChange={selectBrandHandler}
        />
      </div>
    </div>
  );
};

export default App;
