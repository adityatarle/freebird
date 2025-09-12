import { useQuery } from '@tanstack/react-query'
import { fetchStories } from '../services/postsService'
import { useUIStore } from '../state/uiStore'

const StoryBar = () => {
  const { data: stories, isLoading } = useQuery({
    queryKey: ['stories'],
    queryFn: fetchStories
  })
  
  const { showStory } = useUIStore()
  
  if (isLoading) {
    return (
      <div className="flex gap-3 p-4 overflow-x-auto">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex-shrink-0">
            <div className="w-16 h-16 rounded-full bg-base-300 animate-pulse"></div>
            <div className="w-12 h-3 bg-base-300 rounded mt-2 mx-auto animate-pulse"></div>
          </div>
        ))}
      </div>
    )
  }
  
  return (
    <div className="flex gap-3 p-4 overflow-x-auto scrollbar-hide">
      {stories?.map((story) => (
        <div 
          key={story.id}
          className="flex-shrink-0 text-center cursor-pointer"
          onClick={() => showStory(story)}
        >
          <div className={`
            w-16 h-16 rounded-full p-0.5 
            ${story.viewed 
              ? 'bg-gradient-to-r from-gray-300 to-gray-400' 
              : 'bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500'
            }
          `}>
            <div className="w-full h-full rounded-full border-2 border-white overflow-hidden">
              <img
                src={story.user.avatar}
                alt={story.user.username}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <p className="text-xs mt-1 text-center truncate w-16">
            {story.user.username}
          </p>
        </div>
      ))}
    </div>
  )
}

export default StoryBar