import { useEffect, useState, useRef, KeyboardEvent } from "react";
import { ArrowIcon } from "../Icons/ArrowIcon";
import { CrossIcon } from "../Icons/CrossIcon";
import { CheckIcon } from "../Icons/CheckIcon";
import styles from "./Dropdown.module.css";

type optionObject = {
  value: string | number;
  label: string | number;
};

interface dropdownProps {
  options: optionObject[];
  label: string;
  defaultValue?: string | number;
  width: number;
  onChange(selectedOption: string | number): void;
}

const Dropdown = (props: dropdownProps) => {
  const { options, width, defaultValue, onChange } = props;

  const dropDownFocusRef = useRef<HTMLDivElement>(null);

  const [expand, setExpand] = useState<Boolean>(false);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number>(0);
  const [selectionEvent, setSelectionEvent] = useState<Boolean>(false);

  const [focus, setFocus] = useState<Boolean>(false);

  // Grouping state manager
  const setState = (index?: number, event?: boolean, expand?: boolean) => {
    if (typeof index !== "undefined") {
      setSelectedOptionIndex(index);
    } else if (typeof event !== "undefined") {
      setSelectionEvent(event);
    } else if (typeof expand !== "undefined") {
      setExpand(expand);
    }
  };

  /* 
    If there exists a default value, set it and invoke onChange with the default value to be consistent. 
    If not, set the given label at first mount.
  */
  useEffect(() => {
    if (typeof defaultValue === "string" || typeof defaultValue === "number") {
      setSelectionEvent(true);
      onChange(defaultValue);
    } else {
      onChange("please select one.");
    }
  }, []);

  // Handle the click event of the ArrowIcon.
  const handleExpand = (): void => {
    setExpand((prevState) => !prevState);
  };

  // Handle option click. Set the value internally, externaly with onChange and collapse the list.
  const handleClick = (index: number): void => {
    setState(index, true, false);
    setExpand((prevState) => !prevState);
  };

  // If clicked on cross icon, clear the selection and return to default styling.
  const clearSelection = (): void => {
    setState(0, false, false);
    onChange("please select one.");
  };

  const handleActiveFocus = (e: any): void => {
    if (e.type === "focus") {
      setFocus(true);
      return;
    }
    setFocus(false);
    setExpand(false);
  };

  function handleKeys(e: KeyboardEvent<HTMLDivElement>): void {
    e.stopPropagation();
    const { key } = e;

      switch (key) {
        case "Enter":
          setSelectionEvent(true);
          setExpand((prevState) => !prevState);
          onChange(options[selectedOptionIndex].value);
        break;
        case " ":
          setSelectionEvent(true);
          setExpand((prevState) => !prevState);
          onChange(options[selectedOptionIndex].value);
        break;
        case "Backspace":
          clearSelection();
        break;
        case "ArrowUp": setSelectedOptionIndex((prevIndex) => {
          if(prevIndex > 0) {
            return prevIndex - 1
          }
          return 0
        });
        break;
        case "ArrowDown": setSelectedOptionIndex((prevIndex) => {
          if(selectedOptionIndex < options.length - 1) {
            return prevIndex + 1
          }
          return 0
        });
        break;
        case "Escape": setExpand((prevState) => !prevState);
        break;
      }
      // Disable navigation when collapsed to ensure consistent behaviour.
      if (!expand) return;
  
  }

  return (
    <div
      className={styles["dropdown-root"]}
      role="listbox"
      style={{ width: width }}
      tabIndex={0}
      ref={dropDownFocusRef}  
      onFocus={(e) => handleActiveFocus(e)}
      onBlur={(e) => handleActiveFocus(e)}
      onKeyDown={(e) => handleKeys(e)}
      aria-expanded={true}
    >
      <div
        className={
          expand
            ? styles["dropdown-input-expanded"]
            : styles["dropdown-input-collapsed"]
        }
        onClick={() => handleExpand()}
      >
        <div
          className={
            selectionEvent
              ? styles["dropdown-selected-value"]
              : styles["dropdown-selected-value-initial"]
          }
        >
          <div
            className={
              selectionEvent ? styles["dropdown-selected-value-chip"] : ""
            }
          >
            {options[selectedOptionIndex].value}
            {selectionEvent && <CrossIcon handleCross={clearSelection} />}
          </div>
        </div>
        <ArrowIcon />
      </div>
      {expand && (
        <div className={styles["dropdown-menu"]}>
          {options.map((option, index) => (
            <div
              key={String(option.value) + index}
              className={
                index === selectedOptionIndex
                  ? styles["dropdown-option-selected"]
                  : styles["dropdown-option"]
              }
              onClick={() => handleClick(index)}
            >
              {option.label}
              {option.value === options[selectedOptionIndex].value ? (
                <CheckIcon />
              ) : null}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
