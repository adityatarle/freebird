import { useState } from 'react'
import { Search, Filter, Users, Package } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const Community = () => {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')
  const [activeTab, setActiveTab] = useState('Accounts')

  const communities = [
    {
      id: 1,
      name: 'Alibaug',
      author: 'TravelPro',
      rating: 4.0,
      reviews: 80,
      image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=300&h=200&fit=crop'
    },
    {
      id: 2,
      name: 'Kokan',
      author: 'Bhaktanji',
      rating: 4.5,
      reviews: 80,
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop'
    },
    {
      id: 3,
      name: 'Alibaug',
      author: 'Bhaktanji',
      rating: 4.2,
      reviews: 80,
      image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=300&h=200&fit=crop'
    },
    {
      id: 4,
      name: 'Kokan',
      author: 'Community',
      rating: 4.8,
      reviews: 80,
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop'
    }
  ]

  const accounts = [
    { id: 1, name: 'ABC XYZ', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face' },
    { id: 2, name: 'ABC XYZ', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face' },
    { id: 3, name: 'ABC XYZ', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face' },
    { id: 4, name: 'ABC XYZ', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face' },
    { id: 5, name: 'ABC XYZ', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face' },
    { id: 6, name: 'ABC XYZ', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face' },
    { id: 7, name: 'ABC XYZ', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face' }
  ]

  const tabs = [
    { id: 'Accounts', icon: Users, label: 'Accounts' },
    { id: 'Community', icon: Users, label: 'Community' },
    { id: 'Packages', icon: Package, label: 'Packages' }
  ]

  return (
    <div className="min-h-screen bg-base-100">
      {/* Header */}
      <div className="bg-white border-b border-base-200 px-4 py-3">
        <div className="flex items-center gap-3 mb-4">
          <Users className="text-primary" size={24} />
          <h1 className="text-xl font-semibold">Community</h1>
        </div>
        
        {/* Search Bar */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-base-content/60" size={20} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="by place & community name"
            className="input input-bordered w-full pl-10 pr-12"
          />
          <Filter className="absolute right-3 top-1/2 transform -translate-y-1/2 text-base-content/60" size={20} />
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-1 bg-base-200 rounded-lg p-1">
          {tabs.map(({ id, icon: Icon, label }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-md transition-colors ${
                activeTab === id 
                  ? 'bg-primary text-white' 
                  : 'text-base-content/70 hover:text-base-content'
              }`}
            >
              <Icon size={16} />
              <span className="text-sm font-medium">{label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="p-4">
        {/* Communities Section */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Communities</h3>
            <button className="text-primary text-sm font-medium">See all</button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {communities.map((community) => (
              <div key={community.id} className="bg-white rounded-xl overflow-hidden shadow-sm border border-base-200">
                <div className="aspect-video relative">
                  <img 
                    src={community.image} 
                    alt={community.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-3">
                  <h4 className="font-semibold text-base mb-1">{community.name}</h4>
                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className={`text-sm ${i < Math.floor(community.rating) ? 'text-yellow-400' : 'text-gray-300'}`}>
                        ⭐
                      </span>
                    ))}
                    <span className="text-xs text-base-content/60 ml-1">
                      {community.reviews} reviews
                    </span>
                  </div>
                  <p className="text-xs text-base-content/60 mb-3">by {community.author}</p>
                  <div className="flex gap-2">
                    <button className="btn btn-primary btn-sm flex-1">Follow</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Accounts Section */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Accounts</h3>
            <button className="text-primary text-sm font-medium">See all</button>
          </div>
          
          <div className="grid grid-cols-4 md:grid-cols-7 gap-4">
            {accounts.map((account) => (
              <div key={account.id} className="text-center">
                <div className="relative mb-2">
                  <img 
                    src={account.avatar} 
                    alt={account.name}
                    className="w-16 h-16 rounded-full mx-auto border-2 border-base-200"
                  />
                </div>
                <p className="text-xs font-medium text-base-content/80 mb-2">
                  {account.name}
                </p>
                <button className="btn btn-primary btn-xs w-full">
                  Follow
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Community