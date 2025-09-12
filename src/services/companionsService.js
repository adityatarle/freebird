import companionsData from '../data/companions.json'

// Simulate API delay
const delay = (ms = 700) => new Promise(resolve => setTimeout(resolve, ms))

export const fetchCompanions = async (filters = {}) => {
  await delay()
  
  let filteredCompanions = [...companionsData]
  
  // Apply filters
  if (filters.destination) {
    filteredCompanions = filteredCompanions.filter(companion => 
      companion.destination.toLowerCase().includes(filters.destination.toLowerCase())
    )
  }
  
  if (filters.travelStyle && filters.travelStyle !== 'all') {
    filteredCompanions = filteredCompanions.filter(companion => 
      companion.travelStyle === filters.travelStyle
    )
  }
  
  if (filters.budget && filters.budget !== 'all') {
    filteredCompanions = filteredCompanions.filter(companion => 
      companion.budget === filters.budget
    )
  }
  
  if (filters.languages && filters.languages.length > 0) {
    filteredCompanions = filteredCompanions.filter(companion => 
      companion.languages.some(lang => filters.languages.includes(lang))
    )
  }
  
  // Sort by rating
  filteredCompanions.sort((a, b) => b.rating - a.rating)
  
  return filteredCompanions
}

export const fetchCompanionById = async (id) => {
  await delay(300)
  const companion = companionsData.find(c => c.id === id)
  if (!companion) throw new Error('Companion not found')
  return companion
}

export const sendCompanionRequest = async (companionId, message) => {
  await delay(800)
  
  // Simulate sending a companion request
  return {
    success: true,
    companionId,
    message,
    status: 'sent',
    timestamp: new Date().toISOString()
  }
}

export const getMatchingCompanions = async (userPreferences = {}) => {
  await delay(600)
  
  let matches = [...companionsData]
  
  // Score companions based on compatibility
  const scored = matches.map(companion => {
    let score = companion.rating * 2 // Base score from rating
    
    // Bonus for matching travel style
    if (userPreferences.travelStyle === companion.travelStyle) {
      score += 3
    }
    
    // Bonus for matching budget
    if (userPreferences.budget === companion.budget) {
      score += 2
    }
    
    // Bonus for shared interests
    if (userPreferences.interests && companion.interests) {
      const sharedInterests = userPreferences.interests.filter(interest =>
        companion.interests.includes(interest)
      )
      score += sharedInterests.length
    }
    
    // Bonus for shared languages
    if (userPreferences.languages && companion.languages) {
      const sharedLanguages = userPreferences.languages.filter(lang =>
        companion.languages.includes(lang)
      )
      score += sharedLanguages.length * 0.5
    }
    
    return { ...companion, matchScore: score }
  })
  
  return scored
    .sort((a, b) => b.matchScore - a.matchScore)
    .slice(0, 10)
}

export const reportCompanion = async (companionId, reason) => {
  await delay(400)
  
  return {
    success: true,
    companionId,
    reason,
    timestamp: new Date().toISOString()
  }
}