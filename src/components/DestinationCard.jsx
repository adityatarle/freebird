import { MapPin, Star, Clock, DollarSign } from 'lucide-react'
import { useTravelStore } from '../state/travelStore'
import Button from './Button'
import Card from './Card'

const DestinationCard = ({ destination, onClick }) => {
  const { addToWishlist, isInWishlist } = useTravelStore()
  
  const handleSave = (e) => {
    e.stopPropagation()
    const destinationData = {
      id: destination.id,
      type: 'destination',
      title: destination.name,
      image: destination.image,
      location: `${destination.name}, ${destination.country}`
    }
    addToWishlist(destinationData)
  }
  
  const isBookmarked = isInWishlist(destination.id, 'destination')
  
  const budgetColors = {
    low: 'text-green-600 bg-green-100',
    medium: 'text-yellow-600 bg-yellow-100',
    high: 'text-red-600 bg-red-100'
  }
  
  const budgetLabels = {
    low: '$',
    medium: '$$',
    high: '$$$'
  }
  
  return (
    <Card hover className="overflow-hidden p-0" onClick={onClick}>
      <div className="relative">
        <img
          src={destination.image}
          alt={destination.name}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-3 right-3">
          <Button
            variant="ghost"
            size="sm"
            className={`
              bg-white/80 backdrop-blur-sm hover:bg-white/90
              ${isBookmarked ? 'text-yellow-500' : 'text-gray-600'}
            `}
            onClick={handleSave}
          >
            <Star size={16} fill={isBookmarked ? 'currentColor' : 'none'} />
          </Button>
        </div>
        <div className="absolute top-3 left-3">
          <span className={`
            px-2 py-1 rounded-full text-xs font-medium
            ${budgetColors[destination.budget]}
          `}>
            {budgetLabels[destination.budget]}
          </span>
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <div>
            <h3 className="font-bold text-lg">{destination.name}</h3>
            <div className="flex items-center gap-1 text-base-content/60 text-sm">
              <MapPin size={14} />
              <span>{destination.country}</span>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Star size={14} className="text-yellow-500" fill="currentColor" />
            <span className="text-sm font-medium">{destination.rating}</span>
          </div>
        </div>
        
        <p className="text-sm text-base-content/70 mb-3 line-clamp-2">
          {destination.description}
        </p>
        
        <div className="flex items-center gap-4 text-xs text-base-content/60">
          <div className="flex items-center gap-1">
            <Clock size={12} />
            <span>{destination.duration}</span>
          </div>
          <div className="flex items-center gap-1">
            <DollarSign size={12} />
            <span className="capitalize">{destination.budget}</span>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-1 mt-3">
          {destination.activities.slice(0, 3).map((activity) => (
            <span
              key={activity}
              className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
            >
              {activity}
            </span>
          ))}
          {destination.activities.length > 3 && (
            <span className="px-2 py-1 bg-base-200 text-base-content/60 text-xs rounded-full">
              +{destination.activities.length - 3} more
            </span>
          )}
        </div>
      </div>
    </Card>
  )
}

export default DestinationCard