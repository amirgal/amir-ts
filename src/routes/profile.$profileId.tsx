import { createFileRoute } from '@tanstack/react-router'

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
        }, 500)
    })
}

export const Route = createFileRoute('/profile/$profileId')({
    component: Profile,
    // validateSearch: (search: Record<string, unknown>) => ({
    //   page: Number(search.page) || 1,
    // }),
    loader: async ({ params }: { params: { profileId: string } }) => {
        const { profileId } = params
        return await fetchProfileData(profileId)
    },
})

function Profile() {
    const params = Route.useParams()
    const searchParams = Route.useSearch()
    const profileData = Route.useLoaderData() as ProfileData
    console.log(params)
    console.log(searchParams)

    return (
        <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-4">
            <h1 className="text-3xl font-bold text-blue-600">Profile</h1>
            <div className="space-y-2">
                <p className="font-semibold">ID: <span className="text-gray-600">{profileData.id}</span></p>
                <p className="font-semibold">Name: <span className="text-gray-600">{profileData.name}</span></p>
                <p className="font-semibold">Email: <span className="text-gray-600">{profileData.email}</span></p>
                {profileData.bio && (
                    <p className="font-semibold">Bio: <span className="text-gray-600">{profileData.bio}</span></p>
                )}
            </div>
        </div>
    )
}