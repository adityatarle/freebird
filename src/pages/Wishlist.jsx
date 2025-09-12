import { useState } from 'react'
import { Heart, MapPin, Calendar, Trash2, Share } from 'lucide-react'
import { useTravelStore } from '../state/travelStore'
import TopHeader from '../components/TopHeader'
import Button from '../components/Button'
import Card from '../components/Card'

const Wishlist = () => {
  const { wishlist, removeFromWishlist, savedDestinations, removeSavedDestination } = useTravelStore()
  const [activeTab, setActiveTab] = useState('all')

  const allItems = [
    ...wishlist.map(item => ({ ...item, source: 'wishlist' })),
    ...savedDestinations.map(item => ({ ...item, source: 'destinations', type: 'destination' }))
  ].sort((a, b) => (b.addedAt || b.savedAt) - (a.addedAt || a.savedAt))

  const handleRemove = (item) => {
    if (item.source === 'wishlist') {
      removeFromWishlist(item.id, item.type)
    } else {
      removeSavedDestination(item.id)
    }
  }

  const handleShare = (item) => {
    // Simulate sharing functionality
    if (navigator.share) {
      navigator.share({
        title: item.title,
        text: `Check out this amazing destination: ${item.title}`,
        url: window.location.href
      })
    } else {
      // Fallback - copy to clipboard
      navigator.clipboard.writeText(`${item.title} - ${item.location}`)
      alert('Link copied to clipboard!')
    }
  }

  const tabs = [
    { id: 'all', label: 'All', count: allItems.length },
    { id: 'posts', label: 'Posts', count: wishlist.filter(item => item.type === 'post').length },
    { id: 'destinations', label: 'Destinations', count: wishlist.filter(item => item.type === 'destination').length + savedDestinations.length }
  ]

  const filteredItems = activeTab === 'all' ? allItems : 
    activeTab === 'posts' ? allItems.filter(item => item.type === 'post') :
    allItems.filter(item => item.type === 'destination')

  const WishlistItem = ({ item }) => (
    <Card className="overflow-hidden p-0">
      <div className="relative">
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-3 right-3 flex gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="bg-white/80 backdrop-blur-sm hover:bg-white/90 text-gray-600"
            onClick={() => handleShare(item)}
          >
            <Share size={16} />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="bg-white/80 backdrop-blur-sm hover:bg-white/90 text-red-500 hover:text-red-600"
            onClick={() => handleRemove(item)}
          >
            <Trash2 size={16} />
          </Button>
        </div>
        <div className="absolute bottom-3 left-3">
          <span className={`
            px-2 py-1 rounded-full text-xs font-medium text-white
            ${item.type === 'post' ? 'bg-blue-500' : 'bg-green-500'}
          `}>
            {item.type === 'post' ? 'Post' : 'Destination'}
          </span>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="font-bold text-lg mb-2 line-clamp-2">{item.title}</h3>
        
        <div className="flex items-center gap-2 text-sm text-base-content/60 mb-3">
          <MapPin size={14} />
          <span>{item.location}</span>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 text-xs text-base-content/60">
            <Calendar size={12} />
            <span>
              Saved {new Date(item.addedAt || item.savedAt).toLocaleDateString()}
            </span>
          </div>
          <Button variant="outline" size="xs">
            Plan Trip
          </Button>
        </div>
      </div>
    </Card>
  )

  return (
    <div className="min-h-screen">
      <TopHeader title="My Wishlist" />
      
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
              {tab.label}
              {tab.count > 0 && (
                <span className="bg-base-300 text-base-content text-xs rounded-full px-2 py-0.5 min-w-[20px] h-5 flex items-center justify-center">
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Header Stats */}
      {allItems.length > 0 && (
        <div className="p-4 bg-gradient-to-r from-primary/10 to-secondary/10">
          <div className="flex items-center gap-3 mb-2">
            <Heart className="text-primary" size={24} fill="currentColor" />
            <div>
              <h2 className="text-lg font-bold">Your Travel Dreams</h2>
              <p className="text-sm text-base-content/70">
                {allItems.length} saved {allItems.length === 1 ? 'item' : 'items'} waiting to be explored
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Wishlist Items */}
      <div className="p-4">
        {filteredItems.length === 0 ? (
          <div className="text-center py-12">
            <Heart size={48} className="mx-auto text-base-content/40 mb-4" />
            <h3 className="text-lg font-medium mb-2">
              {activeTab === 'all' ? 'Your wishlist is empty' :
               activeTab === 'posts' ? 'No saved posts' :
               'No saved destinations'}
            </h3>
            <p className="text-base-content/60 mb-4">
              {activeTab === 'all' ? 'Start exploring and save your favorite destinations and posts!' :
               activeTab === 'posts' ? 'Save interesting travel posts to view them later' :
               'Save destinations you want to visit in the future'}
            </p>
            <div className="flex gap-2 justify-center">
              <Button
                variant="primary"
                onClick={() => window.history.back()}
              >
                Start Exploring
              </Button>
            </div>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-base-content/60">
                {filteredItems.length} {filteredItems.length === 1 ? 'item' : 'items'}
              </span>
              <Button variant="outline" size="sm">
                Plan Trip from Wishlist
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredItems.map((item, index) => (
                <WishlistItem key={`${item.id}-${item.type}-${index}`} item={item} />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Bottom CTA */}
      {filteredItems.length > 0 && (
        <div className="p-4 bg-base-200 text-center">
          <p className="text-sm text-base-content/70 mb-3">
            Ready to turn your dreams into reality?
          </p>
          <Button variant="primary">
            Create Trip from Wishlist
          </Button>
        </div>
      )}
    </div>
  )
}

export default Wishlist