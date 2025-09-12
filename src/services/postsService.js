import postsData from '../data/posts.json'
import storiesData from '../data/stories.json'

// Simulate API delay
const delay = (ms = 800) => new Promise(resolve => setTimeout(resolve, ms))

export const fetchPosts = async () => {
  await delay()
  return postsData
}

export const fetchPostById = async (id) => {
  await delay(300)
  const post = postsData.find(p => p.id === id)
  if (!post) throw new Error('Post not found')
  return post
}

export const likePost = async (postId) => {
  await delay(200)
  // In a real app, this would update the backend
  // For now, we'll just return success
  return { success: true, postId }
}

export const addComment = async (postId, comment) => {
  await delay(400)
  // Simulate adding a comment
  const newComment = {
    id: Date.now().toString(),
    user: {
      username: "demo_user",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face"
    },
    text: comment,
    timestamp: new Date().toISOString(),
    likes: 0
  }
  
  return newComment
}

export const fetchStories = async () => {
  await delay(500)
  return storiesData
}

export const markStoryAsViewed = async (storyId) => {
  await delay(100)
  // In a real app, this would update the backend
  return { success: true, storyId }
}