import styles from "./BaseButton.module.css";

export function BaseButton({
  children,
  onClick,
  type = "button",
  variant = "primary",
  className = "",
  loading = false,
  disabled = false,
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${styles.baseButton} ${styles[variant]} ${className}`}
      disabled={loading || disabled}
    >
      {loading ? <span className={styles.loader}></span> : children}
    </button>
  );
}
