import destinationsData from '../data/destinations.json'

// Simulate API delay
const delay = (ms = 600) => new Promise(resolve => setTimeout(resolve, ms))

export const fetchDestinations = async (filters = {}) => {
  await delay()
  
  let filteredDestinations = [...destinationsData]
  
  // Apply filters
  if (filters.category && filters.category !== 'all') {
    filteredDestinations = filteredDestinations.filter(dest => 
      dest.category === filters.category
    )
  }
  
  if (filters.budget && filters.budget !== 'all') {
    filteredDestinations = filteredDestinations.filter(dest => 
      dest.budget === filters.budget
    )
  }
  
  if (filters.search) {
    const searchTerm = filters.search.toLowerCase()
    filteredDestinations = filteredDestinations.filter(dest => 
      dest.name.toLowerCase().includes(searchTerm) ||
      dest.country.toLowerCase().includes(searchTerm) ||
      dest.description.toLowerCase().includes(searchTerm)
    )
  }
  
  // Sort by rating by default
  filteredDestinations.sort((a, b) => b.rating - a.rating)
  
  return filteredDestinations
}

export const fetchDestinationById = async (id) => {
  await delay(300)
  const destination = destinationsData.find(d => d.id === id)
  if (!destination) throw new Error('Destination not found')
  return destination
}

export const searchDestinations = async (query) => {
  await delay(400)
  
  if (!query || query.length < 2) return []
  
  const searchTerm = query.toLowerCase()
  return destinationsData.filter(dest => 
    dest.name.toLowerCase().includes(searchTerm) ||
    dest.country.toLowerCase().includes(searchTerm) ||
    dest.activities.some(activity => activity.toLowerCase().includes(searchTerm))
  ).slice(0, 10) // Limit results
}

export const getPopularDestinations = async () => {
  await delay(400)
  // Return top rated destinations
  return destinationsData
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 6)
}

export const getRecommendedDestinations = async (userInterests = []) => {
  await delay(500)
  
  if (userInterests.length === 0) {
    return getPopularDestinations()
  }
  
  // Score destinations based on user interests
  const scored = destinationsData.map(dest => {
    const matchingActivities = dest.activities.filter(activity =>
      userInterests.some(interest => 
        interest.toLowerCase().includes(activity.toLowerCase()) ||
        activity.toLowerCase().includes(interest.toLowerCase())
      )
    )
    
    return {
      ...dest,
      score: matchingActivities.length * dest.rating
    }
  })
  
  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, 8)
}