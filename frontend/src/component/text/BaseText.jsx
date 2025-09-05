export function BaseText(props) {
  const { 
    width = '100%', 
    fontSize = '16px', 
    justify = 'center', 
    align = 'center', 
    color = '#e0e0e0',
    className = ''
  } = props;

  return (
    <div 
      className={`${className}`}
      style={{ 
        width, 
        fontSize, 
        display: 'flex', 
        justifyContent: justify, 
        alignItems: align,
        color,
        textAlign: 'center'
      }}
    >
      {props.children}
    </div>
  );
}
