import { useState } from 'react'
import { Settings, MapPin, Calendar, Camera, Users, Heart, Edit } from 'lucide-react'
import { useAuthStore } from '../state/authStore'
import { useTravelStore } from '../state/travelStore'
import TopHeader from '../components/TopHeader'
import Button from '../components/Button'
import Card from '../components/Card'

const Profile = () => {
  const { user } = useAuthStore()
  const { wishlist, myGroups } = useTravelStore()
  const [activeTab, setActiveTab] = useState('posts')

  // Mock user posts - in a real app this would come from API
  const userPosts = [
    {
      id: '1',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop',
      likes: 128,
      comments: 12
    },
    {
      id: '2', 
      image: 'https://images.unsplash.com/photo-1539650116574-75c0c6d73636?w=400&h=400&fit=crop',
      likes: 89,
      comments: 7
    },
    {
      id: '3',
      image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&h=400&fit=crop',
      likes: 234,
      comments: 18
    }
  ]

  const stats = [
    { label: 'Posts', value: user.posts, icon: Camera },
    { label: 'Followers', value: user.followers.toLocaleString(), icon: Users },
    { label: 'Following', value: user.following, icon: Heart },
    { label: 'Wishlist', value: wishlist.length, icon: Heart }
  ]

  const tabs = [
    { id: 'posts', label: 'Posts', icon: Camera },
    { id: 'groups', label: 'Groups', icon: Users },
    { id: 'about', label: 'About', icon: MapPin }
  ]

  const PostGrid = () => (
    <div className="grid grid-cols-3 gap-1">
      {userPosts.map(post => (
        <div key={post.id} className="aspect-square relative group cursor-pointer">
          <img
            src={post.image}
            alt="Post"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <div className="flex items-center gap-4 text-white text-sm">
              <div className="flex items-center gap-1">
                <Heart size={16} fill="currentColor" />
                <span>{post.likes}</span>
              </div>
              <div className="flex items-center gap-1">
                <Camera size={16} />
                <span>{post.comments}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )

  const GroupsList = () => (
    <div className="space-y-3">
      {myGroups.length === 0 ? (
        <div className="text-center py-8">
          <Users size={48} className="mx-auto text-base-content/40 mb-4" />
          <p className="text-base-content/60">No groups yet</p>
        </div>
      ) : (
        myGroups.map(group => (
          <Card key={group.id} className="p-4">
            <div className="flex items-center gap-3">
              <img
                src={group.image}
                alt={group.name}
                className="w-12 h-12 rounded-lg object-cover"
              />
              <div className="flex-1">
                <h3 className="font-medium">{group.name}</h3>
                <p className="text-sm text-base-content/60">{group.destination}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium">{group.members.length} members</p>
                <p className="text-xs text-base-content/60">{group.status}</p>
              </div>
            </div>
          </Card>
        ))
      )}
    </div>
  )

  const AboutSection = () => (
    <div className="space-y-4">
      <Card className="p-4">
        <h3 className="font-medium mb-3">Travel Interests</h3>
        <div className="flex flex-wrap gap-2">
          {user.interests.map(interest => (
            <span
              key={interest}
              className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm capitalize"
            >
              {interest}
            </span>
          ))}
        </div>
      </Card>

      <Card className="p-4">
        <h3 className="font-medium mb-3">Languages</h3>
        <div className="flex flex-wrap gap-2">
          {user.languages.map(language => (
            <span
              key={language}
              className="px-3 py-1 bg-secondary/10 text-secondary rounded-full text-sm"
            >
              {language}
            </span>
          ))}
        </div>
      </Card>

      <Card className="p-4">
        <h3 className="font-medium mb-3">Travel Style</h3>
        <span className="px-3 py-1 bg-accent/10 text-accent rounded-full text-sm capitalize">
          {user.travelStyle}
        </span>
      </Card>

      <Card className="p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-medium">Member Since</h3>
          <Calendar size={16} className="text-base-content/60" />
        </div>
        <p className="text-base-content/70">
          {new Date(user.joinDate).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </p>
      </Card>
    </div>
  )

  return (
    <div className="min-h-screen">
      <TopHeader 
        title="Profile"
        actions={
          <Button
            variant="ghost"
            size="sm"
            onClick={() => alert('Edit profile functionality')}
          >
            <Edit size={16} />
          </Button>
        }
      />
      
      {/* Profile Header */}
      <div className="p-4">
        <div className="flex items-start gap-4 mb-4">
          <div className="relative">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-20 h-20 rounded-full object-cover"
            />
            {user.verified && (
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs">✓</span>
              </div>
            )}
          </div>
          
          <div className="flex-1">
            <h1 className="text-xl font-bold">{user.name}</h1>
            <p className="text-base-content/60">@{user.username}</p>
            <div className="flex items-center gap-1 text-sm text-base-content/60 mt-1">
              <MapPin size={14} />
              <span>{user.location}</span>
            </div>
          </div>
        </div>

        {/* Bio */}
        <p className="text-sm mb-4">{user.bio}</p>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4 mb-4">
          {stats.map(stat => (
            <div key={stat.label} className="text-center">
              <div className="text-lg font-bold">{stat.value}</div>
              <div className="text-xs text-base-content/60">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Button variant="outline" fullWidth>
            Edit Profile
          </Button>
          <Button variant="outline" fullWidth>
            Share Profile
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="sticky top-16 z-30 bg-base-100 border-b border-base-200">
        <div className="flex">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                flex-1 flex items-center justify-center gap-2 py-3 px-4 text-sm font-medium
                ${activeTab === tab.id
                  ? 'text-primary border-b-2 border-primary bg-primary/5'
                  : 'text-base-content/60 hover:text-base-content hover:bg-base-200'
                }
              `}
            >
              <tab.icon size={16} />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="p-4">
        {activeTab === 'posts' && <PostGrid />}
        {activeTab === 'groups' && <GroupsList />}
        {activeTab === 'about' && <AboutSection />}
      </div>
    </div>
  )
}

export default Profile