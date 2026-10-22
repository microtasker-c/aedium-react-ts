import { useNavigate } from "@tanstack/react-router";
import { useUserProfile } from "./useProfile";
import { useEffect } from "react";

function RequireNotVerfiedEmail({ children }: { children: React.ReactNode }) {
    const { user, isLoading } = useUserProfile()
    const navigate = useNavigate()

    useEffect(() => {
        if (!isLoading && user && user.emailVerified) {
            navigate({ to: '/' })
        }
    }, [isLoading, user])

    if (isLoading) {
        return <span className="flex mx-auto min-h-screen loading loading-spinner loading-xl"></span>
    }

    return children
    // return <span className="flex mx-auto min-h-screen loading loading-spinner loading-xl"></span>
}
export default RequireNotVerfiedEmail;
