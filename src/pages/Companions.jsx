import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Filter, Heart, MapPin } from 'lucide-react'
import { fetchCompanions, sendCompanionRequest } from '../services/companionsService'
import { useAuthStore } from '../state/authStore'
import TopHeader from '../components/TopHeader'
import CompanionCard from '../components/CompanionCard'
import LoadingSpinner from '../components/LoadingSpinner'
import Button from '../components/Button'

const Companions = () => {
  const { user } = useAuthStore()
  const [filters, setFilters] = useState({
    destination: '',
    travelStyle: 'all',
    budget: 'all'
  })
  const [showFilters, setShowFilters] = useState(false)

  const { data: companions, isLoading } = useQuery({
    queryKey: ['companions', filters],
    queryFn: () => fetchCompanions(filters)
  })

  const handleConnect = async (companion) => {
    try {
      const result = await sendCompanionRequest(companion.id, 'Hi! I\'d love to travel together!')
      if (result.success) {
        // Show success notification
        alert(`Connection request sent to ${companion.user.name}!`)
      }
    } catch (error) {
      console.error('Failed to send connection request:', error)
      alert('Failed to send connection request. Please try again.')
    }
  }

  const handleViewProfile = (companion) => {
    // Navigate to profile or show profile modal
    console.log('View profile:', companion.user.username)
    alert(`Viewing profile for ${companion.user.name}`)
  }

  const travelStyles = [
    { value: 'all', label: 'Any Style' },
    { value: 'adventure', label: 'Adventure' },
    { value: 'cultural', label: 'Cultural' },
    { value: 'relaxation', label: 'Relaxation' },
    { value: 'social', label: 'Social' },
    { value: 'photography', label: 'Photography' }
  ]

  const budgetOptions = [
    { value: 'all', label: 'Any Budget' },
    { value: 'low', label: 'Budget' },
    { value: 'medium', label: 'Mid-range' },
    { value: 'high', label: 'Luxury' }
  ]

  return (
    <div className="min-h-screen">
      <TopHeader title="Find Companions" />
      
      {/* Search and Filters */}
      <div className="sticky top-16 z-30 bg-base-100 border-b border-base-200 p-4">
        <div className="flex gap-2 mb-3">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search by destination..."
              value={filters.destination}
              onChange={(e) => setFilters(prev => ({ ...prev, destination: e.target.value }))}
              className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <Button
            type="button"
            variant={showFilters ? "primary" : "outline"}
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter size={20} />
          </Button>
        </div>

        {/* Filters */}
        {showFilters && (
          <div className="grid grid-cols-2 gap-4 animate-slide-in-up">
            <div>
              <label className="block text-sm font-medium mb-2">Travel Style</label>
              <select
                value={filters.travelStyle}
                onChange={(e) => setFilters(prev => ({ ...prev, travelStyle: e.target.value }))}
                className="select select-bordered w-full"
              >
                {travelStyles.map(style => (
                  <option key={style.value} value={style.value}>
                    {style.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Budget</label>
              <select
                value={filters.budget}
                onChange={(e) => setFilters(prev => ({ ...prev, budget: e.target.value }))}
                className="select select-bordered w-full"
              >
                {budgetOptions.map(budget => (
                  <option key={budget.value} value={budget.value}>
                    {budget.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Header Info */}
      <div className="p-4 bg-gradient-to-r from-primary/10 to-secondary/10">
        <div className="flex items-center gap-3 mb-2">
          <Heart className="text-primary" size={24} />
          <h2 className="text-lg font-bold">Find Your Travel Buddy</h2>
        </div>
        <p className="text-sm text-base-content/70">
          Connect with fellow travelers who share your interests and travel style
        </p>
      </div>

      {/* Companions List */}
      <div className="p-4">
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <>
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-base-content/60">
                {companions?.length || 0} companions found
              </span>
              {filters.destination && (
                <div className="flex items-center gap-1 text-sm text-primary">
                  <MapPin size={14} />
                  <span>{filters.destination}</span>
                </div>
              )}
            </div>
            
            {companions?.length === 0 ? (
              <div className="text-center py-12">
                <Heart size={48} className="mx-auto text-base-content/40 mb-4" />
                <h3 className="text-lg font-medium mb-2">No companions found</h3>
                <p className="text-base-content/60 mb-4">
                  Try adjusting your search criteria or check back later
                </p>
                <Button
                  variant="primary"
                  onClick={() => setFilters({ destination: '', travelStyle: 'all', budget: 'all' })}
                >
                  Clear Filters
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {companions?.map((companion) => (
                  <CompanionCard
                    key={companion.id}
                    companion={companion}
                    onConnect={handleConnect}
                    onViewProfile={handleViewProfile}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {/* Bottom CTA */}
      {companions?.length > 0 && (
        <div className="p-4 bg-base-200 text-center">
          <p className="text-sm text-base-content/70 mb-3">
            Want to be discovered by other travelers?
          </p>
          <Button variant="outline" size="sm">
            Update Your Travel Profile
          </Button>
        </div>
      )}
    </div>
  )
}

export default Companions