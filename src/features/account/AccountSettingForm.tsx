import type { User } from "../../types/User";
import Avatar from "../../ui/Avatar";
import { useUserUpdate } from "../../hooks/useProfile";
import { Link } from "@tanstack/react-router";
import { useChangeAvatar, useUploadAvatar } from "../../hooks/userAvatar";


function AccountSettingForm({ user }: { user: User }) {
    const {
        avatarFile,
        // setAvatarFile,
        currentAvatarFile,
        // setCurrentAvatar,
        handleAvatarChange,
    } = useChangeAvatar(user)

    const {
        name,
        setName,
        isUpdating,
        handlerUpdate,
        isUploading,
    }
        = useUserUpdate(user, currentAvatarFile)

    useUploadAvatar(currentAvatarFile)


    return (<>
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
            {/* <legend className="fieldset-legend">Page details</legend> */}
            <label htmlFor='avatar' className='mx-auto cursor-pointer'>
                {/* <UserAvatar
                                user={user}
                                className="mx-auto size-20 cursor-pointer border-2 " style={{ borderColor: '#de2a8a' }}>
                            </UserAvatar> */}
                <Avatar avatarFile={avatarFile} username={name.slice(0, 2).toUpperCase()}></Avatar>
                <input id="avatar" type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleAvatarChange}
                />
            </label>

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
                to="/account/security"
                >
                reset password
            </Link>

            <button
                className="btn btn-secondary"
                onClick={handlerUpdate}
                disabled={isUpdating}
            >
                {isUpdating && isUploading && <span className="loading loading-spinner"></span>}
                {!isUpdating && !isUploading && 'Update'}
            </button>

        </fieldset>
    </>);
}
export default AccountSettingForm;
