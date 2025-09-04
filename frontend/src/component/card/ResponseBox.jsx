import { useState } from "react";
import styles from "./ResponseBox.module.css";
import { BaseText } from "../text/BaseText";

export function ResponseBox({ responseText = "" }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(responseText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Erro ao copiar", err);
    }
  };

  return (
    <div className="w-100 p-md-3 p-1">
      <div
        className={`${styles.container} ${copied ? styles.copied : ""}`}
        onClick={handleCopy}
        title="Clique para copiar"
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") handleCopy();
        }}
      >
        <textarea
          className={styles.textArea}
          value={responseText}
          readOnly
          rows={6}
        />
        <div className={`${styles.copyMessage} ${copied ? styles.visible : ""}`}>
          <BaseText fontSize="14px">Copiado!</BaseText>
        </div>
      </div>
    </div>
  );
}
