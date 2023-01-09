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

const optionsData2 = [
  { value: "Select a number of strings", label: "Select a number of strings" },
  { value: 6, label: 6 },
  { value: 7, label: 7 },
  { value: 8, label: 8 },
];

const App = () => {
  const [selectedBrand, setSelectedBrand] = useState<string>("");
  const [selectedString, setSelectedString] = useState<number>(6);

  const selectBrandHandler = (selectedOption: string) => {
    setSelectedBrand(selectedOption);
  };

  const selectStringHandler = (selectedOption: number) => {
    setSelectedString(selectedOption);
  };

  return (
    <div style={{ display: "flex", alignContent: "center" }}>
      <div style={{ margin: "0 auto", textAlign: "center" }}>
        <h1
          style={{
            margin: 10,
            fontFamily: "Arial",
            fontSize: 40,
            fontWeight: "bold  ",
          }}
        >
          React Dropdown
        </h1>
        <h4 style={{ margin: 10, fontFamily: "Arial", fontSize: 18 }}>
          This is a dropdown without a default value.
        </h4>
        <h4 style={{ margin: 10, fontFamily: "Arial", fontSize: 18 }}>
          Selected value: {selectedBrand}
        </h4>
        <Dropdown
          options={optionsData}
          // defaultValue={"Strandberg"}
          label="Select a guitar brand:"
          onChange={selectBrandHandler}
        />
        <h4 style={{ margin: 10, fontFamily: "Arial", fontSize: 18 }}>
          This is a dropdown with a default value
        </h4>
        <h4 style={{ margin: 10, fontFamily: "Arial", fontSize: 18 }}>
          Selected value: {selectedString}
        </h4>
        <Dropdown
          options={optionsData2}
          defaultValue={6}
          label="Select a guitar brand:"
          onChange={selectStringHandler}
        />
      </div>
    </div>
  );
};

export default App;
