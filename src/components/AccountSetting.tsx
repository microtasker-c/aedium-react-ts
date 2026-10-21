import { UserAvatar } from "@neondatabase/neon-js/auth/react";
import { Link } from "@tanstack/react-router";
import RootLayout from "./RootLayout";
import { useUserProfile } from "./useProfile";


function AccountSetting() {
    const { user, name, setName, isLoading, isUpdating, handlerUpdate } = useUserProfile()



    return (<>
        <RootLayout>

            <form className="flex items-center justify-center min-h-screen">
                {isLoading && <div className="skeleton h-32 w-xs"></div>}
                {!isLoading && <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
                    {/* <legend className="fieldset-legend">Page details</legend> */}
                    <UserAvatar
                        user={user}
                        className="mx-auto size-20 cursor-pointer border-2 " style={{ borderColor: '#de2a8a' }}></UserAvatar>
                    <label className="label mt-2">Email
                        {!user?.emailVerified && (<Link className="link link-error" to="/auth/verify-email">(need to verify)</Link>)}
                        
                    </label>
                    <input type="text" disabled className="input"
                        value={user?.email}
                        placeholder="My awesome page" />

                    <label className="label">Username</label>
                    <input type="text" className="input"
                        disabled={isUpdating}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Your username" />

                    <Link className="link link-neutral text-center mt-2 mb-1"
                        to="/auth/$pathname"
                        params={{ pathname: 'forgot-password' }}>
                        reset password
                    </Link>

                    <button
                        className="btn btn-secondary"
                        onClick={handlerUpdate}
                        disabled={isUpdating}
                    >
                        {isUpdating && <span className="loading loading-spinner"></span>}
                        {!isUpdating && 'Update'}
                    </button>

                </fieldset>}
            </form>
        </RootLayout>
    </>);
}
export default AccountSetting;
