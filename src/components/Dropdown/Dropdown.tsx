import { useEffect, useState } from "react";
import { ArrowIcon } from "../Icons/ArrowIcon";
import { CrossIcon } from "../Icons/CrossIcon";
import styles from "./Dropdown.module.css";

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

  // If clicked on cross icon, clear the selection and return to default styling.
  const clearSelection = () => {
    setSelectedOption(label);
    setIsSelected(false);
    if (typeof defaultValue === "string" || typeof defaultValue === "number") {
      onChange(defaultValue);
    } else {
      onChange(label);
    }
  };

  return (
    <div className={styles["dropdown-container"]}>
      <div
        className={
          expand
            ? styles["dropdown-input-expanded"]
            : styles["dropdown-input-collapsed"]
        }
      >
        <div
          className={
            isSelected
              ? styles["dropdown-selected-value"]
              : styles["dropdown-selected-value-initial"]
          }
        >
          <div className={isSelected ? styles["chip"] : ""}>
            {selectedOption}
            {isSelected && <CrossIcon handleCross={clearSelection} />}
          </div>
        </div>
        <ArrowIcon handleArrow={handleArrow} />
      </div>
      {expand && (
        <div className={styles["dropdown-menu"]}>
          {options.map((option, i) => (
            <div
              key={String(option.value) + i}
              className={styles["dropdown-option"]}
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
