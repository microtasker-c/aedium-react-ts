import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { authClient } from '../auth';
import { NeonAuthUIProvider } from '@neondatabase/neon-js/auth/react';

const RootLayoutComponment = () => (
  <NeonAuthUIProvider authClient={authClient}>


    <Outlet></Outlet>

    <TanStackRouterDevtools />
  </NeonAuthUIProvider>
)

export const Route = createRootRoute({ component: RootLayoutComponment })