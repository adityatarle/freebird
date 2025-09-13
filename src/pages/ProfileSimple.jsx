import { Heart } from 'lucide-react'
import { useAuthStore } from '../state/authStore'

const ProfileSimple = () => {
  const { user } = useAuthStore()

  // Sample user data matching your Figma design
  const userProfile = {
    name: user?.name || 'Name',
    username: user?.username || 'Username',
    about: 'About',
    avatar: user?.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&h=120&fit=crop&crop=face',
    stats: {
      posts: 10,
      trips: 10,
      friends: 20
    }
  }

  return (
    <div className="min-h-screen bg-base-100">
      {/* Header */}
      <div className="bg-white border-b border-base-200 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-base-300"></div>
          <h1 className="text-xl font-semibold">Profile</h1>
        </div>
        <Heart size={24} className="text-base-content/60" />
      </div>

      <div className="p-4 max-w-md mx-auto">
        {/* Profile Section */}
        <div className="text-center mb-6">
          <div className="relative inline-block mb-4">
            <img
              src={userProfile.avatar}
              alt={userProfile.name}
              className="w-24 h-24 rounded-full border-2 border-base-200"
            />
            <div className="absolute bottom-0 right-0 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
              <span className="text-white text-xs">📷</span>
            </div>
          </div>
          
          <h2 className="text-xl font-semibold text-base-content mb-1">{userProfile.name}</h2>
          <p className="text-base-content/60 mb-1">{userProfile.username}</p>
          <p className="text-base-content/60 mb-4">{userProfile.about}</p>
          
          {/* Stats */}
          <div className="flex justify-center gap-8 mb-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-base-content">{userProfile.stats.posts}</div>
              <div className="text-sm text-base-content/60">POSTS</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-base-content">{userProfile.stats.trips}</div>
              <div className="text-sm text-base-content/60">TRIPS</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-base-content">{userProfile.stats.friends}</div>
              <div className="text-sm text-base-content/60">FRIENDS</div>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex gap-3 mb-6">
            <button className="btn btn-primary flex-1">EDIT PROFILE</button>
            <button className="btn btn-outline flex-1">SHARE PROFILE</button>
          </div>
        </div>

        {/* Posts Section */}
        <div>
          <h3 className="text-lg font-semibold mb-4">POSTS</h3>
          
          {/* Posts Grid */}
          <div className="grid grid-cols-3 gap-1">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="aspect-square bg-base-200 rounded">
                {/* Post thumbnail placeholder */}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileSimple