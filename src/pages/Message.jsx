import { useState } from 'react'
import { Search, MessageCircle } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const Message = () => {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedChat, setSelectedChat] = useState(null)

  const conversations = [
    {
      id: 1,
      name: 'Tejas Paramsagar',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
      lastMessage: 'last sent msg',
      timestamp: '2 mins ago',
      unread: true
    },
    {
      id: 2,
      name: 'ABC XYZ',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face',
      lastMessage: 'last sent msg',
      timestamp: '5 mins ago',
      unread: false
    },
    {
      id: 3,
      name: 'Tejas Paramsagar',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
      lastMessage: 'last sent msg',
      timestamp: '1 hour ago',
      unread: false
    },
    {
      id: 4,
      name: 'ABC XYZ',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face',
      lastMessage: 'last sent msg',
      timestamp: '2 hours ago',
      unread: false
    },
    {
      id: 5,
      name: 'ABC XYZ',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face',
      lastMessage: 'last sent msg',
      timestamp: '1 day ago',
      unread: false
    },
    {
      id: 6,
      name: 'Tejas Paramsagar',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
      lastMessage: 'last sent msg',
      timestamp: '2 days ago',
      unread: false
    }
  ]

  const handleChatSelect = (conversation) => {
    setSelectedChat(conversation)
  }

  return (
    <div className="min-h-screen bg-base-100">
      <div className="flex h-screen">
        {/* Chat List */}
        <div className={`${selectedChat ? 'hidden lg:block' : 'block'} w-full lg:w-96 border-r border-base-200 bg-white`}>
          {/* Header */}
          <div className="border-b border-base-200 px-4 py-3">
            <div className="flex items-center gap-3 mb-4">
              <MessageCircle className="text-primary" size={24} />
              <h1 className="text-xl font-semibold">Message</h1>
              <span className="ml-auto text-sm text-primary cursor-pointer">request</span>
            </div>
            
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-base-content/60" size={20} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search"
                className="input input-bordered w-full pl-10"
              />
            </div>
          </div>

          {/* Conversations List */}
          <div className="overflow-y-auto">
            {conversations.map((conversation) => (
              <div
                key={conversation.id}
                onClick={() => handleChatSelect(conversation)}
                className={`flex items-center gap-3 p-4 border-b border-base-200 hover:bg-base-50 cursor-pointer transition-colors ${
                  selectedChat?.id === conversation.id ? 'bg-base-100' : ''
                }`}
              >
                <div className="relative">
                  <img 
                    src={conversation.avatar} 
                    alt={conversation.name}
                    className="w-12 h-12 rounded-full"
                  />
                  {conversation.unread && (
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full"></div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-base truncate">{conversation.name}</h3>
                  <p className="text-sm text-base-content/60 truncate">{conversation.lastMessage}</p>
                </div>
                <div className="text-xs text-base-content/40">
                  {conversation.timestamp}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className={`${selectedChat ? 'block' : 'hidden lg:block'} flex-1 flex flex-col`}>
          {selectedChat ? (
            <>
              {/* Chat Header */}
              <div className="border-b border-base-200 px-4 py-3 bg-white">
                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => setSelectedChat(null)}
                    className="lg:hidden p-2 hover:bg-base-200 rounded-full"
                  >
                    ←
                  </button>
                  <img 
                    src={selectedChat.avatar} 
                    alt={selectedChat.name}
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <h3 className="font-semibold">{selectedChat.name}</h3>
                    <p className="text-sm text-green-500">Online</p>
                  </div>
                </div>
              </div>

              {/* Chat Messages */}
              <div className="flex-1 p-4 bg-base-50">
                <div className="max-w-2xl mx-auto">
                  <div className="text-center text-sm text-base-content/60 mb-4">
                    Today
                  </div>
                  
                  {/* Sample messages */}
                  <div className="space-y-4">
                    <div className="flex justify-start">
                      <div className="bg-white rounded-lg px-4 py-2 max-w-xs shadow-sm">
                        <p className="text-sm">Hey! Are you still planning the trip to Goa?</p>
                        <span className="text-xs text-base-content/60">10:30 AM</span>
                      </div>
                    </div>
                    
                    <div className="flex justify-end">
                      <div className="bg-primary text-white rounded-lg px-4 py-2 max-w-xs">
                        <p className="text-sm">Yes! I'm looking for travel partners. Are you interested?</p>
                        <span className="text-xs text-primary-content/80">10:32 AM</span>
                      </div>
                    </div>
                    
                    <div className="flex justify-start">
                      <div className="bg-white rounded-lg px-4 py-2 max-w-xs shadow-sm">
                        <p className="text-sm">Absolutely! When are you planning to go?</p>
                        <span className="text-xs text-base-content/60">10:35 AM</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Message Input */}
              <div className="border-t border-base-200 p-4 bg-white">
                <div className="flex gap-3">
                  <input
                    type="text"
                    placeholder="Type a message..."
                    className="flex-1 input input-bordered"
                  />
                  <button className="btn btn-primary">
                    Send
                  </button>
                </div>
              </div>
            </>
          ) : (
            /* No Chat Selected */
            <div className="flex-1 flex items-center justify-center bg-base-50">
              <div className="text-center">
                <MessageCircle size={64} className="text-base-content/30 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-base-content/60 mb-2">
                  Chat with your friend
                </h3>
                <p className="text-base-content/40">
                  Select a conversation to start messaging
                </p>
                <button className="btn btn-primary mt-4">CHAT</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Message