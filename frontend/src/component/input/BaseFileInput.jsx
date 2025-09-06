import React, { useState, useRef, useEffect } from "react";
import styles from "./BaseFileInput.module.css";

export function BaseFileInput({
  value,
  onFilesSelected,
  accept = ".pdf,.txt",
  maxFiles = 5,
  disabled = false,
}) {
  const [internalFiles, setInternalFiles] = useState([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef(null);

  const files = value !== undefined ? value : internalFiles;

  useEffect(() => {
    if (value !== undefined) {
      setInternalFiles(value);
    }
  }, [value]);

  const acceptedList = accept.split(",").map((t) => t.trim().toLowerCase());
  const isAccepted = (file) =>
    acceptedList.some((type) => file.name.toLowerCase().endsWith(type));

  const mergeFiles = (incoming) => {
    if (disabled) return;

    let incomingArr = Array.from(incoming).filter(isAccepted);

    if (files.length + incomingArr.length > maxFiles) {
      const availableSlots = maxFiles - files.length;
      incomingArr = incomingArr.slice(0, availableSlots);
      console.warn(`Limite de ${maxFiles} arquivos atingido.`);
    }

    const key = (f) => `${f.name}_${f.size}_${f.lastModified}`;
    const map = new Map(files.map((f) => [key(f), f]));
    incomingArr.forEach((f) => map.set(key(f), f));

    const next = Array.from(map.values());
    if (value === undefined) {
      setInternalFiles(next);
    }
    onFilesSelected?.(next);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
    if (!disabled) mergeFiles(e.dataTransfer.files);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!disabled) setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  };

  const handleChange = (e) => {
    if (!disabled) mergeFiles(e.target.files);
    e.target.value = "";
  };

  const removeAt = (idx) => (e) => {
    e.stopPropagation();
    if (disabled) return;
    const next = files.filter((_, i) => i !== idx);
    if (value === undefined) {
      setInternalFiles(next);
    }
    onFilesSelected?.(next);
  };

  const kb = (size) => `${Math.max(1, Math.round(size / 1024))} KB`;

  return (
    <div
      className={`${styles.fileInputContainer} ${
        isDragOver ? styles.dragOver : ""
      } ${disabled ? styles.disabled : ""}`}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onClick={() => {
        if (!disabled) fileInputRef.current?.click();
      }}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (disabled) return;
        if (e.key === "Enter" || e.key === " ") fileInputRef.current?.click();
      }}
    >
      <input
        ref={fileInputRef}
        type="file"
        className={styles.hiddenInput}
        multiple
        accept={accept}
        onChange={handleChange}
        disabled={disabled}
      />

      <p>Arraste e solte arquivos aqui ou clique para selecionar</p>
      <p className={styles.fileInputText}>
        Permitidos: {accept} | Máx: {maxFiles}
      </p>

      {files.length > 0 && (
        <div className={styles.tilesGrid}>
          {files.map((file, idx) => (
            <div
              key={`${file.name}_${file.size}_${file.lastModified}`}
              className={styles.tile}
              title={file.name}
            >
              {!disabled && (
                <div
                  className={styles.removeBtn}
                  onClick={removeAt(idx)}
                  aria-label={`Remover ${file.name}`}
                >
                  ×
                </div>
              )}

              <div className={styles.fileGlyph}>
                {file.name.toLowerCase().endsWith(".pdf") ? "📄" : "📝"}
              </div>

              <div className={styles.fileName}>{file.name}</div>
              <div className={styles.fileMeta}>{kb(file.size)}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
