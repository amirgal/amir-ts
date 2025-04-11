import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { Navbar } from '../components/Navbar'

function NotFoundRedirect() {
  const navigate = Route.useNavigate()
  navigate({ to: '/404' })
  return null
}

export const Route = createRootRoute({
  component: () => (
    <>
      <div className="flex flex-col h-screen">
        <Navbar />
        <div className="flex-1 pt-[52px] overflow-auto">
          <Outlet />
        </div>
      </div>
      <TanStackRouterDevtools />
    </>
  ),
  notFoundComponent: NotFoundRedirect
})