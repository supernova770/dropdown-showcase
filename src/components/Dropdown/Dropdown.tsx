import { useEffect, useState, useRef } from "react";
import { ArrowIcon } from "../Icons/ArrowIcon";
import { CrossIcon } from "../Icons/CrossIcon";
import { CheckIcon } from "../Icons/CheckIcon";
import {useDetectKeyPress} from "../Hooks/useDetectKeyPress";
import styles from "./Dropdown.module.css";

type optionObject = {
  value: string | number;
  label: string | number;
};

interface dropdownProps {
  options: optionObject[];
  label: string;
  defaultValue?: string | number;
  onChange(selectedOption: string | number): void;
}

const Dropdown = (props: dropdownProps) => {

  const { options, label, defaultValue, onChange } = props;
  
  const dropDownFocusRef = useRef<HTMLDivElement>(null);
  const prevCountRef = useRef<number>();

  const [expand, setExpand] = useState<Boolean>(false);
  const [selectedOption, setSelectedOption] = useState<string | number>("");
  const [selectionEvent, setSelectionEvent] = useState<Boolean>(false);
  const [count, setCount] = useState<number>(0);

  const arrowUpPressed = useDetectKeyPress('ArrowUp');
  const arrowDownPressed = useDetectKeyPress('ArrowDown');
  const enterPressed = useDetectKeyPress('Enter');

  useEffect(() => {
    if (enterPressed) {
      setSelectionEvent(true);
      setExpand((prevState) => !prevState);
      setSelectedOption(options[count].value)
    }
  }, [enterPressed]);

  useEffect(() => {
    if (arrowUpPressed) {
      if (count > 0 ){
        setCount((count) => count - 1)
      }
    }
  }, [arrowUpPressed]);

  useEffect(() => {
    if (arrowDownPressed) {
      if (count < options.length -1 ){
        setCount((count) => count + 1)
      }
    }
  }, [arrowDownPressed]);

  useEffect(() => {
    prevCountRef.current = count;
  }, [count]);
 

  /* 
    If there exists a default value, set it and invoke onChange with the default value to be consistent. 
    If not, set the given label at first mount.
  */
  useEffect(() => {
    if (typeof defaultValue === "string" || typeof defaultValue === "number") {
      setSelectedOption(defaultValue);
      setSelectionEvent(true);
      onChange(defaultValue);
    } else {
      setSelectedOption(options[0].value);
      onChange("please select an option below.");
    }
  }, []);

  // Handle the click event of the ArrowIcon.
  const handleExpand = () => {
    setExpand((prevState) => !prevState);
  };

  // Handle option click. Set the value internally, externally with onChange and collapse the list.
  const handleClick = (val: string | number) => {
    setSelectedOption(val);
    setSelectionEvent(true);
    onChange(val);
    setExpand(false);
  };

  // If clicked on cross icon, clear the selection and return to default styling.
  const clearSelection = () => {
    setSelectedOption(options[0].value);
    setSelectionEvent(false);
    onChange("please select an option below.");
  };

  return (
    <div className={styles["dropdown-root"]} tabIndex={0} ref={dropDownFocusRef}>
      <div
        className={
          expand
            ? styles["dropdown-input-expanded"]
            : styles["dropdown-input-collapsed"]
        }
        onClick={()=>handleExpand()}
      >
        <div
          className={
            selectionEvent 
              ? styles["dropdown-selected-value"]
              : styles["dropdown-selected-value-initial"]
          }
        >
          <div className={selectionEvent ? styles["dropdown-selected-value-chip"] : ""}>
            {selectedOption} 
            {selectionEvent && (<CrossIcon handleCross={clearSelection} />)}
          </div>
        </div>
        <ArrowIcon />
      </div>
      {expand && (
        <div className={styles["dropdown-menu"]}>
          {options.map((option, i) => (
            <div
              key={String(option.value) + i}
              className={(i===count) ? styles["dropdown-option-selected"] : styles["dropdown-option"]}
              onClick={() => handleClick(option.value)}
            >
              {option.label}
              {option.value === selectedOption ? <CheckIcon /> : null}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
