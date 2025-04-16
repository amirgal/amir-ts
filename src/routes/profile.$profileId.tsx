import { createFileRoute } from '@tanstack/react-router'
import { QueryClient, useSuspenseQuery } from '@tanstack/react-query'

// Simulated user data type
interface ProfileData {
    id: string
    name: string
    email: string
    bio?: string
}

// Mock data fetching function
async function fetchProfileData(profileId: string): Promise<ProfileData> {
    // Simulate API call
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                id: profileId,
                name: `User ${profileId}`,
                email: `user${profileId}@example.com`,
                bio: `Bio for user ${profileId}`
            })
        }, 2500)
    })
}

export const Route = createFileRoute('/profile/$profileId')({
    component: Profile,
    loader: ({ context, params: { profileId } }) => {
        const { queryClient } = context as { queryClient: QueryClient }
        return queryClient.prefetchQuery({
            queryKey: ['profile', profileId],
            queryFn: () => fetchProfileData(profileId),
        })
    }
})

function Profile() {
    const { profileId } = Route.useParams()
    const { data: profileData, isLoading, error } = useSuspenseQuery({
        queryKey: ['profile', profileId],
        queryFn: () => fetchProfileData(profileId),
    })
    console.log(profileData)
    if (isLoading) return <div className="text-center py-8">Loading...</div>
    if (error) return <div className="text-red-500">Error: {error.message}</div>
    return (
        <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-4">
            <h1 className="text-3xl font-bold text-blue-600">Profile</h1>
            <div className="space-y-2">
                <p className="font-semibold">ID: <span className="text-gray-600">{profileData?.id}</span></p>
                <p className="font-semibold">Name: <span className="text-gray-600">{profileData?.name}</span></p>
                <p className="font-semibold">Email: <span className="text-gray-600">{profileData?.email}</span></p>
                {profileData?.bio && (
                    <p className="font-semibold">Bio: <span className="text-gray-600">{profileData?.bio}</span></p>
                )}
            </div>
        </div>
    )
}