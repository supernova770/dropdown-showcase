import Dropdown from "./components/Dropdown/Dropdown";
import { useState } from "react";
import styles from "./App.module.css";
import { HiBackspace } from "react-icons/hi2";
import { HiOutlineArrowsUpDown } from "react-icons/hi2";
import { AiOutlineEnter } from "react-icons/ai";

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
    <div className={styles["app-main"]}>
      <div style={{ margin: "0 auto", textAlign: "center" }}>
        <h1 className={styles["dropdown-card-title"]}>React Dropdown</h1>
        <div className={styles["dropdown-card"]}>
          <h2>Keyboard Controls</h2>
          <span style={{display:"flex", verticalAlign:"middle"}}>
            <HiBackspace size={18} fill={"#383839"} style={{margin:"10px 0px 10px 10px"}}/>
            <h2>{"[Backspace]"} Erase Selection</h2>
          </span> 
          <span style={{display:"flex", verticalAlign:"middle"}}>
            <HiOutlineArrowsUpDown size={18} fill={"#383839"} style={{margin:"10px 0px 10px 10px"}}/>
            <h2>{"[Arrows Up/Down]"} Navigate List</h2>
          </span> 
          <span style={{display:"flex", verticalAlign:"middle"}}>
            <AiOutlineEnter size={18} fill={"#383839"} style={{margin:"10px 0px 10px 10px"}}/>
            <h2>{"[Enter]"} Expand/close list or select item.</h2>
          </span> 
        </div>
        <div className={styles["dropdown-card"]}>
          <h2>Below is a dropdown without a default value.</h2>
          <Dropdown
            options={optionsData}
            label="Select a guitar brand:"
            onChange={selectBrandHandler}
            width={360}
          />
          <h2>Selected value: {selectedBrand}</h2>
        </div>
        <div className={styles["dropdown-card"]}>
          <h2>Below is a dropdown with a default value</h2>
          <Dropdown
            options={optionsData2}
            defaultValue={6}
            label="Select a guitar brand:"
            onChange={selectStringHandler}
            width={360}
          />
          <h2>Selected value: {selectedString}</h2>
        </div>
      </div>
    </div>
  );
};

export default App;
