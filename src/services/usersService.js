import usersData from '../data/users.json'

// Simulate API delay
const delay = (ms = 500) => new Promise(resolve => setTimeout(resolve, ms))

export const fetchUserProfile = async (username) => {
  await delay()
  const user = usersData.find(u => u.username === username)
  if (!user) throw new Error('User not found')
  return user
}

export const updateUserProfile = async (userId, updates) => {
  await delay(600)
  
  // In a real app, this would update the backend
  return {
    success: true,
    userId,
    updates,
    timestamp: new Date().toISOString()
  }
}

export const followUser = async (username) => {
  await delay(400)
  
  return {
    success: true,
    username,
    following: true,
    timestamp: new Date().toISOString()
  }
}

export const unfollowUser = async (username) => {
  await delay(400)
  
  return {
    success: true,
    username,
    following: false,
    timestamp: new Date().toISOString()
  }
}

export const searchUsers = async (query) => {
  await delay(500)
  
  if (!query || query.length < 2) return []
  
  const searchTerm = query.toLowerCase()
  return usersData.filter(user => 
    user.username.toLowerCase().includes(searchTerm) ||
    user.name.toLowerCase().includes(searchTerm) ||
    user.bio.toLowerCase().includes(searchTerm)
  ).slice(0, 10)
}

export const getUserStats = async (username) => {
  await delay(300)
  
  const user = usersData.find(u => u.username === username)
  if (!user) throw new Error('User not found')
  
  // Mock additional stats
  return {
    username: user.username,
    followers: user.followers,
    following: user.following,
    posts: user.posts,
    countriesVisited: Math.floor(Math.random() * 25) + 5,
    tripsCompleted: Math.floor(Math.random() * 15) + 3,
    groupsJoined: Math.floor(Math.random() * 10) + 1,
    averageRating: (Math.random() * 1.5 + 3.5).toFixed(1)
  }
}