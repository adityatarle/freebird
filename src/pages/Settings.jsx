import { useState } from 'react'
import { 
  Moon, Sun, Bell, MapPin, Globe, DollarSign, 
  Shield, HelpCircle, LogOut, ChevronRight,
  User, Lock, Smartphone
} from 'lucide-react'
import { useUIStore } from '../state/uiStore'
import { useAuthStore } from '../state/authStore'
import TopHeader from '../components/TopHeader'
import DesktopHeader from '../components/DesktopHeader'
import Button from '../components/Button'
import Card from '../components/Card'

const Settings = () => {
  const { 
    theme, 
    language, 
    currency, 
    notifications, 
    location,
    toggleDarkMode,
    setLanguage,
    setCurrency,
    toggleNotifications,
    toggleLocation
  } = useUIStore()
  
  const { logout } = useAuthStore()
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)

  const handleLogout = () => {
    logout()
    setShowLogoutConfirm(false)
  }

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Español' },
    { code: 'fr', name: 'Français' },
    { code: 'de', name: 'Deutsch' },
    { code: 'ja', name: '日本語' },
    { code: 'ko', name: '한국어' }
  ]

  const currencies = [
    { code: 'USD', name: 'US Dollar ($)' },
    { code: 'EUR', name: 'Euro (€)' },
    { code: 'GBP', name: 'British Pound (£)' },
    { code: 'JPY', name: 'Japanese Yen (¥)' },
    { code: 'CAD', name: 'Canadian Dollar (C$)' },
    { code: 'AUD', name: 'Australian Dollar (A$)' }
  ]

  const SettingItem = ({ icon: Icon, title, subtitle, action, danger = false }) => (
    <div className={`
      flex items-center gap-3 p-4 rounded-lg cursor-pointer transition-colors
      ${danger ? 'hover:bg-red-50 text-red-600' : 'hover:bg-base-200'}
    `} onClick={action}>
      <Icon size={20} className={danger ? 'text-red-500' : 'text-base-content/60'} />
      <div className="flex-1">
        <p className={`font-medium ${danger ? 'text-red-600' : ''}`}>{title}</p>
        {subtitle && (
          <p className={`text-sm ${danger ? 'text-red-400' : 'text-base-content/60'}`}>
            {subtitle}
          </p>
        )}
      </div>
      <ChevronRight size={16} className="text-base-content/40" />
    </div>
  )

  const ToggleItem = ({ icon: Icon, title, subtitle, checked, onChange }) => (
    <div className="flex items-center gap-3 p-4">
      <Icon size={20} className="text-base-content/60" />
      <div className="flex-1">
        <p className="font-medium">{title}</p>
        {subtitle && <p className="text-sm text-base-content/60">{subtitle}</p>}
      </div>
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="toggle toggle-primary"
      />
    </div>
  )

  return (
    <div className="min-h-screen">
      <TopHeader title="Settings" showBack />
      <DesktopHeader title="Settings" />
      
      <div className="p-4 space-y-6 max-w-md mx-auto lg:max-w-2xl lg:grid lg:grid-cols-2 lg:gap-6 lg:space-y-0">
        {/* Appearance */}
        <Card className="p-0">
          <div className="p-4 border-b border-base-200">
            <h2 className="font-semibold text-lg">Appearance</h2>
          </div>
          
          <ToggleItem
            icon={theme === 'dark' ? Moon : Sun}
            title="Dark Mode"
            subtitle={`Currently using ${theme} theme`}
            checked={theme === 'dark'}
            onChange={toggleDarkMode}
          />
        </Card>

        {/* Preferences */}
        <Card className="p-0">
          <div className="p-4 border-b border-base-200">
            <h2 className="font-semibold text-lg">Preferences</h2>
          </div>
          
          <div className="p-4 border-b border-base-200">
            <div className="flex items-center gap-3 mb-2">
              <Globe size={20} className="text-base-content/60" />
              <p className="font-medium">Language</p>
            </div>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="select select-bordered w-full"
            >
              {languages.map(lang => (
                <option key={lang.code} value={lang.code}>
                  {lang.name}
                </option>
              ))}
            </select>
          </div>

          <div className="p-4">
            <div className="flex items-center gap-3 mb-2">
              <DollarSign size={20} className="text-base-content/60" />
              <p className="font-medium">Currency</p>
            </div>
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="select select-bordered w-full"
            >
              {currencies.map(curr => (
                <option key={curr.code} value={curr.code}>
                  {curr.name}
                </option>
              ))}
            </select>
          </div>
        </Card>

        {/* Privacy & Permissions */}
        <Card className="p-0">
          <div className="p-4 border-b border-base-200">
            <h2 className="font-semibold text-lg">Privacy & Permissions</h2>
          </div>
          
          <ToggleItem
            icon={Bell}
            title="Push Notifications"
            subtitle="Receive travel updates and group messages"
            checked={notifications}
            onChange={toggleNotifications}
          />
          
          <ToggleItem
            icon={MapPin}
            title="Location Services"
            subtitle="Help us recommend nearby destinations"
            checked={location}
            onChange={toggleLocation}
          />
        </Card>

        {/* Account */}
        <Card className="p-0">
          <div className="p-4 border-b border-base-200">
            <h2 className="font-semibold text-lg">Account</h2>
          </div>
          
          <SettingItem
            icon={User}
            title="Edit Profile"
            subtitle="Update your travel profile and preferences"
            action={() => alert('Edit profile functionality')}
          />
          
          <SettingItem
            icon={Lock}
            title="Privacy Settings"
            subtitle="Control who can see your profile and posts"
            action={() => alert('Privacy settings')}
          />
          
          <SettingItem
            icon={Shield}
            title="Security"
            subtitle="Password, two-factor authentication"
            action={() => alert('Security settings')}
          />
        </Card>

        {/* Support */}
        <Card className="p-0">
          <div className="p-4 border-b border-base-200">
            <h2 className="font-semibold text-lg">Support</h2>
          </div>
          
          <SettingItem
            icon={HelpCircle}
            title="Help Center"
            subtitle="FAQs, guides, and support"
            action={() => alert('Help center')}
          />
          
          <SettingItem
            icon={Smartphone}
            title="About FreBud"
            subtitle="Version 1.0.0"
            action={() => alert('About FreBud v1.0.0\n\nYour ultimate travel companion for discovering destinations and connecting with fellow travelers.')}
          />
        </Card>

        {/* Danger Zone */}
        <Card className="p-0">
          <SettingItem
            icon={LogOut}
            title="Sign Out"
            subtitle="Sign out of your account"
            action={() => setShowLogoutConfirm(true)}
            danger
          />
        </Card>

        {/* App Info */}
        <div className="text-center text-sm text-base-content/60 py-4">
          <p>FreBud v1.0.0</p>
          <p>Made with ❤️ for travelers</p>
        </div>
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-sm p-6">
            <h3 className="text-lg font-bold mb-2">Sign Out</h3>
            <p className="text-base-content/70 mb-6">
              Are you sure you want to sign out of your account?
            </p>
            <div className="flex gap-3">
              <Button
                variant="outline"
                fullWidth
                onClick={() => setShowLogoutConfirm(false)}
              >
                Cancel
              </Button>
              <Button
                variant="danger"
                fullWidth
                onClick={handleLogout}
              >
                Sign Out
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}

export default Settings