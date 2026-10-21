import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { authClient } from '../auth';
import { NeonAuthUIProvider } from '@neondatabase/neon-js/auth/react';
import { Toaster } from 'sonner';

const RootLayoutComponment = () => (
  <NeonAuthUIProvider authClient={authClient}>


    <Outlet></Outlet>
    <Toaster richColors />

    <TanStackRouterDevtools />
  </NeonAuthUIProvider>
)

export const Route = createRootRoute({ component: RootLayoutComponment })