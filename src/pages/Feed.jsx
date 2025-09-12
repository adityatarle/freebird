import { useQuery } from '@tanstack/react-query'
import { fetchPosts } from '../services/postsService'
import TopHeader from '../components/TopHeader'
import DesktopHeader from '../components/DesktopHeader'
import StoryBar from '../components/StoryBar'
import PostCard from '../components/PostCard'
import LoadingSpinner from '../components/LoadingSpinner'
import Button from '../components/Button'

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
      <DesktopHeader title="Home" />
      
      {/* Stories */}
      <div className="border-b border-base-200">
        <StoryBar />
      </div>

      {/* Posts Feed */}
      <div className="max-w-md mx-auto lg:max-w-2xl xl:max-w-4xl">
        <div className="lg:flex lg:gap-8">
          {/* Main Feed */}
          <div className="lg:flex-1 lg:max-w-lg lg:mx-auto">
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

          {/* Desktop Sidebar */}
          <div className="hidden lg:block lg:w-80">
            <div className="sticky top-20 space-y-4 p-4">
              {/* Trending Destinations */}
              <div className="bg-base-200 rounded-xl p-4">
                <h3 className="font-bold text-lg mb-3">Trending Destinations</h3>
                <div className="space-y-3">
                  {[
                    { name: 'Bali, Indonesia', posts: '2.1k posts' },
                    { name: 'Tokyo, Japan', posts: '1.8k posts' },
                    { name: 'Paris, France', posts: '1.5k posts' },
                    { name: 'New York, USA', posts: '1.2k posts' }
                  ].map((dest, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-sm font-medium">{dest.name}</span>
                      <span className="text-xs text-base-content/60">{dest.posts}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Suggested Connections */}
              <div className="bg-base-200 rounded-xl p-4">
                <h3 className="font-bold text-lg mb-3">Suggested for You</h3>
                <div className="space-y-3">
                  {[
                    { name: 'Sarah Chen', username: 'sarahtravel', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face' },
                    { name: 'Marco Silva', username: 'marcoexplores', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face' },
                    { name: 'Emma Davis', username: 'emmaadventures', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face' }
                  ].map((user, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-8 h-8 rounded-full"
                      />
                      <div className="flex-1">
                        <p className="text-sm font-medium">{user.name}</p>
                        <p className="text-xs text-base-content/60">@{user.username}</p>
                      </div>
                      <Button size="sm" variant="outline">
                        Follow
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Feed