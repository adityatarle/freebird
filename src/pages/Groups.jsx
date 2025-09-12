import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Plus, Users, Filter } from 'lucide-react'
import { fetchGroups, joinGroup } from '../services/groupsService'
import { useUIStore } from '../state/uiStore'
import { useTravelStore } from '../state/travelStore'
import TopHeader from '../components/TopHeader'
import GroupCard from '../components/GroupCard'
import LoadingSpinner from '../components/LoadingSpinner'
import Button from '../components/Button'

const Groups = () => {
  const { showCreateGroup } = useUIStore()
  const { myGroups } = useTravelStore()
  const [activeTab, setActiveTab] = useState('discover')
  const [filters, setFilters] = useState({
    destination: '',
    status: 'open'
  })

  const { data: groups, isLoading } = useQuery({
    queryKey: ['groups', filters],
    queryFn: () => fetchGroups(filters),
    enabled: activeTab === 'discover'
  })

  const handleJoinGroup = async (group) => {
    try {
      const result = await joinGroup(group.id)
      if (result.success) {
        alert(`Successfully joined "${group.name}"!`)
        // In a real app, this would refetch or update the cache
      }
    } catch (error) {
      console.error('Failed to join group:', error)
      alert('Failed to join group. Please try again.')
    }
  }

  const handleViewDetails = (group) => {
    // Navigate to group details page
    console.log('View group details:', group.id)
    alert(`Viewing details for "${group.name}"`)
  }

  const tabs = [
    { id: 'discover', label: 'Discover', icon: Users },
    { id: 'my-groups', label: 'My Groups', icon: Users }
  ]

  return (
    <div className="min-h-screen">
      <TopHeader 
        title="Travel Groups" 
        actions={
          <Button
            variant="primary"
            size="sm"
            onClick={showCreateGroup}
          >
            <Plus size={16} />
            Create
          </Button>
        }
      />
      
      {/* Tabs */}
      <div className="sticky top-16 z-30 bg-base-100 border-b border-base-200">
        <div className="flex">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                flex-1 flex items-center justify-center gap-2 py-3 px-4 text-sm font-medium
                ${activeTab === tab.id
                  ? 'text-primary border-b-2 border-primary bg-primary/5'
                  : 'text-base-content/60 hover:text-base-content hover:bg-base-200'
                }
              `}
            >
              <tab.icon size={16} />
              {tab.label}
              {tab.id === 'my-groups' && myGroups.length > 0 && (
                <span className="bg-primary text-white text-xs rounded-full px-2 py-0.5 min-w-[20px] h-5 flex items-center justify-center">
                  {myGroups.length}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {activeTab === 'discover' ? (
        <>
          {/* Search and Filters */}
          <div className="p-4 border-b border-base-200">
            <div className="flex gap-2">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Search by destination..."
                  value={filters.destination}
                  onChange={(e) => setFilters(prev => ({ ...prev, destination: e.target.value }))}
                  className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <select
                value={filters.status}
                onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
                className="select select-bordered"
              >
                <option value="all">All Groups</option>
                <option value="open">Open Groups</option>
                <option value="closed">Closed Groups</option>
              </select>
            </div>
          </div>

          {/* Groups List */}
          <div className="p-4">
            {isLoading ? (
              <LoadingSpinner />
            ) : (
              <>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-bold">Available Groups</h2>
                  <span className="text-sm text-base-content/60">
                    {groups?.length || 0} groups
                  </span>
                </div>
                
                {groups?.length === 0 ? (
                  <div className="text-center py-12">
                    <Users size={48} className="mx-auto text-base-content/40 mb-4" />
                    <h3 className="text-lg font-medium mb-2">No groups found</h3>
                    <p className="text-base-content/60 mb-4">
                      Be the first to create a group for your destination!
                    </p>
                    <Button
                      variant="primary"
                      onClick={showCreateGroup}
                    >
                      <Plus size={16} />
                      Create Group
                    </Button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {groups?.map((group) => (
                      <GroupCard
                        key={group.id}
                        group={group}
                        onJoin={handleJoinGroup}
                        onViewDetails={handleViewDetails}
                      />
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </>
      ) : (
        /* My Groups Tab */
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold">My Groups</h2>
            <span className="text-sm text-base-content/60">
              {myGroups.length} groups
            </span>
          </div>
          
          {myGroups.length === 0 ? (
            <div className="text-center py-12">
              <Users size={48} className="mx-auto text-base-content/40 mb-4" />
              <h3 className="text-lg font-medium mb-2">No groups yet</h3>
              <p className="text-base-content/60 mb-4">
                Create or join a group to start planning your next adventure!
              </p>
              <div className="flex gap-2 justify-center">
                <Button
                  variant="primary"
                  onClick={showCreateGroup}
                >
                  <Plus size={16} />
                  Create Group
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setActiveTab('discover')}
                >
                  Browse Groups
                </Button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {myGroups.map((group) => (
                <GroupCard
                  key={group.id}
                  group={group}
                  onJoin={() => {}} // Already joined
                  onViewDetails={handleViewDetails}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Floating Action Button for Mobile */}
      <div className="fixed bottom-20 right-4 md:hidden z-40">
        <Button
          variant="primary"
          size="lg"
          className="rounded-full w-14 h-14 shadow-lg"
          onClick={showCreateGroup}
        >
          <Plus size={24} />
        </Button>
      </div>
    </div>
  )
}

export default Groups