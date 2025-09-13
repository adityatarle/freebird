import { Bell, Heart, MessageCircle, UserPlus } from 'lucide-react'

const Notification = () => {
  const notifications = [
    {
      id: 1,
      user: 'Nehal',
      action: 'likes your post',
      time: '2 mins ago',
      type: 'like',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face',
      unread: true
    },
    {
      id: 2,
      user: 'Nehal',
      action: 'sent you a friend request',
      time: '2 mins ago',
      type: 'friend',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face',
      unread: true
    },
    {
      id: 3,
      user: 'Nehal',
      action: 'commented on your post',
      time: '2 mins ago',
      type: 'comment',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face',
      unread: true
    },
    {
      id: 4,
      user: 'Nehal',
      action: 'likes your post',
      time: '2 mins ago',
      type: 'like',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face',
      unread: true
    },
    {
      id: 5,
      user: 'Sarah Chen',
      action: 'started following you',
      time: '1 hour ago',
      type: 'follow',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face',
      unread: false
    },
    {
      id: 6,
      user: 'Marco Silva',
      action: 'liked your travel story',
      time: '3 hours ago',
      type: 'like',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
      unread: false
    }
  ]

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'like':
        return <Heart size={16} className="text-red-500" />
      case 'comment':
        return <MessageCircle size={16} className="text-blue-500" />
      case 'friend':
      case 'follow':
        return <UserPlus size={16} className="text-green-500" />
      default:
        return <Bell size={16} className="text-primary" />
    }
  }

  return (
    <div className="min-h-screen bg-base-100">
      {/* Header */}
      <div className="bg-white border-b border-base-200 px-4 py-3">
        <div className="flex items-center gap-3">
          <Bell className="text-primary" size={24} />
          <h1 className="text-xl font-semibold">Notification</h1>
        </div>
      </div>

      <div className="p-4">
        {/* Notifications List */}
        <div className="space-y-1">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={`flex items-center gap-3 p-4 rounded-lg transition-colors hover:bg-base-50 ${
                notification.unread ? 'bg-primary/5 border border-primary/20' : 'bg-white'
              }`}
            >
              <div className="relative">
                <img 
                  src={notification.avatar} 
                  alt={notification.user}
                  className="w-12 h-12 rounded-full"
                />
                <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-1">
                  {getNotificationIcon(notification.type)}
                </div>
              </div>
              
              <div className="flex-1">
                <p className="text-sm">
                  <span className="font-medium">{notification.user}</span> {notification.action}
                </p>
                <p className="text-xs text-base-content/60">{notification.time}</p>
              </div>
              
              {notification.unread && (
                <div className="w-2 h-2 bg-primary rounded-full"></div>
              )}
              
              {notification.type === 'friend' && (
                <div className="flex gap-2">
                  <button className="btn btn-primary btn-xs">Accept</button>
                  <button className="btn btn-outline btn-xs">Decline</button>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-6">
          <button className="btn btn-outline">Load More</button>
        </div>
      </div>
    </div>
  )
}

export default Notification