import { UserAvatar } from "@neondatabase/neon-js/auth/react";
import { Link } from "@tanstack/react-router";
import RootLayout from "./RootLayout";
import { getUserProfile } from "../utils/userHelper";
import { useState } from "react";
// import type { User } from "../types/User";
import { useQuery } from "@tanstack/react-query";


function AccountSetting() {
    // const [email, setEmail] = useState('')
    const [name, setName] = useState('')

    // const [currentUser, setCurrentUser] = useState<null | User>(null)


    const { data: user, isLoading, isError } = useQuery({
        queryKey: ['user-profile'],
        queryFn: async () => {
            const user = await getUserProfile()
            if (!user) throw new Error('user is undefined')
            setName(user.name)
            return user

        },

    })

    // async function loadUserProfile() {
    //     const user = await getUserProfile()
    //     if (!user) {
    //         throw new Error('User not found')
    //     }

    //     setCurrentUser(user)
    //     setEmail(user.email)
    //     setName(user.name)
    // }

    // useEffect(() => {
    //     loadUserProfile()
    // }, [])

    return (<>
        <RootLayout>

            <form className="flex items-center justify-center min-h-screen">
                {isLoading && <div className="skeleton h-32 w-xs"></div>}
                {!isLoading && <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
                    {/* <legend className="fieldset-legend">Page details</legend> */}
                    <UserAvatar
                        user={user}
                        className="mx-auto size-20 cursor-pointer border-2 " style={{ borderColor: '#de2a8a' }}></UserAvatar>

                    <label className="label">Email</label>
                    <input type="text" disabled className="input"
                        value={user?.email}
                        placeholder="My awesome page" />

                    <label className="label">Username</label>
                    <input type="text" className="input"
                        defaultValue={user?.name}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="my-awesome-page" />

                    <Link className="link link-neutral text-center mt-2 mb-1" to="/auth/$pathname" params={{ pathname: 'forgot-password' }}>reset password</Link>

                    <button className="btn btn-secondary">Update</button>

                </fieldset>}
            </form>
        </RootLayout>
    </>);
}
export default AccountSetting;
