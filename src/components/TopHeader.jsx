import { Bell, Settings } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import Button from './Button'

const TopHeader = ({ title = 'FreBud', showBack = false, actions }) => {
  const navigate = useNavigate()
  
  return (
    <div className="sticky top-0 z-40 bg-base-100/80 backdrop-blur-md border-b border-base-200 lg:hidden">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          {showBack && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate(-1)}
            >
              ←
            </Button>
          )}
          <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            {title}
          </h1>
        </div>
        
        <div className="flex items-center gap-2">
          {actions || (
            <>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/notifications')}
              >
                <Bell size={20} />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/settings')}
              >
                <Settings size={20} />
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default TopHeader