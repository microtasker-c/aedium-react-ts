import { useNavigate } from "@tanstack/react-router";
import { useUserProfile } from "@/hooks/useProfile";
import { useEffect } from "react";
import Loading from "./Loading";

function RequireNotVerfiedEmail({ children }: { children: React.ReactNode }) {
    const { user, isLoading } = useUserProfile()
    const navigate = useNavigate()

    useEffect(() => {
        if (!isLoading && user && user.emailVerified) {
            navigate({ to: '/' })
        }
    }, [isLoading, user])

    if (isLoading) {
        return <Loading></Loading>
    }

    return children
    // return <span className="flex mx-auto min-h-screen loading loading-spinner loading-xl"></span>
}
export default RequireNotVerfiedEmail;
