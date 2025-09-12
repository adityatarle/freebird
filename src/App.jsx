import { Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'
import { useUIStore } from './state/uiStore'
import { useAuthStore } from './state/authStore'

// Layout Components
import BottomNavigation from './components/BottomNavigation'
import TopHeader from './components/TopHeader'

// Pages
import Feed from './pages/Feed'
import Explore from './pages/Explore'
import Companions from './pages/Companions'
import Groups from './pages/Groups'
import Wishlist from './pages/Wishlist'
import Profile from './pages/Profile'
import Settings from './pages/Settings'
import Login from './pages/Login'
import Signup from './pages/Signup'

// Modals and Overlays
import StoryModal from './components/StoryModal'
import CreateGroupModal from './components/CreateGroupModal'

function App() {
  const { theme, showStoryModal, showCreateGroupModal } = useUIStore()
  const { isAuthenticated } = useAuthStore()

  // Set theme on mount
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  // Show auth screens if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-base-100">
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<Login />} />
        </Routes>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-base-100">
      {/* Main App Layout */}
      <div className="pb-16"> {/* Space for bottom navigation */}
        <Routes>
          <Route path="/" element={<Feed />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/companions" element={<Companions />} />
          <Route path="/groups" element={<Groups />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation />

      {/* Modals */}
      {showStoryModal && <StoryModal />}
      {showCreateGroupModal && <CreateGroupModal />}
    </div>
  )
}

export default App