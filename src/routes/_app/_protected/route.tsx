import { createFileRoute, Outlet } from '@tanstack/react-router'
import RequireLogin from '../../../components/RequireLogin'
import { useUserProfile } from '../../../components/useProfile'
import { useSetAtom } from 'jotai'
import { userAtom } from '../../../atoms/user'
import { useEffect } from "react";

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
      <Outlet></Outlet>
    </RequireLogin>)
}
