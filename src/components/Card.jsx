const Card = ({ 
  children, 
  className = '', 
  padding = 'p-4',
  shadow = 'shadow-md',
  hover = false,
  ...props 
}) => {
  const baseClasses = 'card bg-base-100 rounded-xl border border-base-200'
  
  const classes = `
    ${baseClasses}
    ${shadow}
    ${padding}
    ${hover ? 'hover:shadow-lg hover:scale-[1.02] transition-all duration-200 cursor-pointer' : ''}
    ${className}
  `.trim().replace(/\s+/g, ' ')
  
  return (
    <div className={classes} {...props}>
      {children}
    </div>
  )
}

export default Card