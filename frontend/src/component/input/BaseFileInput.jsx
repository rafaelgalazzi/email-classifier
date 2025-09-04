import React, { useState, useRef } from "react";
import styles from "./BaseFileInput.module.css";

export function BaseFileInput({
  onFilesSelected,
  accept = ".pdf,.txt",
  maxFiles = 5, // novo limite por padrão
  disabled = false, // nova prop para desabilitar
}) {
  const [isDragOver, setIsDragOver] = useState(false);
  const [files, setFiles] = useState([]);
  const fileInputRef = useRef(null);

  const acceptedList = accept.split(",").map((t) => t.trim().toLowerCase());

  const isAccepted = (file) =>
    acceptedList.some((type) => file.name.toLowerCase().endsWith(type));

  const mergeFiles = (incoming) => {
    if (disabled) return; // impede merge se desabilitado

    let incomingArr = Array.from(incoming).filter(isAccepted);

    // Se exceder o limite, corta os extras
    if (files.length + incomingArr.length > maxFiles) {
      const availableSlots = maxFiles - files.length;
      incomingArr = incomingArr.slice(0, availableSlots);
      console.warn(`Limite de ${maxFiles} arquivos atingido.`);
    }

    // Evita duplicados (por name + size + lastModified)
    const key = (f) => `${f.name}_${f.size}_${f.lastModified}`;
    const map = new Map(files.map((f) => [key(f), f]));
    incomingArr.forEach((f) => map.set(key(f), f));

    const next = Array.from(map.values());
    setFiles(next);
    onFilesSelected?.(next);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
    if (!disabled) mergeFiles(e.dataTransfer.files);
  };

  const handleChange = (e) => {
    if (!disabled) mergeFiles(e.target.files);
    e.target.value = ""; // permite re-selecionar o mesmo arquivo
  };

  const removeAt = (idx) => (e) => {
    e.stopPropagation();
    if (disabled) return;
    const next = files.filter((_, i) => i !== idx);
    setFiles(next);
    onFilesSelected?.(next);
  };

  const kb = (size) => `${Math.max(1, Math.round(size / 1024))} KB`;

  return (
    <div
      className={`${styles.fileInputContainer} ${
        isDragOver ? styles.dragOver : ""
      } ${disabled ? styles.disabled : ""}`}
      onDragOver={(e) => {
        if (disabled) return;
        e.preventDefault();
        e.stopPropagation();
        setIsDragOver(true);
      }}
      onDragLeave={(e) => {
        if (disabled) return;
        e.preventDefault();
        e.stopPropagation();
        setIsDragOver(false);
      }}
      onDrop={handleDrop}
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
