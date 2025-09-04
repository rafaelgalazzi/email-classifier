import React, { useState, useRef } from "react";
import styles from "./BaseFileInput.module.css";

export function BaseFileInput({
  onFilesSelected,
  accept = ".pdf,.txt"
}) {
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef(null);

  const handleFiles = (files) => {
    if (!files) return;
    const acceptedTypes = accept.split(",").map((t) => t.trim().toLowerCase());
    const filteredFiles = Array.from(files).filter((file) =>
      acceptedTypes.some((type) => file.name.toLowerCase().endsWith(type))
    );

    if (filteredFiles.length && onFilesSelected) {
      onFilesSelected(filteredFiles);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
    handleFiles(e.dataTransfer.files);
  };

  return (
    <div
      className={`${styles.fileInputContainer} ${isDragOver ? styles.dragOver : ""}`}
      onDragOver={(e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragOver(true);
      }}
      onDragLeave={(e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragOver(false);
      }}
      onDrop={handleDrop}
      onClick={() => fileInputRef.current.click()} // 🔹 Usando useRef
    >
      <input
        ref={fileInputRef} // 🔹 UseRef para acessar o input
        type="file"
        className={styles.hiddenInput}
        multiple
        accept={accept}
        onChange={(e) => handleFiles(e.target.files)}
      />
      <p>Arraste e solte arquivos aqui ou clique para selecionar</p>
      <p className={styles.fileInputText}>Apenas arquivos {accept} são permitidos</p>
    </div>
  );
}
