import { useEffect, useState, useRef } from "react";
import { ArrowIcon } from "../Icons/ArrowIcon";
import { CrossIcon } from "../Icons/CrossIcon";
import { CheckIcon } from "../Icons/CheckIcon";
import { useDetectKeyPress } from "../Hooks/useDetectKeyPress";
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
  const { options, width, label, defaultValue, onChange } = props;

  const dropDownFocusRef = useRef<HTMLDivElement>(null);
  const prevCountRef = useRef<number>();

  const [expand, setExpand] = useState<Boolean>(false);
  const [selectedOption, setSelectedOption] = useState<string | number>("");
  const [selectionEvent, setSelectionEvent] = useState<Boolean>(false);
  const [counter, setCounter] = useState<number>(0);
  const [focus, setFocus] = useState<Boolean>(false);

  const arrowUpKey = useDetectKeyPress("ArrowUp");
  const arrowDownKey = useDetectKeyPress("ArrowDown");
  const enterKey = useDetectKeyPress("Enter");
  const deleteKey = useDetectKeyPress("Backspace");

  // Handle keyboard input and increase count to navigate list.
  useEffect(() => {
    if (focus) {

      if (enterKey) {
        setSelectionEvent(true);
        setExpand((prevState) => !prevState);
        setSelectedOption(options[counter].value);
        onChange(options[counter].value);
      }

      // Disable navigation when collapsed to assure consistent behaviour.
      if (!expand) return;

      if (arrowUpKey) {
        if (counter > 0) {
          setCounter((prevCount) => prevCount - 1);
        }
      }
      if (arrowDownKey) {
        if (counter < options.length - 1) {
          setCounter((prevCount) => prevCount + 1);
        }
      }
      if (deleteKey) {
        clearSelection();
      }
    }
  }, [enterKey, arrowUpKey, arrowDownKey, deleteKey]);

  useEffect(() => {
    prevCountRef.current = counter;
  }, [counter]);

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
      onChange("please select an option.");
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
    onChange("please select an option.");
    setExpand(false);
    setCounter(0);
  };

  const handleActiveFocus = (e: any) => {
    if (e.type === "focus") {
      setFocus(true);
      return;
    }
    setFocus(false);
  };

  return (
    <div
      className={styles["dropdown-root"]}
      style={{ width: width }}
      tabIndex={0}
      ref={dropDownFocusRef}
      onFocus={(e) => handleActiveFocus(e)}
      onBlur={(e) => handleActiveFocus(e)}
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
            {selectedOption}
            {selectionEvent && <CrossIcon handleCross={clearSelection} />}
          </div>
        </div>
        <ArrowIcon />
      </div>
      {expand && (
        <div className={styles["dropdown-menu"]}>
          {options.map((option, i) => (
            <div
              key={String(option.value) + i}
              className={
                i === counter
                  ? styles["dropdown-option-selected"]
                  : styles["dropdown-option"]
              }
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
