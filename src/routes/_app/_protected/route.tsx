import { createFileRoute, Outlet } from '@tanstack/react-router'
import RequireLogin from '@/ui/RequireLogin'
import { useUserProfile } from '@/hooks/useProfile'
import { useSetAtom } from 'jotai'
import { userAtom } from '@/atoms/user'
import { useEffect } from "react";
import RequireVerfiedEmail from '@/ui/RequireVerfiedEmail'

export const Route = createFileRoute('/_app/_protected')({
  component: RouteComponent,
})

function RouteComponent() {

  const setUser = useSetAtom(userAtom)
  const { user } = useUserProfile()

  useEffect(() => {
    if (user) {
      setUser(user)
    }
  }, [user])

  return (
    <RequireLogin>
      <RequireVerfiedEmail>
        <Outlet></Outlet>
      </RequireVerfiedEmail>
    </RequireLogin>

  )
}
