import { MapPin, Calendar, Star, Languages, Heart } from 'lucide-react'
import Button from './Button'
import Card from './Card'

const CompanionCard = ({ companion, onConnect, onViewProfile }) => {
  const travelStyleColors = {
    adventure: 'text-orange-600 bg-orange-100',
    cultural: 'text-purple-600 bg-purple-100',
    relaxation: 'text-blue-600 bg-blue-100',
    social: 'text-green-600 bg-green-100',
    photography: 'text-pink-600 bg-pink-100'
  }
  
  const budgetColors = {
    low: 'text-green-600',
    medium: 'text-yellow-600',
    high: 'text-red-600'
  }
  
  return (
    <Card className="overflow-hidden p-0">
      <div className="relative">
        <img
          src={companion.user.avatar}
          alt={companion.user.name}
          className="w-full h-32 object-cover"
        />
        <div className="absolute top-3 right-3">
          {companion.verified && (
            <div className="bg-blue-500 text-white px-2 py-1 rounded-full text-xs font-medium">
              ✓ Verified
            </div>
          )}
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="font-bold text-lg">{companion.user.name}</h3>
            <p className="text-sm text-base-content/60">@{companion.user.username}</p>
            <div className="flex items-center gap-1 text-sm text-base-content/60 mt-1">
              <MapPin size={14} />
              <span>{companion.user.location}</span>
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-1 mb-1">
              <Star size={14} className="text-yellow-500" fill="currentColor" />
              <span className="text-sm font-medium">{companion.rating}</span>
            </div>
            <p className="text-xs text-base-content/60">{companion.tripCount} trips</p>
          </div>
        </div>
        
        <div className="mb-3">
          <div className="flex items-center gap-2 mb-2">
            <MapPin size={14} className="text-primary" />
            <span className="font-medium text-sm">{companion.destination}</span>
          </div>
          <div className="flex items-center gap-2 mb-2">
            <Calendar size={14} className="text-primary" />
            <span className="text-sm">{companion.travelDates}</span>
          </div>
        </div>
        
        <p className="text-sm text-base-content/70 mb-3 line-clamp-2">
          {companion.bio}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-3">
          <span className={`
            px-2 py-1 rounded-full text-xs font-medium capitalize
            ${travelStyleColors[companion.travelStyle] || 'text-gray-600 bg-gray-100'}
          `}>
            {companion.travelStyle}
          </span>
          <span className={`
            px-2 py-1 rounded-full text-xs font-medium capitalize
            ${budgetColors[companion.budget]} bg-base-200
          `}>
            {companion.budget} budget
          </span>
        </div>
        
        <div className="mb-4">
          <div className="flex items-center gap-1 mb-2">
            <Languages size={14} className="text-base-content/60" />
            <span className="text-xs text-base-content/60">Languages:</span>
          </div>
          <div className="flex flex-wrap gap-1">
            {companion.languages.map((language) => (
              <span
                key={language}
                className="px-2 py-1 bg-base-200 text-base-content/70 text-xs rounded"
              >
                {language}
              </span>
            ))}
          </div>
        </div>
        
        <div className="flex gap-2">
          <Button
            variant="primary"
            size="sm"
            fullWidth
            onClick={() => onConnect(companion)}
          >
            <Heart size={14} />
            Connect
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onViewProfile(companion)}
          >
            View Profile
          </Button>
        </div>
      </div>
    </Card>
  )
}

export default CompanionCard