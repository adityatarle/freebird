import { Settings, User, CreditCard, Shield, HelpCircle, Bell, DollarSign, BarChart3, LogOut } from 'lucide-react'
import { useAuthStore } from '../state/authStore'
import { useNavigate } from 'react-router-dom'

const More = () => {
  const { logout } = useAuthStore()
  const navigate = useNavigate()

  const menuItems = [
    {
      id: 'account-settings',
      label: 'Account Settings',
      icon: User,
      onClick: () => navigate('/profile')
    },
    {
      id: 'subscription',
      label: 'Subscription',
      icon: CreditCard,
      onClick: () => console.log('Subscription')
    },
    {
      id: 'security',
      label: 'Security',
      icon: Shield,
      onClick: () => console.log('Security')
    },
    {
      id: 'help',
      label: 'Help',
      icon: HelpCircle,
      onClick: () => console.log('Help')
    },
    {
      id: 'notifications',
      label: 'Notifications',
      icon: Bell,
      onClick: () => navigate('/notification')
    },
    {
      id: 'orders-payments',
      label: 'Orders & Payments',
      icon: DollarSign,
      onClick: () => console.log('Orders & Payments')
    },
    {
      id: 'account-status',
      label: 'Account Status',
      icon: BarChart3,
      onClick: () => console.log('Account Status')
    },
    {
      id: 'logout',
      label: 'Logout',
      icon: LogOut,
      onClick: logout,
      danger: true
    }
  ]

  return (
    <div className="min-h-screen bg-base-100">
      {/* Header */}
      <div className="bg-white border-b border-base-200 px-4 py-3">
        <div className="flex items-center gap-3">
          <Settings className="text-primary" size={24} />
          <h1 className="text-xl font-semibold">More</h1>
        </div>
      </div>

      {/* Menu Items */}
      <div className="p-4">
        <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-base-200">
          {menuItems.map((item, index) => (
            <div key={item.id}>
              <button
                onClick={item.onClick}
                className={`w-full flex items-center gap-4 p-4 text-left hover:bg-base-50 transition-colors ${
                  item.danger ? 'text-error hover:bg-error/5' : 'text-base-content'
                }`}
              >
                <item.icon size={20} />
                <span className="font-medium">{item.label}</span>
              </button>
              {index < menuItems.length - 1 && (
                <div className="border-b border-base-200"></div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* App Info */}
      <div className="p-4 text-center text-base-content/60">
        <p className="text-sm">FreBud v1.0.0</p>
        <p className="text-xs mt-1">Travel.Sleep.Travel</p>
      </div>
    </div>
  )
}

export default More