import { useEffect, useState } from "react";
import "./Dropdown.css";
import { ArrowIcon } from "../Icons/ArrowIcon";
import { CrossIcon } from "../Icons/CrossIcon";

type obj = {
  value: string | number;
  label: string | number;
};

interface props {
  options: obj[];
  label: string;
  defaultValue?: string | number;
  onChange: (event: any) => void;
}

const Dropdown = (props: props) => {
  const { options, label, defaultValue, onChange } = props;

  const [expand, setExpand] = useState<Boolean>(false);
  const [selectedOption, setSelectedOption] = useState<string | number>("");
  const [isSelected, setIsSelected] = useState(false);

  /* 
    If there exists a default value, set it and invoke onChange with the default value to be consistent. 
    If not, set the given label at first mount.
  */
  useEffect(() => {
    if (typeof defaultValue === "string" || typeof defaultValue === "number") {
      setSelectedOption(defaultValue);
      onChange(defaultValue);
    } else {
      setSelectedOption(label);
    }
  }, []);

  // Handle the click event of the ArrowIcon.
  const handleArrow = () => {
    setExpand((prevState) => !prevState);
  };

  // Handle option click. Set the value internally, externally with onChange and collapse the list.
  const handleClick = (val: string | number) => {
    setSelectedOption(val);
    setIsSelected(true);
    onChange(val);
    setExpand(false);
  };

  const clearSelection = () => {
    setSelectedOption(label);
    setIsSelected(false)
  }

  return (
    <div className="dropdown-container">
      <div
        className={
          expand ? "dropdown-input-expanded" : "dropdown-input-collapsed"
        }
      >
        <div
          className={
            isSelected
              ? "dropdown-selected-value"
              : "dropdown-selected-value-initial"
          }
        >
          {" "}
          <div className={isSelected ? "chip" : ""}>
            {selectedOption}  
            {isSelected && (<CrossIcon handleCross={clearSelection}/>)}
          </div>
        </div>
        <ArrowIcon handleArrow={handleArrow} />
      </div>
      {expand && (
        <div className="dropdown-menu">
          {options.map((option, i) => (
            <div
              key={String(option.value) + i}
              className="dropdown-option"
              onClick={() => handleClick(option.value)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
