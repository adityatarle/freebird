import { forwardRef } from 'react'

const Button = forwardRef(({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  loading = false, 
  disabled = false,
  fullWidth = false,
  leftIcon,
  rightIcon,
  className = '',
  ...props 
}, ref) => {
  const baseClasses = 'btn font-medium transition-all duration-200 border-0'
  
  const variants = {
    primary: 'btn-primary text-white hover:scale-105',
    secondary: 'btn-secondary text-white hover:scale-105',
    accent: 'btn-accent text-white hover:scale-105',
    ghost: 'btn-ghost hover:bg-base-200',
    outline: 'btn-outline hover:scale-105',
    link: 'btn-link text-primary hover:text-primary-focus',
    danger: 'bg-red-500 hover:bg-red-600 text-white hover:scale-105',
    success: 'bg-green-500 hover:bg-green-600 text-white hover:scale-105'
  }
  
  const sizes = {
    xs: 'btn-xs text-xs px-2',
    sm: 'btn-sm text-sm px-3',
    md: 'btn-md text-base px-4',
    lg: 'btn-lg text-lg px-6',
    xl: 'text-xl px-8 py-4'
  }
  
  const classes = `
    ${baseClasses}
    ${variants[variant] || variants.primary}
    ${sizes[size] || sizes.md}
    ${fullWidth ? 'w-full' : ''}
    ${loading ? 'loading' : ''}
    ${className}
  `.trim().replace(/\s+/g, ' ')
  
  return (
    <button
      ref={ref}
      className={classes}
      disabled={disabled || loading}
      {...props}
    >
      {leftIcon && !loading && (
        <span className="mr-2">{leftIcon}</span>
      )}
      {loading ? (
        <span className="loading loading-spinner loading-sm"></span>
      ) : (
        children
      )}
      {rightIcon && !loading && (
        <span className="ml-2">{rightIcon}</span>
      )}
    </button>
  )
})

Button.displayName = 'Button'

export default Button