import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export const useAuthStore = create(
  persist(
    (set, get) => ({
      // State
      isAuthenticated: true, // Start as authenticated for demo
      user: {
        id: "1",
        username: "demo_user",
        email: "demo@frebud.com",
        name: "Alex Johnson",
        avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face",
        bio: "Adventure seeker 🌍 | Digital nomad | Love hiking and photography",
        location: "San Francisco, CA",
        verified: true,
        followers: 1234,
        following: 567,
        posts: 89,
        joinDate: "2023-03-15",
        interests: ["hiking", "photography", "food", "culture"],
        travelStyle: "adventure",
        languages: ["English", "Spanish", "French"]
      },
      loading: false,
      error: null,

      // Actions
      login: async (credentials) => {
        set({ loading: true, error: null })
        try {
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 1000))
          
          // Mock successful login
          set({ 
            isAuthenticated: true, 
            user: get().user, // Use demo user
            loading: false 
          })
          
          return { success: true }
        } catch (error) {
          set({ 
            error: error.message, 
            loading: false 
          })
          return { success: false, error: error.message }
        }
      },

      signup: async (userData) => {
        set({ loading: true, error: null })
        try {
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 1000))
          
          // Mock successful signup
          const newUser = {
            ...get().user,
            ...userData,
            id: Date.now().toString(),
            avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face",
            verified: false,
            followers: 0,
            following: 0,
            posts: 0,
            joinDate: new Date().toISOString().split('T')[0]
          }
          
          set({ 
            isAuthenticated: true, 
            user: newUser, 
            loading: false 
          })
          
          return { success: true }
        } catch (error) {
          set({ 
            error: error.message, 
            loading: false 
          })
          return { success: false, error: error.message }
        }
      },

      logout: () => {
        set({ 
          isAuthenticated: false, 
          user: null, 
          error: null 
        })
      },

      updateProfile: (updates) => {
        set(state => ({
          user: { ...state.user, ...updates }
        }))
      },

      clearError: () => {
        set({ error: null })
      }
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ 
        isAuthenticated: state.isAuthenticated, 
        user: state.user 
      })
    }
  )
)