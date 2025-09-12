import { useState } from 'react'
import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal } from 'lucide-react'
import { useTravelStore } from '../state/travelStore'
import { formatDistanceToNow } from '../utils/dateUtils'
import Button from './Button'

const PostCard = ({ post }) => {
  const [liked, setLiked] = useState(false)
  const [likes, setLikes] = useState(post.likes)
  const [showComments, setShowComments] = useState(false)
  const { addToWishlist, isInWishlist } = useTravelStore()
  
  const handleLike = () => {
    setLiked(!liked)
    setLikes(prev => liked ? prev - 1 : prev + 1)
  }
  
  const handleSave = () => {
    const postData = {
      id: post.id,
      type: 'post',
      title: post.caption.split(' ').slice(0, 5).join(' ') + '...',
      image: post.image,
      location: post.location
    }
    addToWishlist(postData)
  }
  
  const isBookmarked = isInWishlist(post.id, 'post')
  
  return (
    <div className="bg-base-100 border-b border-base-200">
      {/* Header */}
      <div className="flex items-center justify-between p-3">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full overflow-hidden">
            <img
              src={post.user.avatar}
              alt={post.user.username}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <div className="flex items-center gap-1">
              <span className="font-semibold text-sm">{post.user.username}</span>
              {post.user.verified && (
                <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">✓</span>
                </div>
              )}
            </div>
            <span className="text-xs text-base-content/60">{post.location}</span>
          </div>
        </div>
        <Button variant="ghost" size="sm">
          <MoreHorizontal size={16} />
        </Button>
      </div>
      
      {/* Image */}
      <div className="relative aspect-square">
        <img
          src={post.image}
          alt={post.caption}
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Actions */}
      <div className="flex items-center justify-between p-3">
        <div className="flex items-center gap-4">
          <button
            onClick={handleLike}
            className={`transition-colors ${liked ? 'text-red-500' : 'text-base-content'}`}
          >
            <Heart size={24} fill={liked ? 'currentColor' : 'none'} />
          </button>
          <button 
            onClick={() => setShowComments(!showComments)}
            className="text-base-content"
          >
            <MessageCircle size={24} />
          </button>
          <button className="text-base-content">
            <Send size={24} />
          </button>
        </div>
        <button
          onClick={handleSave}
          className={`transition-colors ${isBookmarked ? 'text-yellow-500' : 'text-base-content'}`}
        >
          <Bookmark size={24} fill={isBookmarked ? 'currentColor' : 'none'} />
        </button>
      </div>
      
      {/* Likes */}
      <div className="px-3 pb-2">
        <span className="font-semibold text-sm">{likes.toLocaleString()} likes</span>
      </div>
      
      {/* Caption */}
      <div className="px-3 pb-2">
        <span className="font-semibold text-sm mr-2">{post.user.username}</span>
        <span className="text-sm">{post.caption}</span>
      </div>
      
      {/* Comments */}
      {post.comments > 0 && (
        <div className="px-3 pb-2">
          <button 
            onClick={() => setShowComments(!showComments)}
            className="text-base-content/60 text-sm"
          >
            View all {post.comments} comments
          </button>
        </div>
      )}
      
      {/* Timestamp */}
      <div className="px-3 pb-3">
        <span className="text-xs text-base-content/60">
          {formatDistanceToNow(new Date(post.timestamp))} ago
        </span>
      </div>
    </div>
  )
}

export default PostCard