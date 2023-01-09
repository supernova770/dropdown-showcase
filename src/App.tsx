import Dropdown from "./components/Dropdown/Dropdown";
import { useState } from "react";

const App = () => {

  const [selectedBrand, setSelectedBrand] = useState<string | number>("Please select any of the above options.");
  const selectBrandHandler = (selectedOption: string | number) => {
    setSelectedBrand(selectedOption);
  };

  const [selectedStrings, setSelectedStrings] = useState<string | number>("Please select any of the above options.");
  const selectStringHandler = (selectedOption: string | number) => {
    setSelectedStrings(selectedOption);
  };

  return (
    <>
      <p style={{margin:10,fontFamily:"Arial"}}>Selected guitar brand: {selectedBrand}</p>
      <Dropdown
        options={[
          { value: "Fender", label: "Fender" },
          { value: "Strandberg", label: "Strandberg" },
          { value: "Gibson", label: "Gibson" },
          { value: "Ibanez", label: "Ibanez" },
          { value: "ESP", label: "ESP" },
          { value: "Cort", label: "Cort" }
        ]}
        // defaultValue={"Strandberg"}
        label="Choose a guitar brand:"
        onChange={selectBrandHandler}
      />
      <p style={{margin:10,fontFamily:"Arial"}}>Selected number of strings: {selectedStrings}</p>
      <Dropdown
        options={[
          { value: 6, label: 6 },
          { value: 7, label: 7 },
          { value: 8, label: 8 }
        ]}
        defaultValue={6}
        label="Choose number of strings:"
        onChange={selectStringHandler}
      />
    </>
  );
};

export default App;
