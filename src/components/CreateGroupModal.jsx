import { useState } from 'react'
import { X, MapPin, Calendar, Users, DollarSign, Camera } from 'lucide-react'
import { useUIStore } from '../state/uiStore'
import { useTravelStore } from '../state/travelStore'
import { createGroup } from '../services/groupsService'
import Button from './Button'
import Card from './Card'

const CreateGroupModal = () => {
  const { hideCreateGroup } = useUIStore()
  const { createGroup: addToMyGroups } = useTravelStore()
  const [loading, setLoading] = useState(false)
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    name: '',
    destination: '',
    description: '',
    travelDates: '',
    budget: '',
    maxMembers: 4,
    activities: [],
    image: ''
  })
  const [errors, setErrors] = useState({})

  const activities = [
    'Hiking', 'Photography', 'Food Tours', 'Museums', 'Nightlife',
    'Beach', 'Adventure Sports', 'Cultural Sites', 'Shopping',
    'Wildlife', 'Festivals', 'Local Experiences'
  ]

  const budgetRanges = [
    { value: 'budget', label: 'Budget ($500-1000)', description: 'Hostels, local food, public transport' },
    { value: 'mid-range', label: 'Mid-range ($1000-2500)', description: '3-star hotels, mix of dining, some tours' },
    { value: 'luxury', label: 'Luxury ($2500+)', description: '4-5 star hotels, fine dining, private tours' }
  ]

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const handleActivityToggle = (activity) => {
    setFormData(prev => ({
      ...prev,
      activities: prev.activities.includes(activity)
        ? prev.activities.filter(a => a !== activity)
        : [...prev.activities, activity]
    }))
  }

  const validateStep1 = () => {
    const newErrors = {}
    
    if (!formData.name.trim()) {
      newErrors.name = 'Group name is required'
    }
    
    if (!formData.destination.trim()) {
      newErrors.destination = 'Destination is required'
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const validateStep2 = () => {
    const newErrors = {}
    
    if (!formData.travelDates) {
      newErrors.travelDates = 'Travel dates are required'
    }
    
    if (!formData.budget) {
      newErrors.budget = 'Budget range is required'
    }
    
    if (formData.maxMembers < 2) {
      newErrors.maxMembers = 'Minimum 2 members required'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (step === 1 && validateStep1()) {
      setStep(2)
    }
  }

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  const handleSubmit = async () => {
    if (!validateStep2()) return
    
    setLoading(true)
    try {
      // Create group using service
      const newGroup = await createGroup({
        ...formData,
        image: formData.image || 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop'
      })
      
      // Add to local state
      addToMyGroups(newGroup)
      
      // Show success message
      alert(`Group "${formData.name}" created successfully!`)
      
      // Close modal
      hideCreateGroup()
    } catch (error) {
      console.error('Failed to create group:', error)
      setErrors({ general: 'Failed to create group. Please try again.' })
    } finally {
      setLoading(false)
    }
  }

  const handleClose = () => {
    hideCreateGroup()
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md lg:max-w-lg xl:max-w-xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-base-200">
          <h2 className="text-lg font-bold">Create Travel Group</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClose}
          >
            <X size={20} />
          </Button>
        </div>

        {/* Progress Indicator */}
        <div className="p-4 border-b border-base-200">
          <div className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
              step >= 1 ? 'bg-primary text-white' : 'bg-base-300 text-base-content/60'
            }`}>
              1
            </div>
            <div className={`flex-1 h-1 ${step > 1 ? 'bg-primary' : 'bg-base-300'}`} />
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
              step >= 2 ? 'bg-primary text-white' : 'bg-base-300 text-base-content/60'
            }`}>
              2
            </div>
          </div>
          <div className="flex justify-between mt-2 text-sm">
            <span className={step >= 1 ? 'text-primary' : 'text-base-content/60'}>
              Basic Info
            </span>
            <span className={step >= 2 ? 'text-primary' : 'text-base-content/60'}>
              Details
            </span>
          </div>
        </div>

        {/* Form Content */}
        <div className="p-4">
          {errors.general && (
            <div className="alert alert-error mb-4">
              <span>{errors.general}</span>
            </div>
          )}

          {step === 1 && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Group Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g., Swiss Alps Adventure"
                  className={`input input-bordered w-full ${errors.name ? 'input-error' : ''}`}
                />
                {errors.name && (
                  <p className="text-error text-sm mt-1">{errors.name}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Destination</label>
                <div className="relative">
                  <MapPin size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-base-content/60" />
                  <input
                    type="text"
                    name="destination"
                    value={formData.destination}
                    onChange={handleChange}
                    placeholder="e.g., Swiss Alps, Switzerland"
                    className={`input input-bordered w-full pl-10 ${errors.destination ? 'input-error' : ''}`}
                  />
                </div>
                {errors.destination && (
                  <p className="text-error text-sm mt-1">{errors.destination}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describe your trip plans, what you want to do, and what kind of travelers you're looking for..."
                  className={`textarea textarea-bordered w-full ${errors.description ? 'input-error' : ''}`}
                  rows="4"
                />
                {errors.description && (
                  <p className="text-error text-sm mt-1">{errors.description}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Cover Image URL (Optional)</label>
                <div className="relative">
                  <Camera size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-base-content/60" />
                  <input
                    type="url"
                    name="image"
                    value={formData.image}
                    onChange={handleChange}
                    placeholder="https://example.com/image.jpg"
                    className="input input-bordered w-full pl-10"
                  />
                </div>
                <p className="text-xs text-base-content/60 mt-1">
                  Leave empty to use a default image
                </p>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Travel Dates</label>
                <div className="relative">
                  <Calendar size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-base-content/60" />
                  <input
                    type="text"
                    name="travelDates"
                    value={formData.travelDates}
                    onChange={handleChange}
                    placeholder="e.g., March 15-22, 2024"
                    className={`input input-bordered w-full pl-10 ${errors.travelDates ? 'input-error' : ''}`}
                  />
                </div>
                {errors.travelDates && (
                  <p className="text-error text-sm mt-1">{errors.travelDates}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Budget Range</label>
                <div className="space-y-2">
                  {budgetRanges.map(budget => (
                    <label key={budget.value} className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="radio"
                        name="budget"
                        value={budget.value}
                        checked={formData.budget === budget.value}
                        onChange={handleChange}
                        className="radio radio-primary mt-1"
                      />
                      <div>
                        <p className="font-medium">{budget.label}</p>
                        <p className="text-sm text-base-content/60">{budget.description}</p>
                      </div>
                    </label>
                  ))}
                </div>
                {errors.budget && (
                  <p className="text-error text-sm mt-1">{errors.budget}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Maximum Members</label>
                <div className="relative">
                  <Users size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-base-content/60" />
                  <input
                    type="number"
                    name="maxMembers"
                    value={formData.maxMembers}
                    onChange={handleChange}
                    min="2"
                    max="20"
                    className={`input input-bordered w-full pl-10 ${errors.maxMembers ? 'input-error' : ''}`}
                  />
                </div>
                {errors.maxMembers && (
                  <p className="text-error text-sm mt-1">{errors.maxMembers}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Activities (Select all that apply)</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
                  {activities.map(activity => (
                    <label key={activity} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.activities.includes(activity)}
                        onChange={() => handleActivityToggle(activity)}
                        className="checkbox checkbox-primary checkbox-sm"
                      />
                      <span className="text-sm">{activity}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex gap-3 p-4 border-t border-base-200">
          {step > 1 && (
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={loading}
            >
              Back
            </Button>
          )}
          <Button
            variant="outline"
            onClick={handleClose}
            disabled={loading}
          >
            Cancel
          </Button>
          {step === 1 ? (
            <Button
              variant="primary"
              onClick={handleNext}
              fullWidth
            >
              Next
            </Button>
          ) : (
            <Button
              variant="primary"
              onClick={handleSubmit}
              loading={loading}
              fullWidth
            >
              Create Group
            </Button>
          )}
        </div>
      </Card>
    </div>
  )
}

export default CreateGroupModal