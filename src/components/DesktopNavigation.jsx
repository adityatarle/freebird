import { Home, Users, Search, MessageCircle, Heart, User, Plus, Settings, LogOut, Package } from 'lucide-react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useUIStore } from '../state/uiStore'
import { useAuthStore } from '../state/authStore'
import Button from './Button'

const DesktopNavigation = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { showCreatePost } = useUIStore()
  const { user, logout } = useAuthStore()
  
  const navItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/find-partner', icon: Users, label: 'Find Partner' },
    { path: '/community', icon: Users, label: 'Community' },
    { path: '/packages', icon: Package, label: 'Packages' },
    { path: '/search', icon: Search, label: 'Search' },
    { path: '/message', icon: MessageCircle, label: 'Message' },
    { path: '/notification', icon: Heart, label: 'Notification' },
    { path: '/new-post', icon: Plus, label: 'New Post' },
    { path: '/profile', icon: User, label: 'Profile' },
    { path: '/more', icon: Settings, label: 'More' }
  ]
  
  return (
    <div className="space-y-1">
      {navItems.map(({ path, icon: Icon, label }) => {
        const isActive = location.pathname === path
        
        return (
          <button
            key={path}
            onClick={() => navigate(path)}
            className={`
              group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors w-full text-left
              ${isActive 
                ? 'bg-primary text-white' 
                : 'text-base-content hover:bg-base-300 hover:text-base-content'
              }
            `}
          >
            <Icon 
              size={20} 
              className="mr-3 flex-shrink-0"
              fill={isActive ? 'currentColor' : 'none'} 
            />
            {label}
          </button>
        )
      })}
      
      {/* Logout */}
      <div className="pt-4 mt-4 border-t border-base-300">
        <button
          onClick={logout}
          className="group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors w-full text-left text-base-content hover:bg-base-300 hover:text-base-content"
        >
          <LogOut size={20} className="mr-3 flex-shrink-0" />
          Logout
        </button>
      </div>
    </div>
  )
}

export default DesktopNavigation