export const formatDistanceToNow = (date) => {
  const now = new Date()
  const diffInMs = now - date
  const diffInMinutes = Math.floor(diffInMs / (1000 * 60))
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60))
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24))
  
  if (diffInMinutes < 1) return 'just now'
  if (diffInMinutes < 60) return `${diffInMinutes}m`
  if (diffInHours < 24) return `${diffInHours}h`
  if (diffInDays < 7) return `${diffInDays}d`
  
  return date.toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric' 
  })
}

export const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

export const formatDateRange = (startDate, endDate) => {
  const start = new Date(startDate)
  const end = new Date(endDate)
  
  const startStr = start.toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric' 
  })
  const endStr = end.toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric',
    year: 'numeric'
  })
  
  return `${startStr} - ${endStr}`
}