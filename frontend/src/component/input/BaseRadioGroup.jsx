import { useState } from "react";
import styles from "./BaseRadioGroup.module.css";

export function BaseRadioGroup({
  options = [],
  value = "",
  onChange,
  name = "radio-group",
  className = "",
  disabled = false
}) {
  const [selected, setSelected] = useState(value);

  const handleChange = (newValue) => {
    if (disabled) return;
    setSelected(newValue);
    onChange?.(newValue);
  };

  return (
    <div
      className={`${styles.container} ${className} ${
        disabled ? styles.disabled : ""
      }`}
    >
      {options.map((option) => (
        <label
          key={option.value}
          className={`${styles.option} ${
            selected === option.value ? styles.selected : ""
          }`}
        >
          <input
            type="radio"
            name={name}
            value={option.value}
            checked={selected === option.value}
            onChange={() => handleChange(option.value)}
            disabled={disabled}
          />
          <span>{option.label}</span>
        </label>
      ))}
    </div>
  );
}
