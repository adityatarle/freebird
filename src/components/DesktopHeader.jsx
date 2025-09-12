import { Bell, Search, MessageCircle } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../state/authStore'
import Button from './Button'

const DesktopHeader = ({ title = 'FreBud', actions }) => {
  const navigate = useNavigate()
  const { user } = useAuthStore()
  
  return (
    <div className="hidden lg:block sticky top-0 z-40 bg-base-100/80 backdrop-blur-md border-b border-base-200">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold text-base-content">
            {title}
          </h1>
        </div>
        
        {/* Search Bar */}
        <div className="flex-1 max-w-md mx-8">
          <div className="relative">
            <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-base-content/60" />
            <input
              type="text"
              placeholder="Search destinations, people, or groups..."
              className="input input-bordered w-full pl-10 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          {actions || (
            <>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/messages')}
              >
                <MessageCircle size={20} />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/notifications')}
              >
                <Bell size={20} />
              </Button>
            </>
          )}
          
          {/* User Avatar */}
          <button
            onClick={() => navigate('/profile')}
            className="flex items-center gap-2 hover:bg-base-200 rounded-lg p-2 transition-colors"
          >
            <img
              src={user?.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face'}
              alt={user?.name || 'User'}
              className="w-8 h-8 rounded-full"
            />
            <span className="text-sm font-medium hidden xl:block">
              {user?.name || 'Demo User'}
            </span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default DesktopHeader