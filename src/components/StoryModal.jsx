import { useState, useEffect } from 'react'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import { useUIStore } from '../state/uiStore'
import { useQuery } from '@tanstack/react-query'
import { fetchStories } from '../services/postsService'
import Button from './Button'

const StoryModal = () => {
  const { currentStory, hideStory } = useUIStore()
  const { data: stories = [] } = useQuery({
    queryKey: ['stories'],
    queryFn: fetchStories
  })
  
  const [currentIndex, setCurrentIndex] = useState(0)
  const [progress, setProgress] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  // Find current story index
  useEffect(() => {
    if (currentStory) {
      const index = stories.findIndex(story => story.id === currentStory.id)
      setCurrentIndex(index >= 0 ? index : 0)
    }
  }, [currentStory, stories])

  // Auto-progress timer
  useEffect(() => {
    if (isPaused) return

    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          handleNext()
          return 0
        }
        return prev + 2 // 5 seconds total (100 / 2 = 50 intervals)
      })
    }, 100)

    return () => clearInterval(timer)
  }, [currentIndex, isPaused])

  // Reset progress when story changes
  useEffect(() => {
    setProgress(0)
  }, [currentIndex])

  const handleNext = () => {
    if (currentIndex < stories.length - 1) {
      setCurrentIndex(prev => prev + 1)
      setProgress(0)
    } else {
      hideStory()
    }
  }

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1)
      setProgress(0)
    }
  }

  const handleClose = () => {
    hideStory()
  }

  if (!currentStory || stories.length === 0) return null

  const story = stories[currentIndex]
  if (!story) return null

  return (
    <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
      {/* Desktop Container */}
      <div className="hidden lg:block w-full max-w-md mx-auto h-full relative">
        {/* Story Progress Bars */}
        <div className="absolute top-4 left-4 right-4 z-10">
          <div className="flex gap-1">
            {stories.map((_, index) => (
              <div key={index} className="flex-1 h-1 bg-white/30 rounded-full overflow-hidden">
                <div
                  className="h-full bg-white transition-all duration-100"
                  style={{
                    width: index < currentIndex ? '100%' : 
                           index === currentIndex ? `${progress}%` : '0%'
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Story Header */}
        <div className="absolute top-8 left-4 right-4 z-10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={story.user.avatar}
              alt={story.user.username}
              className="w-8 h-8 rounded-full border-2 border-white"
            />
            <span className="text-white font-medium">{story.user.username}</span>
            <span className="text-white/60 text-sm">
              {new Date(story.timestamp).toLocaleTimeString([], { 
                hour: '2-digit', 
                minute: '2-digit' 
              })}
            </span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClose}
            className="text-white hover:bg-white/20"
          >
            <X size={20} />
          </Button>
        </div>

        {/* Story Image */}
        <div 
          className="w-full h-full flex items-center justify-center cursor-pointer bg-black rounded-lg overflow-hidden"
          onClick={() => setIsPaused(!isPaused)}
          onMouseDown={() => setIsPaused(true)}
          onMouseUp={() => setIsPaused(false)}
        >
          <img
            src={story.image}
            alt="Story"
            className="max-w-full max-h-full object-contain"
          />
        </div>
      </div>

      {/* Mobile Container */}
      <div className="lg:hidden w-full h-full relative">
        {/* Story Progress Bars */}
        <div className="absolute top-4 left-4 right-4 z-10 safe-top">
          <div className="flex gap-1">
            {stories.map((_, index) => (
              <div key={index} className="flex-1 h-1 bg-white/30 rounded-full overflow-hidden">
                <div
                  className="h-full bg-white transition-all duration-100"
                  style={{
                    width: index < currentIndex ? '100%' : 
                           index === currentIndex ? `${progress}%` : '0%'
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Story Header */}
        <div className="absolute top-8 left-4 right-4 z-10 flex items-center justify-between safe-top">
          <div className="flex items-center gap-3">
            <img
              src={story.user.avatar}
              alt={story.user.username}
              className="w-8 h-8 rounded-full border-2 border-white"
            />
            <span className="text-white font-medium">{story.user.username}</span>
            <span className="text-white/60 text-sm">
              {new Date(story.timestamp).toLocaleTimeString([], { 
                hour: '2-digit', 
                minute: '2-digit' 
              })}
            </span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClose}
            className="text-white hover:bg-white/20"
          >
            <X size={20} />
          </Button>
        </div>

        {/* Story Image */}
        <div 
          className="w-full h-full flex items-center justify-center cursor-pointer"
          onClick={() => setIsPaused(!isPaused)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
        >
          <img
            src={story.image}
            alt="Story"
            className="max-w-full max-h-full object-contain"
          />
        </div>
      </div>

      {/* Navigation Areas */}
      <div 
        className="absolute left-0 top-0 bottom-0 w-1/3 cursor-pointer z-10"
        onClick={handlePrevious}
      />
      <div 
        className="absolute right-0 top-0 bottom-0 w-1/3 cursor-pointer z-10"
        onClick={handleNext}
      />

      {/* Navigation Buttons (Desktop) */}
      <div className="hidden md:block">
        {currentIndex > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handlePrevious}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:bg-white/20"
          >
            <ChevronLeft size={24} />
          </Button>
        )}
        {currentIndex < stories.length - 1 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleNext}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:bg-white/20"
          >
            <ChevronRight size={24} />
          </Button>
        )}
      </div>

      {/* Pause Indicator */}
      {isPaused && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white">
          <div className="bg-black/50 rounded-full p-3">
            <div className="w-8 h-8 border-2 border-white rounded-full flex items-center justify-center">
              <div className="w-2 h-4 bg-white mr-1"></div>
              <div className="w-2 h-4 bg-white"></div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default StoryModal