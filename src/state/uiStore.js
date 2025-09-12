import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export const useUIStore = create(
  persist(
    (set, get) => ({
      // State
      theme: 'light',
      language: 'en',
      currency: 'USD',
      notifications: true,
      location: true,
      darkMode: false,
      
      // Modal states
      showLoginModal: false,
      showSignupModal: false,
      showCreateGroupModal: false,
      showStoryModal: false,
      currentStory: null,
      
      // Navigation
      activeTab: 'feed',
      
      // Loading states
      isLoading: false,
      
      // Actions
      setTheme: (theme) => {
        set({ theme, darkMode: theme === 'dark' })
        // Apply theme to document
        document.documentElement.setAttribute('data-theme', theme)
      },

      toggleDarkMode: () => {
        const newTheme = get().theme === 'light' ? 'dark' : 'light'
        get().setTheme(newTheme)
      },

      setLanguage: (language) => {
        set({ language })
      },

      setCurrency: (currency) => {
        set({ currency })
      },

      toggleNotifications: () => {
        set(state => ({ notifications: !state.notifications }))
      },

      toggleLocation: () => {
        set(state => ({ location: !state.location }))
      },

      // Modal actions
      showLogin: () => {
        set({ showLoginModal: true, showSignupModal: false })
      },

      showSignup: () => {
        set({ showSignupModal: true, showLoginModal: false })
      },

      hideAuthModals: () => {
        set({ showLoginModal: false, showSignupModal: false })
      },

      showCreateGroup: () => {
        set({ showCreateGroupModal: true })
      },

      hideCreateGroup: () => {
        set({ showCreateGroupModal: false })
      },

      showStory: (story) => {
        set({ showStoryModal: true, currentStory: story })
      },

      hideStory: () => {
        set({ showStoryModal: false, currentStory: null })
      },

      // Navigation
      setActiveTab: (tab) => {
        set({ activeTab: tab })
      },

      // Loading
      setLoading: (loading) => {
        set({ isLoading: loading })
      }
    }),
    {
      name: 'ui-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        theme: state.theme,
        language: state.language,
        currency: state.currency,
        notifications: state.notifications,
        location: state.location,
        darkMode: state.darkMode
      })
    }
  )
)

// Initialize theme on app start
if (typeof window !== 'undefined') {
  const stored = localStorage.getItem('ui-storage')
  if (stored) {
    try {
      const parsed = JSON.parse(stored)
      const theme = parsed.state?.theme || 'light'
      document.documentElement.setAttribute('data-theme', theme)
    } catch (e) {
      document.documentElement.setAttribute('data-theme', 'light')
    }
  }
}