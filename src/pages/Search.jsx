import { useState } from 'react'
import { Search as SearchIcon, Filter, MapPin, Users, Hash, Clock } from 'lucide-react'

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeTab, setActiveTab] = useState('All')

  const tabs = ['All', 'Places', 'People', 'Posts', 'Groups']

  const recentSearches = [
    'Goa beaches',
    'Manali trek',
    'Kerala backwaters',
    'Rajasthan tour'
  ]

  const trendingTopics = [
    { tag: 'GoaVibes', posts: '2.1k posts' },
    { tag: 'MountainTrek', posts: '1.8k posts' },
    { tag: 'BeachLife', posts: '1.5k posts' },
    { tag: 'SoloTravel', posts: '1.2k posts' }
  ]

  const searchResults = [
    {
      id: 1,
      type: 'place',
      name: 'Goa',
      subtitle: 'Beach destination in India',
      image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=100&h=100&fit=crop',
      stats: '2.1k posts'
    },
    {
      id: 2,
      type: 'person',
      name: 'Sarah Chen',
      subtitle: '@sarahtravel • Travel blogger',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
      stats: '1.2k followers'
    },
    {
      id: 3,
      type: 'post',
      name: 'Amazing sunset at Goa beach',
      subtitle: 'by @john_travels • 2 hours ago',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=100&h=100&fit=crop',
      stats: '45 likes'
    }
  ]

  const getResultIcon = (type) => {
    switch (type) {
      case 'place':
        return <MapPin size={16} className="text-green-500" />
      case 'person':
        return <Users size={16} className="text-blue-500" />
      case 'post':
        return <Hash size={16} className="text-purple-500" />
      default:
        return <SearchIcon size={16} className="text-base-content/60" />
    }
  }

  return (
    <div className="min-h-screen bg-base-100">
      {/* Header */}
      <div className="bg-white border-b border-base-200 px-4 py-3 sticky top-0 z-10">
        <div className="flex items-center gap-3 mb-4">
          <SearchIcon className="text-primary" size={24} />
          <h1 className="text-xl font-semibold">Search</h1>
        </div>
        
        {/* Search Bar */}
        <div className="relative mb-4">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-base-content/60" size={20} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search places, people, posts..."
            className="input input-bordered w-full pl-10 pr-12"
          />
          <Filter className="absolute right-3 top-1/2 transform -translate-y-1/2 text-base-content/60" size={20} />
        </div>

        {/* Search Tabs */}
        <div className="flex gap-1 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeTab === tab 
                  ? 'bg-primary text-white' 
                  : 'bg-base-200 text-base-content/70 hover:text-base-content'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="p-4">
        {!searchQuery ? (
          <>
            {/* Recent Searches */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-4">
                <Clock size={20} className="text-base-content/60" />
                <h3 className="text-lg font-semibold">Recent</h3>
              </div>
              
              <div className="space-y-2">
                {recentSearches.map((search, index) => (
                  <button
                    key={index}
                    onClick={() => setSearchQuery(search)}
                    className="flex items-center gap-3 w-full p-3 bg-white rounded-lg hover:bg-base-50 transition-colors text-left"
                  >
                    <SearchIcon size={16} className="text-base-content/60" />
                    <span>{search}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Trending */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Hash size={20} className="text-base-content/60" />
                <h3 className="text-lg font-semibold">Trending</h3>
              </div>
              
              <div className="space-y-2">
                {trendingTopics.map((topic, index) => (
                  <button
                    key={index}
                    className="flex items-center justify-between w-full p-3 bg-white rounded-lg hover:bg-base-50 transition-colors text-left"
                  >
                    <div>
                      <p className="font-medium">#{topic.tag}</p>
                      <p className="text-sm text-base-content/60">{topic.posts}</p>
                    </div>
                    <Hash size={16} className="text-primary" />
                  </button>
                ))}
              </div>
            </div>
          </>
        ) : (
          /* Search Results */
          <div>
            <h3 className="text-lg font-semibold mb-4">
              Results for "{searchQuery}"
            </h3>
            
            <div className="space-y-3">
              {searchResults.map((result) => (
                <div
                  key={result.id}
                  className="flex items-center gap-3 p-4 bg-white rounded-lg hover:bg-base-50 transition-colors cursor-pointer"
                >
                  <img 
                    src={result.image} 
                    alt={result.name}
                    className={`w-12 h-12 object-cover ${
                      result.type === 'person' ? 'rounded-full' : 'rounded-lg'
                    }`}
                  />
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      {getResultIcon(result.type)}
                      <h4 className="font-medium">{result.name}</h4>
                    </div>
                    <p className="text-sm text-base-content/60">{result.subtitle}</p>
                  </div>
                  
                  <div className="text-right">
                    <p className="text-xs text-base-content/60">{result.stats}</p>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Load More */}
            <div className="text-center mt-6">
              <button className="btn btn-outline">Load More Results</button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Search