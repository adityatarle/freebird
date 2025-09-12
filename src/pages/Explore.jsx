import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Search, Filter, MapPin } from 'lucide-react'
import { fetchDestinations } from '../services/destinationsService'
import TopHeader from '../components/TopHeader'
import DesktopHeader from '../components/DesktopHeader'
import DestinationCard from '../components/DestinationCard'
import LoadingSpinner from '../components/LoadingSpinner'
import Button from '../components/Button'

const Explore = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [filters, setFilters] = useState({
    category: 'all',
    budget: 'all',
    search: ''
  })
  const [showFilters, setShowFilters] = useState(false)

  const { data: destinations, isLoading } = useQuery({
    queryKey: ['destinations', filters],
    queryFn: () => fetchDestinations(filters)
  })

  const handleSearch = (e) => {
    e.preventDefault()
    setFilters(prev => ({ ...prev, search: searchTerm }))
  }

  const categories = [
    { value: 'all', label: 'All' },
    { value: 'islands', label: 'Islands' },
    { value: 'mountains', label: 'Mountains' },
    { value: 'cities', label: 'Cities' },
    { value: 'desert', label: 'Desert' },
    { value: 'historical', label: 'Historical' },
    { value: 'nature', label: 'Nature' }
  ]

  const budgetOptions = [
    { value: 'all', label: 'Any Budget' },
    { value: 'low', label: 'Budget ($)' },
    { value: 'medium', label: 'Mid-range ($$)' },
    { value: 'high', label: 'Luxury ($$$)' }
  ]

  return (
    <div className="min-h-screen">
      <TopHeader title="Explore" />
      <DesktopHeader title="Explore Destinations" />
      
      {/* Search Bar */}
      <div className="sticky top-16 lg:top-20 z-30 bg-base-100 border-b border-base-200 p-4 lg:px-6">
        <form onSubmit={handleSearch} className="flex gap-2">
          <div className="flex-1 relative">
            <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-base-content/60" />
            <input
              type="text"
              placeholder="Search destinations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input input-bordered w-full pl-10 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <Button
            type="button"
            variant={showFilters ? "primary" : "outline"}
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter size={20} />
          </Button>
        </form>

        {/* Filters */}
        {showFilters && (
          <div className="mt-4 space-y-4 animate-slide-in-up">
            <div>
              <label className="block text-sm font-medium mb-2">Category</label>
              <select
                value={filters.category}
                onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value }))}
                className="select select-bordered w-full"
              >
                {categories.map(category => (
                  <option key={category.value} value={category.value}>
                    {category.label}
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

      {/* Popular Categories */}
      <div className="p-4">
        <h2 className="text-lg font-bold mb-3">Popular Categories</h2>
        <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2">
          {categories.slice(1).map(category => (
            <button
              key={category.value}
              onClick={() => setFilters(prev => ({ ...prev, category: category.value }))}
              className={`
                flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap
                ${filters.category === category.value
                  ? 'bg-primary text-white'
                  : 'bg-base-200 text-base-content hover:bg-base-300'
                }
              `}
            >
              <MapPin size={16} />
              {category.label}
            </button>
          ))}
        </div>
      </div>

      {/* Destinations Grid */}
      <div className="p-4">
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold">
                {filters.search ? `Results for "${filters.search}"` : 'Destinations'}
              </h2>
              <span className="text-sm text-base-content/60">
                {destinations?.length || 0} found
              </span>
            </div>
            
            {destinations?.length === 0 ? (
              <div className="text-center py-12">
                <MapPin size={48} className="mx-auto text-base-content/40 mb-4" />
                <h3 className="text-lg font-medium mb-2">No destinations found</h3>
                <p className="text-base-content/60">
                  Try adjusting your search or filters
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 md:gap-6">
                {destinations?.map((destination) => (
                  <DestinationCard
                    key={destination.id}
                    destination={destination}
                    onClick={() => {
                      // Handle destination click - could navigate to detail page
                      console.log('Navigate to destination:', destination.id)
                    }}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default Explore