import { createFileRoute } from '@tanstack/react-router'
import { QueryClient, useSuspenseQuery } from '@tanstack/react-query'

// Simulated task data type
interface TaskData {
    id: string
    title: string
    description?: string
    status?: string
}

// Mock data fetching function
async function fetchTaskData(taskId: string): Promise<TaskData> {
    // Simulate API call
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                id: taskId,
                title: `Task ${taskId}`,
                description: `Description for task ${taskId}`,
                status: 'To Do',
            })
        }, 1000)
    })
}

export const Route = createFileRoute('/task/$taskId')({
    component: Task,
    loader: ({ context, params: { taskId } }) => {
        const { queryClient } = context as { queryClient: QueryClient }
        return queryClient.prefetchQuery({
            queryKey: ['task', taskId],
            queryFn: () => fetchTaskData(taskId),
        })
    }
})

function Task() {
    const { taskId } = Route.useParams()
    const { data: taskData, isLoading, error } = useSuspenseQuery({
        queryKey: ['task', taskId],
        queryFn: () => fetchTaskData(taskId),
    })
    if (isLoading) return <div className="text-center py-8">Loading...</div>
    if (error) return <div className="text-red-500">Error: {error.message}</div>
    return (
        <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-4">
            <h1 className="text-3xl font-bold text-green-600">Task</h1>
            <div className="space-y-2">
                <p className="font-semibold">ID: <span className="text-gray-600">{taskData?.id}</span></p>
                <p className="font-semibold">Title: <span className="text-gray-600">{taskData?.title}</span></p>
                {taskData?.description && (
                    <p className="font-semibold">Description: <span className="text-gray-600">{taskData?.description}</span></p>
                )}
                {taskData?.status && (
                    <p className="font-semibold">Status: <span className="text-gray-600">{taskData?.status}</span></p>
                )}
            </div>
        </div>
    )
}
