import { Home, Search, Users, Heart, User, Settings, Plus } from 'lucide-react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useUIStore } from '../state/uiStore'
import { useAuthStore } from '../state/authStore'
import Button from './Button'

const DesktopNavigation = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { showCreateGroup } = useUIStore()
  const { user } = useAuthStore()
  
  const navItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/explore', icon: Search, label: 'Explore' },
    { path: '/companions', icon: Users, label: 'Find Companions' },
    { path: '/groups', icon: Users, label: 'Travel Groups' },
    { path: '/wishlist', icon: Heart, label: 'Wishlist' },
    { path: '/profile', icon: User, label: 'Profile' },
    { path: '/settings', icon: Settings, label: 'Settings' }
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
      
      {/* Quick Actions */}
      <div className="pt-4 mt-4 border-t border-base-300">
        <Button
          variant="outline"
          fullWidth
          className="mb-2"
          onClick={showCreateGroup}
        >
          <Plus size={16} className="mr-2" />
          Create Group
        </Button>
        
        {/* User Profile Mini */}
        <div className="flex items-center px-3 py-2 bg-base-300 rounded-lg">
          <img
            src={user?.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face'}
            alt={user?.name || 'User'}
            className="w-8 h-8 rounded-full mr-3"
          />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-base-content truncate">
              {user?.name || 'Demo User'}
            </p>
            <p className="text-xs text-base-content/60 truncate">
              @{user?.username || 'demo'}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DesktopNavigation