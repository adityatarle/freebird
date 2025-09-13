import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Upload, MapPin, Users, Camera } from 'lucide-react'
import { toast } from 'sonner'

const CommunityPost = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    media: null,
    destination: '',
    type: '',
    peopleRequired: '',
    fromLocation: '',
    message: ''
  })
  const [mediaPreview, setMediaPreview] = useState(null)

  const handleMediaUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      setFormData({ ...formData, media: file })
      const reader = new FileReader()
      reader.onload = (e) => setMediaPreview(e.target.result)
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!formData.media) {
      toast.error('Please select media to upload')
      return
    }
    
    if (!formData.destination || !formData.type) {
      toast.error('Please fill in all required fields')
      return
    }

    // Simulate post creation
    toast.success('Community post created successfully!')
    navigate('/community')
  }

  return (
    <div className="min-h-screen bg-base-100">
      {/* Header */}
      <div className="bg-white border-b border-base-200 px-4 py-3 flex items-center justify-between">
        <button 
          onClick={() => navigate(-1)}
          className="p-2 hover:bg-base-200 rounded-full"
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-lg font-semibold">Community Post</h1>
        <div className="w-8"></div>
      </div>

      <form onSubmit={handleSubmit} className="p-4 max-w-md mx-auto">
        {/* Media Upload */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-base-content mb-2">
            Select Media
          </label>
          <div className="relative">
            {mediaPreview ? (
              <div className="relative aspect-square bg-base-200 rounded-lg overflow-hidden">
                <img 
                  src={mediaPreview} 
                  alt="Preview" 
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => {
                    setMediaPreview(null)
                    setFormData({ ...formData, media: null })
                  }}
                  className="absolute top-2 right-2 bg-black/50 text-white rounded-full p-1 hover:bg-black/70"
                >
                  ✕
                </button>
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center aspect-square bg-base-200 border-2 border-dashed border-base-300 rounded-lg cursor-pointer hover:bg-base-300 transition-colors">
                <Upload size={32} className="text-base-content/60 mb-2" />
                <span className="text-sm text-base-content/60">
                  Tap to upload photo or video
                </span>
                <input
                  type="file"
                  accept="image/*,video/*"
                  onChange={handleMediaUpload}
                  className="hidden"
                />
              </label>
            )}
          </div>
        </div>

        {/* Destination */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="destination place"
            value={formData.destination}
            onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
            className="input input-bordered w-full"
          />
        </div>

        {/* Type Selection */}
        <div className="mb-4">
          <select
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            className="select select-bordered w-full"
          >
            <option value="">select type</option>
            <option value="adventure">Adventure</option>
            <option value="relaxation">Relaxation</option>
            <option value="cultural">Cultural</option>
            <option value="business">Business</option>
            <option value="family">Family</option>
          </select>
        </div>

        {/* People Required */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="no of persons require"
            value={formData.peopleRequired}
            onChange={(e) => setFormData({ ...formData, peopleRequired: e.target.value })}
            className="input input-bordered w-full"
          />
        </div>

        {/* From Location */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="from location"
            value={formData.fromLocation}
            onChange={(e) => setFormData({ ...formData, fromLocation: e.target.value })}
            className="input input-bordered w-full"
          />
        </div>

        {/* Message */}
        <div className="mb-6">
          <textarea
            placeholder="other information like no. of days, stay, locations etc."
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            rows={4}
            className="textarea textarea-bordered w-full resize-none"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="btn btn-primary w-full"
        >
          POST
        </button>
      </form>
    </div>
  )
}

export default CommunityPost