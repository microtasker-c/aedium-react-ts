import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { authClient } from '../auth';
import { NeonAuthUIProvider } from '@neondatabase/neon-js/auth/react';
import { Toaster } from 'sonner';
import {
  // useQuery,
  // useMutation,
  // useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'


const RootLayoutComponment = () => {

  const queryClient = new QueryClient()


  return (
    < NeonAuthUIProvider authClient={authClient} >
      <QueryClientProvider client={queryClient}>

        <Outlet></Outlet>
        <Toaster richColors />

        <TanStackRouterDevtools />
      </QueryClientProvider>
    </ NeonAuthUIProvider>
  )

}

export const Route = createRootRoute({ component: RootLayoutComponment })