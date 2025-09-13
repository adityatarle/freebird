import { Search, Filter } from 'lucide-react'
import { useState } from 'react'

const Feed = () => {
  const [searchQuery, setSearchQuery] = useState('')

  // Sample feed data matching your Figma design
  const feedPost = {
    id: 1,
    user: {
      name: 'Tejas bhau',
      date: '10 Aug 2024',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face'
    },
    destination: 'Jalgaon',
    departureDate: '15 July 2024',
    description: 'may text. I am traveling from pune to jalgaon solo. If require travelling partner',
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=600&h=400&fit=crop',
    actions: {
      likes: 0,
      comments: 0,
      bookmarks: 0
    }
  }

  const notifications = [
    { id: 1, user: 'Nehal', action: 'likes your post', time: '2 mins ago', type: 'like' },
    { id: 2, user: 'Nehal', action: 'sent you a friend request', time: '2 mins ago', type: 'friend' },
    { id: 3, user: 'Nehal', action: 'commented on your post', time: '2 mins ago', type: 'comment' },
    { id: 4, user: 'Nehal', action: 'likes your post', time: '2 mins ago', type: 'like' }
  ]

  const suggestedPlaces = [
    {
      id: 1,
      name: 'Goa',
      subtitle: 'Coolest Beach',
      image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=200&h=150&fit=crop',
      price: 'Rs 150'
    },
    {
      id: 2, 
      name: 'Goa',
      subtitle: 'Coolest Beach',
      image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=200&h=150&fit=crop'
    },
    {
      id: 3,
      name: 'Goa', 
      subtitle: 'Coolest Beach',
      image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=200&h=150&fit=crop'
    }
  ]

  const seasonalSpecial = [
    {
      id: 1,
      name: 'Alibaug',
      subtitle: 'Coolest beach',
      image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=300&h=200&fit=crop'
    },
    {
      id: 2,
      name: 'Mahabaleshwar', 
      subtitle: 'Hill station',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop'
    }
  ]

  return (
    <div className="min-h-screen bg-base-100">
      <div className="max-w-7xl mx-auto flex">
        {/* Main Content */}
        <div className="flex-1 max-w-2xl">
          {/* Header */}
          <div className="bg-white border-b border-base-200 px-4 py-3 sticky top-0 z-10">
            <div className="flex items-center gap-3 mb-4">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                FreBud
              </h1>
              <span className="text-sm text-base-content/60">Travel.Sleep.Travel</span>
            </div>
            
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-base-content/60" size={20} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search"
                className="input input-bordered w-full pl-10 pr-12 bg-base-200"
              />
              <Filter className="absolute right-3 top-1/2 transform -translate-y-1/2 text-base-content/60" size={20} />
            </div>
          </div>

          {/* Feeds Section */}
          <div className="p-4">
            <h2 className="text-xl font-semibold mb-4">Feeds</h2>
            
            {/* Feed Post */}
            <div className="bg-white rounded-xl border border-primary p-4 mb-6">
              <div className="flex items-center gap-3 mb-3">
                <img 
                  src={feedPost.user.avatar} 
                  alt={feedPost.user.name}
                  className="w-12 h-12 rounded-full"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold">{feedPost.user.name}</h3>
                    <span className="text-primary">👥</span>
                  </div>
                  <p className="text-sm text-base-content/60">{feedPost.user.date}</p>
                </div>
              </div>
              
              <div className="mb-3">
                <p className="text-sm mb-1">
                  <span className="font-medium">Traveling Destination:</span> {feedPost.destination}
                </p>
                <p className="text-sm mb-3">
                  <span className="font-medium">On:</span> {feedPost.departureDate}
                </p>
                <p className="text-sm text-base-content/80">{feedPost.description}</p>
              </div>
              
              <div className="aspect-video mb-3 rounded-lg overflow-hidden">
                <img 
                  src={feedPost.image} 
                  alt="Travel destination"
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="flex items-center gap-4 text-base-content/60">
                <button className="flex items-center gap-1 hover:text-red-500">
                  ❤️ <span className="text-sm">0</span>
                </button>
                <button className="flex items-center gap-1 hover:text-blue-500">
                  💬 <span className="text-sm">0</span>
                </button>
                <button className="flex items-center gap-1 hover:text-green-500">
                  📤
                </button>
                <button className="flex items-center gap-1 hover:text-yellow-500">
                  🔖
                </button>
                <input 
                  type="text" 
                  placeholder="write a comment..."
                  className="flex-1 input input-sm input-bordered ml-4"
                />
              </div>
            </div>

            {/* Season Special */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Season special</h3>
                <button className="text-primary text-sm font-medium">See all</button>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                {seasonalSpecial.map((place) => (
                  <div key={place.id} className="bg-white rounded-xl overflow-hidden shadow-sm">
                    <div className="aspect-video">
                      <img 
                        src={place.image} 
                        alt={place.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-3">
                      <h4 className="font-semibold">{place.name}</h4>
                      <p className="text-sm text-base-content/60">{place.subtitle}</p>
                      <div className="flex gap-2 mt-2">
                        <button className="btn btn-primary btn-sm flex-1">+</button>
                        <button className="btn btn-outline btn-sm">💬</button>
                        <button className="btn btn-outline btn-sm">📤</button>
                        <button className="btn btn-outline btn-sm">❤️</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="hidden lg:block w-80 border-l border-base-200">
          <div className="p-4">
            {/* Notifications */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Notifications</h3>
                <button className="text-primary text-sm font-medium">See all</button>
              </div>
              
              <div className="space-y-3">
                {notifications.map((notification) => (
                  <div key={notification.id} className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${
                      notification.type === 'like' ? 'bg-red-500' :
                      notification.type === 'friend' ? 'bg-blue-500' : 'bg-green-500'
                    }`}></div>
                    <div className="flex-1">
                      <p className="text-sm">
                        <span className="font-medium">{notification.user}</span> {notification.action}
                      </p>
                      <p className="text-xs text-base-content/60">{notification.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Suggestion Places */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Suggestion places</h3>
                <button className="text-primary text-sm font-medium">See all</button>
              </div>
              
              <div className="space-y-3">
                {suggestedPlaces.map((place) => (
                  <div key={place.id} className="flex items-center gap-3 bg-white rounded-lg p-3 shadow-sm">
                    <img 
                      src={place.image} 
                      alt={place.name}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold text-sm">{place.name}</h4>
                      <p className="text-xs text-base-content/60">{place.subtitle}</p>
                      {place.price && (
                        <p className="text-xs font-medium text-primary">{place.price}</p>
                      )}
                    </div>
                    <button className="btn btn-primary btn-sm">View</button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Feed