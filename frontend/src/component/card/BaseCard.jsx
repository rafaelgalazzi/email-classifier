import styles from './BaseCard.module.css';

export function BaseCard(props) {
  const { children, style: customStyle = {}, className = '' } = props;

  return (
    <div 
      className={`${styles.cardContainer} ${className}`} 
      style={customStyle}
    >
      {children}
    </div>
  );
}
