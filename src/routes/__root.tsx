import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'


const RootLayoutComponment = () => (
  <>


    <Outlet></Outlet>

    <TanStackRouterDevtools />
  </>
)

export const Route = createRootRoute({ component: RootLayoutComponment })