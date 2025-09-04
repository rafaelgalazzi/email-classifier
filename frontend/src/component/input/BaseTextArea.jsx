import { useState } from "react";
import styles from "./BaseTextArea.module.css";

export function BaseTextArea({
  value = "",
  onChange,
  placeholder = "Digite aqui...",
  maxLength = null,
  rows = 4,
  className = "",
  disabled = false
}) {
  const [text, setText] = useState(value);

  const handleChange = (e) => {
    if (disabled) return; // bloqueia alterações se estiver desabilitado

    const newValue = e.target.value;
    if (maxLength && newValue.length > maxLength) return; // impede ultrapassar limite
    setText(newValue);
    onChange?.(newValue);
  };

  return (
    <div
      className={`${styles.container} ${className} p-md-3 p-1 ${
        disabled ? styles.disabled : ""
      }`}
    >
      <textarea
        className={styles.textArea}
        placeholder={placeholder}
        value={text}
        onChange={handleChange}
        rows={rows}
        disabled={disabled}
      />
      {maxLength && (
        <div className={styles.counter}>
          {text.length}/{maxLength}
        </div>
      )}
    </div>
  );
}
