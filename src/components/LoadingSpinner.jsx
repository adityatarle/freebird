const LoadingSpinner = ({ size = 'md', className = '' }) => {
  const sizes = {
    xs: 'loading-xs',
    sm: 'loading-sm',
    md: 'loading-md',
    lg: 'loading-lg'
  }
  
  return (
    <div className={`flex items-center justify-center p-8 ${className}`}>
      <span className={`loading loading-spinner ${sizes[size]} text-primary`}></span>
    </div>
  )
}

export default LoadingSpinner