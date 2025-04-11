// src/routes/404.tsx
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/404')({
    component: NotFoundComponent
})

function NotFoundComponent() {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-5xl font-bold text-red-600">404</h1>
            <p className="mt-4 text-2xl">Page not found</p>
        </div>
    )
}