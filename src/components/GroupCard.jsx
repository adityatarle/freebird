import { Users, MapPin, Calendar, DollarSign } from 'lucide-react'
import Button from './Button'
import Card from './Card'

const GroupCard = ({ group, onJoin, onViewDetails }) => {
  const spotsLeft = group.maxMembers - group.members.length
  const isNearlyFull = spotsLeft <= 2
  
  return (
    <Card className="overflow-hidden p-0">
      <div className="relative">
        <img
          src={group.image}
          alt={group.name}
          className="w-full h-40 object-cover"
        />
        <div className="absolute top-3 right-3">
          <span className={`
            px-2 py-1 rounded-full text-xs font-medium
            ${group.status === 'open' 
              ? 'bg-green-500 text-white' 
              : 'bg-red-500 text-white'
            }
          `}>
            {group.status === 'open' ? 'Open' : 'Closed'}
          </span>
        </div>
        <div className="absolute bottom-3 left-3">
          <div className="flex -space-x-2">
            {group.members.slice(0, 3).map((member, index) => (
              <img
                key={index}
                src={member.avatar}
                alt={member.name}
                className="w-8 h-8 rounded-full border-2 border-white"
              />
            ))}
            {group.members.length > 3 && (
              <div className="w-8 h-8 rounded-full border-2 border-white bg-base-content text-base-100 flex items-center justify-center text-xs font-medium">
                +{group.members.length - 3}
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-bold text-lg line-clamp-1">{group.name}</h3>
          <div className="flex items-center gap-1 text-sm">
            <Users size={14} className="text-base-content/60" />
            <span className={isNearlyFull ? 'text-orange-600 font-medium' : 'text-base-content/60'}>
              {group.members.length}/{group.maxMembers}
            </span>
          </div>
        </div>
        
        <div className="space-y-2 mb-3">
          <div className="flex items-center gap-2 text-sm">
            <MapPin size={14} className="text-primary" />
            <span>{group.destination}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Calendar size={14} className="text-primary" />
            <span>{group.travelDates}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <DollarSign size={14} className="text-primary" />
            <span>{group.budget}</span>
          </div>
        </div>
        
        <p className="text-sm text-base-content/70 mb-3 line-clamp-2">
          {group.description}
        </p>
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <img
              src={group.organizer.avatar}
              alt={group.organizer.name}
              className="w-6 h-6 rounded-full"
            />
            <span className="text-sm text-base-content/60">
              by {group.organizer.name}
            </span>
          </div>
          {isNearlyFull && (
            <span className="text-xs text-orange-600 font-medium">
              Only {spotsLeft} spots left!
            </span>
          )}
        </div>
        
        <div className="flex flex-wrap gap-1 mb-4">
          {group.activities.slice(0, 3).map((activity) => (
            <span
              key={activity}
              className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
            >
              {activity}
            </span>
          ))}
          {group.activities.length > 3 && (
            <span className="px-2 py-1 bg-base-200 text-base-content/60 text-xs rounded-full">
              +{group.activities.length - 3}
            </span>
          )}
        </div>
        
        <div className="flex gap-2">
          {group.status === 'open' && spotsLeft > 0 ? (
            <Button
              variant="primary"
              size="sm"
              fullWidth
              onClick={() => onJoin(group)}
            >
              Join Group
            </Button>
          ) : (
            <Button
              variant="outline"
              size="sm"
              fullWidth
              disabled
            >
              {group.status === 'closed' ? 'Group Closed' : 'Group Full'}
            </Button>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onViewDetails(group)}
          >
            Details
          </Button>
        </div>
      </div>
    </Card>
  )
}

export default GroupCard