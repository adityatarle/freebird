import { useQuery } from '@tanstack/react-query'
import { fetchPosts } from '../services/postsService'
import TopHeader from '../components/TopHeader'
import StoryBar from '../components/StoryBar'
import PostCard from '../components/PostCard'
import LoadingSpinner from '../components/LoadingSpinner'

const Feed = () => {
  const { data: posts, isLoading, error } = useQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts
  })

  if (error) {
    return (
      <div className="min-h-screen">
        <TopHeader />
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <p className="text-error mb-4">Failed to load posts</p>
            <button 
              onClick={() => window.location.reload()}
              className="btn btn-primary"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <TopHeader />
      
      {/* Stories */}
      <div className="border-b border-base-200">
        <StoryBar />
      </div>

      {/* Posts Feed */}
      <div className="max-w-md mx-auto">
        {isLoading ? (
          <div className="space-y-4 p-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 bg-base-300 rounded-full"></div>
                  <div className="flex-1">
                    <div className="h-4 bg-base-300 rounded w-24 mb-1"></div>
                    <div className="h-3 bg-base-300 rounded w-16"></div>
                  </div>
                </div>
                <div className="aspect-square bg-base-300 rounded mb-3"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-base-300 rounded w-16"></div>
                  <div className="h-4 bg-base-300 rounded w-3/4"></div>
                  <div className="h-3 bg-base-300 rounded w-20"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-0">
            {posts?.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}

        {/* Load more placeholder */}
        {!isLoading && posts?.length > 0 && (
          <div className="p-8 text-center">
            <p className="text-base-content/60">You're all caught up! 🎉</p>
            <p className="text-sm text-base-content/40 mt-1">
              Check back later for more travel inspiration
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Feed