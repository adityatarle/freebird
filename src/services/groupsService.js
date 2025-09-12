import groupsData from '../data/groups.json'

// Simulate API delay
const delay = (ms = 600) => new Promise(resolve => setTimeout(resolve, ms))

export const fetchGroups = async (filters = {}) => {
  await delay()
  
  let filteredGroups = [...groupsData]
  
  // Apply filters
  if (filters.destination) {
    filteredGroups = filteredGroups.filter(group => 
      group.destination.toLowerCase().includes(filters.destination.toLowerCase())
    )
  }
  
  if (filters.status && filters.status !== 'all') {
    filteredGroups = filteredGroups.filter(group => 
      group.status === filters.status
    )
  }
  
  if (filters.maxMembers) {
    filteredGroups = filteredGroups.filter(group => 
      group.members.length < group.maxMembers
    )
  }
  
  // Sort by creation date (newest first)
  filteredGroups.sort((a, b) => new Date(b.created) - new Date(a.created))
  
  return filteredGroups
}

export const fetchGroupById = async (id) => {
  await delay(300)
  const group = groupsData.find(g => g.id === id)
  if (!group) throw new Error('Group not found')
  return group
}

export const createGroup = async (groupData) => {
  await delay(800)
  
  const newGroup = {
    id: Date.now().toString(),
    ...groupData,
    organizer: {
      username: "demo_user",
      name: "Alex Johnson",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face"
    },
    members: [
      {
        username: "demo_user",
        name: "Alex Johnson",
        avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face",
        role: "organizer"
      }
    ],
    status: "open",
    created: new Date().toISOString(),
    polls: []
  }
  
  return newGroup
}

export const joinGroup = async (groupId) => {
  await delay(500)
  
  // Simulate joining a group
  return {
    success: true,
    groupId,
    member: {
      username: "demo_user",
      name: "Alex Johnson",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face",
      role: "member",
      joinedAt: new Date().toISOString()
    }
  }
}

export const leaveGroup = async (groupId) => {
  await delay(400)
  
  return {
    success: true,
    groupId,
    timestamp: new Date().toISOString()
  }
}

export const createPoll = async (groupId, pollData) => {
  await delay(600)
  
  const newPoll = {
    id: Date.now().toString(),
    ...pollData,
    votes: pollData.options.map(() => 0),
    created: new Date().toISOString(),
    createdBy: "demo_user"
  }
  
  return newPoll
}

export const voteInPoll = async (groupId, pollId, optionIndex) => {
  await delay(300)
  
  return {
    success: true,
    groupId,
    pollId,
    optionIndex,
    voter: "demo_user",
    timestamp: new Date().toISOString()
  }
}

export const getRecommendedGroups = async (userPreferences = {}) => {
  await delay(700)
  
  let recommended = [...groupsData]
  
  // Filter only open groups with available spots
  recommended = recommended.filter(group => 
    group.status === 'open' && group.members.length < group.maxMembers
  )
  
  // Score groups based on user preferences
  const scored = recommended.map(group => {
    let score = 5 // Base score
    
    // Bonus for matching activities/interests
    if (userPreferences.interests && group.activities) {
      const matchingActivities = group.activities.filter(activity =>
        userPreferences.interests.some(interest =>
          interest.toLowerCase().includes(activity.toLowerCase()) ||
          activity.toLowerCase().includes(interest.toLowerCase())
        )
      )
      score += matchingActivities.length * 2
    }
    
    // Bonus for newer groups
    const daysOld = (Date.now() - new Date(group.created).getTime()) / (1000 * 60 * 60 * 24)
    if (daysOld < 7) score += 2
    
    // Bonus for groups with more members (but not full)
    const memberRatio = group.members.length / group.maxMembers
    if (memberRatio > 0.3 && memberRatio < 0.8) {
      score += 1
    }
    
    return { ...group, recommendationScore: score }
  })
  
  return scored
    .sort((a, b) => b.recommendationScore - a.recommendationScore)
    .slice(0, 6)
}