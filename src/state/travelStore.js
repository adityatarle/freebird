import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export const useTravelStore = create(
  persist(
    (set, get) => ({
      // State
      wishlist: [],
      groups: [],
      myGroups: [],
      companions: [],
      savedDestinations: [],
      recentSearches: [],
      
      // Actions
      addToWishlist: (item) => {
        const wishlist = get().wishlist
        const exists = wishlist.find(w => w.id === item.id && w.type === item.type)
        
        if (!exists) {
          set(state => ({
            wishlist: [...state.wishlist, { ...item, addedAt: Date.now() }]
          }))
          return true
        }
        return false
      },

      removeFromWishlist: (itemId, type) => {
        set(state => ({
          wishlist: state.wishlist.filter(item => 
            !(item.id === itemId && item.type === type)
          )
        }))
      },

      isInWishlist: (itemId, type) => {
        return get().wishlist.some(item => 
          item.id === itemId && item.type === type
        )
      },

      createGroup: (groupData) => {
        const newGroup = {
          id: Date.now().toString(),
          ...groupData,
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
        
        set(state => ({
          myGroups: [...state.myGroups, newGroup]
        }))
        
        return newGroup
      },

      joinGroup: (groupId) => {
        // In a real app, this would make an API call
        const userInfo = {
          username: "demo_user",
          name: "Alex Johnson",
          avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face",
          role: "member"
        }
        
        // Add to groups list (simulate joining)
        set(state => ({
          groups: state.groups.map(group => 
            group.id === groupId 
              ? { ...group, members: [...group.members, userInfo] }
              : group
          )
        }))
        
        return true
      },

      leaveGroup: (groupId) => {
        set(state => ({
          myGroups: state.myGroups.filter(group => group.id !== groupId),
          groups: state.groups.map(group => 
            group.id === groupId 
              ? { 
                  ...group, 
                  members: group.members.filter(member => member.username !== "demo_user")
                }
              : group
          )
        }))
      },

      addPollToGroup: (groupId, poll) => {
        const newPoll = {
          id: Date.now().toString(),
          ...poll,
          created: new Date().toISOString()
        }
        
        set(state => ({
          myGroups: state.myGroups.map(group => 
            group.id === groupId 
              ? { ...group, polls: [...group.polls, newPoll] }
              : group
          )
        }))
        
        return newPoll
      },

      voteInPoll: (groupId, pollId, optionIndex) => {
        set(state => ({
          myGroups: state.myGroups.map(group => 
            group.id === groupId 
              ? {
                  ...group,
                  polls: group.polls.map(poll => 
                    poll.id === pollId
                      ? {
                          ...poll,
                          options: poll.options.map((option, index) => 
                            index === optionIndex
                              ? { ...option, votes: option.votes + 1 }
                              : option
                          )
                        }
                      : poll
                  )
                }
              : group
          )
        }))
      },

      saveDestination: (destination) => {
        const saved = get().savedDestinations
        const exists = saved.find(d => d.id === destination.id)
        
        if (!exists) {
          set(state => ({
            savedDestinations: [...state.savedDestinations, {
              ...destination,
              savedAt: Date.now()
            }]
          }))
          return true
        }
        return false
      },

      removeSavedDestination: (destinationId) => {
        set(state => ({
          savedDestinations: state.savedDestinations.filter(d => d.id !== destinationId)
        }))
      },

      addRecentSearch: (searchTerm) => {
        set(state => {
          const filtered = state.recentSearches.filter(term => term !== searchTerm)
          return {
            recentSearches: [searchTerm, ...filtered].slice(0, 10) // Keep only last 10
          }
        })
      },

      clearRecentSearches: () => {
        set({ recentSearches: [] })
      }
    }),
    {
      name: 'travel-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        wishlist: state.wishlist,
        savedDestinations: state.savedDestinations,
        recentSearches: state.recentSearches,
        myGroups: state.myGroups
      })
    }
  )
)