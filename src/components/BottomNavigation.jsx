import { Home, Search, Users, Heart, User } from 'lucide-react'
import { useLocation, useNavigate } from 'react-router-dom'

const BottomNavigation = () => {
  const location = useLocation()
  const navigate = useNavigate()
  
  const navItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/explore', icon: Search, label: 'Explore' },
    { path: '/companions', icon: Users, label: 'Companions' },
    { path: '/wishlist', icon: Heart, label: 'Wishlist' },
    { path: '/profile', icon: User, label: 'Profile' }
  ]
  
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-base-100 border-t border-base-200 z-50">
      <div className="flex items-center justify-around py-2">
        {navItems.map(({ path, icon: Icon, label }) => {
          const isActive = location.pathname === path
          
          return (
            <button
              key={path}
              onClick={() => navigate(path)}
              className={`
                flex flex-col items-center gap-1 p-2 rounded-lg transition-colors
                ${isActive 
                  ? 'text-primary' 
                  : 'text-base-content/60 hover:text-base-content'
                }
              `}
            >
              <Icon size={20} fill={isActive ? 'currentColor' : 'none'} />
              <span className="text-xs font-medium">{label}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default BottomNavigation