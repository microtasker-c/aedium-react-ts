import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { authClient } from '@/utils/neon';
import { NeonAuthUIProvider } from '@neondatabase/neon-js/auth/react';
import { Toaster } from 'sonner';
import {
  // useQuery,
  // useMutation,
  // useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
// import { DevTools } from 'jotai-devtools'


const queryClient = new QueryClient()

const RootLayoutComponment = () => {
  return (
    < NeonAuthUIProvider authClient={authClient} >
      <QueryClientProvider client={queryClient}>

        <Outlet></Outlet>
        <Toaster richColors />

        <TanStackRouterDevtools />
        {/* <DevTools position="bottom-right"></DevTools> */}
      </QueryClientProvider>
    </ NeonAuthUIProvider>
  )

}

export const Route = createRootRoute({ component: RootLayoutComponment })