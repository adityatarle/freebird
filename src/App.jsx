import { Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'
import { useUIStore } from './state/uiStore'
import { useAuthStore } from './state/authStore'

// Layout Components
import BottomNavigation from './components/BottomNavigation'
import DesktopNavigation from './components/DesktopNavigation'
import TopHeader from './components/TopHeader'

// Pages
import Feed from './pages/Feed'
import FindPartner from './pages/FindPartner'
import Community from './pages/Community'
import CommunityPost from './pages/CommunityPost'
import Packages from './pages/Packages'
import Search from './pages/Search'
import Message from './pages/Message'
import Notification from './pages/Notification'
import ProfileSimple from './pages/ProfileSimple'
import More from './pages/More'
import Login from './pages/Login'
import Signup from './pages/Signup'

// Keep old pages for backward compatibility
import Explore from './pages/Explore'
import Companions from './pages/Companions'
import Groups from './pages/Groups'
import Wishlist from './pages/Wishlist'
import Profile from './pages/Profile'
import Settings from './pages/Settings'

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
      <div className="flex min-h-screen">
        {/* Desktop Sidebar Navigation */}
        <div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0">
          <div className="flex flex-col flex-grow pt-5 pb-4 overflow-y-auto bg-base-200 border-r border-base-300">
            <div className="flex items-center flex-shrink-0 px-4">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                FreBud
              </h1>
            </div>
            <nav className="mt-8 flex-1 px-2 space-y-1">
              <DesktopNavigation />
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex flex-col flex-1 lg:pl-64">
          <div className="pb-16 lg:pb-0"> {/* Space for bottom navigation on mobile */}
            <Routes>
              <Route path="/" element={<Feed />} />
              <Route path="/find-partner" element={<FindPartner />} />
              <Route path="/community" element={<Community />} />
              <Route path="/community-post" element={<CommunityPost />} />
              <Route path="/new-post" element={<CommunityPost />} />
              <Route path="/packages" element={<Packages />} />
              <Route path="/search" element={<Search />} />
              <Route path="/message" element={<Message />} />
              <Route path="/notification" element={<Notification />} />
              <Route path="/profile" element={<ProfileSimple />} />
              <Route path="/more" element={<More />} />
              
              {/* Keep old routes for backward compatibility */}
              <Route path="/explore" element={<Explore />} />
              <Route path="/companions" element={<Companions />} />
              <Route path="/groups" element={<Groups />} />
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="/profile-full" element={<Profile />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="lg:hidden">
        <BottomNavigation />
      </div>

      {/* Modals */}
      {showStoryModal && <StoryModal />}
      {showCreateGroupModal && <CreateGroupModal />}
    </div>
  )
}

export default App