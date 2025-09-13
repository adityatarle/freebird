import { Package, Search, Filter } from 'lucide-react'
import { useState } from 'react'

const Packages = () => {
  const [searchQuery, setSearchQuery] = useState('')

  const packages = [
    {
      id: 1,
      name: 'Goa Beach Package',
      price: 'Rs 15,000',
      duration: '3 Days 2 Nights',
      image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=300&h=200&fit=crop',
      rating: 4.5,
      reviews: 120
    },
    {
      id: 2,
      name: 'Manali Adventure',
      price: 'Rs 25,000',
      duration: '5 Days 4 Nights',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop',
      rating: 4.8,
      reviews: 85
    },
    {
      id: 3,
      name: 'Kerala Backwaters',
      price: 'Rs 20,000',
      duration: '4 Days 3 Nights',
      image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=300&h=200&fit=crop',
      rating: 4.6,
      reviews: 95
    },
    {
      id: 4,
      name: 'Rajasthan Heritage',
      price: 'Rs 30,000',
      duration: '6 Days 5 Nights',
      image: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?w=300&h=200&fit=crop',
      rating: 4.7,
      reviews: 110
    }
  ]

  return (
    <div className="min-h-screen bg-base-100">
      {/* Header */}
      <div className="bg-white border-b border-base-200 px-4 py-3">
        <div className="flex items-center gap-3 mb-4">
          <Package className="text-primary" size={24} />
          <h1 className="text-xl font-semibold">Packages</h1>
        </div>
        
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-base-content/60" size={20} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search packages..."
            className="input input-bordered w-full pl-10 pr-12"
          />
          <Filter className="absolute right-3 top-1/2 transform -translate-y-1/2 text-base-content/60" size={20} />
        </div>
      </div>

      <div className="p-4">
        {/* Featured Packages */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Featured Packages</h3>
            <button className="text-primary text-sm font-medium">See all</button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {packages.map((pkg) => (
              <div key={pkg.id} className="bg-white rounded-xl overflow-hidden shadow-sm border border-base-200">
                <div className="aspect-video relative">
                  <img 
                    src={pkg.image} 
                    alt={pkg.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 left-2 bg-primary text-white px-2 py-1 rounded text-xs font-medium">
                    Featured
                  </div>
                </div>
                <div className="p-4">
                  <h4 className="font-semibold text-base mb-2">{pkg.name}</h4>
                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className={`text-sm ${i < Math.floor(pkg.rating) ? 'text-yellow-400' : 'text-gray-300'}`}>
                        ⭐
                      </span>
                    ))}
                    <span className="text-sm text-base-content/60 ml-1">
                      ({pkg.reviews} reviews)
                    </span>
                  </div>
                  <p className="text-sm text-base-content/60 mb-3">{pkg.duration}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-primary">{pkg.price}</span>
                    <button className="btn btn-primary btn-sm">Book Now</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Popular Destinations */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Popular Destinations</h3>
          <div className="grid grid-cols-2 gap-4">
            {['Goa', 'Manali', 'Kerala', 'Rajasthan', 'Kashmir', 'Himachal'].map((destination, index) => (
              <div key={destination} className="bg-white rounded-lg p-4 text-center shadow-sm border border-base-200">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-primary text-lg">🏔️</span>
                </div>
                <h4 className="font-medium">{destination}</h4>
                <p className="text-xs text-base-content/60">{Math.floor(Math.random() * 50) + 10} packages</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Packages